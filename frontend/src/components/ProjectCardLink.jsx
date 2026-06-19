import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useI18n } from "../i18n";

export default function ProjectCardLink({ label, to, href, className = "" }) {
  const { localizedPath } = useI18n();
  const content = (
    <>
      <span>{label}</span>
      <FiArrowRight />
    </>
  );

  if (to) {
    return (
      <Link to={localizedPath(to)} className={`premium-link ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer" 
      className={`premium-link ${className}`}
    >
      {content}
    </a>
  );
}
