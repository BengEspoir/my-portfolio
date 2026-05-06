import { FiArrowRight } from "react-icons/fi";
import { revealUp, staggerContainer } from "../animations/motion";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import SkillBar from "../components/SkillBar";
import { quickFacts, skillCategories, toolSkills } from "../data/skills";

const skillGroupTone = {
  design: "text-fuchsia-500",
  web: "text-emerald-500",
  programming: "text-amber-500",
  documentation: "text-indigo-500",
  others: "text-cyan-500"
};

export default function About() {
  return (
    <div className="space-y-24 pb-24">
      <section className="bg-gradient-to-r from-brand-500 to-brand-600 py-24 text-white">
        <div className="site-container text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">About Me</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-brand-50">
            I&apos;m a UI/UX Designer and Software Engineering student passionate about building
            meaningful digital products and creating designs that inspire.
          </p>
        </div>
      </section>

      <section className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="mx-auto max-w-md overflow-hidden rounded-full bg-brand-100 p-3 shadow-soft">
            <img
              src="/images/portfolio-pic.jpg"
              alt="Beng Espoir portrait"
              className="h-full w-full rounded-full object-cover"
              loading="lazy"
            />
          </div>

          <article className="space-y-5">
            <h2 className="text-4xl font-bold text-slate-900">My Journey</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              My journey into technology began with a passion for design and creativity, where I
              explored graphic design and visual storytelling.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              As I advanced in my studies in Software Engineering, I developed strong skills in
              programming, UI/UX design, and web development.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              I gained hands-on experience through internships, collaborating with teams on real
              projects that helped me grow in frontend development and version control.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Today, I am focused on blending my design eye with engineering knowledge to craft
              solutions that are both functional and engaging.
            </p>
          </article>
        </div>
      </section>

      <section className="site-container">
        <SectionTitle title="My Path So Far" />

        <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-card lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                2023 - Present - Pursuing BSc in Software Engineering
              </h3>
              <p className="mt-3 text-slate-600">
                Building strong foundations in programming, software development, and design.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                June - Sept 2024 - Internship at Nephus
              </h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li>- First month: UI/UX design training.</li>
                <li>- Next two months: Web development and Git version control.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8 border-l border-slate-200 pl-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">Freelance Projects (2024-2025)</h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li>- Designed flyers, posters, and branding assets.</li>
                <li>- Built portfolio websites and academic project tools.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">Now (2025)</h3>
              <p className="mt-3 text-slate-600">
                Expanding into professional UI/UX design, web development, and software
                engineering projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container" data-motion={revealUp}>
        <SectionTitle title="Core Skills" />

        <div
          className={["grid gap-8 lg:grid-cols-[1fr_1.25fr]", staggerContainer].join(" ")}
          data-motion={revealUp}
        >
          <div className="card-surface motion-stagger-item p-6" style={{ "--stagger-index": 0 }}>
            {/* Rendered from shared skills data so title/icon/item edits happen in one place. */}
            <div className="grid gap-5 sm:grid-cols-2">
              {skillCategories.map((group) => {
                const GroupIcon = group.icon;

                return (
                  <article key={group.title}>
                    <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                      {GroupIcon ? (
                        <GroupIcon
                          className={[
                            "text-base",
                            skillGroupTone[group.color] || "text-brand-500"
                          ].join(" ")}
                        />
                      ) : null}
                      <span>{group.title}</span>
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm text-slate-700">
                      {group.items.map((item) => (
                        <li key={`${group.title}-${item}`}>• {item}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="motion-stagger-item grid gap-4 sm:grid-cols-2" style={{ "--stagger-index": 1 }}>
            {toolSkills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                icon={skill.icon}
                domain={skill.domain}
                motionIndex={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="site-container">
        <SectionTitle title="Quick Facts" />

        <div className="card-surface mx-auto max-w-4xl rounded-3xl p-8">
          <div className="grid gap-6">
            {quickFacts.map((fact) => (
              <p key={fact.label} className="text-center text-xl text-slate-700">
                <span className="font-bold text-slate-900">{fact.label}</span> {fact.value}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container">
        <div className="rounded-3xl bg-white px-6 py-12 text-center shadow-card sm:px-10">
          <p className="text-lg text-slate-600">Want to see how I bring ideas to life?</p>
          <Button to="/portfolio" className="mx-auto mt-6 gap-2">
            View My Projects <FiArrowRight />
          </Button>
        </div>
      </section>
    </div>
  );
}
