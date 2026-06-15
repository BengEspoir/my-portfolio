import { Link } from "react-router-dom";
import { FiArrowLeft, FiBriefcase, FiFileText, FiImage, FiLayers, FiLayout, FiPenTool, FiTarget, FiType } from "react-icons/fi";
import Button from "./Button";
import SectionTitle from "./SectionTitle";
import TypewriterText from "./TypewriterText";
import { getPublicUrl } from "../utils/supabase";

function normalizeDesignImages(project) {
  const explicitImages = Array.isArray(project.design_images) ? project.design_images : [];
  const normalized = explicitImages
    .map((item, index) => {
      if (typeof item === "string") return { src: item, alt: `${project.title} design ${index + 1}` };
      return {
        src: item?.src || item?.url || "",
        alt: item?.alt || `${project.title} design ${index + 1}`
      };
    })
    .filter((item) => item.src);

  if (normalized.length > 0) return normalized;

  const fallback = [];
  if (project.image_url) fallback.push({ src: project.image_url, alt: `${project.title} main design` });
  (project.preview_screens || []).forEach((src, index) => {
    if (src) fallback.push({ src, alt: `${project.title} preview ${index + 1}` });
  });
  return fallback;
}

function normalizeList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function DetailItem({ icon: Icon, label, value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
        {Icon ? <Icon className="text-brand-500" /> : null}
        {label}
      </div>
      <div className="mt-3 text-base font-semibold leading-relaxed text-slate-900">
        {Array.isArray(value) ? value.join(", ") : value}
      </div>
    </div>
  );
}

export default function GraphicDesignProjectDetail({ project }) {
  const details = project.design_details || {};
  const designImages = normalizeDesignImages(project);
  const [mainImage, ...additionalImages] = designImages;
  const colorPalette = normalizeList(details.colorPalette || details.color_palette);
  const toolsUsed = normalizeList(details.toolsUsed || details.tools_used || project.tools_tech);
  const fontList = Array.isArray(details.fonts) ? details.fonts : normalizeList(details.fonts);
  const fontWeights = normalizeList(details.fontWeights || details.font_weights);

  return (
    <div className="space-y-20 pb-24 pt-10">
      <section className="site-container">
        <Link to="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-600">
          <FiArrowLeft /> BACK TO PORTFOLIO
        </Link>

        <div className="space-y-8">
          <div className="max-w-4xl space-y-4">
            <span className="inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-600">
              Graphic Design
            </span>
            <TypewriterText
              as="h1"
              text={project.title}
              startOnView={false}
              className="text-5xl font-extrabold tracking-tight text-slate-900 lg:text-6xl"
            />
            <p className="text-xl leading-relaxed text-slate-600">
              {project.description}
            </p>
          </div>

          {mainImage ? (
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
              <img
                src={getPublicUrl(mainImage.src)}
                alt={mainImage.alt}
                className="mx-auto max-h-[86vh] w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex min-h-[360px] items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 text-slate-400">
              <FiImage size={44} />
            </div>
          )}
        </div>
      </section>

      {additionalImages.length > 0 ? (
        <section className="site-container">
          <SectionTitle
            title="Design Previews"
            subtitle="Additional variations, pages, mockups, or supporting visual assets."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {additionalImages.map((image, index) => (
              <figure key={`${image.src}-${index}`} className="overflow-hidden rounded-3xl bg-white shadow-soft">
                <img
                  src={getPublicUrl(image.src)}
                  alt={image.alt}
                  className="h-full max-h-[720px] w-full object-contain"
                />
                <figcaption className="border-t border-slate-100 px-5 py-3 text-sm font-semibold text-slate-500">
                  {image.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="site-container">
        <SectionTitle
          title="Design Details"
          subtitle="Creative direction, design choices, production notes, and technical setup."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <DetailItem icon={FiLayers} label="Design Type" value={details.designType || details.design_type || project.project_type} />
          <DetailItem icon={FiBriefcase} label="Client / Brand" value={details.clientName || details.client_name || project.client_company} />
          <DetailItem icon={FiTarget} label="Objective" value={details.objective} />
          <DetailItem icon={FiPenTool} label="Target Audience" value={details.targetAudience || details.target_audience} />
          <DetailItem icon={FiType} label="Fonts" value={fontList.map((font) => typeof font === "string" ? font : `${font.name}${font.weights?.length ? ` (${font.weights.join(", ")})` : ""}`)} />
          <DetailItem icon={FiType} label="Font Weights" value={fontWeights} />
          <DetailItem icon={FiFileText} label="Style" value={details.style} />
          <DetailItem icon={FiPenTool} label="Tools Used" value={toolsUsed} />
        </div>

        {colorPalette.length > 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Color Palette</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {colorPalette.map((color) => (
                <div key={color} className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 py-2 pl-2 pr-4">
                  <span className="h-8 w-8 rounded-full border border-slate-200" style={{ backgroundColor: color }} />
                  <span className="text-sm font-semibold text-slate-700">{color}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <DetailItem icon={FiFileText} label="Copywriting / Text" value={details.copywriting} />
          <DetailItem icon={FiLayout} label="Layout Decisions" value={details.layoutNotes || details.layout_notes} />
          <DetailItem icon={FiFileText} label="Important Notes" value={details.notes} />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {project.figma_url ? <Button href={project.figma_url} target="_blank">View Source Design</Button> : null}
          <Button to="/contact" variant="secondary">Start a Similar Project</Button>
        </div>
      </section>
    </div>
  );
}
