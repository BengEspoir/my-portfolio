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
import QuickImportAssistant from '../components/QuickImportAssistant';
import Toast from '../components/Toast';
import { createStorageFileName } from '../utils/files';
import { slugify } from '../utils/text';

const CATEGORIES = ["UI/UX", "WEB DEV", "MOBILE DEV", "GRAPHICS DESIGN", "PROGRAMMING"];

const defaultDesignDetails = {
  designType: '',
  clientName: '',
  objective: '',
  targetAudience: '',
  colorPalette: [],
  fonts: [],
  fontWeights: [],
  style: '',
  toolsUsed: [],
  copywriting: '',
  layoutNotes: '',
  notes: ''
};

function listToInput(value) {
  return Array.isArray(value) ? value.join(', ') : (value || '');
}

function inputToList(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
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
    brand_color: '#6366f1',
    project_background: '',
    design_images: [],
    design_details: defaultDesignDetails
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
      setFormData((previous) => ({
        ...previous,
        ...data,
        categories: data.categories || [],
        tools_tech: data.tools_tech || [],
        preview_screens: data.preview_screens || [],
        ux_flow: data.ux_flow || [],
        design_images: Array.isArray(data.design_images) ? data.design_images : [],
        design_details: {
          ...defaultDesignDetails,
          ...(data.design_details || {})
        }
      }));
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

  const handleDesignDetailsChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      design_details: {
        ...defaultDesignDetails,
        ...(prev.design_details || {}),
        [name]: value
      }
    }));
  };

  const handleDesignDetailsListChange = (name, value) => {
    handleDesignDetailsChange(name, inputToList(value));
  };

  const handleQuickImport = (result) => {
    const title = String(result.title || '').trim();
    const description = String(result.description || '').trim();
    const caseStudyContent = String(result.case_study_content || '').trim();
    const tags = Array.isArray(result.tags)
      ? result.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [];

    setFormData((previous) => ({
      ...previous,
      title: title || previous.title,
      slug: previous.slug || slugify(title),
      description: description || previous.description,
      case_study_title: title || previous.case_study_title,
      project_background: caseStudyContent || description || previous.project_background,
      tools_tech: tags.length > 0 ? tags : previous.tools_tech,
      seo_title: title ? `${title} | Project Case Study` : previous.seo_title,
      seo_description: description || previous.seo_description
    }));
    setActiveTab('basic');
    setToast({ type: 'success', message: 'AI assistant populated the project draft. Review before saving.' });
  };

  const updateDesignImageAlt = (index, alt) => {
    setFormData(prev => ({
      ...prev,
      design_images: (prev.design_images || []).map((item, itemIndex) => (
        itemIndex === index ? { ...item, alt } : item
      ))
    }));
  };

  const removeDesignImage = (index) => {
    setFormData(prev => ({
      ...prev,
      design_images: (prev.design_images || []).filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (!formData.tools_tech.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tools_tech: [...prev.tools_tech, tag]
        }));
      }
      e.target.value = '';
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tools_tech: prev.tools_tech.filter(t => t !== tag)
    }));
  };

  const addUxFlow = () => {
    setFormData(prev => ({
      ...prev,
      ux_flow: [...(prev.ux_flow || []), { title: '', content: '' }]
    }));
  };

  const updateUxFlow = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.ux_flow];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, ux_flow: updated };
    });
  };

  const removeUxFlow = (index) => {
    setFormData(prev => ({
      ...prev,
      ux_flow: prev.ux_flow.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const fileName = createStorageFileName(file);
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
      } else if (fieldName === 'design_images') {
        setFormData(prev => ({
          ...prev,
          design_images: [
            ...(prev.design_images || []),
            {
              src: publicUrl,
              alt: `${prev.title || 'Graphic design'} preview ${(prev.design_images || []).length + 1}`
            }
          ]
        }));
      } else {
        setFormData(prev => ({ ...prev, [fieldName]: publicUrl }));
      }
    } catch (error) {
      setToast({ type: 'error', message: `Error uploading file: ${error.message}` });
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
      setToast({ type: 'error', message: `Error saving project: ${error.message}` });
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
    { id: 'graphic-design', label: 'Graphic Design', icon: FiImage },
    { id: 'seo', label: 'SEO & Meta', icon: FiMonitor }
  ];

  return (
    <DashboardLayout>
      <Toast toast={toast} onClose={() => setToast(null)} />
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

        <QuickImportAssistant
          contentType="project"
          currentDraft={formData}
          onApply={handleQuickImport}
          placeholder="Paste a project debrief, client notes, case study draft, or rough product description..."
        />

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
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Sort Order</label>
                <input 
                  type="number" name="sort_order" value={formData.sort_order} onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Project Year</label>
                <input 
                  type="text" name="project_year" value={formData.project_year} onChange={handleChange} placeholder="e.g. 2024"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Client / Company</label>
                <input 
                  type="text" name="client_company" value={formData.client_company} onChange={handleChange} placeholder="e.g. Personal Project"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
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
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Case Study Title</label>
                  <input 
                    type="text" name="case_study_title" value={formData.case_study_title} onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                    placeholder="e.g. Redesigning the Banking Experience"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Project Background</label>
                  <textarea 
                    name="project_background" value={formData.project_background} onChange={handleChange} rows="3"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                    placeholder="Short overview of the project context..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Role</label>
                  <input 
                    type="text" name="role" value={formData.role} onChange={handleChange} 
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" 
                    placeholder="e.g. Lead UI/UX Designer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Brand Color (Hex)</label>
                  <div className="flex gap-2">
                    <input type="color" name="brand_color" value={formData.brand_color} onChange={handleChange} className="h-12 w-12 rounded border-none cursor-pointer" />
                    <input type="text" name="brand_color" value={formData.brand_color} onChange={handleChange} className="flex-1 rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tools & Technologies</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tools_tech?.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500"><FiTrash2 size={12} /></button>
                    </span>
                  ))}
                </div>
                <input 
                  type="text" 
                  onKeyDown={addTag}
                  placeholder="Type a tool and press Enter..."
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Hero Image</label>
                <div className="flex gap-4 items-start">
                  <div className="h-40 w-full max-w-md rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                    {formData.hero_image_url ? (
                      <img src={formData.hero_image_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <FiImage size={32} className="text-slate-300" />
                    )}
                  </div>
                  <input 
                    type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'hero_image_url')}
                    className="text-sm text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">The Problem</label>
                  <textarea 
                    name="problem_statement" value={formData.problem_statement} onChange={handleChange} rows="4"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">UX Thinking & Journey</label>
                  <textarea 
                    name="design_journey" value={formData.design_journey} onChange={handleChange} rows="6"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Challenges</label>
                  <textarea 
                    name="challenges" value={formData.challenges} onChange={handleChange} rows="4"
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
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Outcome & Impact</label>
                  <textarea 
                    name="outcome" value={formData.outcome} onChange={handleChange} rows="4"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-bold text-slate-700">Experience Architecture (UX Flow)</label>
                  <button 
                    type="button" 
                    onClick={addUxFlow}
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    <FiPlus /> Add Flow Step
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.ux_flow?.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative group">
                      <button 
                        type="button" 
                        onClick={() => removeUxFlow(idx)}
                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiTrash2 size={16} />
                      </button>
                      <input 
                        type="text" 
                        value={step.title} 
                        onChange={(e) => updateUxFlow(idx, 'title', e.target.value)}
                        placeholder="Step Title (e.g. Discovery)"
                        className="w-full bg-transparent font-bold text-slate-900 outline-none border-b border-slate-200 pb-2 focus:border-brand-500"
                      />
                      <textarea 
                        value={step.content} 
                        onChange={(e) => updateUxFlow(idx, 'content', e.target.value)}
                        placeholder="Describe the UX thinking behind this step..."
                        rows="2"
                        className="w-full bg-transparent text-sm text-slate-600 outline-none"
                      />
                    </div>
                  ))}
                  {(!formData.ux_flow || formData.ux_flow.length === 0) && (
                    <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-sm">
                      No UX flow steps added yet.
                    </div>
                  )}
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

          {/* GRAPHIC DESIGN TAB */}
          {activeTab === 'graphic-design' && (
            <div className="space-y-8">
              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-700">
                Use this tab for projects categorized as GRAPHICS DESIGN. These fields power the large artwork-focused public detail layout.
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Design Images</label>
                <p className="mb-4 text-sm text-slate-500">First image is used as the large main preview. Add variations, brochure pages, mockups, or back-side designs after it.</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(formData.design_images || []).map((image, idx) => (
                    <div key={`${image.src}-${idx}`} className="rounded-2xl border border-slate-100 bg-white p-3">
                      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                        <img src={image.src} alt={image.alt || ''} className="h-full w-full object-contain" />
                      </div>
                      <input
                        type="text"
                        value={image.alt || ''}
                        onChange={(e) => updateDesignImageAlt(idx, e.target.value)}
                        placeholder="Alt text"
                        className="mt-3 w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-brand-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeDesignImage(idx)}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-red-500"
                      >
                        <FiTrash2 size={12} /> Remove
                      </button>
                    </div>
                  ))}
                  <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition hover:border-brand-400 hover:bg-brand-50">
                    <FiPlus size={28} />
                    <span className="mt-2 text-xs font-bold uppercase tracking-wide">Add Design Image</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'design_images')} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Design Type</label>
                  <input
                    type="text"
                    value={formData.design_details?.designType || ''}
                    onChange={(e) => handleDesignDetailsChange('designType', e.target.value)}
                    placeholder="Flyer, poster, brochure, logo..."
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Client / Brand Name</label>
                  <input
                    type="text"
                    value={formData.design_details?.clientName || ''}
                    onChange={(e) => handleDesignDetailsChange('clientName', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Design Objective</label>
                  <textarea
                    value={formData.design_details?.objective || ''}
                    onChange={(e) => handleDesignDetailsChange('objective', e.target.value)}
                    rows="3"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Target Audience</label>
                  <input
                    type="text"
                    value={formData.design_details?.targetAudience || ''}
                    onChange={(e) => handleDesignDetailsChange('targetAudience', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Color Palette</label>
                  <input
                    type="text"
                    value={listToInput(formData.design_details?.colorPalette)}
                    onChange={(e) => handleDesignDetailsListChange('colorPalette', e.target.value)}
                    placeholder="#0F4C81, #F47B2A, #FFFFFF"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Design Style</label>
                  <input
                    type="text"
                    value={formData.design_details?.style || ''}
                    onChange={(e) => handleDesignDetailsChange('style', e.target.value)}
                    placeholder="Modern, premium, bold"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Fonts Used</label>
                  <input
                    type="text"
                    value={listToInput(formData.design_details?.fonts)}
                    onChange={(e) => handleDesignDetailsListChange('fonts', e.target.value)}
                    placeholder="Montserrat, Poppins"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Font Weights</label>
                  <input
                    type="text"
                    value={listToInput(formData.design_details?.fontWeights)}
                    onChange={(e) => handleDesignDetailsListChange('fontWeights', e.target.value)}
                    placeholder="600, 700, 800"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tools Used</label>
                  <input
                    type="text"
                    value={listToInput(formData.design_details?.toolsUsed)}
                    onChange={(e) => handleDesignDetailsListChange('toolsUsed', e.target.value)}
                    placeholder="Photoshop, Illustrator, Canva, Figma"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Copywriting / Text Used</label>
                  <textarea
                    value={formData.design_details?.copywriting || ''}
                    onChange={(e) => handleDesignDetailsChange('copywriting', e.target.value)}
                    rows="3"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Layout / Design Notes</label>
                  <textarea
                    value={formData.design_details?.layoutNotes || ''}
                    onChange={(e) => handleDesignDetailsChange('layoutNotes', e.target.value)}
                    rows="4"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Important Notes</label>
                  <textarea
                    value={formData.design_details?.notes || ''}
                    onChange={(e) => handleDesignDetailsChange('notes', e.target.value)}
                    rows="3"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500"
                  />
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
