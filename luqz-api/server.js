import 'dotenv/config'
import Fastify from 'fastify'
import fjwt from '@fastify/jwt'
import cors from '@fastify/cors'

import { authRoutes } from './routes/auth.js'
import { clientsRoutes } from './routes/clients.js'
import { performanceRoutes } from './routes/performance.js'

const app = Fastify({ logger: true })

await app.register(cors, { origin: true, credentials: true })
await app.register(fjwt, { secret: process.env.JWT_SECRET })

await app.register(authRoutes)
await app.register(clientsRoutes)
await app.register(performanceRoutes)

app.get('/health', async () => ({ status: 'ok' }))

const port = Number(process.env.PORT) || 3001

try {
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`\nLUQZ API rodando em http://localhost:${port}\n`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
