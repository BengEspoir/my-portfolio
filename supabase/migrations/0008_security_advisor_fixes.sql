-- Address Supabase Security Advisor warnings without storing secrets in SQL.

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

ALTER FUNCTION public.update_updated_at_column() SET search_path = public, pg_temp;

DROP POLICY IF EXISTS "Admins have full access to projects" ON public.projects;
DROP POLICY IF EXISTS "Admins have full access to blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins have full access to contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins have full access to testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin can manage all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin email can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins have full access to appointments" ON public.appointments;

CREATE POLICY "Admin email can manage projects"
ON public.projects
FOR ALL
USING (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com');

CREATE POLICY "Admin email can manage blog posts"
ON public.blog_posts
FOR ALL
USING (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com');

CREATE POLICY "Admin email can manage contacts"
ON public.contacts
FOR ALL
USING (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com');

CREATE POLICY "Admin email can manage testimonials"
ON public.testimonials
FOR ALL
USING (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com');

CREATE POLICY "Admin email can manage appointments"
ON public.appointments
FOR ALL
USING (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com');

DROP POLICY IF EXISTS "Public can submit contact form" ON public.contacts;

CREATE POLICY "Public can submit valid contact form"
ON public.contacts
FOR INSERT
WITH CHECK (
  NULLIF(BTRIM(name), '') IS NOT NULL
  AND NULLIF(BTRIM(email), '') IS NOT NULL
  AND email LIKE '%@%.%'
  AND NULLIF(BTRIM(subject), '') IS NOT NULL
  AND NULLIF(BTRIM(message), '') IS NOT NULL
);

DROP POLICY IF EXISTS "Public can create appointments" ON public.appointments;

CREATE POLICY "Public can create valid appointments"
ON public.appointments
FOR INSERT
WITH CHECK (
  NULLIF(BTRIM(client_name), '') IS NOT NULL
  AND NULLIF(BTRIM(client_email), '') IS NOT NULL
  AND client_email LIKE '%@%.%'
  AND NULLIF(BTRIM(purpose), '') IS NOT NULL
  AND meeting_date >= CURRENT_DATE
  AND meeting_time IS NOT NULL
  AND platform IN ('Google Meet', 'Zoom')
);

-- The portfolio-assets bucket is intentionally public because project cards and
-- portfolio images currently use public URLs. Convert that bucket to private only
-- after the frontend has signed-URL support, otherwise public images will break.
