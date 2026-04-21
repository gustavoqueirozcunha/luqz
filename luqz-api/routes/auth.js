import { db } from '../services/supabase.js'

/**
 * Rotas de autenticação.
 *
 * POST /auth/login
 *   - Autentica com Supabase Auth
 *   - Busca profile e membership do user
 *   - Retorna JWT com userId e email
 *   - Retorna dados do profile e empresa ativa
 */
export async function authRoutes(app) {

  // ── Login ────────────────────────────────────────────────────────────────
  app.post('/auth/login', async (request, reply) => {
    const { email, password } = request.body || {}

    if (!email || !password) {
      return reply.code(400).send({ error: 'Email e senha são obrigatórios' })
    }

    // 1. Autenticar com Supabase
    const { data: authData, error: authError } = await db.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return reply.code(401).send({ error: 'Credenciais inválidas' })
    }

    const userId = authData.user.id

    // 2. Buscar profile
    const { data: profile } = await db
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('user_id', userId)
      .single()

    // 3. Buscar membership ativa (default primeiro)
    const { data: memberships } = await db
      .from('memberships')
      .select('company_id, role, is_default, companies(name, slug)')
      .eq('user_id', userId)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: true })

    const activeMembership = memberships?.[0] || null

    // 4. Gerar JWT (apenas userId + email — company é resolvida no middleware)
    const token = app.jwt.sign(
      { userId, email: authData.user.email },
      { expiresIn: '7d' }
    )

    // 5. Resposta
    return reply.send({
      token,
      user: {
        id:    userId,
        email: authData.user.email,
        name:  profile?.full_name || null,
        avatar: profile?.avatar_url || null,
      },
      company: activeMembership
        ? {
            id:   activeMembership.company_id,
            name: activeMembership.companies?.name || null,
            slug: activeMembership.companies?.slug || null,
            role: activeMembership.role,
          }
        : null,
    })
  })

  // ── Verificar sessão ─────────────────────────────────────────────────────
  app.get('/auth/me', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch {
      return reply.code(401).send({ error: 'Token inválido' })
    }

    const userId = request.user.userId

    // Buscar profile + membership
    const { data: profile } = await db
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('user_id', userId)
      .single()

    const { data: memberships } = await db
      .from('memberships')
      .select('company_id, role, is_default, companies(name, slug)')
      .eq('user_id', userId)
      .order('is_default', { ascending: false })

    const active = memberships?.[0] || null

    return reply.send({
      user: {
        id:     userId,
        email:  request.user.email,
        name:   profile?.full_name || null,
        avatar: profile?.avatar_url || null,
      },
      company: active
        ? {
            id:   active.company_id,
            name: active.companies?.name || null,
            slug: active.companies?.slug || null,
            role: active.role,
          }
        : null,
    })
  })
}
