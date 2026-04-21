import { fetchN8nData } from '../services/n8n.js'
import { normalizeAndFilter } from '../services/normalizer.js'
import { enhanceDataWithIntelligence } from '../services/intelligence.js'
import { processEventsFromDashboard } from '../services/alertsService.js'

import { db as supabase } from '../services/supabase.js'

export async function internalRoutes(fastify) {
  fastify.post('/internal/process-alerts', async (request, reply) => {
    // 1. Validate Secret
    const internalSecret = request.headers['x-internal-secret'];
    if (!process.env.INTERNAL_SECRET || internalSecret !== process.env.INTERNAL_SECRET) {
      return reply.code(401).send({ error: "Unauthorized access" });
    }

    try {
      // 2. Escala: Fetch all companies to process automatically
      const { data: companies, error: cmpError } = await supabase.from('companies').select('id');
      if (cmpError || !companies) {
        throw new Error("Failed to fetch companies list: " + (cmpError?.message || "Unknown error"));
      }

      // Pre-fetch n8n data once (since it's common for all companies)
      const n8nPayload = await fetchN8nData();

      let totalProcessed = 0;
      let totalCreated = 0;
      let totalIgnored = 0;
      let errors = [];

      // 3. Process each company sequentially
      for (const comp of companies) {
        try {
          // 3a. Fetch clients names for this specific company
          const { data: companyClients, error: clientsError } = await supabase
            .from('clients')
            .select('name')
            .eq('company_id', comp.id);

          if (clientsError) throw new Error(`Clients error: ${clientsError.message}`);
          
          const clientNames = (companyClients || []).map(c => c.name);

          // 3b. Normalize and FILTER by company clients
          const { data: normalizedData } = normalizeAndFilter(n8nPayload.data, clientNames);
          
          // 3c. Apply Intelligence
          const intelligentData = enhanceDataWithIntelligence(normalizedData);
          
          // 3d. Create events for actionable items
          const { processed, created, ignored } = await processEventsFromDashboard(comp.id, intelligentData);
          
          totalProcessed += processed;
          totalCreated += created;
          totalIgnored += ignored;
        } catch (compErr) {
          request.log.error(`Failed processing company ${comp.id}: ${compErr.message}`);
          errors.push({ company_id: comp.id, error: compErr.message });
        }
      }

      return { 
        success: true, 
        message: 'Global alert processing completed',
        stats: {
          totalCompanies: companies.length,
          totalProcessed,
          eventsCreated: totalCreated,
          eventsIgnored: totalIgnored
        },
        errors: errors.length > 0 ? errors : undefined
      };

    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Internal processing failed", details: err.message });
    }
  });

  // GET /internal/alerts-ranking
  // Lista os 10 problemas globais mais caros gerados em todos os tenants
  fastify.get('/internal/alerts-ranking', async (request, reply) => {
    // 1. Validate Secret
    const internalSecret = request.headers['x-internal-secret'];
    if (!process.env.INTERNAL_SECRET || internalSecret !== process.env.INTERNAL_SECRET) {
      return reply.code(401).send({ error: "Unauthorized access" });
    }

    try {
      // 2. Fetch Ranking
      const { data: ranking, error } = await supabase
        .from('alerts_events')
        .select('*')
        .eq('resolvido', false)
        .gt('expira_em', new Date().toISOString())
        .order('impactoFinanceiroEstimado', { ascending: false })
        .limit(10);

      if (error) {
        throw new Error("Failed fetching ranking: " + error.message);
      }

      // 3. Format output
      const formattedRanking = (ranking || []).map((item, index) => ({
        posicao: index + 1,
        company_id: item.company_id,
        cliente: item.cliente,
        funil: item.funil,
        prioridade: item.prioridade,
        impacto_financeiro_estimado: item.impactoFinanceiroEstimado,
        criado_em: item.criado_em
      }));

      return {
        success: true,
        data: formattedRanking
      };
      
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Failed to fetch ranking", details: err.message });
    }
  });

  // GET /internal/performance-ranking
  // Lista os 10 melhores funis operando de forma saudável (Métrica "Campeões")
  fastify.get('/internal/performance-ranking', async (request, reply) => {
    // 1. Validate Secret
    const internalSecret = request.headers['x-internal-secret'];
    if (!process.env.INTERNAL_SECRET || internalSecret !== process.env.INTERNAL_SECRET) {
      return reply.code(401).send({ error: "Unauthorized access" });
    }

    try {
      // 2. Escala: Fetch all active companies to process automatically
      const { data: companies, error: cmpError } = await supabase.from('companies').select('id');
      if (cmpError || !companies) {
        throw new Error("Failed to fetch companies list: " + (cmpError?.message || "Unknown error"));
      }

      let allPerformances = [];

      // 3. Process each company to get live intel 
      // (We read direct from intelligence layer as asked, it doesn't use DB persisted events)
      for (const comp of companies) {
        try {
          const rawData = await n8nService.fetchPerformanceData(comp.id);
          const normalized = normalizer.normalize(rawData);
          const intelligentData = enhanceDataWithIntelligence(normalized);
          
          allPerformances.push(...intelligentData);
        } catch (compErr) {
          // ignore failed fetches to not break ranking
        }
      }

      // 4. Filtrar Saudável e Atenção
      const healthyFunnels = allPerformances.filter(d => d.status === 'saudavel' || d.status === 'atencao');

      // 5. Ordenar por Variação Percentual Crescente (Menor = Melhor/Mais Econômico em relação a meta)
      healthyFunnels.sort((a, b) => a.kpis.principal.variacaoPercentual - b.kpis.principal.variacaoPercentual);

      // 6. Formatar Saída (Top 10)
      const formattedRanking = healthyFunnels.slice(0, 10).map((item, index) => ({
        posicao: index + 1,
        cliente: item.cliente,
        funil: item.funil,
        kpi: item.kpis.principal.nome,
        variacaoPercentual: item.kpis.principal.variacaoPercentual,
        status: item.status
      }));

      return {
        success: true,
        data: formattedRanking
      };

    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Internal processing failed", details: err.message });
    }
  });

  // GET /internal/financial-overview
  // Retorna o impacto financeiro total (vazamento) e número de alertas ativos no sistema
  fastify.get('/internal/financial-overview', async (request, reply) => {
    // 1. Validate Secret
    const internalSecret = request.headers['x-internal-secret'];
    if (!process.env.INTERNAL_SECRET || internalSecret !== process.env.INTERNAL_SECRET) {
      return reply.code(401).send({ error: "Unauthorized access" });
    }

    try {
      const now = new Date();
      const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
      const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);

      // 2. Query IMPACTO ATUAL (Alertas ativos e não resolvidos)
      const { data: activeAlerts, error: errorAtual } = await supabase
        .from('alerts_events')
        .select('impactoFinanceiroEstimado')
        .eq('resolvido', false)
        .gt('expira_em', now.toISOString());

      if (errorAtual) throw new Error("Failed fetching current financial data: " + errorAtual.message);

      const totalAlertas = activeAlerts.length;
      const impactoTotal = activeAlerts.reduce((sum, item) => sum + Number(item.impactoFinanceiroEstimado || 0), 0);

      // 3. Query IMPACTO ANTERIOR (Alertas criados na janela anterior [12h atrás até 6h atrás])
      // Usamos criado_em para pegar o "clique" do que foi detectado naquele período
      const { data: previousAlerts, error: errorAnterior } = await supabase
        .from('alerts_events')
        .select('impactoFinanceiroEstimado')
        .gte('criado_em', twelveHoursAgo.toISOString())
        .lt('criado_em', sixHoursAgo.toISOString());

      if (errorAnterior) throw new Error("Failed fetching previous financial data: " + errorAnterior.message);

      const impactoAnterior = previousAlerts.reduce((sum, item) => sum + Number(item.impactoFinanceiroEstimado || 0), 0);
      
      const variacaoImpacto = impactoTotal - impactoAnterior;

      return {
        success: true,
        data: {
          impactoTotal: Number(impactoTotal.toFixed(2)),
          impactoAnterior: Number(impactoAnterior.toFixed(2)),
          variacaoImpacto: Number(variacaoImpacto.toFixed(2)),
          totalAlertas,
          timestamp: now.toISOString()
        }
      };

    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Failed to fetch financial overview", details: err.message });
    }
  });
}
