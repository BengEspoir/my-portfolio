import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import Button from "./Button";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "../i18n";

const navLinks = [
  { labelKey: "nav.home", to: "/" },
  { labelKey: "nav.about", to: "/about" },
  { labelKey: "nav.portfolio", to: "/portfolio" },
  { labelKey: "nav.services", to: "/services" },
  { labelKey: "nav.blog", to: "/blog" },
  { labelKey: "nav.contact", to: "/contact" }
];

function linkClassName({ isActive }) {
  return [
    "text-sm font-semibold transition-colors duration-200",
    isActive ? "text-brand-500" : "text-slate-800 hover:text-brand-500"
  ].join(" ");
}

function ThemeToggle({ theme, onToggleTheme, className = "", lightLabel = "Switch to light mode", darkLabel = "Switch to dark mode" }) {
  const isDark = theme === "dark";
  const label = isDark ? lightLabel : darkLabel;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
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
  const { localizedPath, t } = useI18n();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <nav className="site-container flex h-20 items-center justify-between">
        <NavLink to={localizedPath("/")} className="inline-flex items-center">
          <BrandLogo />
        </NavLink>

        <ul className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={localizedPath(link.to)} end={link.to === "/"} className={linkClassName}>
                {t(link.labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <ThemeToggle
            theme={theme}
            onToggleTheme={onToggleTheme}
            lightLabel={t("theme.light")}
            darkLabel={t("theme.dark")}
          />
          <Button to="/contact" size="md">
            {t("nav.hireMe")}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle className="h-9" />
          <ThemeToggle
            theme={theme}
            onToggleTheme={onToggleTheme}
            lightLabel={t("theme.light")}
            darkLabel={t("theme.dark")}
          />
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
                  <NavLink to={localizedPath(link.to)} end={link.to === "/"} className={linkClassName}>
                    {t(link.labelKey)}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button to="/contact" className="mt-5 w-full">
              {t("nav.hireMe")}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
