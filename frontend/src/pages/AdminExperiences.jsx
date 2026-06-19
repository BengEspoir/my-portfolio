import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiBriefcase,
  FiEdit2,
  FiEye,
  FiEyeOff,
  FiPlus,
  FiSearch,
  FiTrash2
} from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';
import { supabase } from '../utils/supabase';

function statusClass(status) {
  if (status === 'published') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  if (status === 'draft') return 'bg-slate-100 text-slate-600 border-slate-200';
  return 'bg-red-50 text-red-700 border-red-100';
}

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  async function fetchExperiences() {
    const { data, error } = await supabase
      .from('experiences')
      .select('id, company, title, period, status, sort_order, created_at')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error) {
      setExperiences(data || []);
    } else {
      setToast({ type: 'error', message: `Experiences could not be loaded: ${error.message}` });
    }
    setLoading(false);
  }

  async function deleteExperience() {
    if (!deleteTarget) return;

    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', deleteTarget.id);

    if (!error) {
      setExperiences((previous) => previous.filter((item) => item.id !== deleteTarget.id));
      setToast({ type: 'success', message: 'Experience deleted.' });
    } else {
      setToast({ type: 'error', message: `Experience could not be deleted: ${error.message}` });
    }
    setDeleteTarget(null);
  }

  const filteredExperiences = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) return experiences;
    return experiences.filter((item) => (
      item.title?.toLowerCase().includes(search) ||
      item.company?.toLowerCase().includes(search) ||
      item.period?.toLowerCase().includes(search)
    ));
  }, [experiences, searchTerm]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Experiences CMS</h1>
            <p className="text-slate-500">Add, update, publish, or archive the experience section on your homepage.</p>
          </div>
          <Link
            to="/admin/experiences/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-900/20 transition-all hover:bg-cyan-700"
          >
            <FiPlus /> New Experience
          </Link>
        </div>

        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search experiences..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-cyan-500"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Experience</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Period</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">Loading experiences...</td></tr>
                ) : filteredExperiences.length === 0 ? (
                  <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">No experiences found.</td></tr>
                ) : (
                  filteredExperiences.map((experience) => (
                    <tr key={experience.id} className="transition-colors hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-cyan-600">
                            <FiBriefcase />
                          </div>
                          <div>
                            <span className="block font-bold text-slate-900">{experience.title}</span>
                            <span className="text-xs font-medium text-slate-400">{experience.company}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{experience.period || 'Not set'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-widest ${statusClass(experience.status)}`}>
                          {experience.status === 'published' ? <FiEye size={12} /> : <FiEyeOff size={12} />}
                          {experience.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/admin/experiences/${experience.id}/edit`}
                            className="p-2 text-slate-400 transition-colors hover:text-cyan-600"
                            title="Edit"
                          >
                            <FiEdit2 size={18} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(experience)}
                            className="p-2 text-slate-400 transition-colors hover:text-red-500"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete experience?"
        message={deleteTarget ? `This will remove "${deleteTarget.title}" from the dashboard and public homepage.` : ''}
        confirmLabel="Delete experience"
        destructive
        onConfirm={deleteExperience}
        onCancel={() => setDeleteTarget(null)}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </DashboardLayout>
  );
}
