import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations } from "./translations";

export const defaultLocale = "en";
export const supportedLocales = ["en", "fr"];

const localePrefixPattern = /^\/(fr)(?=\/|$)/;
const filePathPattern = /^\/[^?#]+\.[a-z0-9]{2,6}(?=$|[?#])/i;
const publicExcludedPrefixes = [
  "/admin",
  "/p/admin-access",
  "/assets",
  "/images",
  "/icons",
  "/generated",
  "/resume.pdf",
  "/favicon",
  "/sitemap.xml",
  "/robots.txt",
  "/site.webmanifest"
];

const LanguageContext = createContext(null);

function getValue(source, key) {
  if (!key) return source;
  return key.split(".").reduce((current, segment) => {
    if (current && Object.prototype.hasOwnProperty.call(current, segment)) {
      return current[segment];
    }
    return undefined;
  }, source);
}

function interpolate(value, replacements = {}) {
  if (typeof value !== "string") return value;
  return value.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, token) =>
    Object.prototype.hasOwnProperty.call(replacements, token) ? replacements[token] : match
  );
}

export function getLocaleFromPath(pathname = "/") {
  const match = pathname.match(localePrefixPattern);
  return match?.[1] || defaultLocale;
}

export function stripLocaleFromPath(pathname = "/") {
  const stripped = pathname.replace(localePrefixPattern, "") || "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

export function isPublicLocalizablePath(to) {
  if (typeof to !== "string") return false;
  if (!to || to.startsWith("#")) return false;
  if (/^(https?:|mailto:|tel:)/i.test(to)) return false;
  if (!to.startsWith("/")) return false;

  const pathname = to.split(/[?#]/)[0] || "/";
  const basePath = stripLocaleFromPath(pathname);

  if (filePathPattern.test(basePath)) return false;
  return !publicExcludedPrefixes.some((prefix) => basePath === prefix || basePath.startsWith(`${prefix}/`));
}

export function localizePath(to = "/", locale = defaultLocale) {
  if (!isPublicLocalizablePath(to)) return to;

  const [pathAndSearch, hash = ""] = to.split("#");
  const [pathname = "/", search = ""] = pathAndSearch.split("?");
  const basePath = stripLocaleFromPath(pathname);
  const normalizedLocale = supportedLocales.includes(locale) ? locale : defaultLocale;
  const localizedPath =
    normalizedLocale === "fr" ? (basePath === "/" ? "/fr" : `/fr${basePath}`) : basePath;

  return `${localizedPath}${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;
}

export function buildLocalizedAlternates(path = "/") {
  const basePath = stripLocaleFromPath(String(path).split(/[?#]/)[0] || "/");

  return {
    en: localizePath(basePath, "en"),
    fr: localizePath(basePath, "fr"),
    "x-default": localizePath(basePath, "en")
  };
}

export function translate(locale, key, replacements) {
  const normalizedLocale = supportedLocales.includes(locale) ? locale : defaultLocale;
  const localizedValue = getValue(translations[normalizedLocale], key);
  const fallbackValue = getValue(translations[defaultLocale], key);
  const value = localizedValue ?? fallbackValue ?? key;
  return interpolate(value, replacements);
}

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const locale = getLocaleFromPath(location.pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key, replacements) => translate(locale, key, replacements),
    [locale]
  );

  const localizedPath = useCallback(
    (to, nextLocale = locale) => localizePath(to, nextLocale),
    [locale]
  );

  const switchLocale = useCallback(
    (nextLocale) => {
      const basePath = stripLocaleFromPath(location.pathname);
      navigate(localizePath(`${basePath}${location.search}${location.hash}`, nextLocale));
    },
    [location.hash, location.pathname, location.search, navigate]
  );

  const value = useMemo(
    () => ({
      locale,
      t,
      localizedPath,
      switchLocale
    }),
    [locale, localizedPath, switchLocale, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return context;
}
