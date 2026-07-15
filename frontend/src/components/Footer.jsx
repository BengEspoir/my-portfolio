import {
  FiBriefcase,
  FiCalendar,
  FiHeart,
  FiHome,
  FiLayers,
  FiMail,
  FiSend
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "../i18n";
import { siteConfig } from "../config/site";

const desktopLinks = [
  { labelKey: "nav.home", to: "/" },
  { labelKey: "nav.about", to: "/about" },
  { labelKey: "nav.portfolio", to: "/portfolio" },
  { labelKey: "nav.services", to: "/services" },
  { labelKey: "footer.review", to: "/?review=1", review: true },
  { labelKey: "nav.contact", to: "/contact" }
];

const mobileLinks = [
  { labelKey: "nav.home", to: "/", icon: FiHome },
  { labelKey: "nav.portfolio", to: "/portfolio", icon: FiBriefcase },
  { labelKey: "nav.services", to: "/services", icon: FiLayers },
  { labelKey: "nav.contact", to: "/contact", icon: FiMail },
  { labelKey: "nav.book", to: "/booking", icon: FiCalendar, cta: true }
];

export default function Footer() {
  const { localizedPath, t } = useI18n();

  return (
    <footer className="relative border-t border-slate-100 footer-dynamic-bg backdrop-blur-xl">
      <div className="site-container hidden py-10 sm:block">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr_auto] lg:items-center">
          <div>
            <NavLink to={localizedPath("/")} className="text-lg font-extrabold text-slate-900" translate="no">
              Beng Espoir Nong
            </NavLink>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
              {t("footer.tagline")}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:justify-center" aria-label="Footer">
            {desktopLinks.map((link) => (
              link.review ? (
                <Link
                  key={`footer-${link.to}`}
                  to={localizedPath(link.to)}
                  className="text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-brand-500"
                >
                  {t(link.labelKey)}
                </Link>
              ) : (
                <NavLink
                  key={`footer-${link.to}`}
                  to={localizedPath(link.to)}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    [
                      "text-sm font-semibold transition-colors duration-200",
                      isActive ? "text-brand-500" : "text-slate-600 hover:text-brand-500"
                    ].join(" ")
                  }
                >
                  {t(link.labelKey)}
                </NavLink>
              )
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-600"
              aria-label={t("footer.emailLabel")}
            >
              <FiSend />
            </a>
            <LanguageToggle />
            <NavLink
              to={localizedPath("/booking")}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              <FiCalendar />
              {t("footer.bookConsultation")}
            </NavLink>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5 text-sm text-slate-500">
          <p>{t("footer.copyright")}</p>
          <p className="flex items-center gap-1">
            {t("footer.built")} <FiHeart className="text-red-500" />
          </p>
        </div>
      </div>

      <nav
        className="fixed inset-x-3 bottom-3 z-50 rounded-[1.35rem] border border-white/15 bg-slate-950/90 px-2 py-2 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:hidden"
        aria-label="Mobile footer"
      >
        <ul className="grid grid-cols-5 items-center gap-1">
          {mobileLinks.map((link) => {
            const Icon = link.icon;

            return (
              <li key={`mobile-footer-${link.to}`}>
                <NavLink
                  to={localizedPath(link.to)}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    [
                      "group flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[0.68rem] font-semibold transition-all duration-200",
                      link.cta
                        ? "bg-brand-500 text-white shadow-lg shadow-brand-700/20 hover:bg-brand-400"
                        : isActive
                          ? "bg-white/10 text-white"
                          : "text-slate-400 hover:bg-white/10 hover:text-white"
                    ].join(" ")
                  }
                >
                  <Icon className="text-lg" />
                  <span>{t(link.labelKey)}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
