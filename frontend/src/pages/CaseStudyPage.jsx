import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiFigma, FiSmartphone, FiLayout, FiCompass, FiTarget, FiZap } from "react-icons/fi";
import { projects } from "../data/projects";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";

export default function CaseStudyPage() {
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
      {/* Hero Section */}
      <section className="site-container">
        <Link to="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-600">
          <FiArrowLeft /> BACK TO PORTFOLIO
        </Link>
        
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-600">
              {project.category}
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 lg:text-6xl">
              {project.title}
            </h1>
            <p className="text-xl leading-relaxed text-slate-600">
              {project.description}
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Role</h4>
                <p className="mt-1 font-semibold text-slate-900">
                  {project.category === "WEB DEV" ? "Full Stack Developer" : "Lead UI/UX Designer"}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Tools / Stack</h4>
                <p className="mt-1 font-semibold text-slate-900">
                  {project.tags.slice(0, 3).join(", ")}
                </p>
              </div>
            </div>

            {project.liveUrl && (
              <div className="pt-4">
                <Button href={project.liveUrl} target="_blank" variant="cta" className="gap-2 !bg-emerald-600 hover:!bg-emerald-700">
                  <FiZap /> View Live Project
                </Button>
              </div>
            )}
          </div>
          
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-100 shadow-2xl">
            <img 
              src={project.image} 
              alt={project.title} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Preview Screens Section */}
      <section className="site-container">
        <SectionTitle 
          title="Preview Screens" 
          description="A selection of high-fidelity screens showcasing the core user journey and interface layout."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {project.previewScreens.map((screen, idx) => (
            <div key={idx} className="group relative aspect-[9/19] overflow-hidden rounded-2xl bg-slate-100 shadow-soft">
              <img src={screen} alt={`Screen 0${idx + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 p-4 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                Screen 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Background & Problem */}
      <section className="site-container">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <FiLayout size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Project Background</h2>
            <p className="text-lg leading-relaxed text-slate-600 italic">
              &quot;{project.projectBackground}&quot;
            </p>
          </div>
          <div className="space-y-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <FiTarget size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">The Problem</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              {project.problemStatement}
            </p>
          </div>
        </div>
      </section>

      {/* Design Journey */}
      <section className="site-container bg-slate-50 py-20 rounded-[3rem]">
        <div className="site-container">
          <SectionTitle title="UX Thinking & Design Journey" />
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="flex gap-8">
              <div className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold sm:flex">1</div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900">Research & Discovery</h3>
                <p className="text-lg text-slate-600">{project.designJourney}</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold sm:flex">2</div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900">Challenges Encountered</h3>
                <p className="text-lg text-slate-600">{project.challenges}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UX Flow Section */}
      {project.uxFlow && (
        <section className="site-container">
          <SectionTitle 
            title="Experience Architecture" 
            description="A breakdown of the core platform modules and the UX strategy behind them."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {project.uxFlow.map((item, idx) => (
              <div key={idx} className="card-surface p-8 space-y-4">
                <div className="text-brand-600 font-bold text-xl flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-sm">
                    {idx + 1}
                  </span>
                  {item.title}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Solution & Outcome */}
      <section className="site-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="card-surface p-10 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-bold text-brand-600 uppercase tracking-widest text-xs">
                <FiZap /> The Solution
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Final Solution</h2>
              <p className="text-lg leading-relaxed text-slate-600">
                {project.solution}
              </p>
            </div>
            
            <div className="space-y-4 pt-8 border-t border-slate-100">
              <div className="inline-flex items-center gap-2 font-bold text-emerald-600 uppercase tracking-widest text-xs">
                <FiCompass /> Impact & Reflection
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Outcome</h2>
              <p className="text-lg leading-relaxed text-slate-600">
                {project.outcome}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <FiSmartphone className="text-[240px] text-slate-200" />
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="site-container">
        <div className="rounded-[2.5rem] bg-slate-900 p-12 text-center text-white lg:p-20">
          <h2 className="text-4xl font-bold lg:text-5xl">
            {project.liveUrl ? "Experience the Live Platform" : "Explore the Prototype"}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            {project.liveUrl 
              ? "The AgriculNet ecosystem is currently live in its beta phase. You can explore the full B2B trade flow and verification system directly."
              : "Interested in seeing the full interaction design and how the components work together? View the read-only Figma file below."
            }
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {project.liveUrl && (
              <Button href={project.liveUrl} target="_blank" variant="cta" className="gap-2 !bg-emerald-600 hover:!bg-emerald-700">
                <FiZap /> View Live Project
              </Button>
            )}
            {project.figmaUrl && (
              <Button href={project.figmaUrl} target="_blank" variant="secondary" className="gap-2 !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
                <FiFigma /> View Design in Figma
              </Button>
            )}
            <Button to="/contact" variant="secondary" className="!bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
              Start a Similar Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
