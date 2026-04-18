// ═══════════════════════════════════════════════════════════════════════════
// WebApp.gs — Endpoint público do LUQZ Dashboard
//
// Deploy:
//   Extensões → Apps Script → Implantar → Nova Implantação
//   Tipo: App da Web | Executar como: Eu | Acesso: Qualquer pessoa
//
// URL gerada: https://script.google.com/macros/s/[ID]/exec
// ═══════════════════════════════════════════════════════════════════════════


/**
 * Ponto de entrada HTTP GET.
 * Parâmetros opcionais via query string:
 *   ?cliente=NomeDoCliente  → retorna apenas esse cliente
 *   ?status=green           → filtra por status (green/yellow/red/sem_dados)
 *   ?gestor=NomeDoGestor    → filtra por gestor
 */
function doGet(e) {
  try {
    var params = e && e.parameter ? e.parameter : {};
    var clientes = processarClientes();

    // ── Filtros ─────────────────────────────────────────────────────────────
    if (params.cliente) {
      var needle = params.cliente.toLowerCase().trim();
      clientes = clientes.filter(function(c) {
        return c.cliente.toLowerCase().indexOf(needle) !== -1;
      });
    }

    if (params.status) {
      clientes = clientes.filter(function(c) {
        return c.status === params.status;
      });
    }

    if (params.gestor) {
      var gestorNeedle = params.gestor.toLowerCase().trim();
      clientes = clientes.filter(function(c) {
        return c.gestor.toLowerCase().indexOf(gestorNeedle) !== -1;
      });
    }

    // ── Payload ──────────────────────────────────────────────────────────────
    var payload = {
      geradoEm: new Date().toISOString(),
      totalClientes: clientes.length,
      clientes: clientes,
    };

    return responderJson(payload);

  } catch (err) {
    return responderErro(err.message || "Erro interno no processamento.");
  }
}


/**
 * Retorna ContentService com JSON e headers CORS.
 */
function responderJson(dados) {
  var json = JSON.stringify(dados, null, 2);
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}


/**
 * Retorna resposta de erro padronizada.
 */
function responderErro(mensagem) {
  var payload = {
    erro: true,
    mensagem: mensagem,
    geradoEm: new Date().toISOString(),
  };
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}


// ── Função de teste local (executar no editor do GAS) ───────────────────────

function testarLocalmente() {
  var resultado = processarClientes();
  Logger.log("Total de clientes processados: " + resultado.length);
  resultado.forEach(function(c) {
    Logger.log(
      "[" + c.status.toUpperCase() + "] " + c.cliente +
      " | Gestor: " + c.gestor +
      " | Média: " + c.media +
      " | Dias: " + c.dias
    );
  });
}
