import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiLayout, FiPenTool, FiCode, FiMonitor } from "react-icons/fi";
import Button from "../components/Button";
import PricingCard from "../components/PricingCard";
import SectionTitle from "../components/SectionTitle";
import TestimonialHighway from "../components/TestimonialHighway";
import TypewriterText from "../components/TypewriterText";

const services = [
  {
    title: "UI/UX Design",
    description: "Figma design systems, wireframes, prototypes, and interaction maps.",
    details: "Designing intuitive and responsive interfaces using modern systems.",
    icon: FiPenTool
  },
  {
    title: "Web Development",
    description: "Responsive websites with React, Tailwind CSS, and clean architecture.",
    details: "Building robust and maintainable frontend experiences for business goals.",
    icon: FiMonitor
  },
  {
    title: "Graphic Design",
    description: "Brand visuals, flyers, social assets, and marketing design collateral.",
    details: "High-impact visuals tailored to your audience and communication style.",
    icon: FiLayout
  },
  {
    title: "Programming and Guide",
    description: "Mentorship for coding fundamentals, project architecture, and debugging.",
    details: "Structured support for students and early-career developers.",
    icon: FiCode
  },
  {
    title: "Design Audit",
    description: "Heuristic review of your product experience with actionable improvements.",
    details: "Identify friction points and refine user flows for better outcomes.",
    icon: FiLayout
  },
  {
    title: "Prototype Testing",
    description: "Clickable prototype flow testing before full implementation.",
    details: "Validate usability early and reduce product rework.",
    icon: FiPenTool
  }
];

const pricingPlans = [
  {
    title: "Starter",
    price: "$50-$150",
    description: "Perfect for individuals or small startups looking for a quick, clean online presence.",
    features: [
      "UI/UX wireframe (basic flow)",
      "1-page portfolio or landing page",
      "Mobile responsive layout",
      "1 round of revisions",
      "Delivery in 2-3 days"
    ],
    ctaLabel: "Get Started",
    popular: false
  },
  {
    title: "Professional",
    price: "$150-$500",
    description: "Ideal for growing teams that need a complete and polished multi-page web presence.",
    features: [
      "Full website (5-7 pages)",
      "UI/UX design system and components",
      "SEO-optimized structure",
      "2-3 revisions",
      "Delivery in 1-2 weeks"
    ],
    ctaLabel: "Work with Me",
    popular: true
  },
  {
    title: "Premium",
    price: "Custom Quote",
    description: "For full product design and development with deeper customization and long-term support.",
    features: [
      "Custom product system",
      "Full documentation",
      "End-to-end dev support",
      "Post-launch support (1-2 months)",
      "Unlimited scoped revisions"
    ],
    ctaLabel: "Request a Quote",
    popular: false
  }
];

const faqs = [
  {
    question: "How do I know which package is right for me?",
    answer:
      "If you are just starting, the Starter package is usually best. If you need a full multi-page site or branding, choose Professional. For complex platforms, Premium is the right fit."
  },
  {
    question: "Do you also handle both UI design and frontend coding?",
    answer:
      "Yes. I can deliver design-only work, frontend-only implementation, or a complete design-to-development workflow depending on your project scope."
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Small design tasks may take 2-4 days, while complete websites can take 1-3 weeks depending on pages, revisions, and integrations."
  }
];

export default function Services() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="space-y-24 pb-24">
      <section className="site-container pt-10">
        <div className="subtle-gradient mx-auto max-w-4xl rounded-[4rem] bg-white px-8 py-24 text-center shadow-soft">
          <TypewriterText
            as="h1"
            text="What I Can Do For You"
            startOnView={false}
            className="text-4xl font-extrabold text-slate-900 sm:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-600">
            I help brands, startups, and individuals build sleek, functional, and engaging digital
            experiences.
          </p>
        </div>
      </section>

      <section className="site-container">
        <SectionTitle title="Services" />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title + service.description} className="card-surface p-7">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon />
                </div>
                <h3 className="mt-4 text-3xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-2 font-semibold text-slate-800">{service.description}</p>
                <p className="mt-3 text-sm text-slate-600">{service.details}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="site-container">
        <SectionTitle
          title="Let's Tailor Your Needs"
          description="Flexible packages designed to fit your stage, budget, and delivery timeline."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg text-slate-600">
            Not sure which package fits your project? Let&apos;s discuss and map the right scope.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button to="/booking">Book a Free Consultation</Button>
            <Button to="/contact" variant="secondary">
              Contact Me Directly
            </Button>
          </div>
        </div>
      </section>

      <TestimonialHighway />

      <section className="site-container">
        <div className="overflow-hidden rounded-2xl border border-brand-200 bg-white">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <article
                key={faq.question}
                className={index > 0 ? "border-t border-slate-200" : "border-t-0"}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq((current) => (current === index ? -1 : index))}
                >
                  <span className="text-2xl font-semibold text-slate-900">{faq.question}</span>
                  {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {isOpen ? (
                  <div className="border-t border-slate-100 px-6 py-6 text-lg text-slate-700">{faq.answer}</div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
