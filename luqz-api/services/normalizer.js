/**
 * Serviço de normalização de dados do Cockpit.
 *
 * Responsabilidades:
 *  - Validar campos obrigatórios de cada item
 *  - Normalizar números (BRL "1.200,50" → 1200.50)
 *  - Normalizar strings (trim, case)
 *  - Classificar nomeKpi
 *  - Filtrar dados pela empresa (match contra lista de clientes da company)
 *  - Retornar formato padronizado
 */

// ── Parsing de número BR ─────────────────────────────────────────────────

/**
 * Converte valor misto (number | string BRL | null) para float seguro.
 * Exemplos: "1.200,50" → 1200.50  |  1200.50 → 1200.50  |  null → 0
 */
export function parseNumBR(v) {
  if (typeof v === 'number') return isFinite(v) ? v : 0
  if (typeof v === 'string') {
    const s = v.trim()
    if (!s) return 0
    // BRL: "1.200,50" → remove pontos de milhar, troca vírgula por ponto
    const normalized = s.includes(',')
      ? s.replace(/\./g, '').replace(',', '.')
      : s
    const n = parseFloat(normalized)
    return isFinite(n) ? n : 0
  }
  return 0
}

// ── Validação ────────────────────────────────────────────────────────────

const VALID_STATUS   = new Set(['verde', 'amarelo', 'vermelho'])

const KPI_MAP = {
  captacao: 'CPL',
  crescimento: 'CPS',
  vendas: 'CAC',
  engajamento: 'CPV'
}

/**
 * Valida e normaliza um item bruto do n8n.
 * Retorna o item normalizado ou null se inválido.
 */
export function normalizeItem(raw) {
  if (!raw || typeof raw !== 'object') return null

  const cliente = typeof raw.cliente === 'string' ? raw.cliente.trim() : ''
  if (!cliente) return null

  const funil = typeof raw.funil === 'string' ? raw.funil.trim() : ''

  const status = typeof raw.status === 'string'
    ? raw.status.trim().toLowerCase()
    : 'verde'

  let tipoFunil = typeof raw.tipoFunil === 'string'
    ? raw.tipoFunil.trim().toLowerCase()
    : ''
    
  if (!KPI_MAP[tipoFunil]) {
    console.warn(JSON.stringify({
      event: "NORMALIZER_INVALID_RECORD",
      cliente,
      funil,
      tipoFunilRaw: raw.tipoFunil,
      timestamp: new Date().toISOString()
    }));
    return null;
  }

  const nomeKpi = KPI_MAP[tipoFunil];

  return {
    cliente,
    funil,
    resultados:   parseNumBR(raw.resultados),
    investimento: parseNumBR(raw.investimento),
    cpl:          parseNumBR(raw.cpl || raw.valorAtual),
    kpi:          parseNumBR(raw.kpi || raw.meta),
    nomeKpi,
    status:       VALID_STATUS.has(status) ? status : 'verde',
    tipoFunil,
  }
}

// ── Pipeline completa ────────────────────────────────────────────────────

/**
 * Normaliza array bruto e filtra por empresa.
 *
 * @param {Array} rawData        — dados brutos do n8n
 * @param {string[]} clientNames — nomes de clientes da empresa (do Supabase)
 *                                 Se vazio/null, retorna tudo (modo admin/seed)
 * @returns {{ data: object[], totalGrupos: number }}
 */
export function normalizeAndFilter(rawData, clientNames) {
  if (!Array.isArray(rawData)) return { data: [], totalGrupos: 0 }

  const totalRecebidos = rawData.length;

  // Normalizar todos os items
  const normalized = rawData
    .map(normalizeItem)
    .filter(Boolean)

  const totalInvalidos = totalRecebidos - normalized.length;

  // Filtrar por empresa (case-insensitive match no nome do cliente)
  let filtered
  if (clientNames && clientNames.length > 0) {
    const nameSet = new Set(clientNames.map(n => n.toLowerCase()))
    filtered = normalized.filter(item =>
      nameSet.has(item.cliente.toLowerCase())
    )
  } else {
    // Sem lista de clientes → retorna tudo (admin mode)
    filtered = normalized
  }

  console.log({
    event: "NORMALIZER_SUMMARY",
    totalRecebidos,
    totalInvalidos,
    totalProcessados: filtered.length,
    timestamp: new Date().toISOString()
  });

  if (totalRecebidos > 0) {
    const invalidRatio = (totalInvalidos / totalRecebidos) * 100;
    if (invalidRatio > 15) {
      console.warn(JSON.stringify({
        event: "DATA_QUALITY_WARNING",
        totalRecebidos,
        totalInvalidos,
        percentualInvalido: Number(invalidRatio.toFixed(2)),
        timestamp: new Date().toISOString()
      }));
    }
  }

  return {
    data:        filtered,
    totalGrupos: filtered.length,
  }
}
