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
  FiUsers,
  FiX
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
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import SkillBar from "../components/SkillBar";
import PageTransition from "../components/PageTransition";
import TestimonialHighway from "../components/TestimonialHighway";
import TestimonialSubmissionModal from "../components/TestimonialSubmissionModal";
import BookingCTA from "../components/BookingCTA";
import TypewriterText from "../components/TypewriterText";
import { ProjectCardSkeleton } from "../components/Skeleton";
import { revealUp, staggerContainer } from "../animations/motion";
import { skillCategories, toolSkills } from "../data/skills";
import { sendContactEmail } from "../utils/api";
import { supabase, getPublicUrl } from "../utils/supabase";

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
  { icon: FiCalendar, label: "Experience", value: "2+ years of practical projects" },
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

function validateContactForm(formData) {
  const errors = {};

  if (!formData.name.trim()) errors.name = "Name is required.";
  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.subject.trim()) errors.subject = "Subject is required.";
  if (!formData.message.trim()) errors.message = "Message is required.";

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

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const reviewPromptRef = useRef(null);
  const [activeExperience, setActiveExperience] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const activeExperienceItem = experiences[activeExperience];
  const [contactFormData, setContactFormData] = useState(contactInitialForm);
  const [contactErrors, setContactErrors] = useState({});
  const [isContactSending, setIsContactSending] = useState(false);
  const [contactStatus, setContactStatus] = useState({ type: "", message: "" });
  const [homeProjects, setHomeProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [isReviewPromptDismissed, setIsReviewPromptDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem("testimonialReviewPromptDismissed") === "true";
  });

  useEffect(() => {
    async function fetchHomeProjects() {
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
    setIsReviewModalOpen(searchParams.get("review") === "1");
  }, [searchParams]);

  useEffect(() => {
    if (isReviewPromptDismissed || showReviewPrompt) return undefined;

    const promptNode = reviewPromptRef.current;
    if (!promptNode) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowReviewPrompt(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(promptNode);
    return () => observer.disconnect();
  }, [isReviewPromptDismissed, showReviewPrompt]);

  const openReviewModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("review", "1");
    setSearchParams(nextSearchParams);
    setShowReviewPrompt(false);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("review");
    setSearchParams(nextSearchParams, { replace: true });
    setIsReviewModalOpen(false);
  };

  const dismissReviewPrompt = () => {
    setShowReviewPrompt(false);
    setIsReviewPromptDismissed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("testimonialReviewPromptDismissed", "true");
    }
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

    const validationErrors = validateContactForm(contactFormData);
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
        message: "Your message has been sent successfully. I will get back to you soon."
      });
      setContactFormData(contactInitialForm);
    } catch (error) {
      setContactStatus({
        type: "error",
        message: "Message could not be sent. Please try again later."
      });
    } finally {
      setIsContactSending(false);
    }
  };

  useEffect(() => {
    if (!isAutoPlay) return;
    const intervalId = window.setInterval(() => {
      setActiveExperience((currentIndex) => (currentIndex + 1) % experiences.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isAutoPlay]);

  return (
    <PageTransition>
      <Helmet>
        <title>Beng Espoir | Product Designer & Software Engineer</title>
        <meta name="description" content="Portfolio of Beng Espoir Nong, a Product Designer and Software Engineering student specializing in UI/UX, Web, and Mobile development." />
        <meta property="og:title" content="Beng Espoir | Product Designer & Software Engineer" />
        <meta property="og:description" content="Explore the portfolio of Beng Espoir Nong - UI/UX Designer and Software Engineer." />
        <meta property="og:image" content={getPublicUrl("images/portfolio-pic.jpg")} />
      </Helmet>

      <div className="space-y-24 pb-24">
        <section className="site-container pt-10">
        <div className="subtle-gradient overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-soft sm:p-10 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-brand-50 px-4 py-1 text-sm font-semibold text-brand-600">
                Product Designer and Software Engineering Student
              </span>
              <TypewriterText
                as="h1"
                text="Hi I'm Beng Espoir Nong"
                startOnView={false}
                className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl"
              />
              <p className="max-w-xl text-lg text-slate-600">
                I build meaningful digital products through UI/UX design, full-stack & mobile development,
                and AI-powered system architecture.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button to="/booking" variant="cta" className="gap-2">
                  Book a Consultation <FiArrowRight />
                </Button>
                <Button
                  href="/resume.pdf"
                  variant="secondary"
                  className="gap-2"
                  download
                >
                  Download Resume <FiDownload />
                </Button>
              </div>
            </div>

            <div className="mx-auto max-w-sm">
              <div className="overflow-hidden rounded-3xl bg-brand-100 p-2 shadow-soft">
                <img
                  src={getPublicUrl("images/portfolio-pic.jpg")}
                  alt="Beng Espoir portrait"
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
          title="About Me"
          description="I blend design thinking with engineering foundations to craft digital experiences that are clear, practical, and polished."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* Bento Item 1: Experience (Spans 2 columns on desktop) */}
          <article className="card-surface flex flex-col gap-4 p-6 md:col-span-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FiCalendar size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Experience</h3>
              <p className="mt-1 text-slate-600">2+ years of practical projects and collaborations.</p>
            </div>
          </article>

          {/* Bento Item 2: Design Focus */}
          <article className="card-surface flex flex-col gap-4 p-6 md:col-span-1 lg:col-span-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FiPenTool size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Design Focus</h3>
              <p className="mt-1 text-slate-600">UI/UX & Branding</p>
            </div>
          </article>

          {/* Bento Item 3: Location */}
          <article className="card-surface flex flex-col gap-4 p-6 md:col-span-1">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FiMapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Location</h3>
              <p className="mt-1 text-slate-600">Yaounde, Cameroon</p>
            </div>
          </article>

          {/* Bento Item 4: Collaboration (Spans remaining columns) */}
          <article className="card-surface flex flex-col gap-4 p-6 md:col-span-2 lg:col-span-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FiUsers size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Collaboration</h3>
              <p className="mt-1 text-slate-600">Git, GitHub, agile workflows</p>
            </div>
          </article>
        </div>
      </section>

      <section className="site-container" data-motion={revealUp}>
        <SectionTitle
          title="Skills & Tools"
          description="A practical mix of design, development, programming, documentation, and collaboration skills used to deliver complete digital solutions."
          className="mb-8"
        />

        <div
          className={[
            "card-surface mx-auto max-w-5xl rounded-3xl border border-slate-100 p-6 sm:p-8 lg:p-10",
            staggerContainer
          ].join(" ")}
          data-motion={revealUp}
        >

          <div className="motion-stagger-item mt-8" style={{ "--stagger-index": 0 }}>
            <h3 className="text-4xl font-bold text-brand-500">Skills</h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {/* Category cards are rendered from shared data to keep Home/About in sync. */}
              {skillCategories.map((group) => {
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
                        <li key={`${group.title}-${item}`} className="leading-relaxed">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="motion-stagger-item mt-10" style={{ "--stagger-index": 1 }}>
            <h3 className="text-base font-semibold text-brand-600">Tools</h3>
            {/* Mobile-first layout: 1 column on phones, 2 on tablets, 4 typed columns on desktop. */}
            <div className="mt-4 grid gap-6 md:grid-cols-3 xl:grid-cols-5">
              {toolColumns.map((column, columnIndex) => {
                const columnSkills = toolSkills.filter((skill) => skill.domain === column.domain);

                return (
                  <article
                    key={column.domain}
                    className="motion-stagger-item space-y-3"
                    style={{ "--stagger-index": 2 + columnIndex }}
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
        </div>
      </section>

      <section className="site-container">
        <SectionTitle
          title="Portfolio Preview"
          description="A selection of design and development work showcasing process, execution, and outcomes."
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
            <h3 className="text-lg font-medium text-slate-900">No projects yet</h3>
            <p className="mt-2 text-slate-500">Check back later for my latest work!</p>
          </div>
        )}

        <div className="text-center mt-16 md:mt-24">
          <Button 
            to="/portfolio" 
            variant="secondary" 
            className="px-8 !bg-brand-500/10 hover:!bg-brand-600 !text-brand-600 dark:!text-brand-300 hover:!text-white !border !border-brand-500/20 hover:!border-brand-600 transition-all duration-300 shadow-sm"
          >
            View All Projects
          </Button>
        </div>
      </section>

      <section className="site-container">
        <SectionTitle
          title="Experience"
          description="Internships, freelance projects, collaborations, and academic work that shaped my journey."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Tab list */}
          <div className="md:col-span-1 flex md:flex-col overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-slate-200 dark:border-slate-800 scrollbar-none gap-2 md:gap-0 pb-3 md:pb-0">
            {experiences.map((experience, index) => {
              const isActive = index === activeExperience;
              return (
                <button
                  key={experience.company}
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
                {activeExperienceItem.tags.map((item) => (
                  <span key={item} className="rounded-full bg-brand-50 dark:bg-brand-900/30 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-400 border border-brand-100/50 dark:border-brand-900/20">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={reviewPromptRef} className="site-container">
        <SectionTitle
          title="Services I Offer"
          description="How I can help transform your ideas into clean and engaging digital products."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
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
          <Button to="/services">See Full Services</Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialHighway />

      <section className="site-container -mt-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl border border-brand-100 bg-white/70 px-6 py-8 text-center shadow-soft backdrop-blur-md sm:px-8 lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-500">Worked with me before?</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Share a quick review for the portfolio.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Your review goes into my dashboard first, then appears publicly only after I approve it.
            </p>
          </div>
          <Button type="button" onClick={openReviewModal} className="shrink-0 gap-2">
            Leave a review <FiMessageSquare />
          </Button>
        </div>
      </section>

      <section className="site-container">
        <div className="subtle-gradient card-surface rounded-3xl px-6 py-12 sm:px-8 lg:px-10">
          <TypewriterText
            as="h2"
            text="Let's Work Together"
            className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Got a project, collaboration, or opportunity? I&apos;d love to hear from you.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="card-surface rounded-2xl p-6 sm:p-8">
              <h3 className="text-center text-3xl font-bold text-brand-500 lg:text-left">Contact Info</h3>

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
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-card transition-all duration-300 hover:-translate-y-1 hover:text-brand-600"
                      aria-label={social.label}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </article>

            <article className="form-dynamic-bg border shadow-soft rounded-2xl p-6 sm:p-8">
              <h3 className="text-center text-3xl font-bold text-brand-500 lg:text-left">Got a Message For Me</h3>

              <form onSubmit={handleContactSubmit} className="mt-8 space-y-4" noValidate>
                <div>
                  <label htmlFor="home-name" className="mb-2 block text-sm font-semibold text-slate-900">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      id="home-name"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactChange}
                      type="text"
                      placeholder="Enter your name............."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-400"
                    />
                    <FiUser className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                  {contactErrors.name ? <p className="mt-1 text-sm text-red-600">{contactErrors.name}</p> : null}
                </div>

                <div>
                  <label htmlFor="home-email" className="mb-2 block text-sm font-semibold text-slate-900">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="home-email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactChange}
                      type="email"
                      placeholder="Enter Email............"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-400"
                    />
                    <FiMail className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                  {contactErrors.email ? <p className="mt-1 text-sm text-red-600">{contactErrors.email}</p> : null}
                </div>

                <div>
                  <label htmlFor="home-phone" className="mb-2 block text-sm font-semibold text-slate-900">
                    Phone / WhatsApp <span className="text-sm font-normal text-slate-400">(Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="home-phone"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={handleContactChange}
                      type="tel"
                      placeholder="e.g. +237 6xx xxx xxx"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-400"
                    />
                    <FiPhone className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>

                <div>
                  <label htmlFor="home-subject" className="mb-2 block text-sm font-semibold text-slate-900">
                    Subject
                  </label>
                  <input
                    id="home-subject"
                    name="subject"
                    value={contactFormData.subject}
                    onChange={handleContactChange}
                    type="text"
                    placeholder="Subject matter........"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-400"
                  />
                  {contactErrors.subject ? <p className="mt-1 text-sm text-red-600">{contactErrors.subject}</p> : null}
                </div>

                <div>
                  <label htmlFor="home-message" className="mb-2 block text-sm font-semibold text-slate-900">
                    Message
                  </label>
                  <textarea
                    id="home-message"
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactChange}
                    placeholder="Your Message.."
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
                  {isContactSending ? "Sending..." : "Send Message"} <FiSend />
                </Button>
              </form>
            </article>
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <BookingCTA />
    </div>

    {showReviewPrompt && !isReviewModalOpen ? (
      <div className="fixed inset-x-4 bottom-24 z-40 mx-auto max-w-3xl rounded-2xl border border-brand-100 bg-white/95 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-md sm:bottom-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FiMessageSquare />
            </div>
            <div>
              <p className="font-bold text-slate-900">Have we worked together?</p>
              <p className="mt-1 text-sm leading-5 text-slate-600">
                Leave a review and I will approve it before it appears publicly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:shrink-0">
            <Button type="button" size="sm" onClick={openReviewModal} className="gap-2">
              Leave a review <FiMessageSquare />
            </Button>
            <button
              type="button"
              onClick={dismissReviewPrompt}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:text-slate-900"
              aria-label="Dismiss review prompt"
            >
              <FiX />
            </button>
          </div>
        </div>
      </div>
    ) : null}

    <TestimonialSubmissionModal isOpen={isReviewModalOpen} onClose={closeReviewModal} />
  </PageTransition>
);
}
