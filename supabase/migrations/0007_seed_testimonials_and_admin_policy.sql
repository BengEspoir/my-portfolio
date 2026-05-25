-- Seed editable testimonial drafts and restrict testimonial management to the admin email.

DROP POLICY IF EXISTS "Admins have full access to testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin can manage all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin email can manage testimonials" ON public.testimonials;

CREATE POLICY "Admin email can manage testimonials"
ON public.testimonials
FOR ALL
USING (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'mbengespoir@gmail.com');

INSERT INTO public.testimonials (
  id,
  client_name,
  client_role,
  client_company,
  client_image,
  content,
  rating,
  status
)
VALUES
  (
    '11111111-1111-4111-8111-111111111111',
    'Client Testimonial Template',
    'Client / Founder',
    NULL,
    NULL,
    'Replace this draft with a real client quote, then publish it from the admin dashboard.',
    5,
    'draft'
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'Mentor Testimonial Template',
    'Mentor / Senior Designer',
    NULL,
    NULL,
    'Replace this draft with a real mentor quote, then publish it from the admin dashboard.',
    5,
    'draft'
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'Collaborator Testimonial Template',
    'Project Collaborator',
    NULL,
    NULL,
    'Replace this draft with a real collaborator quote, then publish it from the admin dashboard.',
    5,
    'draft'
  )
ON CONFLICT (id) DO UPDATE SET
  client_name = EXCLUDED.client_name,
  client_role = EXCLUDED.client_role,
  client_company = EXCLUDED.client_company,
  client_image = EXCLUDED.client_image,
  content = EXCLUDED.content,
  rating = EXCLUDED.rating,
  status = EXCLUDED.status;
