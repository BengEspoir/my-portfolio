import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { FiLayout, FiFileText, FiMail, FiTrendingUp, FiPlus, FiArrowRight, FiMessageSquare, FiCalendar } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    blogPosts: 0,
    inquiries: 0,
    unreadInquiries: 0,
    testimonials: 0,
    pendingTestimonials: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: projectsCount },
        { count: blogCount },
        { count: inquiriesCount },
        { count: unreadCount },
        { count: testimonialsCount },
        { count: pendingTestimonialsCount },
        { count: pendingAppointmentsCount }
      ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'pending')
      ]);

      setStats({
        projects: projectsCount || 0,
        blogPosts: blogCount || 0,
        inquiries: inquiriesCount || 0,
        unreadInquiries: unreadCount || 0,
        testimonials: testimonialsCount || 0,
        pendingTestimonials: pendingTestimonialsCount || 0,
        pendingAppointments: pendingAppointmentsCount || 0
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: FiLayout, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+2 this month' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: FiFileText, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50', trend: '+1 this month' },
    { label: 'Testimonials', value: stats.testimonials, icon: FiMessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: `${stats.pendingTestimonials} pending` },
    { label: 'Pending Appointments', value: stats.pendingAppointments, icon: FiCalendar, color: 'text-rose-600', bg: 'bg-rose-50', trend: 'Schedule ready' },
    { label: 'Unread Messages', value: stats.unreadInquiries, icon: FiMail, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: 'Needs attention' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back! Here&apos;s what&apos;s happening with your portfolio.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="card-surface p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`rounded-xl ${card.bg} ${card.color} p-3`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex items-center text-xs font-medium text-emerald-600">
                    <FiTrendingUp className="mr-1" /> {card.trend}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{loading ? '...' : card.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {stats.pendingTestimonials > 0 && (
          <Link
            to="/admin/testimonials?status=pending"
            className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 transition hover:border-amber-300 hover:bg-amber-100 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-bold">New testimonial pending approval</p>
              <p className="text-sm">Pending testimonials: {stats.pendingTestimonials}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-bold">
              Review now <FiArrowRight />
            </span>
          </Link>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card-surface p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FiPlus className="text-brand-500" /> Quick Actions
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link 
                to="/admin/projects/new"
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center transition-all hover:bg-brand-50 hover:border-brand-100 group"
              >
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-brand-600 shadow-sm group-hover:scale-110 transition-transform">
                  <FiLayout size={24} />
                </div>
                <span className="font-bold text-slate-900">New Project</span>
              </Link>
              <Link 
                to="/admin/blog/new"
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center transition-all hover:bg-fuchsia-50 hover:border-fuchsia-100 group"
              >
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-fuchsia-600 shadow-sm group-hover:scale-110 transition-transform">
                  <FiFileText size={24} />
                </div>
                <span className="font-bold text-slate-900">New Blog Post</span>
              </Link>
              <Link 
                to="/admin/testimonials?new=1"
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center transition-all hover:bg-indigo-50 hover:border-indigo-100 group"
              >
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                  <FiMessageSquare size={24} />
                </div>
                <span className="font-bold text-slate-900">New Testimonial</span>
              </Link>
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Recent Messages</h3>
              <Link to="/admin/inquiries" className="text-sm font-semibold text-brand-600 hover:underline flex items-center gap-1">
                View all <FiArrowRight />
              </Link>
            </div>
            <div className="space-y-4">
              {stats.unreadInquiries > 0 ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 text-sm font-medium">
                  You have {stats.unreadInquiries} unread messages that need your response.
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 text-sm text-center">
                  All caught up! No unread messages.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
