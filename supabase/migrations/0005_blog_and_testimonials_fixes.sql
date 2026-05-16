-- Update testimonials policy to match other tables (use auth.role() instead of hardcoded email)
DROP POLICY IF EXISTS "Admin can manage all testimonials" ON public.testimonials;

CREATE POLICY "Admins have full access to testimonials" 
ON public.testimonials FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Add reading_time to blog_posts if not exists
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS reading_time TEXT DEFAULT '5 min';
