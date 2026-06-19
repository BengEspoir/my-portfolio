import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiFigma, FiSmartphone, FiLayout, FiCompass, FiTarget, FiZap, FiPlay, FiDownload } from "react-icons/fi";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { absoluteUrl, siteConfig } from "../config/site";
import { isSupabaseConfigured, supabase, getPublicUrl } from "../utils/supabase";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import PageTransition from "../components/PageTransition";
import TypewriterText from "../components/TypewriterText";
import { useI18n } from "../i18n";

const allowedPrototypeHosts = new Set(["figma.com", "www.figma.com", "embed.figma.com"]);

function extractEmbedUrl(value) {
  if (!value) return "";
  const iframeSrcMatch = String(value).match(/src=["']([^"']+)["']/i);
  return iframeSrcMatch?.[1] || String(value).trim();
}

function getTrustedPrototypeUrl(project) {
  const candidate = extractEmbedUrl(project.prototype_embed || project.prototype_url);
  if (!candidate) return "";

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:") return "";
    return allowedPrototypeHosts.has(url.hostname) ? url.href : "";
  } catch (error) {
    return "";
  }
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const { localizedPath, t } = useI18n();
  const pageCopy = t("projectDetail");
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!isSupabaseConfigured) {
        setProject(null);
        setLoading(false);
        return;
      }

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
        console.error('Error fetching case study:', error);
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
          text={pageCopy.notFound}
          startOnView={false}
          className="text-4xl font-bold"
        />
        <Link to={localizedPath("/portfolio")} className="mt-4 inline-flex items-center gap-2 text-brand-600 hover:underline">
          <FiArrowLeft /> {t("common.backToPortfolio")}
        </Link>
      </div>
    );
  }

  const prototypeEmbedUrl = getTrustedPrototypeUrl(project);

  return (
    <PageTransition>
      <SEO
        title={`${project.seo_title || project.title} | Case Study - Beng Espoir`}
        description={project.seo_description || project.description || siteConfig.description}
        path={`/projects/${project.slug}/case-study`}
        image={getPublicUrl(project.image_url) || siteConfig.defaultImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          image: absoluteUrl(getPublicUrl(project.image_url) || siteConfig.defaultImage),
          creator: {
            "@type": "Person",
            name: siteConfig.name
          },
          url: absoluteUrl(localizedPath(`/projects/${project.slug}/case-study`))
        }}
      />

      <div className="space-y-24 pb-24 pt-10">
      {/* Hero Section */}
      <section className="site-container">
        <Link to={localizedPath("/portfolio")} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-600">
          <FiArrowLeft /> {t("common.backToPortfolio")}
        </Link>
        
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div 
              className="inline-flex rounded-full px-4 py-1.5 text-sm font-bold text-white"
              style={{ backgroundColor: project.brand_color || "#6366f1" }}
            >
              {project.categories?.[0] || t("common.project")}
            </div>
            <TypewriterText
              as="h1"
              text={project.title}
              startOnView={false}
              className="text-5xl font-extrabold tracking-tight text-slate-900 lg:text-6xl"
            />
            <p className="text-xl leading-relaxed text-slate-600">
              {project.description}
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">{pageCopy.role}</h4>
                <p className="mt-1 font-semibold text-slate-900">
                  {project.role || (project.categories?.includes("WEB DEV") ? pageCopy.fullStackDeveloper : pageCopy.leadDesigner)}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">{pageCopy.toolsStack}</h4>
                <p className="mt-1 font-semibold text-slate-900">
                  {project.tools_tech?.slice(0, 3).join(", ") || pageCopy.designTools}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.live_url && (
                <Button 
                  href={project.live_url} 
                  target="_blank" 
                  variant="cta" 
                  className="gap-2"
                  style={{ backgroundColor: project.brand_color || "#059669" }}
                >
                  <FiZap /> {pageCopy.viewLive}
                </Button>
              )}

              {project.prototype_url && (
                <Button 
                  href={project.prototype_url} 
                  target="_blank" 
                  variant="cta" 
                  className="gap-2"
                  style={{ backgroundColor: project.brand_color || "#059669" }}
                >
                  <FiFigma /> {pageCopy.viewPrototype}
                </Button>
              )}
              {project.video_url && (
                <Button 
                  href={project.video_url} 
                  target="_blank" 
                  variant="cta" 
                  className="gap-2"
                  style={{ backgroundColor: project.brand_color || "#059669" }}
                >
                  <FiPlay /> {pageCopy.viewVideo}
                </Button>
              )}
              {project.figma_url && (
                <Button 
                  href={project.figma_url} 
                  target="_blank" 
                  variant="cta" 
                  className="gap-2"
                  style={{ backgroundColor: project.brand_color || "#059669" }}
                >
                  <FiFigma /> {pageCopy.viewFigma}
                </Button>
              )}
              {project.apk_url && (
                <Button 
                  href={project.apk_url}
                  variant="cta" 
                  className="gap-2"
                  style={{ backgroundColor: project.brand_color || "#059669" }}
                >
                  <FiDownload /> {pageCopy.downloadApk}
                </Button>
              )}
            </div>
          </div>
          
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-100 shadow-2xl">
            <img 
              src={getPublicUrl(project.image_url)} 
              alt={project.title} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Preview Screens Section */}
      {project.preview_screens?.length > 0 && (
        <section className="site-container">
          <SectionTitle 
            title={pageCopy.previewScreens}
            description={pageCopy.previewDescription}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {project.preview_screens.map((screen, idx) => (
              <div key={idx} className="group relative aspect-[9/19] overflow-hidden rounded-2xl bg-slate-100 shadow-soft">
                <img src={getPublicUrl(screen)} alt={`Screen 0${idx + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 p-4 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {pageCopy.screen} 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Background & Problem */}
      {(project.project_background || project.problem_statement) && (
        <section className="site-container">
          <div className="grid gap-16 lg:grid-cols-2">
            {project.project_background && (
              <div className="space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <FiLayout size={24} />
                </div>
                <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">{pageCopy.projectBackground}</h2>
                <p className="text-lg leading-relaxed text-slate-600 italic">
                  &quot;{project.project_background}&quot;
                </p>
              </div>
            )}
            {project.problem_statement && (
              <div className="space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <FiTarget size={24} />
                </div>
                <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">{pageCopy.problem}</h2>
                <p className="text-lg leading-relaxed text-slate-600">
                  {project.problem_statement}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Design Journey */}
      {(project.design_journey || project.challenges) && (
        <section className="site-container bg-slate-50 py-20 rounded-[3rem]">
          <div className="site-container">
            <SectionTitle title={pageCopy.journey} />
            <div className="mx-auto max-w-4xl space-y-12">
              {project.design_journey && (
                <div className="flex gap-8">
                  <div className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold sm:flex">1</div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900">{pageCopy.research}</h3>
                    <p className="text-lg text-slate-600">{project.design_journey}</p>
                  </div>
                </div>
              )}
              {project.challenges && (
                <div className="flex gap-8">
                  <div className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold sm:flex">2</div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900">{pageCopy.challenges}</h3>
                    <p className="text-lg text-slate-600">{project.challenges}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* UX Flow Section */}
      {project.ux_flow?.length > 0 && (
        <section className="site-container">
          <SectionTitle 
            title={pageCopy.architecture}
            description={pageCopy.architectureDescription}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {project.ux_flow.map((item, idx) => (
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
      {(project.solution || project.outcome) && (
        <section className="site-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="card-surface p-10 space-y-8">
              {project.solution && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 font-bold text-brand-600 uppercase tracking-widest text-xs">
                    <FiZap /> {pageCopy.solutionLabel}
                  </div>
                  <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">{pageCopy.finalSolution}</h2>
                  <p className="text-lg leading-relaxed text-slate-600">
                    {project.solution}
                  </p>
                </div>
              )}
              
              {project.outcome && (
                <div className="space-y-4 pt-8 border-t border-slate-100">
                  <div className="inline-flex items-center gap-2 font-bold text-emerald-600 uppercase tracking-widest text-xs">
                    <FiCompass /> {pageCopy.impact}
                  </div>
                  <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">{pageCopy.outcome}</h2>
                  <p className="text-lg leading-relaxed text-slate-600">
                    {project.outcome}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <FiSmartphone className="text-[240px] text-slate-200" />
            </div>
          </div>
        </section>
      )}

      {/* CTA Bottom */}
      <section className="site-container">
        <div className="rounded-[2.5rem] bg-slate-900 p-12 text-center text-white lg:p-20">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            {project.live_url ? pageCopy.livePlatform : pageCopy.prototype}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            {pageCopy.bottomBody}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {project.live_url && (
              <Button 
                href={project.live_url} 
                target="_blank" 
                variant="cta" 
                className="gap-2"
                style={{ backgroundColor: project.brand_color || "#059669" }}
              >
                <FiZap /> {pageCopy.viewLive}
              </Button>
            )}

            {project.prototype_url && (
              <Button 
                href={project.prototype_url} 
                target="_blank" 
                variant="secondary" 
                className="gap-2 !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
              >
                <FiFigma /> {pageCopy.viewPrototype}
              </Button>
            )}

            <Button to="/contact" variant="secondary" className="!bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
              {pageCopy.similar}
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Prototype Section */}
      {prototypeEmbedUrl && (
        <section className="site-container">
          <SectionTitle 
            title={pageCopy.prototypeFlow}
            description={pageCopy.prototypeFlowDescription}
          />
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-2xl">
            <iframe
              src={prototypeEmbedUrl}
              title={`${project.title} interactive prototype`}
              className="h-[70vh] min-h-[520px] w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
            />
          </div>
        </section>
      )}
    </div>
    </PageTransition>
  );
}
