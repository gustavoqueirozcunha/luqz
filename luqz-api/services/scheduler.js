import cron from 'node-cron';
import { db as supabase } from './supabase.js';
import { fetchN8nData } from './n8n.js';
import { normalizeAndFilter } from './normalizer.js';
import { enhanceDataWithIntelligence } from './intelligence.js';
import { processEventsFromDashboard } from './alertsService.js';

/**
 * Agendador Automático LUQZ OS
 * Executa o processamento global de alertas a cada 1 hora.
 */

export function initScheduler(app) {
  app.log.info('🕒 Agendador de Alertas LUQZ iniciado (Padrão: 1h)');

  // 0 * * * * = Toda hora no minuto 0
  cron.schedule('0 * * * *', async () => {
    app.log.info('🚀 Iniciando processamento automático de alertas (Execução Horária)');
    
    try {
      // 1. Fetch Companies
      const { data: companies, error: cmpError } = await supabase.from('companies').select('id');
      if (cmpError || !companies) throw new Error("Erro ao buscar empresas");

      // 2. Fetch N8N Data once
      const n8nPayload = await fetchN8nData();
      
      let totalEvents = 0;

      // 3. Process each
      for (const comp of companies) {
        try {
          const { data: companyClients } = await supabase
            .from('clients')
            .select('name')
            .eq('company_id', comp.id);
          
          const clientNames = (companyClients || []).map(c => c.name);
          const { data: normalizedData } = normalizeAndFilter(n8nPayload.data, clientNames);
          const intelligentData = enhanceDataWithIntelligence(normalizedData);
          
          const { created } = await processEventsFromDashboard(comp.id, intelligentData);
          totalEvents += created;
        } catch (err) {
          app.log.error(`Erro processando empresa ${comp.id}: ${err.message}`);
        }
      }

      app.log.info({
        msg: '✅ Processamento automático concluído com sucesso',
        stats: {
          companiesProcessed: companies.length,
          eventsCreated: totalEvents
        }
      });

    } catch (err) {
      app.log.error(`❌ Falha no worker automático: ${err.message}`);
    }
  });

  // Execução imediata para teste (opcional, vamos deixar apenas o agendamento por ora)
}
