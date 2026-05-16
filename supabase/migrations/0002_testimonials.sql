-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_role TEXT,
    client_company TEXT,
    client_image TEXT,
    content TEXT NOT NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    rating INTEGER DEFAULT 5,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public testimonials are viewable by everyone" 
ON public.testimonials FOR SELECT 
USING (status = 'published');

CREATE POLICY "Admin can manage all testimonials" 
ON public.testimonials FOR ALL 
USING (auth.jwt()->>'email' = 'mbengespoir@gmail.com')
WITH CHECK (auth.jwt()->>'email' = 'mbengespoir@gmail.com');
