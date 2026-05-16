import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiEyeOff, 
  FiSearch,
  FiCalendar
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, category, status, published_at, cover_image_url, created_at')
      .order('created_at', { ascending: false });

    if (!error) setPosts(data);
    setLoading(false);
  }

  async function deletePost(id) {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (!error) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Blog CMS</h1>
            <p className="text-slate-500">Write and manage your articles and insights.</p>
          </div>
          <Link 
            to="/admin/blog/new" 
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-900/20 hover:bg-fuchsia-700 transition-all"
          >
            <FiPlus /> New Post
          </Link>
        </div>

        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-fuchsia-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Article</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Category</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">Loading articles...</td></tr>
                ) : filteredPosts.length === 0 ? (
                  <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">No articles found.</td></tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-slate-100 border border-slate-200">
                            {post.cover_image_url ? (
                              <img src={post.cover_image_url} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-300"><FiCalendar /></div>
                            )}
                          </div>
                          <div>
                            <span className="block font-bold text-slate-900">{post.title}</span>
                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Created {new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-fuchsia-50 px-2.5 py-1 text-[10px] font-bold text-fuchsia-600 uppercase tracking-widest">
                          {post.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-widest ${
                          post.status === 'published' 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : post.status === 'draft' 
                            ? 'bg-slate-100 text-slate-500' 
                            : 'bg-red-50 text-red-600'
                        }`}>
                          {post.status === 'published' ? <FiEye size={12} /> : <FiEyeOff size={12} />}
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link 
                            to={`/admin/blog/${post.id}/edit`}
                            className="p-2 text-slate-400 hover:text-fuchsia-600 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 size={18} />
                          </Link>
                          <button 
                            onClick={() => deletePost(post.id)}
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
