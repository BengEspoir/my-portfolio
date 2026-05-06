import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import CaseStudy from "./pages/CaseStudy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import useTheme from "./hooks/useTheme";
import { initializeSectionReveal, smoothPageTransition } from "./animations/motion";

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
    <div key={location.pathname} className={smoothPageTransition}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/netflix-clone" element={<CaseStudy />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
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

