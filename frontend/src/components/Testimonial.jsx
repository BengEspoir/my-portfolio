export default function Testimonial({ quote, name, role, avatar }) {
  return (
    <article className="card-surface rounded-3xl p-8">
      <p className="mb-8 text-lg leading-relaxed text-slate-700">"{quote}"</p>
      <div className="h-px w-full bg-slate-100" />
      <div className="mt-6 flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>
    </article>
  );
}

