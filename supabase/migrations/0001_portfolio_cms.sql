-- 1. ENUMS
DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('draft', 'published', 'archived');
    CREATE TYPE blog_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Basic Info
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    categories TEXT[] NOT NULL DEFAULT '{}',
    project_type TEXT,
    client_company TEXT,
    project_year TEXT,
    status project_status DEFAULT 'draft' NOT NULL,
    is_latest BOOLEAN DEFAULT false NOT NULL,
    sort_order INTEGER DEFAULT 0,

    -- Card Config
    image_url TEXT, -- Thumbnail
    card_subtitle TEXT,
    badge_text TEXT,
    show_latest_badge BOOLEAN DEFAULT true NOT NULL,
    cta_label TEXT,
    cta_type TEXT DEFAULT 'default', -- 'case-study', 'full-design', 'prototype', etc.
    cta_link TEXT,
    is_featured BOOLEAN DEFAULT false NOT NULL,

    -- Case Study Config
    case_study_title TEXT,
    hero_image_url TEXT,
    problem_statement TEXT,
    project_goal TEXT,
    role TEXT,
    tools_tech TEXT[] DEFAULT '{}',
    design_journey TEXT,
    challenges TEXT,
    solution TEXT,
    outcome TEXT,
    preview_screens TEXT[] DEFAULT '{}',
    ux_flow JSONB DEFAULT '[]', -- Array of {title, content}
    
    -- Links
    prototype_url TEXT,
    prototype_embed TEXT,
    live_url TEXT,
    github_url TEXT,
    figma_url TEXT,
    video_url TEXT,
    apk_url TEXT,
    download_url TEXT,
    brand_color TEXT DEFAULT '#6366f1',

    -- SEO
    seo_title TEXT,
    seo_description TEXT
);

-- 3. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL, -- Markdown
    cover_image_url TEXT,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    status blog_status DEFAULT 'draft' NOT NULL,
    author_name TEXT DEFAULT 'Mbeng Espoir',
    author_image_url TEXT,
    
    -- SEO
    seo_title TEXT,
    seo_description TEXT
);

-- 4. CONTACTS TABLE
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    source_page TEXT,
    is_read BOOLEAN DEFAULT false NOT NULL
);

-- 5. INDEXES
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_is_latest ON public.projects(is_latest);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at);

-- 6. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 7. POLICIES

-- Projects: Public Read (only published)
CREATE POLICY "Public can view published projects" ON public.projects
    FOR SELECT USING (status = 'published');

-- Projects: Admin Full Access
CREATE POLICY "Admins have full access to projects" ON public.projects
    FOR ALL USING (auth.role() = 'authenticated');

-- Blog: Public Read (only published)
CREATE POLICY "Public can view published blog posts" ON public.blog_posts
    FOR SELECT USING (status = 'published');

-- Blog: Admin Full Access
CREATE POLICY "Admins have full access to blog posts" ON public.blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

-- Contacts: Public Insert Only
CREATE POLICY "Public can submit contact form" ON public.contacts
    FOR INSERT WITH CHECK (true);

-- Contacts: Admin Read/Update/Delete
CREATE POLICY "Admins have full access to contacts" ON public.contacts
    FOR ALL USING (auth.role() = 'authenticated');

-- 8. AUTOMATIC UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
