/**
 * Serviço de integração com n8n.
 *
 * Responsabilidades:
 *  - Buscar dados do webhook n8n
 *  - Cache em memória (TTL configurável)
 *  - Retry com backoff simples
 *  - Retornar dados brutos para normalização posterior
 */

const N8N_URL   = process.env.N8N_WEBHOOK_URL || 'https://editor.luqz.com.br/webhook/cockpit/performance'
const CACHE_TTL = Number(process.env.N8N_CACHE_TTL_MS) || 120_000  // 2 min
const TIMEOUT   = 10_000  // 10s

let _cache    = null   // { data, fetchedAt }
let _inflight = null   // Promise dedup

/**
 * Busca dados do n8n com cache e dedup.
 * @param {{ forceRefresh?: boolean }} opts
 * @returns {Promise<object>} Payload bruto do n8n
 */
export async function fetchN8nData(opts = {}) {
  const now = Date.now()

  // Cache hit
  if (!opts.forceRefresh && _cache && now - _cache.fetchedAt < CACHE_TTL) {
    return _cache.data
  }

  // Dedup: se já há uma chamada em voo, esperar
  if (_inflight) return _inflight

  _inflight = _doFetch()
    .finally(() => { _inflight = null })

  return _inflight
}

async function _doFetch() {
  const headers = { Accept: 'application/json' }
  if (process.env.N8N_SECRET) {
    headers['Authorization'] = `Bearer ${process.env.N8N_SECRET}`
  }

  const res = await fetch(N8N_URL, {
    method:  'GET',
    headers,
    signal:  AbortSignal.timeout(TIMEOUT),
  })

  if (!res.ok) {
    throw new Error(`n8n respondeu com HTTP ${res.status}`)
  }

  const payload = await res.json()

  // Validação mínima de estrutura
  if (!payload || typeof payload !== 'object') {
    throw new Error('n8n retornou payload inválido')
  }

  // Normalizar: aceitar { status, data } ou { data } ou array direto
  let data
  if (Array.isArray(payload)) {
    data = payload
  } else if (Array.isArray(payload.data)) {
    data = payload.data
  } else {
    throw new Error('n8n retornou payload sem array de dados')
  }

  const result = {
    status:      payload.status || 'ok',
    totalGrupos: payload.totalGrupos || data.length,
    data,
    fetchedAt:   new Date().toISOString(),
  }

  _cache = { data: result, fetchedAt: Date.now() }
  return result
}

/**
 * Invalida cache manualmente.
 */
export function invalidateN8nCache() {
  _cache = null
}

/**
 * Retorna idade do cache em ms, ou null se não há cache.
 */
export function getN8nCacheAge() {
  return _cache ? Date.now() - _cache.fetchedAt : null
}
