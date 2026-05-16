import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import { supabase } from "../utils/supabase";

const projectCategories = ["All", "UI/UX", "WEB DEV", "MOBILE DEV", "GRAPHICS DESIGN", "PROGRAMMING"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
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
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.categories?.includes(activeCategory));
  }, [activeCategory, projects]);

  return (
    <div className="space-y-24 pb-24">
      <section className="site-container pt-10">
        <SectionTitle
          title="My Work"
          description="Here is a selection of projects I designed and developed across UI/UX, web development, graphics design, and programming."
        />

        <div className="mb-8 flex flex-wrap gap-3">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={[
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-600"
              ].join(" ")}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
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
      </section>

      <section className="site-container">
        <div className="rounded-3xl bg-white px-6 py-14 text-center shadow-card">
          <h2 className="text-4xl font-bold text-slate-900">Want to see more?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Let&apos;s discuss how I can bring the same level of design and execution to your project.
          </p>
          <Button to="/contact" className="mt-7">
            Book a Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}

