import { db } from '../services/supabase.js'

export async function authRoutes(app) {
  app.post('/auth/login', async (request, reply) => {
    const { email, password } = request.body

    if (!email || !password) {
      return reply.code(400).send({ error: 'Email e senha são obrigatórios' })
    }

    const { data, error } = await db.auth.signInWithPassword({ email, password })

    if (error || !data.user) {
      return reply.code(401).send({ error: 'Credenciais inválidas' })
    }

    const token = app.jwt.sign(
      { userId: data.user.id, email: data.user.email },
      { expiresIn: '7d' }
    )

    return reply.send({ token })
  })
}
