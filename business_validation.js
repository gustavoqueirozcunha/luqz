import { enhanceDataWithIntelligence } from './luqz-api/services/intelligence.js';

const practiceScenarios = [
  {
    name: '💰 VAZAMENTO EM ESCALA (Captação)',
    payload: {
      cliente: 'Clínica Sorriso',
      funil: 'Implantes Google Ads',
      tipoFunil: 'captacao',
      resultados: 200,
      investimento: 15000,
      cpl: 75.00, // Meta era 40
      kpi: 40.00,
      nomeKpi: 'CPL'
    }
  },
  {
    name: '📉 FADIGA DE CRIATIVO (Engajamento)',
    payload: {
      cliente: 'Moda Fashion',
      funil: 'Branding Instagram',
      tipoFunil: 'engajamento',
      resultados: 5000,
      investimento: 2500,
      cpl: 0.50, // Meta era 0.10
      kpi: 0.10,
      nomeKpi: 'CPV'
    }
  },
  {
    name: '🎯 EFICIÊNCIA TÁTICA (Vendas)',
    payload: {
      cliente: 'SaaS Builder',
      funil: 'Venda Direta Q2',
      tipoFunil: 'vendas',
      resultados: 45,
      investimento: 4000,
      cpl: 88.88, // Meta era 150
      kpi: 150.00,
      nomeKpi: 'CAC'
    }
  }
];

const results = enhanceDataWithIntelligence(practiceScenarios.map(s => s.payload));

console.log('--- ANÁLISE DE ALERTAS E LOGICA DE NEGÓCIO ---\n');

results.forEach((res, i) => {
  console.log(`CASO: ${practiceScenarios[i].name}`);
  console.log(`KPI: ${res.kpis.principal.nome} | Meta: R$ ${res.kpis.principal.meta} | Real: R$ ${res.kpis.principal.valorAtual}`);
  console.log(`Status: ${res.status.toUpperCase()} | Variação: ${res.kpis.principal.variacaoPercentual}%`);
  console.log(`Impacto Financeiro (Desperdício): R$ ${res.impactoFinanceiroEstimado}`);
  console.log(`\nDIAGNÓSTICO TÉCNICO:`);
  console.log(res.diagnostico);
  console.log(`\nRESUMO EXECUTIVO (CLIENTE):`);
  console.log(res.resumoExecutivo);
  console.log(`\nSUGESTÃO DE AÇÃO:`);
  console.log(res.sugestaoAcao);
  console.log('\n' + '='.repeat(60) + '\n');
});
