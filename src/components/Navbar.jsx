import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import Button from "./Button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" }
];

function linkClassName({ isActive }) {
  return [
    "text-sm font-semibold transition-colors duration-200",
    isActive ? "text-brand-500" : "text-slate-800 hover:text-brand-500"
  ].join(" ");
}

function ThemeToggle({ theme, onToggleTheme, className = "" }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onToggleTheme}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:text-brand-500",
        className
      ].join(" ")}
    >
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}

export default function Navbar({ theme = "light", onToggleTheme = () => {} }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <nav className="site-container flex h-20 items-center justify-between">
        <NavLink to="/" className="inline-flex items-center">
          <BrandLogo />
        </NavLink>

        <ul className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClassName}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
          <Button to="/contact" size="md">
            Hire Me
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="site-container py-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className={linkClassName}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button to="/contact" className="mt-5 w-full">
              Hire Me
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
