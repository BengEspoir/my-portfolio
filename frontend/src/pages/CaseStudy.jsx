import {
  FiArrowRight,
  FiCompass,
  FiEdit3,
  FiLayout,
  FiSearch,
  FiSmartphone
} from "react-icons/fi";
import { FaBehanceSquare, FaDribbble, FaFigma } from "react-icons/fa";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";

const gallery = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1593642702744-d377ab507dc8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80"
];

const processSteps = [
  {
    title: "Step 1 - Research",
    description:
      "Analyzed Netflix interaction patterns and onboarding flows using visual references and UI audits.",
    icon: FiSearch
  },
  {
    title: "Step 2 - Wireframing",
    description:
      "Sketched primary paths including login, homepage, categories, and watchlist behavior.",
    icon: FiEdit3
  },
  {
    title: "Step 3 - High-Fidelity UI",
    description:
      "Built polished screens in Figma with consistent spacing, typography, and hierarchy.",
    icon: FiLayout
  },
  {
    title: "Step 4 - Prototype",
    description:
      "Added transitions and micro-interactions to evaluate flow clarity and usability.",
    icon: FiCompass
  }
];

export default function CaseStudy() {
  return (
    <div className="space-y-24 pb-24 pt-10">
      <section className="site-container">
        <SectionTitle
          title="Netflix Clone - UI/UX Study"
          description="A fully cloned Netflix userflow study, designed to understand user experience principles, visual hierarchy, and micro-interaction design for streaming platforms."
        />

        <div className="grid gap-3 rounded-2xl bg-sky-500 p-4 sm:grid-cols-2 lg:grid-cols-5">
          {gallery.map((image) => (
            <div key={image} className="overflow-hidden rounded-xl bg-black">
              <img src={image} alt="Netflix case study screen" className="h-48 w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="site-container">
        <SectionTitle
          title="Overview"
          description="This project was an independent UI/UX case study that replicated a popular app flow. The goal was to strengthen onboarding, content discovery, and recommendation patterns."
        />
        <div className="flex flex-wrap justify-center gap-3">
          {"UI/UX,Netflix Clone,Prototype,Design Practice".split(",").map((tag) => (
            <span key={tag} className="rounded-full bg-brand-500 px-4 py-2 font-medium text-white">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">The challenge</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              The main challenge was to recreate Netflix&apos;s smooth, intuitive browsing and signup
              experience while keeping consistency in typography, layout, and motion design.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Another challenge was designing interactions that keep users engaged through hover
              states, card carousels, and micro-animations.
            </p>
          </div>

          <div className="card-surface flex min-h-[320px] items-center justify-center rounded-3xl p-8">
            <FiSmartphone className="text-[180px] text-slate-700" />
          </div>
        </div>
      </section>

      <section className="site-container">
        <SectionTitle title="Process" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="rounded-2xl bg-white p-6 shadow-card">
                <Icon className="text-xl text-brand-500" />
                <h3 className="mt-3 text-2xl font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-slate-600">{step.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="site-container">
        <SectionTitle title="Tools and Technologies" />
        <div className="flex items-center justify-center gap-8 rounded-3xl bg-white p-10 shadow-card">
          <FaBehanceSquare className="text-5xl text-blue-600" />
          <FaDribbble className="text-5xl text-sky-500" />
          <FaFigma className="text-5xl text-slate-900" />
        </div>
      </section>

      <section className="site-container">
        <SectionTitle title="Results" />
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-card">
          <ul className="space-y-4 text-lg text-slate-700">
            <li>- Successfully cloned 15+ screens replicating Netflix main interaction flows.</li>
            <li>
              - Improved understanding of hierarchy, spacing, and card-based layout decisions for
              streaming products.
            </li>
            <li>- Learned reusable UI patterns for content browsing and recommendation features.</li>
          </ul>
        </div>
      </section>

      <section className="site-container">
        <div className="flex flex-wrap justify-center gap-4">
          <Button to="/contact" className="gap-2">
            Book a Free Consultation <FiArrowRight />
          </Button>
          <Button to="/contact" variant="secondary">
            Contact Me Directly
          </Button>
        </div>
      </section>
    </div>
  );
}

