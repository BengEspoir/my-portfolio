import { FiArrowRight } from "react-icons/fi";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import SkillBar from "../components/SkillBar";
import SEO from "../components/SEO";
import TestimonialHighway from "../components/TestimonialHighway";
import TypewriterText from "../components/TypewriterText";
import { aiDevelopmentStrengths, quickFacts, skillCategories, toolSkills } from "../data/skills";
import { getPublicUrl } from "../utils/supabase";
import { useI18n } from "../i18n";

const skillGroupTone = {
  design: "text-fuchsia-500",
  web: "text-emerald-500",
  mobile: "text-blue-500",
  programming: "text-amber-500",
  documentation: "text-indigo-500",
  others: "text-cyan-500"
};

export default function About() {
  const { t } = useI18n();
  const aboutCopy = t("about");
  const skillCategoryCopy = t("skillsData.categories");
  const aiStrengthCopy = t("skillsData.aiStrengths");
  const quickFactCopy = t("skillsData.quickFacts");
  const localizedSkillCategories = skillCategories.map((group, index) => ({
    ...group,
    title: skillCategoryCopy[index]?.title || group.title,
    items: skillCategoryCopy[index]?.items || group.items
  }));
  const localizedAiStrengths = aiDevelopmentStrengths.map((item, index) => ({
    ...item,
    title: aiStrengthCopy[index]?.title || item.title,
    description: aiStrengthCopy[index]?.description || item.description
  }));
  const localizedQuickFacts = quickFacts.map((fact, index) => ({
    ...fact,
    label: quickFactCopy[index]?.label || fact.label,
    value: quickFactCopy[index]?.value || fact.value
  }));

  return (
    <div className="space-y-24 pb-24">
      <SEO
        title={t("seo.about.title")}
        description={t("seo.about.description")}
        path="/about"
      />
      <section className="bg-gradient-to-r from-brand-500 to-brand-600 py-24 text-white">
        <div className="site-container text-center">
          <TypewriterText
            as="h1"
            text={aboutCopy.heroTitle}
            startOnView={false}
            className="text-4xl font-extrabold sm:text-5xl"
          />
          <p className="mx-auto mt-5 max-w-3xl text-lg text-brand-50">
            {aboutCopy.heroBody}
          </p>
        </div>
      </section>

      <section className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="mx-auto max-w-md overflow-hidden rounded-full bg-brand-100 p-3 shadow-soft">
            <img
              src={getPublicUrl("images/portfolio-pic.jpg")}
              alt={t("home.hero.portraitAlt")}
              className="h-full w-full rounded-full object-cover"
              loading="lazy"
            />
          </div>

          <article className="space-y-5">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">{aboutCopy.journeyTitle}</h2>
            {aboutCopy.journey.map((paragraph, index) => (
              <p
                key={`journey-${index}`}
                className={[
                  "text-lg leading-relaxed text-slate-600",
                  index === 2 ? "font-medium text-slate-800" : ""
                ].join(" ")}
              >
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </section>

      <section className="site-container">
        <SectionTitle title={aboutCopy.pathTitle} />

        <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-card lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                {aboutCopy.pathItems[0].title}
              </h3>
              <p className="mt-3 text-slate-600">
                {aboutCopy.pathItems[0].body}
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                {aboutCopy.pathItems[1].title}
              </h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                {aboutCopy.pathItems[1].bullets.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8 border-l border-slate-200 pl-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">{aboutCopy.pathItems[2].title}</h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                {aboutCopy.pathItems[2].bullets.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">{aboutCopy.pathItems[3].title}</h3>
              <p className="mt-3 text-slate-600">
                {aboutCopy.pathItems[3].body}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container">
        <SectionTitle title={aboutCopy.coreSkills} />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr]">
          <div className="card-surface p-6">
            {/* Rendered from shared skills data so title/icon/item edits happen in one place. */}
            <div className="grid gap-5 sm:grid-cols-2">
              {localizedSkillCategories.map((group) => {
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
                        <li key={`${group.title}-${item}`} className="flex gap-2">
                          <span aria-hidden="true">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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

        <div className="mt-8 rounded-3xl border border-brand-100 bg-brand-50/70 p-6 dark:border-brand-500/30 dark:bg-indigo-950/30">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{aboutCopy.aiTitle}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            {aboutCopy.aiBody}
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {localizedAiStrengths.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl bg-white/80 p-4 shadow-sm dark:bg-slate-900/80 dark:ring-1 dark:ring-white/10">
                  <Icon className="text-xl text-brand-600 dark:text-brand-300" />
                  <h4 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="site-container">
        <SectionTitle title={aboutCopy.quickFacts} />

        <div className="card-surface mx-auto max-w-4xl rounded-3xl p-8">
          <div className="grid gap-6">
            {localizedQuickFacts.map((fact) => (
              <p key={fact.label} className="text-center text-xl text-slate-700">
                <span className="font-bold text-slate-900">{fact.label}</span> {fact.value}
              </p>
            ))}
          </div>
        </div>
      </section>

      <TestimonialHighway />

      <section className="site-container">
        <div className="rounded-3xl bg-white px-6 py-12 text-center shadow-card dark:bg-slate-900/85 dark:ring-1 dark:ring-white/10 sm:px-10">
          <p className="text-lg text-slate-600 dark:text-slate-300">{aboutCopy.ctaBody}</p>
          <Button to="/portfolio" className="mx-auto mt-6 gap-2">
            {aboutCopy.cta} <FiArrowRight />
          </Button>
        </div>
      </section>
    </div>
  );
}
