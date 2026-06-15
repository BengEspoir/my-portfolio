import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import {
  FiCheckCircle,
  FiEdit2,
  FiImage,
  FiPlus,
  FiSave,
  FiStar,
  FiTrash2,
  FiX,
  FiXCircle
} from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';

const emptyForm = {
  client_name: '',
  client_role: '',
  client_company: '',
  client_image: '',
  content: '',
  rating: 5,
  status: 'approved'
};

const statusLabels = {
  all: 'All',
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected'
};

function statusClass(status) {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  if (status === 'pending') return 'bg-amber-50 text-amber-700 border-amber-100';
  return 'bg-red-50 text-red-700 border-red-100';
}

export default function AdminTestimonials() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setTestimonials(data || []);
    setLoading(false);
  }

  const counts = useMemo(() => {
    return testimonials.reduce(
      (acc, item) => {
        acc.all += 1;
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      },
      { all: 0, pending: 0, approved: 0, rejected: 0 }
    );
  }, [testimonials]);

  const filteredTestimonials = useMemo(() => {
    if (statusFilter === 'all') return testimonials;
    return testimonials.filter((item) => item.status === statusFilter);
  }, [statusFilter, testimonials]);

  const handleFilterChange = (status) => {
    setStatusFilter(status);
    if (status === 'all') {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ status }, { replace: true });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: name === 'rating' ? Number(value) : value
    }));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `testimonials/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      setFormData((previous) => ({ ...previous, client_image: publicUrl }));
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    }
  };

  const openModal = (testimonial = null) => {
    if (testimonial) {
      setFormData({
        ...emptyForm,
        ...testimonial,
        status: testimonial.status || 'pending'
      });
      setEditingId(testimonial.id);
    } else {
      setFormData(emptyForm);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = {
        client_name: formData.client_name.trim(),
        client_role: formData.client_role.trim(),
        client_company: formData.client_company.trim() || null,
        client_image: formData.client_image || null,
        content: formData.content.trim(),
        rating: Number(formData.rating),
        status: formData.status
      };

      const { error } = editingId
        ? await supabase.from('testimonials').update(payload).eq('id', editingId)
        : await supabase.from('testimonials').insert([payload]);

      if (error) throw error;

      await fetchTestimonials();
      setIsModalOpen(false);
    } catch (error) {
      alert('Error saving testimonial: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from('testimonials')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setTestimonials((previous) => previous.map((item) => (
        item.id === id ? { ...item, status } : item
      )));
    }
  }

  async function deleteTestimonial(id) {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (!error) {
      setTestimonials((previous) => previous.filter((item) => item.id !== id));
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
            <p className="text-slate-500">Review public submissions, approve feedback, and manage published testimonials.</p>
          </div>
          <button
            type="button"
            onClick={() => openModal()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-900/20 transition-all hover:bg-brand-700"
          >
            <FiPlus /> New Testimonial
          </button>
        </div>

        {counts.pending > 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
            <p className="font-bold">New testimonial pending approval</p>
            <p className="text-sm">Pending testimonials: {counts.pending}</p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {Object.entries(statusLabels).map(([status, label]) => (
            <button
              key={status}
              type="button"
              onClick={() => handleFilterChange(status)}
              className={[
                'rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition',
                statusFilter === status
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              ].join(' ')}
            >
              {label} ({counts[status] || 0})
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-12 text-center text-slate-500">Loading testimonials...</div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">No testimonials found.</div>
          ) : (
            filteredTestimonials.map((testimonial) => (
              <article key={testimonial.id} className="card-surface group flex flex-col p-6">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(Number(testimonial.rating) || 0)].map((_, index) => (
                        <FiStar key={index} fill="currentColor" size={14} />
                      ))}
                    </div>
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusClass(testimonial.status)}`}>
                      {testimonial.status}
                    </span>
                  </div>
                  <div className="flex gap-2 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
                    <button type="button" onClick={() => openModal(testimonial)} className="p-1.5 text-slate-400 transition-colors hover:text-brand-600" title="Edit">
                      <FiEdit2 size={16} />
                    </button>
                    <button type="button" onClick={() => deleteTestimonial(testimonial.id)} className="p-1.5 text-slate-400 transition-colors hover:text-red-500" title="Delete">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="mb-6 flex-1 text-sm italic text-slate-600 line-clamp-5">&quot;{testimonial.content}&quot;</p>

                <div className="border-t border-slate-100 pt-4">
                  <h4 className="font-bold text-slate-900">{testimonial.client_name}</h4>
                  <p className="text-xs text-slate-500">
                    {testimonial.client_role}{testimonial.client_company ? ` @ ${testimonial.client_company}` : ''}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {testimonial.status !== 'approved' ? (
                    <button
                      type="button"
                      onClick={() => updateStatus(testimonial.id, 'approved')}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      <FiCheckCircle /> Approve
                    </button>
                  ) : null}
                  {testimonial.status !== 'rejected' ? (
                    <button
                      type="button"
                      onClick={() => updateStatus(testimonial.id, 'rejected')}
                      className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
                    >
                      <FiXCircle /> Reject
                    </button>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Client Name</label>
                  <input type="text" name="client_name" value={formData.client_name} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Rating</label>
                  <select name="rating" value={formData.rating} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500">
                    {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Client Role</label>
                  <input type="text" name="client_role" value={formData.client_role} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" placeholder="e.g. Client, Mentor" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Company</label>
                  <input type="text" name="client_company" value={formData.client_company || ''} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" placeholder="Optional" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Client Photo</label>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    {formData.client_image ? <img src={formData.client_image} className="h-full w-full object-cover" alt="" /> : <FiImage className="text-slate-300" />}
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="text-xs text-slate-500" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Testimonial Content</label>
                <textarea name="content" value={formData.content} onChange={handleChange} required rows="4" className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500">
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
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
      ) : null}
    </DashboardLayout>
  );
}
