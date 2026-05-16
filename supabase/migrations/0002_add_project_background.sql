-- Add project_background column that the frontend CaseStudyPage expects
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS project_background TEXT;
