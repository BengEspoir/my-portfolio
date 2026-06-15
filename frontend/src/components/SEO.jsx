import { Helmet } from "react-helmet-async";
import { absoluteUrl, siteConfig } from "../config/site";

export default function SEO({
  title = siteConfig.title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.defaultImage,
  type = "website",
  jsonLd,
  noindex = false
}) {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image || siteConfig.defaultImage);
  const structuredData = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.shortName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {structuredData.map((item, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
