# N8N Standards — Padrões de Construção LUQZ

**Versão:** 1.0
**Última atualização:** 2026-04-09
**Responsável:** Squad luqz-n8n

> Este documento define os padrões obrigatórios para construção e manutenção de todos os fluxos N8N da LUQZ. Todo fluxo novo deve seguir esses padrões. Todo fluxo existente deve ser migrado para esses padrões no próximo ciclo de auditoria.

---

## 1. NAMING CONVENTIONS

### Workflows
- Formato: `[area]-[acao]-[objeto]`
- Exemplos: `comercial-notificar-lead`, `demanda-publicar-instagram`, `ops-sincronizar-crm`
- Proibido: nomes genéricos (`teste`, `novo`, `fluxo2`), nomes sem área

### Nós dentro do workflow
- Formato: `[verbo]-[objeto]` em português
- Exemplos: `buscar-lead-kommo`, `filtrar-score-alto`, `notificar-slack-erro`
- Proibido: nomes padrão do N8N (`HTTP Request`, `Set`, `IF`)

### Sub-workflows
- Prefixo obrigatório: `util-`
- Exemplos: `util-formatar-telefone`, `util-validar-cpf`, `util-log-erro`

---

## 2. ESTRUTURA OBRIGATÓRIA DE CADA WORKFLOW

Todo workflow em produção deve ter:

```
[Trigger configurado]
       ↓
[Validar entradas]      ← verificar campos obrigatórios antes de processar
       ↓
[Processamento principal]
       ↓
[Registrar resultado]   ← log de sucesso com dado relevante
       ↓
[Output / Resposta]

+ (em paralelo, via Error Trigger conectado ao workflow):
[Error Trigger] → [Log do erro] → [Notificar responsável]
```

---

## 3. ERROR HANDLING OBRIGATÓRIO

**Todo workflow em produção deve ter:**

1. **Error Trigger** conectado ao workflow (Settings → Error Workflow)
2. **Nó de log**: gravar tipo de erro, workflow, timestamp e dado que falhou
3. **Notificação**: ao menos uma notificação (Slack ou email) para o squad responsável
4. **Mensagem de erro padronizada:**
   ```
   ⚠️ Falha em workflow N8N
   Workflow: [nome]
   Erro: [mensagem de erro]
   Item que falhou: [dado relevante]
   Horário: [timestamp]
   ```

---

## 4. METADADOS OBRIGATÓRIOS

Todo workflow deve ter no campo "Notes" do N8N:

```
Owner: [squad ou pessoa]
Criado em: [data]
Última auditoria: [data]
Criticidade: [Alta / Média / Baixa]
Documentação: squads/luqz-n8n/output/documentacao/[nome-do-fluxo].md
```

---

## 5. DADOS SENSÍVEIS

- **Proibido**: credenciais, tokens ou senhas em campos de texto, nós Set ou expressões inline
- **Obrigatório**: usar Credentials do N8N para autenticação de APIs
- **Para variáveis de ambiente**: usar `$env.NOME_VAR` via configuração de ambiente do N8N
- **Nunca logar**: dados de cartão, CPF, senha, token de acesso

---

## 6. IDEMPOTÊNCIA

Fluxos que **criam ou modificam registros** devem verificar estado antes de agir:

```
[Receber ID] → [Buscar no sistema destino] →
  IF já existe → [Log: ignorado - duplicata] → [Fim]
  IF não existe → [Criar registro] → [Log: criado] → [Fim]
```

Aplicar obrigatoriamente em: criação de leads, envio de emails, criação de registros em CRM.

---

## 7. SUB-WORKFLOWS

Criar sub-workflow quando:
- Mesma lógica aparece em 2+ workflows
- Lógica tem mais de 8 nós independentes
- Transformação de dado é reutilizável (ex: formatar telefone, validar CNPJ)

Interface obrigatória de sub-workflow:
- **Entrada**: via `Execute Workflow Trigger` com campos documentados
- **Saída**: via `Respond to Webhook` ou `Return` com campos documentados
- **Documentação**: campo "Notes" com descrição de input e output esperados

---

## 8. FREQUÊNCIA DE MANUTENÇÃO

| Tipo de fluxo | Frequência de revisão |
|---|---|
| Criticidade Alta | A cada 30 dias |
| Criticidade Média | A cada 90 dias |
| Criticidade Baixa | A cada 180 dias |
| Fluxo inativo | Revisar necessidade a cada 60 dias — desativar se sem uso confirmado |
