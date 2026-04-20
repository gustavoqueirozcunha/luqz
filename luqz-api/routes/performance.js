import { db } from '../services/supabase.js'
import { requireAuth } from '../middleware/auth.js'

export async function performanceRoutes(app) {
  app.get('/performance/:clientId', { preHandler: requireAuth }, async (request, reply) => {
    const { clientId } = request.params
    const { from, to } = request.query

    let query = db
      .from('performance_records')
      .select('*')
      .eq('client_id', clientId)
      .order('date', { ascending: true })

    if (from) query = query.gte('date', from)
    if (to)   query = query.lte('date', to)

    const { data, error } = await query

    if (error) {
      console.error('Performance error:', JSON.stringify(error))
      return reply.code(500).send({ error: error.message })
    }

    return reply.send(data)
  })
}
