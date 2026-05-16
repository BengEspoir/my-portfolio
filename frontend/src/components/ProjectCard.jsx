import ProjectCardLink from "./ProjectCardLink";
import { getPublicUrl } from "../utils/supabase";
import { getProjectCtaLink } from "../utils/projectUtils";

function ProjectCta({ project }) {
  const ctaLink = getProjectCtaLink(project);
  
  if (!ctaLink) return null;

  const label = project.ctaLabel || project.cta_label || "View Project";

  if (ctaLink.startsWith("/")) {
    return (
      <ProjectCardLink 
        to={ctaLink} 
        label={label} 
        className="mt-4" 
      />
    );
  }

  return (
    <ProjectCardLink 
      href={ctaLink} 
      label={label} 
      className="mt-4" 
    />
  );
}

export default function ProjectCard({ project }) {
  return (
    <article className="card-surface group overflow-hidden border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:shadow-soft">
      <div className="aspect-[16/9] overflow-hidden bg-slate-200 relative">
        {project.is_latest && project.show_latest_badge && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest shadow-lg shadow-brand-500/30 ring-1 ring-white/20">
              Latest
            </span>
          </div>
        )}
        <img
          // Image source is configured per project in src/data/projects.js -> project.image
          src={getPublicUrl(project.image)}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-2xl font-bold leading-snug text-slate-900">{project.title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {(project.tags || []).map((tag) => (
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

