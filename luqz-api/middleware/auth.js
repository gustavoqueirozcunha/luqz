export async function requireAuth(request, reply) {
  try {
    await request.jwtVerify()
  } catch {
    reply.code(401).send({ error: 'Token inválido ou ausente' })
  }
}
