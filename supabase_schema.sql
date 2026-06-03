-- Create inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    country TEXT,
    message TEXT NOT NULL,
    selected_products JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'new' NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public submission from contact form)
CREATE POLICY "Allow public inserts" ON public.inquiries
    FOR INSERT WITH CHECK (true);

-- Allow authenticated select (for B2B dashboard coordinates)
CREATE POLICY "Allow authenticated reads" ON public.inquiries
    FOR SELECT TO authenticated USING (true);
