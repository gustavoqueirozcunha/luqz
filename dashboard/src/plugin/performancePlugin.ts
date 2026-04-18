// ═══════════════════════════════════════════════════════════════════════════
// performancePlugin.ts — Vite plugin do backend de performance LUQZ
//
// Responsabilidades:
//   1. Lê /clientes/ e gera manifest operacional
//   2. Busca dados do Google Apps Script (planilha)
//   3. Consolida tudo em um único JSON
//   4. Expõe /api/performance para o frontend
//   5. Atualiza automaticamente no intervalo configurado
// ═══════════════════════════════════════════════════════════════════════════

import type { Plugin, ViteDevServer } from "vite";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import type {
  PerformancePayload,
  ClienteConsolidado,
  OperacionalData,
  GasPayload,
  GasClienteRaw,
  Alerta,
  RankingEntry,
  PerformanceData,
} from "../types/performance";

// ── Config ──────────────────────────────────────────────────────────────────

interface PerformanceConfig {
  gasWebAppUrl: string;
  clientesDir: string;
  refreshIntervalMs: number;
  status: { greenMin: number; yellowMin: number };
  ignorarClientes: string[];
}

const CONFIG_DEFAULTS: PerformanceConfig = {
  gasWebAppUrl: "",
  clientesDir: "../clientes",
  refreshIntervalMs: 30000,
  status: { greenMin: 30, yellowMin: 10 },
  ignorarClientes: ["_TEMPLATE_CLIENTE"],
};

function carregarConfig(rootDir: string): PerformanceConfig {
  const configPath = path.join(rootDir, "performance.config.json");
  try {
    const raw = fs.readFileSync(configPath, "utf-8");
    const parsed = JSON.parse(raw);
    return { ...CONFIG_DEFAULTS, ...parsed };
  } catch {
    return CONFIG_DEFAULTS;
  }
}

// ── Utilitários ──────────────────────────────────────────────────────────────

function slugify(nome: string): string {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function resolveClientesDir(rootDir: string, configDir: string): string {
  if (path.isAbsolute(configDir)) return configDir;
  return path.resolve(rootDir, configDir);
}

// ── Leitura do /clientes/ ────────────────────────────────────────────────────

async function contarArquivos(dir: string): Promise<number> {
  try {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    let count = 0;
    for (const e of entries) {
      if (e.isFile() && !e.name.startsWith(".")) count++;
    }
    return count;
  } catch {
    return 0;
  }
}

async function lerOperacional(clienteDir: string): Promise<OperacionalData> {
  const verificar = async (subdir: string) => {
    try {
      await fsp.access(path.join(clienteDir, subdir));
      return true;
    } catch {
      return false;
    }
  };

  const [temContexto, temDesign, temProjetos] = await Promise.all([
    verificar("contexto"),
    verificar("design"),
    verificar("projetos"),
  ]);

  const [arqContexto, arqDesign, arqProjetos] = await Promise.all([
    temContexto ? contarArquivos(path.join(clienteDir, "contexto")) : Promise.resolve(0),
    temDesign   ? contarArquivos(path.join(clienteDir, "design"))   : Promise.resolve(0),
    temProjetos ? contarArquivos(path.join(clienteDir, "projetos")) : Promise.resolve(0),
  ]);

  return {
    tem_contexto:      temContexto,
    tem_design:        temDesign,
    tem_projetos:      temProjetos,
    arquivos_contexto: arqContexto,
    arquivos_design:   arqDesign,
    arquivos_projetos: arqProjetos,
  };
}

async function lerManifestClientes(
  clientesDir: string,
  ignorar: string[]
): Promise<Map<string, OperacionalData>> {
  const manifest = new Map<string, OperacionalData>();

  let entries;
  try {
    entries = await fsp.readdir(clientesDir, { withFileTypes: true });
  } catch {
    return manifest;
  }

  const tasks = entries
    .filter(
      (e) =>
        e.isDirectory() &&
        !e.name.startsWith(".") &&
        !ignorar.includes(e.name)
    )
    .map(async (e) => {
      const operacional = await lerOperacional(path.join(clientesDir, e.name));
      manifest.set(e.name, operacional);
    });

  await Promise.all(tasks);
  return manifest;
}

// ── Fetch do Google Apps Script ──────────────────────────────────────────────

async function buscarDadosGas(url: string): Promise<GasPayload | null> {
  if (!url || url === "COLE_A_URL_DO_WEB_APP_AQUI") return null;

  try {
    const resp = await fetch(url, {
      signal: AbortSignal.timeout(10000),
    });

    if (!resp.ok) return null;

    const data = (await resp.json()) as GasPayload & { erro?: boolean };
    if (data.erro) return null;

    return data;
  } catch {
    return null;
  }
}

// ── Geração de alertas ───────────────────────────────────────────────────────

function gerarAlertasCliente(
  cliente: string,
  perf: PerformanceData,
  op: OperacionalData
): Alerta[] {
  const alertas: Alerta[] = [];

  if (perf.status === "sem_dados") {
    alertas.push({
      cliente,
      tipo: "sem_dados",
      mensagem: `${cliente} não possui dados na planilha.`,
    });
  } else if (perf.status === "red") {
    alertas.push({
      cliente,
      tipo: "performance_baixa",
      mensagem: `${cliente} com média diária baixa: ${perf.media}`,
    });
  }

  if (!op.tem_contexto) {
    alertas.push({ cliente, tipo: "sem_contexto", mensagem: `${cliente} sem pasta contexto/` });
  }
  if (!op.tem_design) {
    alertas.push({ cliente, tipo: "sem_design", mensagem: `${cliente} sem pasta design/` });
  }
  if (!op.tem_projetos) {
    alertas.push({ cliente, tipo: "sem_projetos", mensagem: `${cliente} sem pasta projetos/` });
  }

  return alertas;
}

// ── Consolidação ─────────────────────────────────────────────────────────────

function gasToPerformanceData(raw: GasClienteRaw): PerformanceData {
  return {
    total:       raw.total,
    media:       raw.media,
    dias:        raw.dias,
    status:      raw.status,
    serie:       raw.serie,
    ultimoValor: raw.ultimoValor,
    ultimaData:  raw.ultimaData,
  };
}

const PERFORMANCE_VAZIA: PerformanceData = {
  total: 0,
  media: 0,
  dias: 0,
  status: "sem_dados",
  serie: [],
  ultimoValor: null,
  ultimaData: null,
};

function consolidar(
  gasPayload: GasPayload | null,
  manifest: Map<string, OperacionalData>
): PerformancePayload {
  const gasMap = new Map<string, GasClienteRaw>();
  if (gasPayload?.clientes) {
    for (const c of gasPayload.clientes) {
      gasMap.set(c.cliente.toLowerCase().trim(), c);
    }
  }

  // União de nomes: planilha + repositório
  const todosNomes = new Set<string>();
  for (const nome of gasMap.keys()) todosNomes.add(nome);
  for (const nome of manifest.keys()) todosNomes.add(nome.toLowerCase().trim());

  const clientes: ClienteConsolidado[] = [];
  const alertasGlobais: Alerta[] = [];

  for (const nomeKey of todosNomes) {
    // Resolve nome canônico: prefere repositório (preserva capitalização)
    let nomeCanônico = nomeKey;
    for (const repoNome of manifest.keys()) {
      if (repoNome.toLowerCase().trim() === nomeKey) {
        nomeCanônico = repoNome;
        break;
      }
    }

    const gasData  = gasMap.get(nomeKey);
    const opData   = manifest.get(nomeCanônico) ?? {
      tem_contexto: false,
      tem_design: false,
      tem_projetos: false,
      arquivos_contexto: 0,
      arquivos_design: 0,
      arquivos_projetos: 0,
    };

    const perf = gasData ? gasToPerformanceData(gasData) : { ...PERFORMANCE_VAZIA };
    const alertas = gerarAlertasCliente(nomeCanônico, perf, opData);

    clientes.push({
      id:          slugify(nomeCanônico),
      cliente:     nomeCanônico,
      gestor:      gasData?.gestor ?? "",
      performance: perf,
      operacional: opData,
      alertas,
    });

    alertasGlobais.push(...alertas);
  }

  // Ranking: ordena por média decrescente, exclui sem_dados
  const ranking: RankingEntry[] = clientes
    .filter((c) => c.performance.status !== "sem_dados")
    .sort((a, b) => b.performance.media - a.performance.media)
    .map((c, i) => ({
      posicao: i + 1,
      cliente: c.cliente,
      gestor:  c.gestor,
      media:   c.performance.media,
      status:  c.performance.status,
    }));

  return {
    meta: {
      geradoEm:      new Date().toISOString(),
      totalClientes: clientes.length,
      fontes: {
        planilha:    gasPayload !== null,
        repositorio: manifest.size > 0,
      },
    },
    clientes,
    ranking,
    alertas: alertasGlobais,
  };
}

// ── Plugin Vite ──────────────────────────────────────────────────────────────

export function performancePlugin(): Plugin {
  let cache: PerformancePayload | null = null;
  let refreshTimer: ReturnType<typeof setInterval> | null = null;

  return {
    name: "performance-watcher",

    configureServer(server: ViteDevServer) {
      const rootDir     = server.config.root;
      const cfg         = carregarConfig(rootDir);
      const clientesDir = resolveClientesDir(rootDir, cfg.clientesDir);

      server.config.logger.info(`[performance] clientes dir: ${clientesDir}`);
      server.config.logger.info(
        cfg.gasWebAppUrl && cfg.gasWebAppUrl !== "COLE_A_URL_DO_WEB_APP_AQUI"
          ? `[performance] GAS URL configurada`
          : `[performance] GAS URL não configurada — apenas dados do repositório`
      );

      // ── Função de refresh ──────────────────────────────────────────────────
      async function refresh() {
        try {
          const [gasPayload, manifest] = await Promise.all([
            buscarDadosGas(cfg.gasWebAppUrl),
            lerManifestClientes(clientesDir, cfg.ignorarClientes ?? []),
          ]);
          cache = consolidar(gasPayload, manifest);
          server.config.logger.info(
            `[performance] atualizado — ${cache.meta.totalClientes} clientes`
          );
        } catch (err) {
          server.config.logger.error(`[performance] erro ao atualizar: ${err}`);
        }
      }

      // Primeira carga imediata
      refresh();

      // Refresh periódico
      refreshTimer = setInterval(refresh, cfg.refreshIntervalMs);

      // ── Endpoint /api/performance ──────────────────────────────────────────
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith("/api/performance")) return next();

        const url  = new URL(req.url, "http://localhost");
        const path = url.pathname;

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-cache");

        // /api/performance — payload completo
        if (path === "/api/performance") {
          if (!cache) {
            res.writeHead(503);
            res.end(JSON.stringify({ erro: "Dados ainda não carregados. Aguarde." }));
            return;
          }
          res.end(JSON.stringify(cache));
          return;
        }

        // /api/performance/cliente/:id
        const matchCliente = path.match(/^\/api\/performance\/cliente\/(.+)$/);
        if (matchCliente && cache) {
          const id = matchCliente[1];
          const cliente = cache.clientes.find((c) => c.id === id || c.cliente === id);
          if (!cliente) {
            res.writeHead(404);
            res.end(JSON.stringify({ erro: `Cliente '${id}' não encontrado.` }));
            return;
          }
          res.end(JSON.stringify(cliente));
          return;
        }

        // /api/performance/ranking
        if (path === "/api/performance/ranking" && cache) {
          res.end(JSON.stringify(cache.ranking));
          return;
        }

        // /api/performance/alertas
        if (path === "/api/performance/alertas" && cache) {
          res.end(JSON.stringify(cache.alertas));
          return;
        }

        return next();
      });

      // Limpa timer quando servidor fecha
      server.httpServer?.on("close", () => {
        if (refreshTimer) clearInterval(refreshTimer);
      });
    },
  };
}
