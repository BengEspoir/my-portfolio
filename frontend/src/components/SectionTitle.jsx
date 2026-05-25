import TypewriterText from "./TypewriterText";

export default function SectionTitle({
  title,
  description,
  subtitle,
  eyebrow,
  align = "center",
  className = "",
  animateTitle = true
}) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";
  const supportingText = description || subtitle;
  const canTypeTitle = animateTitle && typeof title === "string";

  return (
    <div className={["mb-10 flex flex-col gap-2", alignment, className].filter(Boolean).join(" ")}>
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-500">
          {eyebrow}
        </span>
      ) : null}
      {canTypeTitle ? (
        <TypewriterText
          as="h2"
          text={title}
          className="text-3xl font-bold leading-tight sm:text-4xl"
        />
      ) : (
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      )}
      {supportingText ? (
        <p className="max-w-2xl text-base text-slate-600 sm:text-lg">{supportingText}</p>
      ) : null}
    </div>
  );
}
