# PROTOCOLO DE ATIVAÇÃO LUQZ
# Comando padrão de inicialização de projeto

> **Instrução para o Agente:**  
> Este protocolo é o procedimento obrigatório de boot de qualquer projeto LUQZ.  
> Copie o bloco abaixo, preencha os campos `[cliente]` e `[produto]`, e envie ao agente.  
> O agente executará o diagnóstico completo antes de qualquer entrega.

---

## Comando de Ativação (Copiar e Enviar)

```
Ativar protocolo padrão LUQZ.

Cliente: [nome do cliente]
Produto: [nome do produto]
```

---

## Sequência Obrigatória de Execução do Agente

Ao receber o comando acima, o agente DEVE executar os passos abaixo **na ordem exata**, sem atalhos:

### Passo 1 — Carregar Lei Central
- Ler `/SYSTEM.md` (regras globais do sistema LUQZ).
- Confirmar papel de Orquestrador.

### Passo 2 — Carregar Produto
- Ler todos os arquivos em `/Produtos/[produto]/`.
- Absorver: metodologia, cronograma, tarefas, RACI e entregáveis.

### Passo 3 — Carregar Contexto do Cliente
- Ler todos os arquivos em `/clientes/[cliente]/contexto/`.
- Hierarquia: `diretrizes.md` > `oferta.md` > `persona.md` > `tom-de-voz.md` > `cliente.md`.
- Se existir `qa-gate.md`, carregar também.

### Passo 4 — Identificar Estado Atual
Responder obrigatoriamente:
- **Fase atual do projeto** (Ex: Onboarding / Execução)
- **Semana atual** (Se aplicável ao cronograma do produto)
- **Trilha ativa** (Ex: T1, T2, T3...)
- **Objetivo estratégico do momento** (O que deve ser alcançado agora)

### Passo 5 — Validar Prontidão
Verificar:
- Há informações faltantes nos arquivos de contexto?
- O projeto pode avançar ou há bloqueios?
- Existem pendências (`[PENDÊNCIA]`) que impedem execução segura?

### Passo 6 — Gerar Relatório de Estado
Apresentar ao operador humano o seguinte relatório padronizado:

```
═══════════════════════════════════════════════
        ESTADO INICIAL DO PROJETO
═══════════════════════════════════════════════

Cliente:        [nome]
Produto:        [nome]
Fase:           [fase atual]
Semana:         [semana atual]
Trilha Ativa:   [trilha]
Objetivo:       [objetivo estratégico]

Entregáveis Necessários:
  1. [entregável 1]
  2. [entregável 2]
  3. [entregável 3]

Riscos:
  - [risco 1]
  - [risco 2]

Pendências:
  - [pendência 1]
  - [pendência 2]

═══════════════════════════════════════════════
        PLANO DE AÇÃO
═══════════════════════════════════════════════

→ Passo 1: [ação imediata]
→ Passo 2: [ação seguinte]
→ Passo 3: [ação subsequente]

Status: AGUARDANDO APROVAÇÃO PARA EXECUTAR
═══════════════════════════════════════════════
```

---

## Regras do Protocolo

1. **Não executar entregáveis.** Este protocolo é diagnóstico. Só gera o mapa, nunca o material.
2. **Não pular etapas.** Se a Fase 1 não foi concluída, não sugira entregáveis da Fase 2.
3. **Pensar como Orquestrador.** Antes de dizer "o que fazer", valide "o que faz sentido fazer".
4. **Aguardar aprovação.** Após o relatório, o agente deve PARAR e esperar o comando humano.

---

> *PROTOCOLO_ATIVACAO.md — Versão 1.0*  
> *Sistema LUQZ — Abril 2026*
