
-- Create knowledge_sources table
CREATE TABLE IF NOT EXISTS public.knowledge_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT false,
  last_synced TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create an index on the active column for faster queries
CREATE INDEX IF NOT EXISTS idx_knowledge_sources_active ON public.knowledge_sources(active);

-- Ensure the table has RLS enabled
ALTER TABLE public.knowledge_sources ENABLE ROW LEVEL SECURITY;

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_knowledge_sources_updated_at
BEFORE UPDATE ON public.knowledge_sources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Default admin policy (you can adjust this based on your auth requirements)
CREATE POLICY "Allow full access to admin users" ON public.knowledge_sources
  USING (true)  -- In a real app, you might want to limit this based on user role
  WITH CHECK (true);
