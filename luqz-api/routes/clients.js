import { db } from '../services/supabase.js'
import { requireAuth } from '../middleware/auth.js'

export async function clientsRoutes(app) {
  // GET /clients — lista clientes da empresa do usuário
  app.get('/clients', { preHandler: requireAuth }, async (request, reply) => {
    const { data, error } = await db
      .from('clients')
      .select('*')
      .eq('company_id', request.companyId)
      .order('name')

    if (error) {
      console.error('Supabase error:', JSON.stringify(error))
      return reply.code(500).send({ error: error.message })
    }

    return reply.send(data)
  })

  // GET /clients/:id — detalhe de um cliente (com validação de ownership)
  app.get('/clients/:id', { preHandler: requireAuth }, async (request, reply) => {
    const { id } = request.params

    const { data, error } = await db
      .from('clients')
      .select('*')
      .eq('id', id)
      .eq('company_id', request.companyId)
      .single()

    if (error || !data) {
      return reply.code(404).send({ error: 'Cliente não encontrado' })
    }

    return reply.send(data)
  })
}
