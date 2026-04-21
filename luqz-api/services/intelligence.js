/**
 * Serviço de Inteligência do Dashboard.
 * Transforma dados brutos em decisões acionáveis baseadas em regras de negócio.
 */

function calculateMetrics(valorAtual, meta) {
  if (!meta || meta <= 0) return 0;
  return ((valorAtual - meta) / meta) * 100;
}

function processIntelligence(item) {
  const { cliente, funil, tipoFunil, cpl, kpi, nomeKpi, investimento, resultados } = item;

  const currentKPI = nomeKpi || 'CPL';
  let valorAtual = item.cpl || 0;
  let meta = item.kpi || 0;

  const variacaoPercentual = calculateMetrics(valorAtual, meta);

  // Status map
  let status = 'saudavel';
  if (meta > 0) {
    if (valorAtual > meta * 1.20) {
      status = 'critico';
    } else if (valorAtual > meta) {
      status = 'atencao';
    }
  }

  // Score financeiro
  const variacaoPositiva = Math.max(variacaoPercentual, 0);
  const score = (investimento * variacaoPositiva) / 100;

  // Prioridade 
  let prioridade = 'baixa';
  if (status === 'critico' && score >= 1000) prioridade = 'alta';
  else if (investimento >= 10000 && status !== 'saudavel') prioridade = 'alta';
  else if (status === 'critico' && score < 1000) prioridade = 'media';
  else if (status === 'atencao') prioridade = 'media';

  // Causas (Diagnóstico base)
  let causas = [];
  if (status !== 'saudavel') {
    causas.push('Custo de aquisição acima da meta');
  }
  if (variacaoPercentual > 50) {
    causas.push('Alta variação percentual de custos');
  }
  if (status === 'saudavel' && resultados < 5 && investimento > 1000) {
    causas.push('Baixo volume de conversões dado o capital mapeado');
  }

  // Sugestões Baseadas em Causa e Tipo
  let sugestaoAcao = "Escalar orçamento de forma granular nas métricas campeãs.";
  
  if (causas.includes('Alta variação percentual de custos')) {
    sugestaoAcao = "Pausar campanhas com custo altíssimo urgentemente. Isolar criativos ofensores.";
  } else if (causas.includes('Custo de aquisição acima da meta')) {
    if (tipoFunil === 'vendas') {
      sugestaoAcao = "A oferta pode não estar alinhada com o público. Revisar etapa de checkout e atrito para venda.";
    } else {
      sugestaoAcao = "Revisar a landing page e promessa (ângulo) para aumentar conversão ou segmentar melhor o público.";
    }
  } else if (causas.includes('Baixo volume de conversões dado o capital mapeado')) {
    sugestaoAcao = "Aumentar lances ou ampliar tamanho do público alvo. O orçamento está sendo subutilizado (engargalado).";
  } else if (status === 'atencao') {
    sugestaoAcao = "Monitorar nos próximos 3 dias as métricas secundárias. Considerar teste A/B no funil.";
  }

  // Impacto Financeiro Estimado (Vazamento real em R$)
  let impactoFinanceiroEstimado = 0;
  if (meta > 0 && valorAtual > meta) {
    impactoFinanceiroEstimado = (valorAtual - meta) * (resultados || 0);
  }

  // Ação Imediata (Boolean)
  const acaoImediata = status === 'critico' && impactoFinanceiroEstimado >= 500;

  // Textos e Alertas (Foco puramente TÉCNICO na operação de mídia)
  let alertas = [];
  let diagnostico = "Público respondendo de forma eficiente. Leilão estabilizado sem atrito nas conversões.";

  if (status === 'critico') {
    alertas.push(`Vazamento: ${currentKPI} superou a meta em ${variacaoPercentual.toFixed(0)}%`);
    diagnostico = `Desvio operacional grave. Algoritmo forçando entrega em leilões caros ou fadiga generalizada da comunicação impedindo conversão na ponta.`;
  } else if (status === 'atencao') {
    alertas.push(`${currentKPI} em atenção (${variacaoPercentual.toFixed(0)}% acima da meta)`);
    diagnostico = `Taxas de cliques (CTR) ou de conversão perdendo eficiência limiar. O leilão das plataformas está pressionando a entrega.`;
  }

  // Resumo Executivo (Estrutura Fixa: Leitura Instantânea)
  const fmtV = (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  let statusText = '';
  if (status === 'saudavel') statusText = 'Desempenho dentro do esperado.';
  else if (status === 'atencao') statusText = 'Desvio exige acompanhamento.';
  else statusText = 'Desvio relevante frente ao planejado.';

  const resumoExecutivo = `Obtivemos ${resultados.toLocaleString('pt-BR')} resultados com custo unitário de R$ ${fmtV(valorAtual)}. Meta: R$ ${fmtV(meta)}. ${statusText}`;

  const ret = {
    cliente,
    funil,
    tipoFunil: tipoFunil || 'não especificado',
    investimento: investimento || 0,
    resultados: resultados || 0,
    kpis: {
      principal: {
        nome: currentKPI,
        valorAtual: Number(valorAtual.toFixed(2)),
        meta: Number(meta.toFixed(2)),
        variacaoPercentual: Number(variacaoPercentual.toFixed(2))
      }
    },
    status,
    tendencia: { valor: 'indisponivel', historicoDisponivel: false },
    alertas,
    causas,
    diagnostico,
    resumoExecutivo,
    impactoFinanceiroEstimado,
    acaoImediata,
    prioridade,
    sugestaoAcao
  };

  // DEBUG Flag
  if (process.env.DEBUG === 'true') {
    ret._raw = item;
  }

  return ret;
}

export function enhanceDataWithIntelligence(normalizedDataArray) {
  if (!Array.isArray(normalizedDataArray)) return [];
  return normalizedDataArray.map(processIntelligence);
}
