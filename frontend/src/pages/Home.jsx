import {
  FiArrowRight,
  FiCalendar,
  FiCode,
  FiDownload,
  FiGlobe,
  FiLayers,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPenTool,
  FiPhone,
  FiSend,
  FiUser,
  FiUsers
} from "react-icons/fi";
import {
  FaBehance,
  FaDribbble,
  FaFacebook,
  FaFigma,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import SEO from "../components/SEO";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import SkillBar from "../components/SkillBar";
import PageTransition from "../components/PageTransition";
import TestimonialHighway from "../components/TestimonialHighway";
import TestimonialSubmissionModal from "../components/TestimonialSubmissionModal";
import BookingCTA from "../components/BookingCTA";
import TypewriterText from "../components/TypewriterText";
import { ProjectCardSkeleton } from "../components/Skeleton";
import { revealUp } from "../animations/motion";
import { aiDevelopmentStrengths, skillCategories, toolSkills } from "../data/skills";
import { sendContactEmail } from "../utils/api";
import { isSupabaseConfigured, supabase, getPublicUrl } from "../utils/supabase";
import { buildPersonJsonLd, buildWebsiteJsonLd } from "../config/site";
import { useI18n } from "../i18n";

const services = [
  {
    title: "UI/UX Design",
    description: "Design systems, wireframes, and prototype flows that keep users engaged.",
    icon: FiPenTool
  },
  {
    title: "Graphic Design",
    description: "Clean visual assets for social media, flyers, and brand communication.",
    icon: FiLayers
  },
  {
    title: "Programming Support",
    description: "Practical coding help and guidance for software engineering students.",
    icon: FiCode
  },
  {
    title: "Web Development",
    description: "Responsive React websites and landing pages built for real business goals.",
    icon: FiGlobe
  }
];

const quickItems = [
  { icon: FiPenTool, label: "Design Focus", value: "UI/UX & Branding" },
  { icon: FiCalendar, label: "Experience", value: "3+ years in design" },
  { icon: FiMapPin, label: "Location", value: "Yaounde, Cameroon" },
  { icon: FiUsers, label: "Collaboration", value: "Git, GitHub, agile workflows" }
];

const experiences = [
  {
    company: "Nephus",
    title: "UI/UX and Web Development Intern - Nephus",
    period: "June 2024 - September 2024",
    description:
      "Completed practical UI/UX design training and contributed to frontend implementation while applying Git-based version control in a team environment.",
    tags: ["Internship", "UI/UX", "Web Dev", "Git"]
  },
  {
    company: "Freelance",
    title: "Freelance UI/UX Designer - Small Business Projects",
    period: "October 2024 - Present",
    description:
      "Designed landing pages, wireframes, and brand visuals for small businesses, focusing on clear messaging and conversion-oriented layouts.",
    tags: ["Freelance", "Wireframing", "Branding", "Prototyping"]
  },
  {
    company: "Academic",
    title: "Academic Software Engineering Collaborations",
    period: "2023 - Present",
    description:
      "Built team projects with React and modern web tooling, collaborating through GitHub workflows and sprint-style planning.",
    tags: ["Teamwork", "React", "Agile", "Version Control"]
  },
  {
    company: "Portfolio",
    title: "Design and Frontend Portfolio Development",
    period: "2024 - Present",
    description:
      "Created case studies and interactive portfolio pages to document design process, implementation choices, and final outcomes.",
    tags: ["Case Studies", "Frontend", "Storytelling", "UX Process"]
  }
];

const contactInitialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

const contactSocialLinks = [
  { icon: FaBehance, href: "https://www.behance.net", label: "Behance" },
  { icon: FaDribbble, href: "https://dribbble.com", label: "Dribbble" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaFigma, href: "https://figma.com", label: "Figma" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com", label: "X" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" }
];

function validateContactForm(formData, messages) {
  const errors = {};

  if (!formData.name.trim()) errors.name = messages.nameRequired;
  if (!formData.email.trim()) {
    errors.email = messages.emailRequired;
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!formData.subject.trim()) errors.subject = messages.subjectRequired;
  if (!formData.message.trim()) errors.message = messages.messageRequired;

  return errors;
}

const skillGroupTone = {
  design: "text-fuchsia-500",
  web: "text-emerald-500",
  mobile: "text-blue-500",
  programming: "text-amber-500",
  documentation: "text-indigo-500",
  others: "text-cyan-500"
};
const toolColumns = [
  { domain: "design", title: "Design" },
  { domain: "web", title: "Web Dev" },
  { domain: "mobile", title: "Mobile Dev" },
  { domain: "programming", title: "Programming" },
  { domain: "documentation", title: "Docs" }
];

function localizeExperienceRow(row, locale) {
  const useFrench = locale === "fr";
  return {
    id: row.id || row.slug || row.company,
    slug: row.slug,
    company: row.company,
    title: useFrench && row.title_fr ? row.title_fr : row.title,
    period: useFrench && row.period_fr ? row.period_fr : row.period,
    description: useFrench && row.description_fr ? row.description_fr : row.description,
    tags: useFrench && Array.isArray(row.tags_fr) && row.tags_fr.length > 0 ? row.tags_fr : row.tags || []
  };
}

export default function Home() {
  const { locale, t } = useI18n();
  const homeCopy = t("home");
  const formCopy = t("forms.contact");
  const skillCategoryCopy = t("skillsData.categories");
  const aiStrengthCopy = t("skillsData.aiStrengths");
  const serviceIcons = [FiPenTool, FiLayers, FiCode, FiGlobe];
  const localizedServices = homeCopy.services.items.map((service, index) => ({
    ...service,
    icon: serviceIcons[index]
  }));
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
  const localizedToolColumns = toolColumns.map((column) => ({
    ...column,
    title: homeCopy.skills.toolColumns[column.domain] || column.title
  }));
  const fallbackExperiences = homeCopy.experience.items;
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeExperience, setActiveExperience] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [experienceItems, setExperienceItems] = useState(fallbackExperiences);
  const activeExperienceItem = experienceItems[activeExperience] || experienceItems[0] || fallbackExperiences[0];
  const [contactFormData, setContactFormData] = useState(contactInitialForm);
  const [contactErrors, setContactErrors] = useState({});
  const [isContactSending, setIsContactSending] = useState(false);
  const [contactStatus, setContactStatus] = useState({ type: "", message: "" });
  const [homeProjects, setHomeProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    async function fetchHomeProjects() {
      if (!isSupabaseConfigured) {
        setHomeProjects([]);
        setProjectsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) throw error;
        setHomeProjects(data || []);
      } catch (error) {
        console.error('Error fetching home projects:', error);
      } finally {
        setProjectsLoading(false);
      }
    }

    fetchHomeProjects();
  }, []);

  useEffect(() => {
    async function fetchExperiences() {
      setExperienceItems(fallbackExperiences);
      setActiveExperience(0);

      if (!isSupabaseConfigured) return;

      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('id, slug, company, title, period, description, tags, title_fr, period_fr, description_fr, tags_fr')
          .eq('status', 'published')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: true });

        if (error) throw error;

        const publishedExperiences = (data || []).map((item) => localizeExperienceRow(item, locale));
        if (publishedExperiences.length > 0) {
          setExperienceItems(publishedExperiences);
        }
      } catch (error) {
        console.warn('Experience data unavailable. Using local fallback.');
      }
    }

    fetchExperiences();
  }, [fallbackExperiences, locale]);

  useEffect(() => {
    setIsReviewModalOpen(searchParams.get("review") === "1");
  }, [searchParams]);

  const openReviewModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("review", "1");
    setSearchParams(nextSearchParams);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("review");
    setSearchParams(nextSearchParams, { replace: true });
    setIsReviewModalOpen(false);
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactFormData((previous) => ({ ...previous, [name]: value }));
    if (contactErrors[name]) {
      setContactErrors((previous) => ({ ...previous, [name]: "" }));
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateContactForm(contactFormData, formCopy);
    if (Object.keys(validationErrors).length > 0) {
      setContactErrors(validationErrors);
      setContactStatus({ type: "", message: "" });
      return;
    }

    try {
      setIsContactSending(true);
      setContactStatus({ type: "", message: "" });
      await sendContactEmail(contactFormData);
      setContactStatus({
        type: "success",
        message: formCopy.success
      });
      setContactFormData(contactInitialForm);
    } catch (error) {
      setContactStatus({
        type: "error",
        message: formCopy.error
      });
    } finally {
      setIsContactSending(false);
    }
  };

  useEffect(() => {
    if (!isAutoPlay || experienceItems.length <= 1) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveExperience((currentIndex) => (currentIndex + 1) % experienceItems.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isAutoPlay, experienceItems.length]);

  return (
    <PageTransition>
      <SEO
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        path="/"
        image="/images/portfolio-pic.jpg"
        jsonLd={[buildPersonJsonLd(), buildWebsiteJsonLd()]}
      />

      <div className="space-y-24 pb-24">
        <section className="site-container pt-10">
        <div className="subtle-gradient overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-soft sm:p-10 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-brand-50 px-4 py-1 text-sm font-semibold text-brand-600">
                {homeCopy.hero.eyebrow}
              </span>
              <TypewriterText
                as="h1"
                text={homeCopy.hero.title}
                startOnView={false}
                className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl"
              />
              <p className="max-w-xl text-lg text-slate-600">
                {homeCopy.hero.body}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button to="/booking" variant="cta" className="gap-2">
                  {homeCopy.hero.book} <FiArrowRight />
                </Button>
                <Button
                  href="/resume.pdf"
                  variant="secondary"
                  className="gap-2"
                  download
                >
                  {homeCopy.hero.resume} <FiDownload />
                </Button>
              </div>
            </div>

            <div className="mx-auto max-w-sm">
              <div className="overflow-hidden rounded-3xl bg-brand-100 p-2 shadow-soft">
                <img
                  src={getPublicUrl("images/portfolio-pic.jpg")}
                  alt={homeCopy.hero.portraitAlt}
                  className="h-full w-full rounded-[1.25rem] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container">
        <SectionTitle
          title={homeCopy.about.title}
          description={homeCopy.about.description}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* Bento Item 1: Experience (Spans 2 columns on desktop) */}
          <article className="card-surface flex flex-col gap-4 p-6 md:col-span-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FiCalendar size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{homeCopy.about.cards[0].title}</h3>
              <p className="mt-1 text-slate-600">{homeCopy.about.cards[0].body}</p>
            </div>
          </article>

          {/* Bento Item 2: Design Focus */}
          <article className="card-surface flex flex-col gap-4 p-6 md:col-span-1 lg:col-span-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FiPenTool size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{homeCopy.about.cards[1].title}</h3>
              <p className="mt-1 text-slate-600">{homeCopy.about.cards[1].body}</p>
            </div>
          </article>

          {/* Bento Item 3: Location */}
          <article className="card-surface flex flex-col gap-4 p-6 md:col-span-1">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FiMapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{homeCopy.about.cards[2].title}</h3>
              <p className="mt-1 text-slate-600">{homeCopy.about.cards[2].body}</p>
            </div>
          </article>

          {/* Bento Item 4: Collaboration (Spans remaining columns) */}
          <article className="card-surface flex flex-col gap-4 p-6 md:col-span-2 lg:col-span-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FiUsers size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{homeCopy.about.cards[3].title}</h3>
              <p className="mt-1 text-slate-600">{homeCopy.about.cards[3].body}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="site-container" data-motion={revealUp}>
        <SectionTitle
          title={homeCopy.skills.title}
          description={homeCopy.skills.description}
          className="mb-8"
        />

        <div className="card-surface mx-auto max-w-5xl rounded-3xl border border-slate-100 p-6 sm:p-8 lg:p-10">
          <div className="mt-8">
            <h3 className="text-4xl font-bold text-brand-500">{homeCopy.skills.skills}</h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {/* Category cards are rendered from shared data to keep Home/About in sync. */}
              {localizedSkillCategories.map((group) => {
                const GroupIcon = group.icon;

                return (
                  <article key={group.title}>
                    <h4 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                      {GroupIcon ? (
                        <GroupIcon
                          className={[
                            "text-base",
                            skillGroupTone[group.color] || "text-brand-500"
                          ].join(" ")}
                        />
                      ) : null}
                      <span>{group.title}</span>
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700 sm:text-base">
                      {group.items.map((item) => (
                        <li key={`${group.title}-${item}`} className="flex gap-2 leading-relaxed">
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

          <div className="mt-10">
            <h3 className="text-base font-semibold text-brand-600">{homeCopy.skills.tools}</h3>
            {/* Mobile-first layout: 1 column on phones, 2 on tablets, 4 typed columns on desktop. */}
            <div className="mt-4 grid gap-6 md:grid-cols-3 xl:grid-cols-5">
              {localizedToolColumns.map((column, columnIndex) => {
                const columnSkills = toolSkills.filter((skill) => skill.domain === column.domain);

                return (
                  <article
                    key={column.domain}
                    className="space-y-3"
                  >
                    <h4
                      className={[
                        "text-xs font-semibold uppercase tracking-[0.12em]",
                        skillGroupTone[column.domain] || "text-brand-500"
                      ].join(" ")}
                    >
                      {column.title}
                    </h4>
                    <div className="space-y-3">
                      {columnSkills.map((skill, skillIndex) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          icon={skill.icon}
                          domain={skill.domain}
                          motionIndex={columnIndex * 10 + skillIndex}
                          compact
                        />
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/70 p-5 dark:border-brand-500/30 dark:bg-indigo-950/30">
            <h3 className="text-base font-semibold text-brand-600 dark:text-brand-300">{homeCopy.skills.aiTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {homeCopy.skills.aiBody}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
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
        </div>
      </section>

      <section className="site-container">
        <SectionTitle
          title={homeCopy.portfolio.title}
          description={homeCopy.portfolio.description}
        />

        {projectsLoading ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {[1, 2, 3, 4].map(i => <ProjectCardSkeleton key={i} />)}
          </div>
        ) : homeProjects.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {homeProjects.map((project) => (
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
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900">{homeCopy.portfolio.emptyTitle}</h3>
            <p className="mt-2 text-slate-500">{homeCopy.portfolio.emptyBody}</p>
          </div>
        )}

        <div className="text-center mt-16 md:mt-24">
          <Button 
            to="/portfolio" 
            variant="secondary" 
            className="px-8 !bg-brand-500/10 hover:!bg-brand-600 !text-brand-600 dark:!text-brand-300 hover:!text-white !border !border-brand-500/20 hover:!border-brand-600 transition-all duration-300 shadow-sm"
          >
            {homeCopy.portfolio.viewAll}
          </Button>
        </div>
      </section>

      <section className="site-container">
        <SectionTitle
          title={homeCopy.experience.title}
          description={homeCopy.experience.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Tab list */}
          <div className="md:col-span-1 flex md:flex-col overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-slate-200 dark:border-slate-800 scrollbar-none gap-2 md:gap-0 pb-3 md:pb-0">
            {experienceItems.map((experience, index) => {
              const isActive = index === activeExperience;
              return (
                <button
                  key={experience.slug || experience.company}
                  type="button"
                  onClick={() => {
                    setActiveExperience(index);
                    setIsAutoPlay(false); // Stop auto-slide on user interaction
                  }}
                  className={[
                    "w-full text-left py-3.5 px-5 font-semibold text-sm transition-all duration-300 relative rounded-xl md:rounded-none md:rounded-r-xl",
                    isActive
                      ? "text-brand-600 dark:text-white bg-white/60 dark:bg-slate-800/40 shadow-soft md:shadow-none border-l-4 border-brand-500 md:-ml-[2.5px]"
                      : "text-slate-500 dark:text-slate-400 border-l-4 border-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/40 dark:hover:bg-slate-800/20"
                  ].join(" ")}
                >
                  {experience.company}
                </button>
              );
            })}
          </div>

          {/* Right Column: Experience Details */}
          <div className="md:col-span-3 card-surface p-8 min-h-[280px] flex flex-col justify-between">
            <div key={activeExperienceItem.title} className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeExperienceItem.title}
                </h3>
                <span className="text-sm font-semibold text-slate-500 shrink-0">
                  {activeExperienceItem.period}
                </span>
              </div>
              
              <p className="text-brand-600 dark:text-brand-400 font-bold text-sm">
                {activeExperienceItem.company}
              </p>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeExperienceItem.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {(activeExperienceItem.tags || []).map((item) => (
                  <span key={item} className="rounded-full bg-brand-50 dark:bg-brand-900/30 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-400 border border-brand-100/50 dark:border-brand-900/20">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container">
        <SectionTitle
          title={homeCopy.services.title}
          description={homeCopy.services.description}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {localizedServices.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="card-surface rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button to="/services">{homeCopy.services.seeFull}</Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialHighway />

      <section className="site-container -mt-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl border border-brand-100 bg-white/70 px-6 py-8 text-center shadow-soft backdrop-blur-md dark:border-brand-500/30 dark:bg-slate-900/85 sm:px-8 lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-500 dark:text-brand-300">{t("review.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              {t("review.headline")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
              {t("review.body")}
            </p>
          </div>
          <Button type="button" onClick={openReviewModal} className="shrink-0 gap-2">
            {t("review.cta")} <FiMessageSquare />
          </Button>
        </div>
      </section>

      <section className="site-container">
        <div className="subtle-gradient card-surface rounded-3xl px-6 py-12 sm:px-8 lg:px-10">
          <TypewriterText
            as="h2"
            text={homeCopy.contact.title}
            className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {homeCopy.contact.body}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="card-surface rounded-2xl p-6 sm:p-8">
              <h3 className="text-center text-3xl font-bold text-brand-500 lg:text-left">{homeCopy.contact.infoTitle}</h3>

              <div className="mt-8 space-y-7 text-center lg:text-left">
                <p className="inline-flex items-center gap-2 text-lg text-slate-800">
                  <FiMail className="text-brand-500" />
                  <span>mbengespoir@gmail.com</span>
                </p>
                <p className="inline-flex items-center gap-2 text-lg text-slate-800">
                  <FiPhone className="text-brand-500" />
                  <span>+237(683-077-263)</span>
                </p>
                <p className="inline-flex items-center gap-2 text-lg text-slate-800">
                  <FiMapPin className="text-brand-500" />
                  <span>Yaounde, Cameroon</span>
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {contactSocialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-card transition-all duration-300 hover:-translate-y-1 hover:text-brand-600 dark:bg-slate-900 dark:text-slate-200 dark:ring-1 dark:ring-white/10"
                      aria-label={social.label}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </article>

            <article className="form-dynamic-bg border shadow-soft rounded-2xl p-6 sm:p-8">
              <h3 className="text-center text-3xl font-bold text-brand-500 lg:text-left">{homeCopy.contact.formTitle}</h3>

              <form onSubmit={handleContactSubmit} className="mt-8 space-y-4" noValidate>
                <div>
                  <label htmlFor="home-name" className="mb-2 block text-sm font-semibold text-slate-900">
                    {formCopy.name}
                  </label>
                  <div className="relative">
                    <input
                      id="home-name"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactChange}
                      type="text"
                      placeholder={formCopy.namePlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-400"
                    />
                    <FiUser className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                  {contactErrors.name ? <p className="mt-1 text-sm text-red-600">{contactErrors.name}</p> : null}
                </div>

                <div>
                  <label htmlFor="home-email" className="mb-2 block text-sm font-semibold text-slate-900">
                    {formCopy.email}
                  </label>
                  <div className="relative">
                    <input
                      id="home-email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactChange}
                      type="email"
                      placeholder={formCopy.emailPlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-400"
                    />
                    <FiMail className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                  {contactErrors.email ? <p className="mt-1 text-sm text-red-600">{contactErrors.email}</p> : null}
                </div>

                <div>
                  <label htmlFor="home-phone" className="mb-2 block text-sm font-semibold text-slate-900">
                    {formCopy.phone} <span className="text-sm font-normal text-slate-400">({t("common.optional")})</span>
                  </label>
                  <div className="relative">
                    <input
                      id="home-phone"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={handleContactChange}
                      type="tel"
                      placeholder={formCopy.phonePlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-400"
                    />
                    <FiPhone className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>

                <div>
                  <label htmlFor="home-subject" className="mb-2 block text-sm font-semibold text-slate-900">
                    {formCopy.subject}
                  </label>
                  <input
                    id="home-subject"
                    name="subject"
                    value={contactFormData.subject}
                    onChange={handleContactChange}
                    type="text"
                    placeholder={formCopy.subjectPlaceholder}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-400"
                  />
                  {contactErrors.subject ? <p className="mt-1 text-sm text-red-600">{contactErrors.subject}</p> : null}
                </div>

                <div>
                  <label htmlFor="home-message" className="mb-2 block text-sm font-semibold text-slate-900">
                    {formCopy.message}
                  </label>
                  <textarea
                    id="home-message"
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactChange}
                    placeholder={formCopy.messagePlaceholder}
                    rows={5}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-400"
                  />
                  {contactErrors.message ? <p className="mt-1 text-sm text-red-600">{contactErrors.message}</p> : null}
                </div>

                {contactStatus.message ? (
                  <p
                    className={[
                      "rounded-lg px-4 py-3 text-sm",
                      contactStatus.type === "success"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    ].join(" ")}
                  >
                    {contactStatus.message}
                  </p>
                ) : null}

                <Button type="submit" className="w-full gap-2" disabled={isContactSending}>
                  {isContactSending ? formCopy.sending : formCopy.send} <FiSend />
                </Button>
              </form>
            </article>
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <BookingCTA />
    </div>

    <TestimonialSubmissionModal isOpen={isReviewModalOpen} onClose={closeReviewModal} />
  </PageTransition>
);
}
