// ═══════════════════════════════════════════════════════════════════════════
// SheetReader.gs — Leitura e processamento dos dados da planilha
// ═══════════════════════════════════════════════════════════════════════════


/**
 * Lê todas as linhas da planilha configurada.
 * Retorna array de arrays (valores brutos), começando em DATA_START_ROW.
 */
function lerPlanilha() {
  var ss;

  if (CONFIG.SHEET_ID && CONFIG.SHEET_ID !== "COLE_O_ID_DA_PLANILHA_AQUI") {
    ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  } else {
    // Modo desenvolvimento: usa a planilha ativa (script vinculado)
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  var aba = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!aba) {
    throw new Error("Aba '" + CONFIG.SHEET_NAME + "' não encontrada. Verifique CONFIG.SHEET_NAME.");
  }

  var ultimaLinha  = aba.getLastRow();
  var ultimaColuna = aba.getLastColumn();

  if (ultimaLinha < CONFIG.DATA_START_ROW || ultimaColuna < CONFIG.COL_DATA_INICIO + 1) {
    return { linhas: [], cabecalho: [] };
  }

  // Cabeçalho (linha 1)
  var cabecalho = aba
    .getRange(1, 1, 1, ultimaColuna)
    .getValues()[0];

  // Dados
  var linhas = aba
    .getRange(CONFIG.DATA_START_ROW, 1, ultimaLinha - CONFIG.DATA_START_ROW + 1, ultimaColuna)
    .getValues();

  return { linhas: linhas, cabecalho: cabecalho };
}


/**
 * Verifica se um valor de célula é inválido (deve ser ignorado).
 */
function ehInvalido(valor) {
  if (valor === null || valor === undefined) return true;
  var str = String(valor).trim();
  return CONFIG.VALORES_INVALIDOS.indexOf(str) !== -1 || str === "";
}


/**
 * Classifica o status baseado na média diária.
 * @param {number} media - média diária (apenas dias preenchidos)
 * @returns {"green"|"yellow"|"red"|"sem_dados"}
 */
function classificarStatus(media, dias) {
  if (dias === 0) return "sem_dados";
  if (media >= CONFIG.STATUS_GREEN_MIN)  return "green";
  if (media >= CONFIG.STATUS_YELLOW_MIN) return "yellow";
  return "red";
}


/**
 * Formata um objeto Date como YYYY-MM-DD.
 */
function formatarData(valor) {
  if (!valor || !(valor instanceof Date)) return null;
  var ano  = valor.getFullYear();
  var mes  = String(valor.getMonth() + 1).padStart(2, "0");
  var dia  = String(valor.getDate()).padStart(2, "0");
  return ano + "-" + mes + "-" + dia;
}


/**
 * Processa um array de valores de uma linha (colunas de data em diante).
 * Retorna { total, media, dias, serie, ultimoValor, ultimaData }.
 *
 * @param {Array} valoresDados   - valores das colunas de data (a partir de COL_DATA_INICIO)
 * @param {Array} cabecalhoDatas - cabeçalho correspondente às mesmas colunas
 */
function calcularMetricasCliente(valoresDados, cabecalhoDatas) {
  var total       = 0;
  var dias        = 0;
  var serie       = [];
  var ultimoValor = null;
  var ultimaData  = null;

  for (var i = 0; i < valoresDados.length; i++) {
    var val = valoresDados[i];
    if (ehInvalido(val)) continue;

    var num = parseFloat(String(val).replace(",", "."));
    if (isNaN(num)) continue;

    total += num;
    dias  += 1;

    var dataStr = formatarData(cabecalhoDatas[i]) || String(cabecalhoDatas[i]);

    serie.push({ data: dataStr, valor: num });
    ultimoValor = num;
    ultimaData  = dataStr;
  }

  var media = dias > 0 ? Math.round((total / dias) * 100) / 100 : 0;

  return {
    total:       Math.round(total * 100) / 100,
    media:       media,
    dias:        dias,
    status:      classificarStatus(media, dias),
    serie:       serie,
    ultimoValor: ultimoValor,
    ultimaData:  ultimaData,
  };
}


/**
 * Processa todas as linhas e retorna array de objetos de cliente.
 * Ignora linhas sem nome de cliente.
 */
function processarClientes() {
  var resultado = lerPlanilha();
  var linhas    = resultado.linhas;
  var cabecalho = resultado.cabecalho;

  var cabecalhoDatas = cabecalho.slice(CONFIG.COL_DATA_INICIO);
  var clientes = [];

  for (var i = 0; i < linhas.length; i++) {
    var linha = linhas[i];

    var nomeCliente = String(linha[CONFIG.COL_CLIENTE] || "").trim();
    if (!nomeCliente) continue; // pula linhas vazias

    var nomeGestor = String(linha[CONFIG.COL_GESTOR] || "").trim();
    var valoresDados = linha.slice(CONFIG.COL_DATA_INICIO);

    var metricas = calcularMetricasCliente(valoresDados, cabecalhoDatas);

    clientes.push({
      cliente:    nomeCliente,
      gestor:     nomeGestor,
      total:      metricas.total,
      media:      metricas.media,
      dias:       metricas.dias,
      status:     metricas.status,
      serie:      metricas.serie,
      ultimoValor: metricas.ultimoValor,
      ultimaData:  metricas.ultimaData,
    });
  }

  return clientes;
}
