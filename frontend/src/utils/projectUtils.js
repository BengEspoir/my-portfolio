/**
 * Determines the correct CTA link for a project based on its type and slug.
 * This ensures dynamic routing to Case Study or Full Design pages if no specific link is provided.
 */
export function getProjectCtaLink(project) {
  const { slug, cta_type, cta_link, ctaType, ctaLink } = project;
  
  // Handle both snake_case (direct from DB) and camelCase (mapped in components)
  const type = cta_type || ctaType;
  const rawLink = cta_link || ctaLink;
  const link = typeof rawLink === 'string' && rawLink.includes('PLACEHOLDER-LINK') ? '' : rawLink;
  const projectSlug = slug;

  if (!projectSlug) return link || '';

  // If it's a Case Study or Full Design and doesn't have a specific external link,
  // route to our internal dynamic pages.
  if (type === 'case-study' && (!link || !link.startsWith('http'))) {
    return `/projects/${projectSlug}/case-study`;
  }
  
  if (type === 'full-design' && (!link || !link.startsWith('http'))) {
    return `/projects/${projectSlug}/full-design`;
  }

  return link || '';
}

export function isGraphicDesignProject(project) {
  return (project?.categories || []).some((category) => {
    const normalized = String(category).trim().toUpperCase();
    return normalized === 'GRAPHICS DESIGN' || normalized === 'GRAPHIC DESIGN';
  });
}
