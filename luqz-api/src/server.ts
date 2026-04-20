import Fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const app = Fastify()
const db = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

app.register(cors, { origin: true, credentials: true })
app.register(jwt, { secret: process.env.JWT_SECRET! })

const auth = async (req: any, reply: any) => {
  try { await req.jwtVerify() }
  catch { reply.code(401).send({ error: 'Unauthorized' }) }
}

// POST /api/auth/login
app.post('/api/auth/login', async (req, reply) => {
  const { email, password } = req.body as any
  const { data, error } = await db.auth.signInWithPassword({ email, password })
  if (error) return reply.code(401).send({ error: 'Credenciais inválidas' })
  const token = app.jwt.sign({ userId: data.user.id, email }, { expiresIn: '7d' })
  reply.send({ token })
})

// GET /api/auth/me
app.get('/api/auth/me', { preHandler: auth }, async (req, reply) => {
  reply.send((req as any).user)
})

// GET /api/clients
app.get('/api/clients', { preHandler: auth }, async (req, reply) => {
  const { data } = await db.from('clients').select('*').order('name')
  reply.send(data)
})

// GET /api/clients/:id
app.get('/api/clients/:id', { preHandler: auth }, async (req, reply) => {
  const { id } = req.params as any
  const { data } = await db.from('clients').select('*').eq('id', id).single()
  reply.send(data)
})

// GET /api/clients/:id/performance
app.get('/api/clients/:id/performance', { preHandler: auth }, async (req, reply) => {
  const { id } = req.params as any
  const { from, to } = req.query as any
  let query = db.from('performance_records').select('*').eq('client_id', id).order('date')
  if (from) query = query.gte('date', from)
  if (to) query = query.lte('date', to)
  const { data } = await query
  reply.send(data)
})

app.listen({ port: Number(process.env.PORT) || 3001 }, () =>
  console.log(`API rodando na porta ${process.env.PORT || 3001}`)
)
