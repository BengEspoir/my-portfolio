import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import SEO from "../components/SEO";
import PageState from "../components/PageState";
import TypewriterText from "../components/TypewriterText";

export default function NotFound() {
  return (
    <div className="site-container flex min-h-[60vh] items-center justify-center py-24">
      <SEO
        title="Page Not Found | Beng Espoir"
        description="The page you are looking for does not exist or has been moved."
        path="/404"
        noindex
      />
      <PageState
        title=""
        description="The page you are looking for does not exist or has been moved."
        className="max-w-xl"
      >
        <TypewriterText
          as="h1"
          text="Page Not Found"
          startOnView={false}
          className="text-4xl font-extrabold text-slate-900"
        />
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
        >
          <FiArrowLeft /> Back Home
        </Link>
      </PageState>
    </div>
  );
}
