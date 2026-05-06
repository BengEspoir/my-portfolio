import Button from "./Button";

function ProjectCta({ project }) {
  if (!project.ctaLink) return null;

  if (project.ctaLink.startsWith("/")) {
    return (
      <Button to={project.ctaLink} size="sm" className="mt-4 w-fit">
        {project.ctaLabel || "View Project"}
      </Button>
    );
  }

  return (
    <Button
      href={project.ctaLink}
      target="_blank"
      rel="noreferrer"
      size="sm"
      className="mt-4 w-fit"
    >
      {project.ctaLabel || "View Project"}
    </Button>
  );
}

export default function ProjectCard({ project }) {
  return (
    <article className="card-surface group overflow-hidden border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:shadow-soft">
      <div className="aspect-[16/9] overflow-hidden bg-slate-200">
        <img
          // Image source is configured per project in src/data/projects.js -> project.image
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-2xl font-bold leading-snug text-slate-900">{project.title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={`${project.id}-${tag}`}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <ProjectCta project={project} />
      </div>
    </article>
  );
}

