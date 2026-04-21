import { db as supabase } from './supabase.js';

export async function processEventsFromDashboard(company_id, intelligenceData) {
  // intelligenceData is the array returned by enhanceDataWithIntelligence
  const actionable = intelligenceData.filter(d => d.acaoImediata === true);
  if (actionable.length === 0) return { processed: intelligenceData.length, created: 0, ignored: 0 };

  let createdCount = 0;
  let ignoredCount = 0;

  for (const item of actionable) {
    const { cliente, funil, prioridade, impactoFinanceiroEstimado } = item;
    
    // Check if there is already an unresolved event for this client + funnel
    const { data: existing } = await supabase
      .from('alerts_events')
      .select('id')
      .eq('company_id', company_id)
      .eq('cliente', cliente)
      .eq('funil', funil)
      .eq('resolvido', false)
      .gt('expira_em', new Date().toISOString())
      .limit(1);
      
    if (existing && existing.length > 0) {
      ignoredCount++;
      console.info(JSON.stringify({
        event: "ALERT_DUPLICATED",
        cliente,
        funil,
        prioridade,
        timestamp: new Date().toISOString()
      }));
      continue; // Skip as it's already logged and waiting action
    }

    // Insert new event
    const { error } = await supabase
      .from('alerts_events')
      .insert({
        company_id,
        cliente,
        funil,
        prioridade,
        impactoFinanceiroEstimado,
        resolvido: false
      });

    if (!error) {
      createdCount++;
      console.info(JSON.stringify({
        event: "ALERT_CREATED",
        cliente,
        funil,
        impactoFinanceiroEstimado,
        prioridade,
        timestamp: new Date().toISOString()
      }));
    } else {
      console.error(JSON.stringify({
        event: "ALERT_CREATION_FAILED",
        cliente,
        funil,
        error: error.message,
        timestamp: new Date().toISOString()
      }));
    }
  }

  return { processed: intelligenceData.length, created: createdCount, ignored: ignoredCount };
}
