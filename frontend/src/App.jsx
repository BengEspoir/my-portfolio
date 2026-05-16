import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CaseStudyPage from "./pages/CaseStudyPage";
import FullDesignPage from "./pages/FullDesignPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import AdminProjectForm from "./pages/AdminProjectForm";
import AdminBlog from "./pages/AdminBlog";
import AdminBlogForm from "./pages/AdminBlogForm";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminInquiries from "./pages/AdminInquiries";
import ProtectedRoute from "./components/ProtectedRoute";
import useTheme from "./hooks/useTheme";
import { initializeSectionReveal } from "./animations/motion";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projects/:slug/case-study" element={<CaseStudyPage />} />
        <Route path="/projects/:slug/full-design" element={<FullDesignPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/p/admin-access" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/new" element={<AdminProjectForm />} />
          <Route path="/admin/projects/:id/edit" element={<AdminProjectForm />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/blog/new" element={<AdminBlogForm />} />
          <Route path="/admin/blog/:id/edit" element={<AdminBlogForm />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function MotionInitializer() {
  const location = useLocation();

  useEffect(() => {
    const cleanup = initializeSectionReveal();
    return cleanup;
  }, [location.pathname]);

  return null;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen text-slate-900 transition-colors duration-300">
      <ScrollToTop />
      <MotionInitializer />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="pt-20">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
