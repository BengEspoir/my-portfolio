const runtimeOrigin =
  typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : "https://your-domain.com";

// Update the URL values here. The Home and Contact social icon sections, plus
// the Person structured data, all use this shared list.
export const socialProfiles = [
  { id: "behance", label: "Behance", url: "https://www.behance.net/bengespoir" },
  { id: "dribbble", label: "Dribbble", url: "https://dribbble.com/beng-espoir" },
  { id: "github", label: "GitHub", url: "https://github.com/BengEspoir" },
  { id: "figma", label: "Figma", url: "https://figma.com" },
  { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/beng-espoir-a9a279318" },
  { id: "x", label: "X", url: "https://x.com/EspoirBeng" },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/bengespoir/?hl=en" },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/bengespoir" },
  { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@beng.espoir?_r=1&_t=ZS-983eZO0mZkO" },
  { id: "youtube", label: "YouTube", url: "https://www.youtube.com/@BENGESPOIR-ny2vg" }
];

export const siteConfig = {
  name: "Beng Espoir Nong",
  shortName: "Beng Espoir",
  title: "Beng Espoir | Product Designer & Software Engineer",
  description:
    "Portfolio of Beng Espoir Nong, a product designer and software engineering student building UI/UX, web, mobile, and AI-assisted digital products.",
  baseUrl: (import.meta.env.VITE_SITE_URL || runtimeOrigin).replace(/\/$/, ""),
  defaultImage: "/images/portfolio-pic.jpg",
  email: "mbengespoir@gmail.com",
  phone: "+237683077263",
  whatsappUrl: "https://wa.me/237683077263",
  location: "Yaounde, Cameroon",
  socialLinks: socialProfiles.map((profile) => profile.url)
};

export function absoluteUrl(path = "/") {
  if (!path) return siteConfig.baseUrl;
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.baseUrl}${normalizedPath}`;
}

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    image: absoluteUrl(siteConfig.defaultImage),
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yaounde",
      addressCountry: "CM"
    },
    jobTitle: "Product Designer and Software Engineer",
    sameAs: siteConfig.socialLinks
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.baseUrl,
    description: siteConfig.description,
    publisher: {
      "@type": "Person",
      name: siteConfig.name
    }
  };
}
