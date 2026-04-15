# Naming Conventions — Fluxos N8N LUQZ

**Versão:** 1.0
**Última atualização:** 2026-04-09

---

## Workflows

| Elemento | Formato | Exemplo | Proibido |
|---|---|---|---|
| Nome do workflow | `[area]-[acao]-[objeto]` | `comercial-notificar-lead` | `teste`, `novo`, `fluxo2` |
| Nome do nó | `[verbo]-[objeto]` PT-BR | `buscar-lead-kommo` | `HTTP Request`, `Set`, `IF` |
| Sub-workflow | `util-[funcao]` | `util-formatar-telefone` | Sub-workflow sem prefixo |

## Áreas válidas

| Área | Uso |
|---|---|
| `comercial` | CRM, pipeline, leads, vendas |
| `demanda` | Conteúdo, anúncios, publicação |
| `ops` | Operações internas, sincronizações |
| `entrega` | Onboarding, clientes, projetos |
| `inteligencia` | Relatórios, métricas, alertas |
| `util` | Sub-workflows reutilizáveis |

## Ações válidas

`notificar`, `sincronizar`, `publicar`, `criar`, `atualizar`, `buscar`, `filtrar`, `validar`, `exportar`, `importar`, `processar`, `registrar`

## Objetos comuns

`lead`, `cliente`, `post`, `relatorio`, `contato`, `oportunidade`, `tarefa`, `erro`, `webhook`

---

## Arquivos de Output do Squad

| Tipo | Caminho |
|---|---|
| Mapeamento | `squads/luqz-n8n/output/mapeamentos/[nome-workflow].md` |
| Auditoria | `squads/luqz-n8n/output/auditorias/[nome-workflow].md` |
| Blueprint | `squads/luqz-n8n/output/blueprints/[nome-workflow].md` |
| Documentação Final | `squads/luqz-n8n/output/documentacao/[nome-workflow].md` |
| Índice Central | `squads/luqz-n8n/output/indice-fluxos.md` |
