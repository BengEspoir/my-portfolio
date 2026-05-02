import { FiHeart } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" }
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-8">
      <div className="site-container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <ul className="flex flex-wrap items-center gap-4">
          {links.map((link) => (
            <li key={`footer-${link.to}`}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  [
                    "text-sm font-medium transition-colors duration-200",
                    isActive ? "text-brand-500" : "text-slate-600 hover:text-brand-500"
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <p className="flex items-center gap-1 text-sm text-slate-600">
          (c) 2025 BengEspoir. Designed & Built with
          <FiHeart className="text-red-500" />
        </p>
      </div>
    </footer>
  );
}

