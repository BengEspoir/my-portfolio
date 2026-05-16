import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiEyeOff, 
  FiStar,
  FiSearch,
  FiFilter
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ["All", "UI/UX", "WEB DEV", "MOBILE DEV", "GRAPHICS DESIGN", "PROGRAMMING"];

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, categories, status, is_latest, image_url, created_at')
      .order('created_at', { ascending: false });

    if (!error) setProjects(data);
    setLoading(false);
  }

  async function deleteProject(id) {
    if (!window.confirm('Are you sure you want to delete this project? This will remove all associated data.')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (!error) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || project.categories.includes(filterCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Projects CMS</h1>
            <p className="text-slate-500">Manage your portfolio projects and case studies.</p>
          </div>
          <Link 
            to="/admin/projects/new" 
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-900/20 hover:bg-brand-700 transition-all"
          >
            <FiPlus /> New Project
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-brand-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              className="rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 outline-none transition focus:border-brand-500 appearance-none"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Project</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Categories</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">Loading projects...</td></tr>
                ) : filteredProjects.length === 0 ? (
                  <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">No projects found.</td></tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                            {project.image_url ? (
                              <img src={project.image_url} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-300"><FiLayout /></div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">{project.title}</span>
                              {project.is_latest && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600 uppercase tracking-tighter ring-1 ring-inset ring-amber-600/20">
                                  <FiStar size={10} /> Latest
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400">{new Date(project.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {project.categories.map(cat => (
                            <span key={cat} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 uppercase tracking-tight">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-widest ${
                          project.status === 'published' 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : project.status === 'draft' 
                            ? 'bg-slate-100 text-slate-500' 
                            : 'bg-red-50 text-red-600'
                        }`}>
                          {project.status === 'published' ? <FiEye size={12} /> : <FiEyeOff size={12} />}
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link 
                            to={`/admin/projects/${project.id}/edit`}
                            className="p-2 text-slate-400 hover:text-brand-600 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 size={18} />
                          </Link>
                          <button 
                            onClick={() => deleteProject(project.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
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
    </DashboardLayout>
  );
}
