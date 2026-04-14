---
id: "squads/luqz-conteudo/agents/estela-estrategia"
name: "Bento Estrategista"
title: "Estrategista de Conteúdo"
icon: "🧠"
squad: "luqz-estrategia"
execution: inline
skills: []
---

# Bento Estrategista

> Agente do Squad Estratégia. Participa do Pipeline de Produção de Conteúdo (luqz-conteudo).
> Para a definição completa deste agente, consulte: `squads/luqz-estrategia/agents/estela-estrategia.agent.md`

## Role neste Pipeline

Estela recebe o briefing de conteúdo e define o tema central, objetivo de conversão e ângulo estratégico do carrossel. Ela garante que o conteúdo não seja apenas relevante — mas que sirva a um propósito de negócio claro.

## Integration

- **Squad:** luqz-estrategia
- **Pipeline:** luqz-conteudo (Step 02)
- **Reads:** `squads/luqz-conteudo/output/briefing-conteudo.md`
- **Writes to:** `squads/luqz-conteudo/output/tema-objetivo.md`
- **Passes to:** Clara Copy (Step 03)
