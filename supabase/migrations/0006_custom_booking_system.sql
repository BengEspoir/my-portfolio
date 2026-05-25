-- Create appointments table for custom booking system
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    company_name TEXT,
    purpose TEXT NOT NULL,
    meeting_date DATE NOT NULL,
    meeting_time TIME NOT NULL,
    duration TEXT DEFAULT '30 min',
    timezone TEXT DEFAULT 'UTC',
    platform TEXT NOT NULL CHECK (platform IN ('Google Meet', 'Zoom')),
    meeting_link TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can create appointments" 
ON public.appointments FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins have full access to appointments" 
ON public.appointments FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Trigger for updated_at
CREATE TRIGGER update_appointments_updated_at 
BEFORE UPDATE ON public.appointments 
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
