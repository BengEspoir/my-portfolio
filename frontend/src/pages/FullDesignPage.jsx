import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiArrowLeft, FiFigma, FiLayout, FiEye, FiInfo } from "react-icons/fi";
import { useEffect, useState } from "react";
import { supabase, getPublicUrl } from "../utils/supabase";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import PageTransition from "../components/PageTransition";
import TypewriterText from "../components/TypewriterText";

export default function FullDesignPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;
        setProject(data);
      } catch (error) {
        console.error('Error fetching full design:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="site-container py-20 text-center">
        <TypewriterText
          as="h1"
          text="Project Not Found"
          startOnView={false}
          className="text-4xl font-bold"
        />
        <Link to="/portfolio" className="mt-4 inline-flex items-center gap-2 text-brand-600 hover:underline">
          <FiArrowLeft /> Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{`${project.title} | Design Showcase - Beng Espoir`}</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} | Design Showcase - Beng Espoir`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={getPublicUrl(project.image_url)} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="space-y-24 pb-24 pt-10">
      {/* Hero / Cover */}
      <section className="site-container">
        <Link to="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-600">
          <FiArrowLeft /> BACK TO PORTFOLIO
        </Link>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <TypewriterText
              as="h1"
              text={project.title}
              startOnView={false}
              className="text-5xl font-extrabold tracking-tight text-slate-900 lg:text-6xl"
            />
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 uppercase tracking-widest">
                Full Design Preview
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-sm font-medium text-slate-500">{project.categories?.join(", ")}</span>
            </div>
          </div>
          
          <div className="aspect-[21/9] overflow-hidden rounded-[2.5rem] bg-slate-200 shadow-xl">
            <img 
              src={project.image_url} 
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
              {project.project_background}
            </p>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 font-bold text-brand-600">
              <FiLayout /> UX Flow & Concept
            </div>
            <div className="rounded-3xl bg-slate-50 p-8 text-lg leading-relaxed text-slate-600">
              {project.design_journey}
            </div>
          </div>
        </div>
      </section>

      {/* Main Screens Preview */}
      {project.preview_screens?.length > 0 && (
        <section className="site-container">
          <SectionTitle 
            title="Interface Screens" 
            description="A close-up look at the primary interface screens and the visual language used across the design."
          />
          <div className="grid gap-10 md:grid-cols-2">
            {project.preview_screens.slice(0, 6).map((screen, idx) => (
              <div key={idx} className="space-y-4">
                <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100 shadow-soft">
                  <img src={screen} alt={`Interface Screen 0${idx + 1}`} className="h-full w-full object-cover" />
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  View 0{idx + 1}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Design Notes */}
      <section className="site-container">
        <div className="rounded-[3rem] bg-brand-600 p-12 text-white lg:p-20" style={{ backgroundColor: project.brand_color }}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Design Notes & Logic</h2>
              <p className="text-xl text-brand-50 leading-relaxed">
                {project.solution}
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {project.tools_tech?.map(tag => (
                  <span key={tag} className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 rounded-3xl bg-white/10 p-10 backdrop-blur-md">
              <FiEye className="text-[100px] text-white/40" />
              {project.figma_url && (
                <Button href={project.figma_url} target="_blank" variant="cta" className="!bg-white !text-brand-600 hover:!bg-brand-50">
                  <FiFigma /> View Design in Figma
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
