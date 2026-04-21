import { db } from '../services/supabase.js'

/**
 * Middleware de autenticação + resolução de tenant.
 *
 * Fluxo:
 *  1. Verifica JWT (@fastify/jwt)
 *  2. Busca membership ativa do user
 *  3. Injeta userId, companyId e role no request
 *
 * Se o user tem múltiplas empresas, usa a marcada como is_default.
 * Se nenhuma é default, usa a primeira.
 * Header opcional X-Company-Id para override (futuro multi-company switcher).
 */
export async function requireAuth(request, reply) {
  // 1. Verificar JWT
  try {
    await request.jwtVerify()
  } catch {
    return reply.code(401).send({ error: 'Token inválido ou ausente' })
  }

  const userId = request.user.userId
  if (!userId) {
    return reply.code(401).send({ error: 'Token malformado: userId ausente' })
  }

  // 2. Resolver empresa via memberships
  const companyOverride = request.headers['x-company-id']

  let membershipQuery = db
    .from('memberships')
    .select('company_id, role')
    .eq('user_id', userId)

  if (companyOverride) {
    membershipQuery = membershipQuery.eq('company_id', companyOverride)
  }

  const { data: memberships, error } = await membershipQuery
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: true })

  if (error || !memberships || memberships.length === 0) {
    return reply.code(403).send({
      error: 'Usuário não está vinculado a nenhuma empresa',
    })
  }

  const active = memberships[0]

  // 3. Injetar no request
  request.userId    = userId
  request.companyId = active.company_id
  request.userRole  = active.role
}
