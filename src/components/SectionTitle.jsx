export default function SectionTitle({
  title,
  description,
  eyebrow,
  align = "center",
  className = ""
}) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={["mb-10 flex flex-col gap-2", alignment, className].filter(Boolean).join(" ")}>
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-500">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-base text-slate-600 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

