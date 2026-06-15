import { useEffect } from "react";
import { FiCheckCircle, FiInfo, FiX, FiXCircle } from "react-icons/fi";

const toneClasses = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-slate-200 bg-white text-slate-800"
};

const icons = {
  success: FiCheckCircle,
  error: FiXCircle,
  info: FiInfo
};

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast?.message || !onClose) return undefined;
    const timeoutId = window.setTimeout(onClose, 6000);
    return () => window.clearTimeout(timeoutId);
  }, [toast, onClose]);

  if (!toast?.message) return null;

  const tone = toast.type || "info";
  const Icon = icons[tone] || FiInfo;

  return (
    <div
      className="fixed right-4 top-24 z-[120] w-[calc(100%-2rem)] max-w-sm"
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
    >
      <div className={`flex items-start gap-3 rounded-2xl border p-4 shadow-2xl ${toneClasses[tone] || toneClasses.info}`}>
        <Icon className="mt-0.5 shrink-0" />
        <p className="flex-1 text-sm font-medium leading-6">{toast.message}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 transition hover:bg-black/5"
          aria-label="Dismiss notification"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
}
