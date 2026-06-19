-- Add dashboard-managed experience entries for the public portfolio.
-- Public visitors can only read published entries; the admin email manages all rows.

CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  period TEXT,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}' NOT NULL,
  title_fr TEXT,
  period_fr TEXT,
  description_fr TEXT,
  tags_fr TEXT[] DEFAULT '{}' NOT NULL,
  status TEXT DEFAULT 'draft' NOT NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  CONSTRAINT experiences_status_check CHECK (status IN ('draft', 'published', 'archived'))
);

CREATE INDEX IF NOT EXISTS idx_experiences_status
  ON public.experiences(status);

CREATE INDEX IF NOT EXISTS idx_experiences_sort_order
  ON public.experiences(sort_order);

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.experiences TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.experiences TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.experiences TO service_role;

DROP POLICY IF EXISTS "Public can view published experiences" ON public.experiences;
DROP POLICY IF EXISTS "Admin email can manage experiences" ON public.experiences;

CREATE POLICY "Public can view published experiences"
ON public.experiences
FOR SELECT
USING (status = 'published');

CREATE POLICY "Admin email can manage experiences"
ON public.experiences
FOR ALL
USING (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com');

DROP TRIGGER IF EXISTS update_experiences_updated_at ON public.experiences;

CREATE TRIGGER update_experiences_updated_at
BEFORE UPDATE ON public.experiences
FOR EACH ROW
EXECUTE PROCEDURE public.update_updated_at_column();

INSERT INTO public.experiences (
  slug,
  company,
  title,
  period,
  description,
  tags,
  title_fr,
  period_fr,
  description_fr,
  tags_fr,
  status,
  sort_order
) VALUES
(
  'nephus-ui-ux-web-development-intern',
  'Nephus',
  'UI/UX and Web Development Intern - Nephus',
  'June 2024 - September 2024',
  'Completed practical UI/UX design training and contributed to frontend implementation while applying Git-based version control in a team environment.',
  ARRAY['Internship', 'UI/UX', 'Web Dev', 'Git'],
  'Stagiaire UI/UX et developpement web - Nephus',
  'Juin 2024 - Septembre 2024',
  'Formation pratique en UI/UX design et contribution a l''implementation frontend avec utilisation de Git en equipe.',
  ARRAY['Stage', 'UI/UX', 'Web Dev', 'Git'],
  'published',
  10
),
(
  'freelance-ui-ux-small-business-projects',
  'Freelance',
  'Freelance UI/UX Designer - Small Business Projects',
  'October 2024 - Present',
  'Designed landing pages, wireframes, and brand visuals for small businesses, focusing on clear messaging and conversion-oriented layouts.',
  ARRAY['Freelance', 'Wireframing', 'Branding', 'Prototyping'],
  'UI/UX Designer freelance - Projets pour petites entreprises',
  'Octobre 2024 - Present',
  'Conception de landing pages, wireframes et visuels de marque pour petites entreprises, avec un accent sur le message clair et la conversion.',
  ARRAY['Freelance', 'Wireframing', 'Branding', 'Prototypage'],
  'published',
  20
),
(
  'academic-software-engineering-collaborations',
  'Academic',
  'Academic Software Engineering Collaborations',
  '2023 - Present',
  'Built team projects with React and modern web tooling, collaborating through GitHub workflows and sprint-style planning.',
  ARRAY['Teamwork', 'React', 'Agile', 'Version Control'],
  'Collaborations academiques en genie logiciel',
  '2023 - Present',
  'Realisation de projets d''equipe avec React et des outils web modernes, en collaborant via GitHub et une organisation en sprints.',
  ARRAY['Equipe', 'React', 'Agile', 'Version Control'],
  'published',
  30
),
(
  'portfolio-design-frontend-development',
  'Portfolio',
  'Design and Frontend Portfolio Development',
  '2024 - Present',
  'Created case studies and interactive portfolio pages to document design process, implementation choices, and final outcomes.',
  ARRAY['Case Studies', 'Frontend', 'Storytelling', 'UX Process'],
  'Developpement design et frontend du portfolio',
  '2024 - Present',
  'Creation de case studies et pages interactives pour documenter le processus design, les choix d''implementation et les resultats.',
  ARRAY['Case Studies', 'Frontend', 'Storytelling', 'Processus UX'],
  'published',
  40
)
ON CONFLICT (slug) DO UPDATE SET
  company = EXCLUDED.company,
  title = EXCLUDED.title,
  period = EXCLUDED.period,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags,
  title_fr = EXCLUDED.title_fr,
  period_fr = EXCLUDED.period_fr,
  description_fr = EXCLUDED.description_fr,
  tags_fr = EXCLUDED.tags_fr,
  status = EXCLUDED.status,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();
