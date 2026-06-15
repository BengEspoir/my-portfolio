export default function PageState({ title, description, children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title ? <h3 className="text-lg font-bold text-slate-900">{title}</h3> : null}
      {description ? <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p> : null}
      {children}
    </div>
  );
}
