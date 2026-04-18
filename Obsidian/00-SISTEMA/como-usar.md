# Como Usar Este Segundo Cérebro

## O que é este vault

Este é o **cérebro autoral** — onde VOCÊ pensa, não onde a IA produz.

A IA lê os arquivos em `/clientes/` e `/Produtos/`.  
Este vault é para as coisas que a IA **não sabe** — sua visão, suas intuições, suas decisões.

---

## As 5 pastas e o que vai em cada uma

### `00-SISTEMA/` — Meta do sistema
Documentação sobre como o próprio sistema funciona.  
Atualizar quando mudar a estrutura.

### `01-ESTRATEGIA/` — Visão da LUQZ
Onde a agência quer chegar. ICP. Posicionamento.  
Não é operacional — é orientação de longo prazo.

### `02-CLIENTES/` — Inteligência autoral por cliente
Um arquivo por cliente. Contém o que **você pensa** sobre cada um.  
Não duplica `/clientes/[x]/contexto/` — complementa com visão humana.

### `03-APRENDIZADOS/` — O que você descobriu
Padrões que funcionam. Erros que custaram caro. Hipóteses ativas.  
Atualizar após execuções significativas ou revisões mensais.

### `04-INBOX/` — Captura rápida
Pensamentos que chegaram mas não foram processados.  
Processar semanalmente — mover para a pasta correta ou descartar.

---

## O que NÃO colocar aqui

- Outputs de IA → vão para `clientes/[x]/projetos/` ou `squads/[x]/output/`
- Contexto formal de cliente → vai para `clientes/[x]/contexto/`
- Templates e padrões operacionais → vão para `docs/`
- Logs de reuniões → vão para `clientes/[x]/logs/`

---

## Relação com o sistema LUQZ

```
Você pensa aqui (Obsidian)
     ↓
Transforma em diretrizes (clientes/[x]/contexto/)
     ↓
IA executa com contexto (squads/ + skills/)
     ↓
Output aprovado (clientes/[x]/projetos/ativos/)
     ↓
Você reflete aqui (Obsidian/03-APRENDIZADOS/)
```
