// ═══════════════════════════════════════════════════════════════════════════
// Config.gs — Constantes e configurações do LUQZ Dashboard
// Edite apenas este arquivo para ajustar o comportamento do script
// ═══════════════════════════════════════════════════════════════════════════

var CONFIG = {

  // ── Planilha ─────────────────────────────────────────────────────────────
  // ID da planilha (extrair da URL: spreadsheets/d/[SEU_ID_AQUI]/edit)
  SHEET_ID: "COLE_O_ID_DA_PLANILHA_AQUI",

  // Nome exato da aba com os dados de performance
  SHEET_NAME: "Performance",

  // Linha onde os dados começam (1-indexed). Ex: 2 = pular cabeçalho
  DATA_START_ROW: 2,

  // Índice das colunas (0-indexed)
  COL_CLIENTE:    0,  // Coluna A: nome do cliente
  COL_GESTOR:     1,  // Coluna B: nome do gestor
  COL_DATA_INICIO: 2, // Coluna C em diante: valores diários

  // ── Classificação de status ───────────────────────────────────────────────
  // Baseado na média diária (apenas dias preenchidos)
  STATUS_GREEN_MIN:  30,  // média > 30 → green
  STATUS_YELLOW_MIN: 10,  // média 10-30 → yellow  |  < 10 → red

  // ── Valores inválidos ─────────────────────────────────────────────────────
  // Células com esses valores são ignoradas no cálculo
  VALORES_INVALIDOS: ["-", "", " ", "N/A", "n/a", "#N/A", "#VALUE!"],

  // ── CORS ──────────────────────────────────────────────────────────────────
  // Domínio permitido (* = qualquer origem)
  CORS_ORIGIN: "*",

  // ── Timezone ─────────────────────────────────────────────────────────────
  TIMEZONE: "America/Sao_Paulo",

};
