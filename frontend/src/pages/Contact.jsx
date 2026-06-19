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
import SEO from "../components/SEO";
import { sendContactEmail } from "../utils/api";
import { useI18n } from "../i18n";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

const socialLinks = [
  { icon: FaBehance, href: "https://www.behance.net", label: "Behance" },
  { icon: FaDribbble, href: "https://dribbble.com", label: "Dribbble" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaFigma, href: "https://figma.com", label: "Figma" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/beng-espoir-a9a279318", label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com", label: "X" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaFacebook, href: "https://www.facebook.com/bengespoir", label: "Facebook" },
  { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" }
];

function validateForm(formData, messages) {
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

export default function Contact() {
  const { t } = useI18n();
  const pageCopy = t("contact");
  const formCopy = t("forms.contact");
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

    const validationErrors = validateForm(formData, formCopy);
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
        message: formCopy.success
      });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: formCopy.error
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-24 pb-24 pt-10">
      <SEO
        title={t("seo.contact.title")}
        description={t("seo.contact.description")}
        path="/contact"
      />
      <section className="site-container">
        <SectionTitle
          title={pageCopy.title}
          description={pageCopy.description}
        />

        <div className="mx-auto max-w-4xl rounded-3xl form-dynamic-bg p-6 shadow-soft sm:p-8 border">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* EmailJS placeholders to replace are in src/utils/emailjs.js, not these input placeholder texts. */}
            <div>
              <label htmlFor="name" className="mb-2 block font-semibold text-slate-900">
                {formCopy.name}
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder={formCopy.namePlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-400"
                />
                <FiUser className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name}</p> : null}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-semibold text-slate-900">
                {formCopy.email}
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder={formCopy.emailPlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-400"
                />
                <FiMail className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block font-semibold text-slate-900">
                {formCopy.phone} <span className="text-sm font-normal text-slate-400">({t("common.optional")})</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder={formCopy.phonePlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-400"
                />
                <FiPhone className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block font-semibold text-slate-900">
                {formCopy.subject}
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                type="text"
                placeholder={formCopy.subjectPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-400"
              />
              {errors.subject ? <p className="mt-1 text-sm text-red-600">{errors.subject}</p> : null}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-semibold text-slate-900">
                {formCopy.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={formCopy.messagePlaceholder}
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
              {isSending ? formCopy.sending : formCopy.submit} <FiSend />
            </Button>
          </form>
        </div>
      </section>

      <section className="site-container">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">{pageCopy.bookingTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            {pageCopy.bookingBody}
          </p>
          <Button
            to="/booking"
            className="mt-5 gap-2"
          >
            {pageCopy.bookingCta} <FiCalendar />
          </Button>        </div>
      </section>

      <section className="site-container">
        <div className="grid gap-6 text-center md:grid-cols-3">
          <article className="card-surface p-6">
            <FiMail className="mx-auto text-3xl text-brand-500" />
            <h3 className="mt-3 text-2xl font-bold text-slate-900">{pageCopy.email}</h3>
            <p className="mt-2 text-slate-600">mbengespoir@gmail.com</p>
          </article>

          <article className="card-surface p-6">
            <FiPhone className="mx-auto text-3xl text-brand-500" />
            <h3 className="mt-3 text-2xl font-bold text-slate-900">{pageCopy.phone}</h3>
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
            <h3 className="mt-3 text-2xl font-bold text-slate-900">{pageCopy.location}</h3>
            <p className="mt-2 text-slate-600">Nsimeyong, Yaounde, Cameroon</p>
          </article>
        </div>
      </section>

      <section className="site-container text-center">
        <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">{pageCopy.socialTitle}</h2>
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
            {pageCopy.resume} <FiCheckCircle />
          </Button>
        </div>
      </section>
    </div>
  );
}
