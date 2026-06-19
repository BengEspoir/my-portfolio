import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import SEO from "../components/SEO";
import PageState from "../components/PageState";
import TypewriterText from "../components/TypewriterText";
import { useI18n } from "../i18n";

export default function NotFound() {
  const { localizedPath, t } = useI18n();

  return (
    <div className="site-container flex min-h-[60vh] items-center justify-center py-24">
      <SEO
        title={t("seo.notFound.title")}
        description={t("seo.notFound.description")}
        path="/404"
        noindex
      />
      <PageState
        title=""
        description={t("notFound.description")}
        className="max-w-xl"
      >
        <TypewriterText
          as="h1"
          text={t("notFound.title")}
          startOnView={false}
          className="text-4xl font-extrabold text-slate-900"
        />
        <Link
          to={localizedPath("/")}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
        >
          <FiArrowLeft /> {t("common.backHome")}
        </Link>
      </PageState>
    </div>
  );
}
