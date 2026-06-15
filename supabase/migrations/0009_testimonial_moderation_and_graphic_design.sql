-- Public testimonial moderation and graphic-design project detail fields.

ALTER TABLE public.testimonials
  ALTER COLUMN status SET DEFAULT 'pending';

UPDATE public.testimonials
SET status = CASE
  WHEN status = 'published' THEN 'approved'
  WHEN status = 'draft' THEN 'pending'
  WHEN status IN ('pending', 'approved', 'rejected') THEN status
  ELSE 'pending'
END;

ALTER TABLE public.testimonials
  DROP CONSTRAINT IF EXISTS testimonials_status_check;

ALTER TABLE public.testimonials
  ADD CONSTRAINT testimonials_status_check
  CHECK (status IN ('pending', 'approved', 'rejected'));

ALTER TABLE public.testimonials
  ADD CONSTRAINT testimonials_rating_check
  CHECK (rating BETWEEN 1 AND 5);

CREATE INDEX IF NOT EXISTS idx_testimonials_status
  ON public.testimonials(status);

DROP POLICY IF EXISTS "Public testimonials are viewable by everyone" ON public.testimonials;
DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public can submit testimonials for review" ON public.testimonials;
DROP POLICY IF EXISTS "Admin email can manage testimonials" ON public.testimonials;

CREATE POLICY "Public can view approved testimonials"
ON public.testimonials
FOR SELECT
USING (status = 'approved');

CREATE POLICY "Public can submit testimonials for review"
ON public.testimonials
FOR INSERT
WITH CHECK (
  status = 'pending'
  AND NULLIF(BTRIM(client_name), '') IS NOT NULL
  AND NULLIF(BTRIM(client_role), '') IS NOT NULL
  AND NULLIF(BTRIM(content), '') IS NOT NULL
  AND rating BETWEEN 1 AND 5
);

CREATE POLICY "Admin email can manage testimonials"
ON public.testimonials
FOR ALL
USING (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com');

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS design_images JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS design_details JSONB DEFAULT '{}'::jsonb;

UPDATE public.projects
SET design_images = CASE
  WHEN COALESCE(jsonb_array_length(design_images), 0) > 0 THEN design_images
  WHEN image_url IS NOT NULL AND NULLIF(BTRIM(image_url), '') IS NOT NULL THEN
    jsonb_build_array(jsonb_build_object('src', image_url, 'alt', title || ' main design'))
  ELSE '[]'::jsonb
END
WHERE 'GRAPHICS DESIGN' = ANY(categories)
   OR 'GRAPHIC DESIGN' = ANY(categories);
