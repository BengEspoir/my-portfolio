import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiFigma, FiLayout, FiEye, FiInfo } from "react-icons/fi";
import { projects } from "../data/projects";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";

export default function FullDesignPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="site-container py-20 text-center">
        <h1 className="text-4xl font-bold">Project Not Found</h1>
        <Link to="/portfolio" className="mt-4 inline-flex items-center gap-2 text-brand-600 hover:underline">
          <FiArrowLeft /> Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-24 pb-24 pt-10">
      {/* Hero / Cover */}
      <section className="site-container">
        <Link to="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-600">
          <FiArrowLeft /> BACK TO PORTFOLIO
        </Link>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 lg:text-6xl">
              {project.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 uppercase tracking-widest">
                Full Design Preview
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-sm font-medium text-slate-500">{project.category}</span>
            </div>
          </div>
          
          <div className="aspect-[21/9] overflow-hidden rounded-[2.5rem] bg-slate-200 shadow-xl">
            <img 
              src={project.image} 
              alt={project.title} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Overview & UX Flow */}
      <section className="site-container">
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2 font-bold text-brand-600">
              <FiInfo /> Project Overview
            </div>
            <p className="text-xl leading-relaxed text-slate-700">
              {project.projectBackground}
            </p>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 font-bold text-brand-600">
              <FiLayout /> UX Flow & Concept
            </div>
            <div className="rounded-3xl bg-slate-50 p-8 text-lg leading-relaxed text-slate-600">
              {project.designJourney}
            </div>
          </div>
        </div>
      </section>

      {/* Main Screens Preview */}
      <section className="site-container">
        <SectionTitle 
          title="Interface Screens" 
          description="A close-up look at the primary interface screens and the visual language used across the design."
        />
        <div className="grid gap-10 md:grid-cols-2">
          {project.previewScreens.slice(0, 4).map((screen, idx) => (
            <div key={idx} className="space-y-4">
              <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100 shadow-soft">
                <img src={screen} alt={`Interface Screen 0${idx + 1}`} className="h-full w-full object-cover" />
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Component View 0{idx + 1}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Design Notes */}
      <section className="site-container">
        <div className="rounded-[3rem] bg-brand-600 p-12 text-white lg:p-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Design Notes & Logic</h2>
              <p className="text-xl text-brand-50 leading-relaxed">
                {project.solution}
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 rounded-3xl bg-white/10 p-10 backdrop-blur-md">
              <FiEye className="text-[100px] text-white/40" />
              <Button href={project.figmaUrl} target="_blank" variant="cta" className="!bg-white !text-brand-600 hover:!bg-brand-50">
                <FiFigma /> View Design in Figma
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
