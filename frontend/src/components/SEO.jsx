import { Helmet } from "react-helmet-async";
import { absoluteUrl, siteConfig } from "../config/site";
import { buildLocalizedAlternates, localizePath, useI18n } from "../i18n";

const openGraphLocale = {
  en: "en_US",
  fr: "fr_FR"
};

export default function SEO({
  title = siteConfig.title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.defaultImage,
  type = "website",
  jsonLd,
  noindex = false
}) {
  const { locale } = useI18n();
  const localizedPath = localizePath(path, locale);
  const canonicalUrl = absoluteUrl(localizedPath);
  const imageUrl = absoluteUrl(image || siteConfig.defaultImage);
  const structuredData = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : jsonLd ? [jsonLd] : [];
  const alternates = buildLocalizedAlternates(path);

  return (
    <Helmet>
      <html lang={locale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {!noindex
        ? Object.entries(alternates).map(([hrefLang, alternatePath]) => (
            <link
              key={hrefLang}
              rel="alternate"
              hrefLang={hrefLang}
              href={absoluteUrl(alternatePath)}
            />
          ))
        : null}
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content={openGraphLocale[locale] || openGraphLocale.en} />
      <meta
        property="og:locale:alternate"
        content={locale === "fr" ? openGraphLocale.en : openGraphLocale.fr}
      />
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
