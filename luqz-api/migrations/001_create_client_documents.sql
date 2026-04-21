-- Migration: Create client_documents table
-- Desc: Stores metadata and external links for client documents.

CREATE TABLE IF NOT EXISTS public.client_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    cliente TEXT NOT NULL, -- Associate with project/funnel name
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Estratégia', 'Planejamento', 'Operação', 'Criativo', 'Acessos', 'Torre de Controle')),
    description TEXT,
    source_type TEXT NOT NULL CHECK (source_type IN ('clickup', 'drive', 'internal_link', 'file')),
    external_url TEXT NOT NULL,
    is_published BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for secure multi-tenant access
CREATE INDEX IF NOT EXISTS idx_docs_company_id ON public.client_documents(company_id);
CREATE INDEX IF NOT EXISTS idx_docs_cliente ON public.client_documents(cliente);

-- Enable RLS (Recommended for Supabase)
ALTER TABLE public.client_documents ENABLE ROW LEVEL SECURITY;

-- Note: Policies should be created in Supabase UI to match application logic if using direct client access.
-- Here we access via Service Key in Backend, so RLS is bypassed by the service key, but good practice to have.
