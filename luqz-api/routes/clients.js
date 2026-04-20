import { db } from '../services/supabase.js'
import { requireAuth } from '../middleware/auth.js'

export async function clientsRoutes(app) {
  app.get('/clients', { preHandler: requireAuth }, async (request, reply) => {
    const { data, error } = await db
      .from('clients')
      .select('*')

    if (error) {
      console.error('Supabase error:', JSON.stringify(error))
      return reply.code(500).send({ error: error.message })
    }

    return reply.send(data)
  })
}
