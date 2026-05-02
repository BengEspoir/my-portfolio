import { hoverLift, useInViewOnce } from "../animations/motion";

const toneMap = {
  brand: {
    icon: "text-brand-600",
    percentHover: "group-hover:text-brand-700 group-focus-visible:text-brand-700",
    track: "bg-brand-100/90",
    fill: "bg-gradient-to-r from-brand-400 to-brand-600"
  },
  design: {
    icon: "text-fuchsia-600",
    percentHover: "group-hover:text-fuchsia-700 group-focus-visible:text-fuchsia-700",
    track: "bg-fuchsia-100/90",
    fill: "bg-gradient-to-r from-fuchsia-400 to-fuchsia-600"
  },
  web: {
    icon: "text-emerald-600",
    percentHover: "group-hover:text-emerald-700 group-focus-visible:text-emerald-700",
    track: "bg-emerald-100/90",
    fill: "bg-gradient-to-r from-emerald-400 to-emerald-600"
  },
  programming: {
    icon: "text-amber-600",
    percentHover: "group-hover:text-amber-700 group-focus-visible:text-amber-700",
    track: "bg-amber-100/90",
    fill: "bg-gradient-to-r from-amber-400 to-amber-600"
  },
  documentation: {
    icon: "text-indigo-600",
    percentHover: "group-hover:text-indigo-700 group-focus-visible:text-indigo-700",
    track: "bg-indigo-100/90",
    fill: "bg-gradient-to-r from-indigo-400 to-indigo-600"
  },
  others: {
    icon: "text-cyan-600",
    percentHover: "group-hover:text-cyan-700 group-focus-visible:text-cyan-700",
    track: "bg-cyan-100/90",
    fill: "bg-gradient-to-r from-cyan-400 to-cyan-600"
  }
};

export default function SkillBar({
  name,
  level,
  icon,
  domain = "brand",
  compact = false,
  motionIndex = 0
}) {
  const [rootRef, isVisible] = useInViewOnce({ threshold: 0.34, rootMargin: "0px 0px -12% 0px" });
  const tone = toneMap[domain] || toneMap.brand;
  const Icon = typeof icon === "function" ? icon : null;

  // Clamp percentages defensively so data mistakes cannot break the UI.
  const safeLevel = Math.max(0, Math.min(level, 100));
  const fillDuration = 920 + (motionIndex % 6) * 120;
  const fillDelay = 120 + (motionIndex % 5) * 70;
  const fillStyle = {
    width: `${safeLevel}%`,
    transform: isVisible ? "scaleX(1)" : "scaleX(0)",
    transitionDuration: `${fillDuration}ms`,
    transitionDelay: isVisible ? `${fillDelay}ms` : "0ms"
  };

  if (compact) {
    return (
      <div
        ref={rootRef}
        tabIndex={0}
        aria-label={`${name} proficiency ${safeLevel}%`}
        className={[
          "motion-skill-item group space-y-2 rounded-xl border border-slate-100 bg-white/90 p-3 shadow-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300",
          hoverLift
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            {Icon ? (
              <Icon
                className={[
                  "text-base transition-transform duration-300",
                  "group-hover:scale-110 group-focus-visible:scale-110",
                  tone.icon
                ].join(" ")}
              />
            ) : (
              <span
                className="text-base transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110"
                aria-hidden="true"
              >
                {icon}
              </span>
            )}
            <span className="truncate text-sm font-semibold leading-tight text-slate-800">{name}</span>
          </div>
          <span
            className={[
              "text-base font-extrabold leading-none tracking-tight text-slate-600",
              tone.percentHover
            ].join(" ")}
          >
            {safeLevel}%
          </span>
        </div>
        <div className={["motion-skill-track h-2.5 overflow-hidden rounded-[999px]", tone.track].join(" ")}>
          <div
            className={[
              "motion-skill-fill h-full origin-left rounded-[999px]",
              "transition-transform ease-[cubic-bezier(0.22,1,0.36,1)]",
              tone.fill
            ].join(" ")}
            style={fillStyle}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      aria-label={`${name} proficiency ${safeLevel}%`}
      className={[
        "motion-skill-item group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300",
        hoverLift
      ].join(" ")}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {Icon ? (
            <Icon
              className={[
                "text-xl transition-transform duration-300",
                "group-hover:scale-110 group-focus-visible:scale-110",
                tone.icon
              ].join(" ")}
            />
          ) : (
            <span
              className="text-xl transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
          <span className="truncate text-base font-semibold text-slate-800">{name}</span>
        </div>
        <span
          className={[
            "text-2xl font-extrabold leading-none tracking-tight text-slate-600",
            tone.percentHover
          ].join(" ")}
        >
          {safeLevel}%
        </span>
      </div>
      <div className={["motion-skill-track h-4 overflow-hidden rounded-[999px]", tone.track].join(" ")}>
        <div
          className={[
            "motion-skill-fill h-full origin-left rounded-[999px]",
            "transition-transform ease-[cubic-bezier(0.22,1,0.36,1)]",
            tone.fill
          ].join(" ")}
          style={fillStyle}
        />
      </div>
    </div>
  );
}
