import 'dotenv/config'
import Fastify from 'fastify'
import fjwt from '@fastify/jwt'
import cors from '@fastify/cors'

import { authRoutes } from './routes/auth.js'
import { clientsRoutes } from './routes/clients.js'
import { performanceRoutes } from './routes/performance.js'
import { dashboardRoutes } from './routes/dashboard.js'
import { internalRoutes } from './routes/internal.js'
import { documentRoutes } from './routes/documents.js'
import { initScheduler } from './services/scheduler.js'

const app = Fastify({ logger: true })

await app.register(cors, { origin: true, credentials: true })
await app.register(fjwt, { secret: process.env.JWT_SECRET })

// ── Rotas ────────────────────────────────────────────────────────────────
await app.register(authRoutes)
await app.register(clientsRoutes)
await app.register(performanceRoutes)
await app.register(dashboardRoutes)
await app.register(internalRoutes)
await app.register(documentRoutes)

// ── Health check ─────────────────────────────────────────────────────────
app.get('/health', async () => ({ status: 'ok' }))

// ── Start ────────────────────────────────────────────────────────────────
initScheduler(app)
const port = Number(process.env.PORT) || 3001

try {
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`\nLUQZ API rodando em http://localhost:${port}\n`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
