import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { 
  FiSave, 
  FiArrowLeft, 
  FiImage, 
  FiType,
  FiInfo,
  FiMonitor,
  FiCalendar
} from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import QuickImportAssistant from '../components/QuickImportAssistant';
import Toast from '../components/Toast';
import { createStorageFileName } from '../utils/files';
import { estimateReadingTime, slugify } from '../utils/text';

export default function AdminBlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [activeTab, setActiveTab] = useState('content');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    category: '',
    tags: [],
    status: 'draft',
    published_at: new Date().toISOString(),
    author_name: 'Mbeng Espoir',
    author_image_url: '',
    reading_time: '5 min',
    seo_title: '',
    seo_description: ''
  });

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (!error) {
      setFormData(data);
    } else {
      navigate('/admin/blog');
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const fileName = createStorageFileName(file);
      const filePath = `blog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, [fieldName]: publicUrl }));
    } catch (error) {
      setToast({ type: 'error', message: `Error uploading file: ${error.message}` });
    }
  };

  const handleQuickImport = (result) => {
    const title = String(result.title || '').trim();
    const description = String(result.description || '').trim();
    const content = String(result.content || result.case_study_content || '').trim();
    const tags = Array.isArray(result.tags)
      ? result.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [];

    setFormData((previous) => ({
      ...previous,
      title: title || previous.title,
      slug: previous.slug || slugify(title),
      excerpt: String(result.excerpt || description || '').trim() || previous.excerpt,
      content: content || previous.content,
      category: String(result.category || '').trim() || previous.category,
      tags: tags.length > 0 ? tags : previous.tags,
      reading_time: String(result.reading_time || '').trim() || estimateReadingTime(content),
      seo_title: String(result.seo_title || '').trim() || title || previous.seo_title,
      seo_description: String(result.seo_description || description || '').trim() || previous.seo_description
    }));
    setActiveTab('content');
    setToast({ type: 'success', message: 'AI assistant populated the article draft. Review before saving.' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submissionData = {
        ...formData,
        published_at: formData.status === 'published' ? formData.published_at : null
      };

      const { error } = isEditing
        ? await supabase.from('blog_posts').update(submissionData).eq('id', id)
        : await supabase.from('blog_posts').insert([submissionData]);

      if (error) throw error;
      navigate('/admin/blog');
    } catch (error) {
      setToast({ type: 'error', message: `Error saving post: ${error.message}` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading article data...</div>;

  const tabs = [
    { id: 'content', label: 'Content', icon: FiType },
    { id: 'meta', label: 'Metadata', icon: FiInfo },
    { id: 'seo', label: 'SEO', icon: FiMonitor }
  ];

  return (
    <DashboardLayout>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={() => navigate('/admin/blog')}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <FiArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-slate-900">
              {isEditing ? `Edit Article` : 'New Article'}
            </h1>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => navigate('/admin/blog')}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="gap-2 !bg-fuchsia-600 hover:!bg-fuchsia-700">
              <FiSave /> {saving ? 'Saving...' : 'Save Article'}
            </Button>
          </div>
        </div>

        <QuickImportAssistant
          contentType="blog"
          currentDraft={formData}
          accent="fuchsia"
          onApply={handleQuickImport}
          placeholder="Paste rough article notes, a draft paragraph, or a topic outline..."
        />

        <div className="flex border-b border-slate-200">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-fuchsia-500 text-fuchsia-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon /> {tab.label}
              </button>
            );
          })}
        </div>

        <div className="card-surface p-8">
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleChange} required
                  className="w-full rounded-xl border border-slate-200 p-3 text-lg font-bold outline-none focus:border-fuchsia-500"
                  placeholder="Article Title"
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Slug</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-fuchsia-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-fuchsia-500" placeholder="e.g. Design, Development" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Excerpt (Short Summary)</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows="2" className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-fuchsia-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-700">Content (Markdown)</label>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Supports Markdown</span>
                </div>
                <textarea 
                  name="content" value={formData.content} onChange={handleChange} required rows="15" 
                  className="w-full rounded-xl border border-slate-200 p-4 font-mono text-sm outline-none focus:border-fuchsia-500 bg-slate-50"
                  placeholder="# Start writing..."
                />
              </div>
            </div>
          )}

          {activeTab === 'meta' && (
            <div className="grid gap-8 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image</label>
                <div className="flex gap-6 items-start">
                  <div className="h-40 w-64 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                    {formData.cover_image_url ? (
                      <img src={formData.cover_image_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <FiImage size={32} className="text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-4">
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'cover_image_url')} className="text-xs text-slate-500" />
                    <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs">Recommended size: 1200x630px. This image will appear at the top of the article and in list views.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 grid gap-6 md:grid-cols-2 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="md:col-span-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Author Information</h3>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Author Name</label>
                  <input type="text" name="author_name" value={formData.author_name} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-fuchsia-500 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Reading Time</label>
                  <input type="text" name="reading_time" value={formData.reading_time} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-fuchsia-500 bg-white" placeholder="e.g. 5 min" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Author Image</label>
                  <div className="flex gap-4 items-center">
                    <div className="h-16 w-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                      {formData.author_image_url ? <img src={formData.author_image_url} className="h-full w-full object-cover" /> : <FiImage className="text-slate-300" />}
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'author_image_url')} className="text-xs text-slate-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-fuchsia-500">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Publish Date</label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="datetime-local" name="published_at" value={formData.published_at?.slice(0, 16)} onChange={handleChange} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-fuchsia-500" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">SEO Title</label>
                <input type="text" name="seo_title" value={formData.seo_title} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-fuchsia-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">SEO Description</label>
                <textarea name="seo_description" value={formData.seo_description} onChange={handleChange} rows="4" className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-fuchsia-500" />
              </div>
            </div>
          )}
        </div>
      </form>
    </DashboardLayout>
  );
}
