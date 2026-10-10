-- -------------------------------------------------------------
-- Shiveshwar Textiles: Inquiries Database Schema
-- Run this in the Supabase Dashboard -> SQL Editor
-- -------------------------------------------------------------

-- 1. Create inquiries table
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

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.inquiries (email);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 4. Allow public anonymous submissions from the website contact form
DROP POLICY IF EXISTS "Allow public inserts" ON public.inquiries;
CREATE POLICY "Allow public inserts" ON public.inquiries
    FOR INSERT 
    TO public
    WITH CHECK (true);

-- 5. Allow authenticated dashboard users to read inquiries
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.inquiries;
CREATE POLICY "Allow authenticated reads" ON public.inquiries
    FOR SELECT 
    TO authenticated 
    USING (true);

