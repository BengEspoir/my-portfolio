import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";
import { ProjectCardSkeleton } from "../components/Skeleton";
import { isSupabaseConfigured, supabase } from "../utils/supabase";

const categories = [
  { id: "all", name: "All" },
  { id: "ui/ux", name: "UI/UX" },
  { id: "web dev", name: "WEB DEV" },
  { id: "mobile dev", name: "MOBILE DEV" },
  { id: "graphics design", name: "GRAPHICS DESIGN" },
  { id: "programming", name: "PROGRAMMING" }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      if (!isSupabaseConfigured) {
        setProjects([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => 
      project.categories?.some(c => c.toLowerCase() === activeCategory)
    );
  }, [activeCategory, projects]);

  return (
    <PageTransition>
      <SEO
        title="Portfolio | Beng Espoir"
        description="Explore product design, UI/UX, frontend, mobile, graphic design, and programming projects by Beng Espoir."
        path="/portfolio"
      />

      <div className="site-container py-12 md:py-20">
        <SectionTitle
          title="My Creative Portfolio"
          subtitle="A collection of products I've designed and built, ranging from mobile apps to complex web systems."
          align="center"
        />

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-brand-500 text-white shadow-md shadow-brand-200"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => <ProjectCardSkeleton key={i} />)}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={{
                ...project,
                image: project.image_url,
                ctaType: project.cta_type,
                ctaLabel: project.cta_label,
                ctaLink: project.cta_link,
                figmaUrl: project.figma_url,
                prototypeUrl: project.prototype_url,
                previewScreens: project.preview_screens,
                tags: project.tools_tech,
                projectBackground: project.project_background,
                problemStatement: project.problem_statement,
                designJourney: project.design_journey,
                liveUrl: project.live_url,
                videoUrl: project.video_url,
                apkUrl: project.apk_url
              }} />
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900">No projects found</h3>
            <p className="mt-2 text-slate-500">Check back later or try a different category!</p>
          </div>
        )}
      </div>

      <section className="site-container">
        <div className="rounded-3xl bg-white px-6 py-14 text-center shadow-card">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">Want to see more?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Let&apos;s discuss how I can bring the same level of design and execution to your project.
          </p>
          <Button to="/booking" className="mt-7">
            Book a Consultation
          </Button>
        </div>
      </section>
    </PageTransition>
  );
}

