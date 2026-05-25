import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiStar,
  FiMessageSquare,
  FiImage,
  FiX,
  FiSave
} from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';

export default function AdminTestimonials() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    client_name: '',
    client_role: '',
    client_company: '',
    client_image: '',
    content: '',
    rating: 5,
    status: 'published'
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setTestimonials(data);
    setLoading(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `testimonials/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, client_image: publicUrl }));
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    }
  };

  const openModal = (testimonial = null) => {
    if (testimonial) {
      setFormData(testimonial);
      setEditingId(testimonial.id);
    } else {
      setFormData({
        client_name: '',
        client_role: '',
        client_company: '',
        client_image: '',
        content: '',
        rating: 5,
        status: 'published'
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (searchParams.get('new') === '1') {
      openModal();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = editingId
        ? await supabase.from('testimonials').update(formData).eq('id', editingId)
        : await supabase.from('testimonials').insert([formData]);

      if (error) throw error;
      
      fetchTestimonials();
      setIsModalOpen(false);
    } catch (error) {
      alert('Error saving testimonial: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  async function deleteTestimonial(id) {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (!error) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
            <p className="text-slate-500">Manage client feedback and success stories.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-900/20 hover:bg-brand-700 transition-all"
          >
            <FiPlus /> New Testimonial
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-12 text-center text-slate-500">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">No testimonials found.</div>
          ) : (
            testimonials.map((t) => (
              <div key={t.id} className="card-surface p-6 flex flex-col group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(Number(t.rating) || 0)].map((_, i) => <FiStar key={i} fill="currentColor" size={14} />)}
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                      t.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openModal(t)} className="p-1.5 text-slate-400 hover:text-brand-600 transition-colors"><FiEdit2 size={16} /></button>
                    <button onClick={() => deleteTestimonial(t.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 size={16} /></button>
                  </div>
                </div>
                
                <p className="text-slate-600 italic mb-6 flex-1 text-sm line-clamp-4">"{t.content}"</p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                    {t.client_image ? (
                      <img src={t.client_image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center font-bold text-slate-400">{t.client_name[0]}</div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.client_name}</h4>
                    <p className="text-xs text-slate-500">{t.client_role}{t.client_company ? ` @ ${t.client_company}` : ''}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600"><FiX size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Client Name</label>
                  <input type="text" name="client_name" value={formData.client_name} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Rating (1-5)</label>
                  <select name="rating" value={formData.rating} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500">
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Client Role</label>
                  <input type="text" name="client_role" value={formData.client_role} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" placeholder="e.g. CEO" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Company</label>
                  <input type="text" name="client_company" value={formData.client_company} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" placeholder="e.g. Acme Corp" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Client Photo</label>
                <div className="flex gap-4 items-center">
                  <div className="h-16 w-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                    {formData.client_image ? <img src={formData.client_image} className="h-full w-full object-cover" /> : <FiImage className="text-slate-300" />}
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="text-xs text-slate-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Testimonial Content</label>
                <textarea name="content" value={formData.content} onChange={handleChange} required rows="4" className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" placeholder="The client's feedback..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={saving} className="flex-1 gap-2">
                  <FiSave /> {saving ? 'Saving...' : 'Save Testimonial'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
