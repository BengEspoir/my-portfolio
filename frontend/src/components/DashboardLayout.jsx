import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { 
  FiLayout, 
  FiFileText, 
  FiMail, 
  FiLogOut, 
  FiHome,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: FiHome },
    { label: 'Projects', path: '/admin/projects', icon: FiLayout },
    { label: 'Blog Posts', path: '/admin/blog', icon: FiFileText },
    { label: 'Inquiries', path: '/admin/inquiries', icon: FiMail },
  ];

  const Sidebar = () => (
    <div className="flex h-full flex-col bg-slate-900 text-white">
      <div className="flex items-center gap-3 p-6">
        <div className="h-8 w-8 rounded-lg bg-brand-500"></div>
        <span className="text-xl font-bold tracking-tight">Admin CMS</span>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-500"
        >
          <FiLogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="fixed inset-y-0 left-0 w-64 shadow-2xl">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
          <button 
            className="text-slate-500 lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FiMenu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-slate-500 hover:text-brand-600">
              View Site
            </Link>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
