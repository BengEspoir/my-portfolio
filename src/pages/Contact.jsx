import { useState } from "react";
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
import { FiCalendar, FiCheckCircle, FiMail, FiMapPin, FiPhone, FiSend, FiUser } from "react-icons/fi";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import { sendContactEmail } from "../utils/api";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

const socialLinks = [
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

function validateForm(formData) {
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

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "", message: "" });
      return;
    }

    try {
      setIsSending(true);
      setStatus({ type: "", message: "" });
      // Form submits to your mailbox through secure backend API
      await sendContactEmail(formData);
      setStatus({
        type: "success",
        message: "Your message has been sent successfully. I will get back to you soon."
      });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: "Message could not be sent. Please try again later."
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-24 pb-24 pt-10">
      <section className="site-container">
        <SectionTitle
          title="Get in Touch"
          description="Have a project in mind, or want to collaborate? Feel free to reach out."
        />

        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-soft sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* EmailJS placeholders to replace are in src/utils/emailjs.js, not these input placeholder texts. */}
            <div>
              <label htmlFor="name" className="mb-2 block font-semibold text-slate-900">
                Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-400"
                />
                <FiUser className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name}</p> : null}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-semibold text-slate-900">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-400"
                />
                <FiMail className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block font-semibold text-slate-900">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                type="text"
                placeholder="Subject matter"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-400"
              />
              {errors.subject ? <p className="mt-1 text-sm text-red-600">{errors.subject}</p> : null}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-semibold text-slate-900">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                rows={6}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-400"
              />
              {errors.message ? <p className="mt-1 text-sm text-red-600">{errors.message}</p> : null}
            </div>

            {status.message ? (
              <p
                className={[
                  "rounded-lg px-4 py-3 text-sm",
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                ].join(" ")}
              >
                {status.message}
              </p>
            ) : null}

            <Button type="submit" className="w-full gap-2" disabled={isSending}>
              {isSending ? "Sending..." : "Submit"} <FiSend />
            </Button>
          </form>
        </div>
      </section>

      <section className="site-container">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Book a Free Consultation</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            Pick a time that works best for you, and let&apos;s chat about your project.
          </p>
          <Button
            href="https://calendly.com/app/scheduling/meeting_types/user/me"
            target="_blank"
            rel="noreferrer"
            className="mt-5 gap-2"
          >
            Open Calendar <FiCalendar />
          </Button>
        </div>
      </section>

      <section className="site-container">
        <div className="grid gap-6 text-center md:grid-cols-3">
          <article className="card-surface p-6">
            <FiMail className="mx-auto text-3xl text-brand-500" />
            <h3 className="mt-3 text-2xl font-bold text-slate-900">Email</h3>
            <p className="mt-2 text-slate-600">mbengespoir@gmail.com</p>
          </article>

          <article className="card-surface p-6">
            <FiPhone className="mx-auto text-3xl text-brand-500" />
            <h3 className="mt-3 text-2xl font-bold text-slate-900">Phone</h3>
            <p className="mt-2 text-slate-600">+237 (683-077-263)</p>
            <a
              href="https://wa.me/237683077263"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex text-brand-600 underline"
            >
              WhatsApp
            </a>
          </article>

          <article className="card-surface p-6">
            <FiMapPin className="mx-auto text-3xl text-brand-500" />
            <h3 className="mt-3 text-2xl font-bold text-slate-900">Location</h3>
            <p className="mt-2 text-slate-600">Nsimeyong, Yaounde, Cameroon</p>
          </article>
        </div>
      </section>

      <section className="site-container text-center">
        <h2 className="text-3xl font-bold text-slate-900">Get to Me on Social Media</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-slate-700 shadow-card transition-all duration-300 hover:-translate-y-1 hover:text-brand-600"
                aria-label={social.label}
              >
                <Icon />
              </a>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/resume.pdf" variant="secondary" className="gap-2" download>
            Download My Resume <FiCheckCircle />
          </Button>
        </div>
      </section>
    </div>
  );
}
