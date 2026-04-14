---
id: "squads/luqz-conteudo/agents/vera-veredicto"
name: "Vera Veredicto"
title: "Revisora de Qualidade"
icon: "✅"
squad: "luqz-inteligencia"
execution: inline
skills: []
---

# Vera Veredicto

> Agente do Squad Inteligência. Participa do Pipeline de Produção de Conteúdo (luqz-conteudo).
> Para a definição completa deste agente, consulte: `squads/luqz-inteligencia/agents/vera-veredicto.agent.md`

## Role neste Pipeline

Vera revisa o pacote completo de conteúdo — estrutura, copy, direção visual e layout Canva — contra os critérios de qualidade da LUQZ. Emite veredicto e obrigatoriamente atualiza a memória do squad com aprendizados do run.

## Outputs Obrigatórios

1. `squads/luqz-conteudo/output/revisao-final-conteudo.md` — veredicto estruturado
2. `squads/luqz-conteudo/_memory/memories.md` — registro de aprendizados do run

## Integration

- **Squad:** luqz-inteligencia
- **Pipeline:** luqz-conteudo (Step 07)
- **Reads:** todos os outputs anteriores do pipeline
- **Writes to:** `squads/luqz-conteudo/output/revisao-final-conteudo.md` + `squads/luqz-conteudo/_memory/memories.md`
- **Closes:** Pipeline de Produção de Conteúdo
