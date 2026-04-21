import { db } from '../services/supabase.js'
import { requireAuth } from '../middleware/auth.js'
import { fetchN8nData } from '../services/n8n.js'
import { normalizeAndFilter } from '../services/normalizer.js'

import { enhanceDataWithIntelligence } from '../services/intelligence.js'

/**
 * Rotas do dashboard do cockpit.
 *
 * GET /client/dashboard
 *   - Auth obrigatória (JWT + tenant resolution)
 *   - Busca dados do n8n
 *   - Resolve clientes da empresa do user
 *   - Normaliza e filtra dados
 *   - Aplica a camada de inteligência e diagnóstico
 *   - Retorna formato padronizado
 */
export async function dashboardRoutes(app) {

  app.get('/client/dashboard', { preHandler: requireAuth }, async (request, reply) => {
    const companyId = request.companyId
    const forceRefresh = request.query.refresh === 'true'

    try {
      // 1. Buscar nomes de clientes da empresa no Supabase
      const { data: companyClients, error: clientsError } = await db
        .from('clients')
        .select('name')
        .eq('company_id', companyId)

      if (clientsError) {
        request.log.error({ err: clientsError }, 'Erro ao buscar clientes da empresa')
        return reply.code(500).send({ error: 'Erro ao buscar clientes da empresa' })
      }

      const clientNames = (companyClients || []).map(c => c.name)

      // 2. Buscar dados brutos do n8n
      const n8nPayload = await fetchN8nData({ forceRefresh })

      // 3. Normalizar e filtrar por empresa
      const { data: normalizedData, totalGrupos } = normalizeAndFilter(n8nPayload.data, clientNames)

      // 4. Aplicar Camada de Inteligência
      const data = enhanceDataWithIntelligence(normalizedData)

      // 5. Resposta padronizada
      return reply.send({
        status: 'ok',
        totalGrupos,
        data,
        meta: {
          companyId,
          userId:    request.userId,
          role:      request.userRole,
          source:    'n8n',
          cached:    !forceRefresh,
          fetchedAt: n8nPayload.fetchedAt,
        },
      })
    } catch (err) {
      request.log.error({ err }, 'Erro no dashboard')
      return reply.code(502).send({
        error: 'Erro ao buscar dados de performance',
        detail: err.message,
      })
    }
  })
}
