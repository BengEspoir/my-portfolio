export default function FormField({ id, label, error, hint, children, className = "" }) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={id} className="mb-2 block text-sm font-bold text-slate-700">
          {label}
        </label>
      ) : null}
      {children}
      {hint ? (
        <p id={hintId} className="mt-1 text-xs leading-5 text-slate-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
