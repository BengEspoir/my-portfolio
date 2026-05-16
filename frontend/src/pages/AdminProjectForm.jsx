import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { 
  FiSave, 
  FiArrowLeft, 
  FiImage, 
  FiPlus, 
  FiTrash2, 
  FiCheckCircle,
  FiLayout,
  FiInfo,
  FiType,
  FiLink,
  FiMonitor
} from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';

const CATEGORIES = ["UI/UX", "WEB DEV", "MOBILE DEV", "GRAPHICS DESIGN", "PROGRAMMING"];

export default function AdminProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    categories: [],
    project_type: '',
    client_company: '',
    project_year: '',
    status: 'draft',
    is_latest: false,
    sort_order: 0,
    image_url: '',
    card_subtitle: '',
    badge_text: '',
    show_latest_badge: true,
    cta_label: '',
    cta_type: 'default',
    cta_link: '',
    is_featured: false,
    case_study_title: '',
    hero_image_url: '',
    problem_statement: '',
    project_goal: '',
    role: '',
    tools_tech: [],
    design_journey: '',
    challenges: '',
    solution: '',
    outcome: '',
    preview_screens: [],
    ux_flow: [],
    prototype_url: '',
    prototype_embed: '',
    live_url: '',
    github_url: '',
    figma_url: '',
    video_url: '',
    apk_url: '',
    download_url: '',
    brand_color: '#6366f1'
  });

  useEffect(() => {
    if (isEditing) {
      fetchProject();
    }
  }, [id]);

  async function fetchProject() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (!error) {
      setFormData(data);
    } else {
      console.error('Error fetching project:', error);
      navigate('/admin/projects');
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayToggle = (name, value) => {
    setFormData(prev => {
      const current = prev[name] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [name]: updated };
    });
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      if (fieldName === 'preview_screens') {
        setFormData(prev => ({
          ...prev,
          preview_screens: [...prev.preview_screens, publicUrl]
        }));
      } else {
        setFormData(prev => ({ ...prev, [fieldName]: publicUrl }));
      }
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = isEditing
        ? await supabase.from('projects').update(formData).eq('id', id)
        : await supabase.from('projects').insert([formData]);

      if (error) throw error;
      navigate('/admin/projects');
    } catch (error) {
      alert('Error saving project: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading project data...</div>;

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FiInfo },
    { id: 'card', label: 'Card Config', icon: FiLayout },
    { id: 'case-study', label: 'Case Study', icon: FiType },
    { id: 'links', label: 'Links & Assets', icon: FiLink },
    { id: 'seo', label: 'SEO & Meta', icon: FiMonitor }
  ];

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <FiArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-slate-900">
              {isEditing ? `Edit: ${formData.title}` : 'New Project'}
            </h1>
          </div>
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="secondary"
              onClick={() => navigate('/admin/projects')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="gap-2">
              <FiSave /> {saving ? 'Saving...' : 'Save Project'}
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
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
                    ? 'border-brand-500 text-brand-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon /> {tab.label}
              </button>
            );
          })}
        </div>

        <div className="card-surface p-8">
          {/* BASIC INFO TAB */}
          {activeTab === 'basic' && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Project Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleChange} required
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Slug</label>
                <input 
                  type="text" name="slug" value={formData.slug} onChange={handleChange} required
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                <select 
                  name="status" value={formData.status} onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat} type="button"
                      onClick={() => handleArrayToggle('categories', cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        formData.categories.includes(cat)
                          ? 'bg-brand-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 md:col-span-2 mt-4 p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" name="is_latest" checked={formData.is_latest} onChange={handleChange}
                    className="h-5 w-5 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <label className="text-sm font-bold text-slate-700">Mark as Latest Project</label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange}
                    className="h-5 w-5 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <label className="text-sm font-bold text-slate-700">Featured in Portfolio</label>
                </div>
              </div>
            </div>
          )}

          {/* CARD CONFIG TAB */}
          {activeTab === 'card' && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Thumbnail Image</label>
                <div className="flex gap-4 items-start">
                  <div className="h-32 w-48 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                    {formData.image_url ? (
                      <img src={formData.image_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <FiImage size={32} className="text-slate-300" />
                    )}
                  </div>
                  <input 
                    type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'image_url')}
                    className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Short Description (Card)</label>
                <textarea 
                  name="description" value={formData.description} onChange={handleChange} rows="3"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">CTA Label</label>
                <input 
                  type="text" name="cta_label" value={formData.cta_label} onChange={handleChange} placeholder="View Project"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">CTA Type</label>
                <select 
                  name="cta_type" value={formData.cta_type} onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                >
                  <option value="default">Default</option>
                  <option value="case-study">Case Study</option>
                  <option value="full-design">Full Design</option>
                  <option value="prototype">Prototype</option>
                </select>
              </div>
            </div>
          )}

          {/* CASE STUDY TAB */}
          {activeTab === 'case-study' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Case Study Title</label>
                <input 
                  type="text" name="case_study_title" value={formData.case_study_title} onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Hero Image</label>
                <input 
                  type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'hero_image_url')}
                  className="text-sm text-slate-500 mb-2"
                />
                {formData.hero_image_url && <img src={formData.hero_image_url} className="h-40 rounded-xl object-cover" />}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Problem Statement</label>
                <textarea 
                  name="problem_statement" value={formData.problem_statement} onChange={handleChange} rows="4"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Design Journey / Process</label>
                <textarea 
                  name="design_journey" value={formData.design_journey} onChange={handleChange} rows="6"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Solution</label>
                <textarea 
                  name="solution" value={formData.solution} onChange={handleChange} rows="4"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Role</label>
                  <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Brand Color (Hex)</label>
                  <div className="flex gap-2">
                    <input type="color" name="brand_color" value={formData.brand_color} onChange={handleChange} className="h-12 w-12 rounded border-none cursor-pointer" />
                    <input type="text" name="brand_color" value={formData.brand_color} onChange={handleChange} className="flex-1 rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LINKS & ASSETS TAB */}
          {activeTab === 'links' && (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Live URL</label>
                  <input type="url" name="live_url" value={formData.live_url} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Figma URL</label>
                  <input type="url" name="figma_url" value={formData.figma_url} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Prototype URL</label>
                  <input type="url" name="prototype_url" value={formData.prototype_url} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">GitHub URL</label>
                  <input type="url" name="github_url" value={formData.github_url} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preview Screens (Gallery)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                  {formData.preview_screens.map((url, idx) => (
                    <div key={idx} className="relative aspect-[9/16] rounded-xl overflow-hidden group">
                      <img src={url} className="h-full w-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, preview_screens: prev.preview_screens.filter((_, i) => i !== idx) }))}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-[9/16] flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 hover:border-brand-400 hover:bg-slate-50 cursor-pointer transition-all">
                    <FiPlus size={24} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase">Add Photo</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'preview_screens')} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* SEO TAB */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">SEO Title</label>
                <input 
                  type="text" name="seo_title" value={formData.seo_title} onChange={handleChange} placeholder="Project Name | Portfolio"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">SEO Description</label>
                <textarea 
                  name="seo_description" value={formData.seo_description} onChange={handleChange} rows="4"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </DashboardLayout>
  );
}
