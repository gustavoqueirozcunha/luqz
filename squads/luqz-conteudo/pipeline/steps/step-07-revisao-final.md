---
execution: inline
agent: vera-veredicto
inputFile: squads/luqz-conteudo/output/layout-canva.md
outputFile: squads/luqz-conteudo/output/revisao-final-conteudo.md
---

# Step 07: Revisão Final e Memória

## Context Loading

Carregue todos os outputs do pipeline antes de executar:
- `squads/luqz-conteudo/output/briefing-conteudo.md` — critérios de origem
- `squads/luqz-conteudo/output/tema-objetivo.md` — intenção estratégica
- `squads/luqz-conteudo/output/estrutura-conteudo.md` — mapa de slides
- `squads/luqz-conteudo/output/copy-slides.md` — copy final
- `squads/luqz-conteudo/output/direcao-visual.md` — sistema e direção visual
- `squads/luqz-conteudo/output/layout-canva.md` — layout executado
- `squads/luqz-conteudo/_memory/memories.md` — histórico de runs anteriores

## Instructions

### Process

1. **Avalie coerência do pipeline**: O tema saiu do briefing? O copy segue a estrutura? O layout segue o copy e a direção visual? Cada step deve derivar exclusivamente do anterior.

2. **Avalie qualidade do copy**: Cada slide tem Título / Texto / Intenção? Títulos com ≤10 palavras? Texto entre 30-60 palavras? Tom consistente?

3. **Avalie coesão visual**: Sistema visual único aplicado? Slide de CTA distinto? Nenhuma variação de paleta ou tipografia?

4. **Emita veredicto por categoria**:
   - Estratégia (tema + objetivo)
   - Estrutura (mapa de slides)
   - Copy (slide a slide)
   - Direção visual
   - Layout Canva

5. **Classifique cada problema encontrado**: Crítico (bloqueia publicação) ou Recomendação (melhora futura).

6. **Escreva em memories.md**: Obrigatório. Registre aprendizados do run antes de fechar.

## Output Format — revisao-final-conteudo.md

```markdown
# Revisão Final — [Tema do Carrossel]
**Data:** [data]
**Revisora:** Vera Veredicto

---

## Veredicto Geral
**Status:** [✅ Aprovado / ⚠️ Aprovado com Ressalvas / ❌ Reprovado]
**Resumo:** [1-2 frases sobre a qualidade geral do pacote]

---

## Avaliação por Categoria

### Estratégia
**Nota:** [1-10]
**Diagnóstico:** [o que está certo ou errado]
**Classificação:** [✅ OK / ⚠️ Recomendação / ❌ Crítico]

### Estrutura
**Nota:** [1-10]
**Diagnóstico:** [...]
**Classificação:** [...]

### Copy
**Nota:** [1-10]
**Diagnóstico:** [...]
**Classificação:** [...]

### Direção Visual
**Nota:** [1-10]
**Diagnóstico:** [...]
**Classificação:** [...]

### Layout Canva
**Nota:** [1-10]
**Diagnóstico:** [...]
**Classificação:** [...]

---

## Problemas Críticos (bloqueiam publicação)
[lista de problemas que precisam ser corrigidos antes de publicar — ou "Nenhum"]

## Recomendações (melhorias futuras)
[lista de sugestões que não bloqueiam, mas melhoram — ou "Nenhuma"]

---

## Próximos Passos
[o que fazer agora — publicar, corrigir X antes, testar variação, etc.]
```

## Output Obrigatório 2 — memories.md

Após escrever a revisão, **obrigatoriamente** adicionar ao arquivo `squads/luqz-conteudo/_memory/memories.md`:

```markdown
## Run [data] — [Tema do Carrossel]
**Nicho:** [do briefing]
**Formato:** [do tema-objetivo]
**Veredicto:** [Aprovado / Aprovado com Ressalvas / Reprovado]

**Padrões fortes:** [o que funcionou muito bem neste run]
**Melhorias sugeridas:** [o que deve mudar na próxima execução]
**Possíveis testes futuros:** [variações de formato, ângulo ou tom a explorar]
```

## Veto Conditions

Rejeitar e não aprovar se:
1. Algum slide do copy-slides.md não tiver os 3 campos (Título / Texto / Intenção)
2. Layout Canva usar templates diferentes por slide
3. Tema não derivar diretamente do briefing
4. memories.md não for atualizado com o registro do run

## Quality Criteria

- [ ] Veredicto geral emitido com classificação clara
- [ ] Todas as 5 categorias avaliadas com nota e diagnóstico
- [ ] Problemas críticos separados de recomendações
- [ ] Próximos passos concretos e acionáveis
- [ ] memories.md atualizado com padrões fortes, melhorias e testes futuros
