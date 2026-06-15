import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import useTheme from "./hooks/useTheme";
import { initializeSectionReveal } from "./animations/motion";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Booking = lazy(() => import("./pages/Booking"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const FullDesignPage = lazy(() => import("./pages/FullDesignPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/AdminProjects"));
const AdminProjectForm = lazy(() => import("./pages/AdminProjectForm"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const AdminBlogForm = lazy(() => import("./pages/AdminBlogForm"));
const AdminTestimonials = lazy(() => import("./pages/AdminTestimonials"));
const AdminAppointments = lazy(() => import("./pages/AdminAppointments"));
const AdminInquiries = lazy(() => import("./pages/AdminInquiries"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
    </div>
  );
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [location.pathname]);

  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
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
          <Route path="/testimonials" element={<Navigate to="/?review=1" replace />} />
          <Route path="/testimonials/new" element={<Navigate to="/?review=1" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />

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
            <Route path="/admin/appointments" element={<AdminAppointments />} />
            <Route path="/admin/inquiries" element={<AdminInquiries />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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
      <main className="pb-24 pt-20 sm:pb-0">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
