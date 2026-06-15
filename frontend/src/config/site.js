const runtimeOrigin =
  typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : "https://your-domain.com";

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
  location: "Yaounde, Cameroon",
  socialLinks: [
    "https://www.linkedin.com/in/beng-espoir-a9a279318",
    "https://www.facebook.com/bengespoir",
    "https://github.com",
    "https://www.behance.net",
    "https://dribbble.com"
  ]
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
