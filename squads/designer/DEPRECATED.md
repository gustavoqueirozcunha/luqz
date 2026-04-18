# SQUAD DESIGNER — DEPRECIADO

> **Status:** Depreciado em Abril/2026
> **Substitutos:** Ver tabela abaixo

---

## Por que foi depreciado

O squad `designer/` foi o ponto de partida do sistema visual da LUQZ. Com a maturação da operação, seus agentes foram evoluídos e realocados em squads funcionais com escopo e integração bem definidos. Manter os arquivos originais aqui causava ambiguidade sobre qual agente usar.

---

## Destino de cada agente

| Arquivo original | Agente | Destino atual | Motivo |
|-----------------|--------|---------------|--------|
| `canva-executor.md` | Caetano Executor 🖼️ | `squads/luqz-demanda/agents/caetano-executor.agent.md` | Agente de execução Canva — pertence ao squad de produção (luqz-demanda) |
| `designer-agent.md` | Designer (Squad Designer) 🎨 | `squads/luqz-design/agents/designer.agent.md` | Versão evoluída com padrão LUQZ atualizado e sem referências a SYSTEM.md obsoleto |

---

## Regra de uso

- **Execução visual (carrosseis, posts, reels):** usar `Caetano Executor` em `squads/luqz-demanda/agents/`
- **Direção de arte e conceito visual:** usar `Designer` em `squads/luqz-design/agents/`
- **Não acionar nenhum arquivo desta pasta** em novos projetos ou pipelines

---

> Os arquivos originais foram preservados aqui para referência histórica.
> Não os modifique — esta pasta não é mais editada ativamente.
