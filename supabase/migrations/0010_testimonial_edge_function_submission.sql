-- Route public testimonial submissions through the submit-testimonial Edge Function.
-- Approved testimonials remain publicly readable; direct anonymous inserts are disabled.

DROP POLICY IF EXISTS "Public can submit testimonials for review" ON public.testimonials;
DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin email can manage testimonials" ON public.testimonials;

GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO service_role;

CREATE POLICY "Public can view approved testimonials"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

CREATE POLICY "Admin email can manage testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com');
