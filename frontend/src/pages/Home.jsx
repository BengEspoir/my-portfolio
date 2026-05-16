import {
  FiArrowRight,
  FiCalendar,
  FiCode,
  FiDownload,
  FiGlobe,
  FiLayers,
  FiMail,
  FiMapPin,
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
import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import SkillBar from "../components/SkillBar";
import PageTransition from "../components/PageTransition";
import Testimonials from "../components/Testimonials";
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
    title: "UI/UX and Web Development Intern - Nephus",
    period: "June 2024 - September 2024",
    description:
      "Completed practical UI/UX design training and contributed to frontend implementation while applying Git-based version control in a team environment.",
    tags: ["Internship", "UI/UX", "Web Dev", "Git"]
  },
  {
    title: "Freelance UI/UX Designer - Small Business Projects",
    period: "October 2024 - Present",
    description:
      "Designed landing pages, wireframes, and brand visuals for small businesses, focusing on clear messaging and conversion-oriented layouts.",
    tags: ["Freelance", "Wireframing", "Branding", "Prototyping"]
  },
  {
    title: "Academic Software Engineering Collaborations",
    period: "2023 - Present",
    description:
      "Built team projects with React and modern web tooling, collaborating through GitHub workflows and sprint-style planning.",
    tags: ["Teamwork", "React", "Agile", "Version Control"]
  },
  {
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
  const [activeExperience, setActiveExperience] = useState(0);
  const activeExperienceItem = experiences[activeExperience];
  const [contactFormData, setContactFormData] = useState(contactInitialForm);
  const [contactErrors, setContactErrors] = useState({});
  const [isContactSending, setIsContactSending] = useState(false);
  const [contactStatus, setContactStatus] = useState({ type: "", message: "" });
  const [homeProjects, setHomeProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

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
    const intervalId = window.setInterval(() => {
      setActiveExperience((currentIndex) => (currentIndex + 1) % experiences.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

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
              <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                Hi I&apos;m Beng Espoir Nong
              </h1>
              <p className="max-w-xl text-lg text-slate-600">
                I build meaningful digital products through UI/UX design, full-stack & mobile development,
                and AI-powered system architecture.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button to="/portfolio" variant="cta" className="gap-2">
                  View My Work <FiArrowRight />
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

        <div className="text-center">
          <Button to="/portfolio" variant="secondary" className="px-8">
            View All Projects
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      <section className="site-container">
        <SectionTitle
          title="Experience"
          description="Internships, freelance projects, collaborations, and academic work that shaped my journey."
        />

        <article className="card-surface mx-auto max-w-4xl rounded-3xl p-8 text-center transition-all duration-700">
          <div key={activeExperienceItem.title} className="transition-opacity duration-700">
            <h3 className="text-xl font-bold text-slate-900">{activeExperienceItem.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{activeExperienceItem.period}</p>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">{activeExperienceItem.description}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {activeExperienceItem.tags.map((item) => (
                <span key={item} className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-600">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </article>

        <div className="mt-5 flex justify-center gap-2">
          {experiences.map((experience, index) => (
            <span
              key={experience.title}
              className={[
                "h-2 w-2 rounded-full transition-all duration-500",
                index === activeExperience ? "w-6 bg-brand-500" : "bg-slate-300"
              ].join(" ")}
            />
          ))}
        </div>
      </section>

      <section className="site-container">
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

      <section className="site-container">
        <div className="subtle-gradient card-surface rounded-3xl px-6 py-12 sm:px-8 lg:px-10">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Let&apos;s Work Together</h2>
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

            <article className="card-surface rounded-2xl p-6 sm:p-8">
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
    </div>
  </PageTransition>
);
}
