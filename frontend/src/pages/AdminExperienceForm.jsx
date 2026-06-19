import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiBriefcase,
  FiInfo,
  FiSave,
  FiType
} from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import QuickImportAssistant from '../components/QuickImportAssistant';
import Toast from '../components/Toast';
import { supabase } from '../utils/supabase';
import { slugify } from '../utils/text';

const emptyForm = {
  slug: '',
  company: '',
  title: '',
  period: '',
  description: '',
  tags: [],
  title_fr: '',
  period_fr: '',
  description_fr: '',
  tags_fr: [],
  status: 'draft',
  sort_order: 0
};

function listToInput(value) {
  return Array.isArray(value) ? value.join(', ') : '';
}

function inputToList(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminExperienceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [activeTab, setActiveTab] = useState('content');
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (isEditing) {
      fetchExperience();
    }
  }, [id]);

  async function fetchExperience() {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();

    if (!error) {
      setFormData({
        ...emptyForm,
        ...data,
        tags: data.tags || [],
        tags_fr: data.tags_fr || []
      });
    } else {
      setToast({ type: 'error', message: `Experience could not be loaded: ${error.message}` });
      navigate('/admin/experiences');
    }
    setLoading(false);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: name === 'sort_order' ? Number(value) : value
    }));
  };

  const handleListChange = (name, value) => {
    setFormData((previous) => ({
      ...previous,
      [name]: inputToList(value)
    }));
  };

  const handleQuickImport = (result) => {
    const title = String(result.title || '').trim();
    const company = String(result.company || '').trim();
    const description = String(result.description || '').trim();
    const tags = Array.isArray(result.tags)
      ? result.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [];
    const tagsFr = Array.isArray(result.tags_fr)
      ? result.tags_fr.map((tag) => String(tag).trim()).filter(Boolean)
      : [];

    setFormData((previous) => ({
      ...previous,
      title: title || previous.title,
      slug: previous.slug || slugify(`${company || previous.company} ${title || previous.title}`),
      company: company || previous.company,
      period: String(result.period || '').trim() || previous.period,
      description: description || previous.description,
      tags: tags.length > 0 ? tags : previous.tags,
      title_fr: String(result.title_fr || '').trim() || previous.title_fr,
      period_fr: String(result.period_fr || '').trim() || previous.period_fr,
      description_fr: String(result.description_fr || '').trim() || previous.description_fr,
      tags_fr: tagsFr.length > 0 ? tagsFr : previous.tags_fr
    }));
    setActiveTab('content');
    setToast({ type: 'success', message: 'AI assistant populated the experience draft. Review before saving.' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        slug: formData.slug || slugify(`${formData.company} ${formData.title}`),
        company: formData.company.trim(),
        title: formData.title.trim(),
        period: formData.period.trim() || null,
        description: formData.description.trim(),
        title_fr: formData.title_fr.trim() || null,
        period_fr: formData.period_fr.trim() || null,
        description_fr: formData.description_fr.trim() || null,
        tags: formData.tags || [],
        tags_fr: formData.tags_fr || []
      };

      const { error } = isEditing
        ? await supabase.from('experiences').update(payload).eq('id', id)
        : await supabase.from('experiences').insert([payload]);

      if (error) throw error;
      navigate('/admin/experiences');
    } catch (error) {
      setToast({ type: 'error', message: `Error saving experience: ${error.message}` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading experience data...</div>;

  const tabs = [
    { id: 'content', label: 'Content', icon: FiType },
    { id: 'localization', label: 'French', icon: FiInfo },
    { id: 'settings', label: 'Settings', icon: FiBriefcase }
  ];

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-8 pb-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate('/admin/experiences')}
              className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-cyan-600"
            >
              <FiArrowLeft /> Back to Experiences
            </button>
            <h1 className="text-2xl font-bold text-slate-900">
              {isEditing ? `Edit: ${formData.title}` : 'New Experience'}
            </h1>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => navigate('/admin/experiences')}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="gap-2">
              <FiSave /> {saving ? 'Saving...' : 'Save Experience'}
            </Button>
          </div>
        </div>

        <QuickImportAssistant
          contentType="experience"
          currentDraft={formData}
          onApply={handleQuickImport}
          accent="cyan"
          placeholder="Paste a resume paragraph, internship note, freelance project summary, or raw experience details..."
        />

        <div className="flex gap-2 overflow-x-auto border-b border-slate-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-colors',
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                ].join(' ')}
              >
                <Icon /> {tab.label}
              </button>
            );
          })}
        </div>

        <div className="card-surface p-6 sm:p-8">
          {activeTab === 'content' ? (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Company / Context</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                  placeholder="e.g. Nephus, Freelance, Academic"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Period</label>
                <input
                  type="text"
                  name="period"
                  value={formData.period || ''}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                  placeholder="e.g. June 2024 - September 2024"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                  placeholder="e.g. UI/UX and Web Development Intern"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">Tags</label>
                <input
                  type="text"
                  value={listToInput(formData.tags)}
                  onChange={(event) => handleListChange('tags', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                  placeholder="Internship, UI/UX, Web Dev, Git"
                />
              </div>
            </div>
          ) : null}

          {activeTab === 'localization' ? (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-sm text-cyan-800">
                French fields are optional. The public French page falls back to English if a field is empty.
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">French Title</label>
                <input
                  type="text"
                  name="title_fr"
                  value={formData.title_fr || ''}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">French Period</label>
                <input
                  type="text"
                  name="period_fr"
                  value={formData.period_fr || ''}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">French Tags</label>
                <input
                  type="text"
                  value={listToInput(formData.tags_fr)}
                  onChange={(event) => handleListChange('tags_fr', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                  placeholder="Stage, UI/UX, Web Dev, Git"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">French Description</label>
                <textarea
                  name="description_fr"
                  value={formData.description_fr || ''}
                  onChange={handleChange}
                  rows="5"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          ) : null}

          {activeTab === 'settings' ? (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                  placeholder="auto-generated if empty"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Sort Order</label>
                <input
                  type="number"
                  name="sort_order"
                  value={formData.sort_order}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          ) : null}
        </div>
      </form>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </DashboardLayout>
  );
}
