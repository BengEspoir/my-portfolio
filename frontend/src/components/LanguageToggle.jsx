import { FiGlobe } from "react-icons/fi";
import { useI18n } from "../i18n";

export default function LanguageToggle({ className = "" }) {
  const { locale, switchLocale, t } = useI18n();

  return (
    <div
      className={[
        "inline-flex h-10 items-center gap-1 rounded-lg border border-slate-200 bg-white px-1 text-xs font-bold text-slate-600",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={t("languageToggleLabel")}
    >
      <FiGlobe className="ml-2 text-sm text-slate-500" aria-hidden="true" />
      {["en", "fr"].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => switchLocale(item)}
          className={[
            "rounded-md px-2.5 py-1.5 uppercase transition-colors",
            locale === item ? "bg-brand-500 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-brand-600"
          ].join(" ")}
          aria-pressed={locale === item}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
