import { db } from '../services/supabase.js'
import { requireAuth } from '../middleware/auth.js'

/**
 * Módulo de Documentos por Cliente
 * CRUD Seguro com isolamento por tenant (company_id)
 */
export async function documentRoutes(app) {
  
  // Middleware de autenticação global para este plugin
  app.addHook('preHandler', requireAuth)

  // ── Listar Documentos ───────────────────────────────────────────────────
  app.get('/client/documents', async (request, reply) => {
    const { companyId, userRole } = request
    const { cliente } = request.query

    let query = db
      .from('client_documents')
      .select('*')
      .eq('company_id', companyId)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    // Se não for admin, vê apenas publicados
    if (userRole !== 'admin') {
      query = query.eq('is_published', true)
    }

    // Filtro opcional por cliente (apoio/fallback)
    if (cliente) {
      query = query.eq('cliente', cliente)
    }

    const { data, error } = await query

    if (error) {
      return reply.code(500).send({ error: 'Erro ao buscar documentos' })
    }

    return reply.send(data)
  })

  // ── Criar Documento ─────────────────────────────────────────────────────
  app.post('/client/documents', async (request, reply) => {
    const { companyId } = request
    const docData = request.body

    // Injeção forçada de company_id para segurança
    const { data, error } = await db
      .from('client_documents')
      .insert({
        ...docData,
        company_id: companyId,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      return reply.code(500).send({ error: 'Erro ao criar documento: ' + error.message })
    }

    return reply.code(201).send(data)
  })

  // ── Editar Documento ────────────────────────────────────────────────────
  app.patch('/client/documents/:id', async (request, reply) => {
    const { companyId } = request
    const { id } = request.params
    const updates = request.body

    // Remover campos sensíveis se enviados pelo front por engano
    delete updates.company_id
    delete updates.id

    const { data, error } = await db
      .from('client_documents')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('company_id', companyId) // Garantia de posse do documento
      .select()
      .single()

    if (error) {
      return reply.code(500).send({ error: 'Erro ao atualizar documento' })
    }

    return reply.send(data)
  })

  // ── Remover Documento ───────────────────────────────────────────────────
  app.delete('/client/documents/:id', async (request, reply) => {
    const { companyId } = request
    const { id } = request.params

    const { error } = await db
      .from('client_documents')
      .delete()
      .eq('id', id)
      .eq('company_id', companyId)

    if (error) {
      return reply.code(500).send({ error: 'Erro ao remover documento' })
    }

    return reply.code(204).send()
  })
}
