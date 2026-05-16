import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { FiLayout, FiFileText, FiMail, FiUsers } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    blogPosts: 0,
    inquiries: 0,
    unreadInquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: projectsCount },
        { count: blogCount },
        { count: inquiriesCount },
        { count: unreadCount }
      ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('is_read', false)
      ]);

      setStats({
        projects: projectsCount || 0,
        blogPosts: blogCount || 0,
        inquiries: inquiriesCount || 0,
        unreadInquiries: unreadCount || 0
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: FiLayout, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: FiFileText, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
    { label: 'Total Inquiries', value: stats.inquiries, icon: FiMail, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Unread Messages', value: stats.unreadInquiries, icon: FiUsers, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back! Here&apos;s what&apos;s happening with your portfolio.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="card-surface p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-xl ${card.bg} ${card.color} p-3`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{card.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{loading ? '...' : card.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Quick Actions or Recent Activity could go here */}
          <div className="card-surface p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
                <FiLayout className="text-brand-500" /> New Project
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
                <FiFileText className="text-fuchsia-500" /> New Blog Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
