-- Migration V3: Sistema de Alertas & Eventos
-- Cria a tabela para persistência de decisões do motor de inteligência

CREATE TABLE IF NOT EXISTS public.alerts_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    cliente TEXT NOT NULL,
    funil TEXT NOT NULL,
    prioridade TEXT NOT NULL,
    "impactoFinanceiroEstimado" NUMERIC(15,2) DEFAULT 0,
    resolvido BOOLEAN NOT NULL DEFAULT false,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    expira_em TIMESTAMP WITH TIME ZONE DEFAULT (timezone('utc'::text, now()) + interval '6 hours') NOT NULL,
    
    -- ForeignKey: Garante que pertence a uma company existente (mesma lógica das models de multitenancy)
    CONSTRAINT fk_alerts_company FOREIGN KEY (company_id)
        REFERENCES companies (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Index para otimização de consultas da intelligence layer (evitar repetição no serviço)
CREATE INDEX idx_alerts_unresolved ON public.alerts_events (company_id, cliente, funil) WHERE resolvido = false AND expira_em > timezone('utc'::text, now());

-- RLS (Row Level Security) - Protegendo cross-tenant
ALTER TABLE public.alerts_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Isolar registros de alertas por tenant" 
    ON public.alerts_events 
    FOR ALL 
    USING (
      company_id IN (
        SELECT company_id 
        FROM memberships 
        WHERE user_id = auth.uid()
      )
    );
