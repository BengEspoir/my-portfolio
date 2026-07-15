import { useEffect, useRef, useState } from "react";
import {
  FiBriefcase,
  FiCheckCircle,
  FiImage,
  FiSend,
  FiStar,
  FiTrash2,
  FiUpload,
  FiUser,
  FiX
} from "react-icons/fi";
import Button from "./Button";
import { submitTestimonial } from "../utils/api";
import { useI18n } from "../i18n";

const initialForm = {
  client_name: "",
  client_role: "",
  client_company: "",
  content: "",
  rating: 5
};

const maxImageSize = 2 * 1024 * 1024;
const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function validateForm(formData, imageFile, messages) {
  const errors = {};
  const messageWords = formData.content.trim().split(/\s+/).filter(Boolean);

  if (!formData.client_name.trim()) errors.client_name = messages.name;
  if (!formData.client_role.trim()) errors.client_role = messages.role;
  if (!formData.content.trim()) {
    errors.content = messages.content;
  } else if (messageWords.length < 6) {
    errors.content = messages.contentLength;
  }

  const rating = Number(formData.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = messages.rating;
  }

  if (imageFile) {
    if (!allowedImageTypes.includes(imageFile.type)) {
      errors.profile_image = messages.imageType;
    } else if (imageFile.size > maxImageSize) {
      errors.profile_image = messages.imageSize;
    }
  }

  return errors;
}

export default function TestimonialSubmissionModal({ isOpen, onClose }) {
  const { t } = useI18n();
  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const dialogRef = useRef(null);
  const nameInputRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => nameInputRef.current?.focus(), 50);

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: name === "rating" ? Number(value) : value
    }));
    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: "" }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    setStatus({ type: "", message: "" });
    if (errors.profile_image) {
      setErrors((previous) => ({ ...previous, profile_image: "" }));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    if (errors.profile_image) {
      setErrors((previous) => ({ ...previous, profile_image: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData, imageFile, t("review.errors"));

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "", message: "" });
      return;
    }

    const payload = new FormData();
    payload.append("client_name", formData.client_name.trim());
    payload.append("client_role", formData.client_role.trim());
    payload.append("client_company", formData.client_company.trim());
    payload.append("content", formData.content.trim());
    payload.append("rating", String(Number(formData.rating)));
    if (imageFile) payload.append("profile_image", imageFile);

    try {
      setSubmitting(true);
      setErrors({});
      setStatus({ type: "", message: "" });
      await submitTestimonial(payload);
      setFormData(initialForm);
      setImageFile(null);
      setStatus({
        type: "success",
        message: t("review.success")
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || t("review.error")
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label={t("review.closeForm")}
        onClick={onClose}
      />

      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="testimonial-modal-title"
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl dark:bg-slate-950"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-500">{t("review.modalEyebrow")}</p>
            <h2 id="testimonial-modal-title" className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {t("review.modalHeadline")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {t("review.modalBody")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:text-slate-900"
            aria-label={t("review.closeForm")}
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="custom-scrollbar overflow-y-auto px-5 py-6 sm:px-8" noValidate>
          <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
            <div className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="testimonial-client-name" className="mb-2 block text-sm font-bold text-slate-700">
                    {t("review.fields.name")}
                  </label>
                  <div className="relative">
                    <input
                      ref={nameInputRef}
                      id="testimonial-client-name"
                      name="client_name"
                      value={formData.client_name}
                      onChange={handleChange}
                      maxLength={120}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-500 focus:bg-white"
                      aria-invalid={Boolean(errors.client_name)}
                      aria-describedby={errors.client_name ? "testimonial-client-name-error" : undefined}
                    />
                    <FiUser className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  {errors.client_name ? (
                    <p id="testimonial-client-name-error" className="mt-1 text-sm text-red-600">
                      {errors.client_name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="testimonial-client-role" className="mb-2 block text-sm font-bold text-slate-700">
                    {t("review.fields.role")}
                  </label>
                  <div className="relative">
                    <input
                      id="testimonial-client-role"
                      name="client_role"
                      value={formData.client_role}
                      onChange={handleChange}
                      maxLength={120}
                      placeholder={t("review.fields.rolePlaceholder")}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-brand-500 focus:bg-white"
                      aria-invalid={Boolean(errors.client_role)}
                      aria-describedby={errors.client_role ? "testimonial-client-role-error" : undefined}
                    />
                    <FiBriefcase className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  {errors.client_role ? (
                    <p id="testimonial-client-role-error" className="mt-1 text-sm text-red-600">
                      {errors.client_role}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label htmlFor="testimonial-client-company" className="mb-2 block text-sm font-bold text-slate-700">
                  {t("review.fields.company")} <span className="font-normal text-slate-400">({t("common.optional")})</span>
                </label>
                <input
                  id="testimonial-client-company"
                  name="client_company"
                  value={formData.client_company}
                  onChange={handleChange}
                  maxLength={160}
                  placeholder={t("review.fields.companyPlaceholder")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="testimonial-content" className="mb-2 block text-sm font-bold text-slate-700">
                  {t("review.fields.content")}
                </label>
                <textarea
                  id="testimonial-content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  maxLength={1200}
                  rows={7}
                  placeholder={t("review.fields.contentPlaceholder")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
                  aria-invalid={Boolean(errors.content)}
                  aria-describedby={errors.content ? "testimonial-content-error" : undefined}
                />
                <div className="mt-1 flex items-center justify-between gap-3">
                  {errors.content ? (
                    <p id="testimonial-content-error" className="text-sm text-red-600">
                      {errors.content}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p className="text-xs text-slate-400">{formData.content.length}/1200</p>
                </div>
              </div>
            </div>

            <aside className="space-y-5">
              <div>
                <span className="mb-2 block text-sm font-bold text-slate-700">{t("review.fields.rating")}</span>
                <div className="flex gap-2" role="radiogroup" aria-label={t("review.fields.rating")}>
                  {[1, 2, 3, 4, 5].map((rating) => {
                    const isSelected = Number(formData.rating) >= rating;
                    return (
                      <button
                        key={rating}
                        type="button"
                        role="radio"
                        aria-checked={Number(formData.rating) === rating}
                        aria-label={`${rating} star${rating > 1 ? "s" : ""}`}
                        onClick={() => handleChange({ target: { name: "rating", value: rating } })}
                        className={[
                          "inline-flex h-11 w-11 items-center justify-center rounded-xl border transition",
                          isSelected
                            ? "border-amber-200 bg-amber-50 text-amber-400"
                            : "border-slate-200 bg-slate-50 text-slate-300 hover:text-amber-300"
                        ].join(" ")}
                      >
                        <FiStar fill={isSelected ? "currentColor" : "none"} />
                      </button>
                    );
                  })}
                </div>
                {errors.rating ? <p className="mt-1 text-sm text-red-600">{errors.rating}</p> : null}
              </div>

              <div>
                <label htmlFor="testimonial-profile-image" className="mb-2 block text-sm font-bold text-slate-700">
                  {t("review.fields.profileImage")} <span className="font-normal text-slate-400">({t("common.optional")})</span>
                </label>
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-slate-300 ring-1 ring-slate-200">
                      {imagePreview ? (
                        <img src={imagePreview} alt={t("review.fields.selectedPreviewAlt")} className="h-full w-full object-cover" />
                      ) : (
                        <FiImage size={28} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <label
                        htmlFor="testimonial-profile-image"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-card transition hover:text-brand-600"
                      >
                        <FiUpload />
                        {t("review.fields.uploadImage")}
                      </label>
                      <input
                        id="testimonial-profile-image"
                        type="file"
                        accept={allowedImageTypes.join(",")}
                        onChange={handleImageChange}
                        className="sr-only"
                        aria-describedby={errors.profile_image ? "testimonial-profile-image-error" : undefined}
                      />
                      <p className="mt-2 text-xs text-slate-500">{t("review.fields.imageHelp")}</p>
                    </div>
                  </div>
                  {imageFile ? (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-red-600"
                    >
                      <FiTrash2 /> {t("review.fields.removeImage")}
                    </button>
                  ) : null}
                  {errors.profile_image ? (
                    <p id="testimonial-profile-image-error" className="mt-2 text-sm text-red-600">
                      {errors.profile_image}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-brand-500/30 dark:bg-indigo-950/30 dark:text-slate-300">
                <div className="mb-2 inline-flex items-center gap-2 font-bold text-brand-600 dark:text-brand-300">
                  <FiCheckCircle /> {t("review.fields.moderatedTitle")}
                </div>
                <p>
                  {t("review.fields.moderatedBody")}
                </p>
              </div>
            </aside>
          </div>

          {status.message ? (
            <p
              className={[
                "mt-6 rounded-xl px-4 py-3 text-sm",
                status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
              ].join(" ")}
              role="status"
            >
              {status.message}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              {t("common.close")}
            </Button>
            <Button type="submit" className="gap-2" disabled={submitting}>
              {submitting ? t("review.submitting") : t("review.submit")} <FiSend />
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
