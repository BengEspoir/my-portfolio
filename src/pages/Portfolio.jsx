import { useMemo, useState } from "react";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import { featuredCaseStudy, projectCategories, projects } from "../data/projects";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

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

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="site-container">
        <div className="overflow-hidden rounded-3xl bg-white shadow-soft lg:grid lg:grid-cols-[1.35fr_1fr]">
          <div className="min-h-[360px]">
            <img
              src={featuredCaseStudy.image}
              alt={featuredCaseStudy.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-5 p-8">
            <h3 className="text-4xl font-bold text-slate-900">{featuredCaseStudy.title}</h3>
            <p className="text-slate-600">{featuredCaseStudy.summary}</p>
            <ul className="space-y-2 text-slate-600">
              {featuredCaseStudy.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <Button to={featuredCaseStudy.ctaLink} className="mt-3">
              Read Full Case Study
            </Button>
          </div>
        </div>
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

