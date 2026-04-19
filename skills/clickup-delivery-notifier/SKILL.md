---
name: clickup-delivery-notifier
description: Formata e publica uma mensagem operacional de atualização no canal correto do cliente no ClickUp sempre que uma entrega for criada ou atualizada na Torre de Controle. Garante comunicação clara, curta e rastreável com links dos documentos gerados.
version: 1.0.0
type: prompt
---

# ClickUp Delivery Notifier

Skill de comunicação operacional automática. Chamada após qualquer publicação na Torre de Controle para notificar o canal do cliente com um resumo profissional da entrega.

---

## Quando usar

- Após criação de documento, tarefa ou página na Torre de Controle do cliente
- Após atualização relevante de entrega (nova versão, aprovação, handover)
- Após execução de pipeline que gera entregáveis finais
- **Não usar:** para atualizações internas, rascunhos, ou notas de processo

---

## Inputs obrigatórios

Antes de executar, confirmar que todos os inputs estão disponíveis:

| Input | Descrição | Exemplo |
|-------|-----------|---------|
| `cliente` | Nome exato do cliente (igual à pasta em `/clientes/`) | `"Dr Cassio Goulart"` |
| `tipo_entrega` | Categoria do que foi gerado | `"estrategia"`, `"conteudo"`, `"relatorio"`, `"reuniao"`, `"handover"` |
| `resumo` | Descrição curta do que foi feito (1-2 frases) | `"Estratégia de mídia Fase 1 finalizada com distribuição de verba e calendário de campanhas"` |
| `itens` | Lista de documentos/tasks com nome e link | `[{nome: "Plano de Mídia", link: "https://app.clickup.com/..."}]` |
| `proximo_passo` | Próxima ação esperada (opcional) | `"Revisão e aprovação até quinta-feira"` |
| `canal_id` | ID do canal ClickUp do cliente (obtido via `canais-clickup.yaml`) | `"903123456789"` |

---

## Formato da mensagem

Montar exatamente nesta estrutura. Sem parágrafos extras. Sem cabeçalho de seção verboso.

```
📌 Atualização – [nome do cliente]

• O que foi feito:
[resumo breve e objetivo da entrega — máximo 2 linhas]

• Documentos / acessos:
- [Nome do documento 1] → [link]
- [Nome do documento 2] → [link]

• Próximo passo:
[ação esperada — se não houver, omitir esta seção]

---
🤖 Enviado automaticamente pelo sistema LUQZ
```

---

## Regras de qualidade da mensagem

1. **Curta e direta** — máximo 10 linhas no total
2. **Sem jargão interno** — o cliente lê esta mensagem
3. **Links sempre nomeados** — nunca só a URL crua
4. **Próximo passo** — omitir a seção se não houver ação clara para o cliente
5. **Nunca duplicar** — verificar se mensagem equivalente foi enviada nas últimas 2h no mesmo canal antes de publicar
6. **Não enviar** se `resumo` estiver vazio ou se nenhum item tiver link válido

---

## Verificação de duplicidade

Antes de publicar, executar via ClickUp MCP:

```
clickup_get_chat_channel_messages(channel_id=canal_id, limit=10)
```

Verificar se existe mensagem com o mesmo `tipo_entrega` + `cliente` nas últimas 2 horas. Se existir, **não publicar** e reportar: `"Mensagem já enviada recentemente. Publicação ignorada para evitar duplicidade."`

---

## Publicação via MCP

Usar `clickup_send_chat_message` com:

```json
{
  "channel_id": "[canal_id]",
  "content": "[mensagem formatada]"
}
```

---

## Tratamento de falhas

| Situação | Ação |
|----------|------|
| `canal_id` não encontrado em `canais-clickup.yaml` | Reportar: "Canal não configurado para [cliente]. Adicionar em `clientes/_config/canais-clickup.yaml`." |
| MCP ClickUp indisponível | Reportar erro. Salvar mensagem em `clientes/[cliente]/logs/notificacoes-pendentes.md` para reenvio manual |
| Link inválido (não começa com `https://`) | Omitir item da lista e reportar: "Link inválido omitido: [nome]" |
| `resumo` vazio | Bloquear envio e solicitar input |

---

## Exemplo completo de execução

**Inputs:**
```yaml
cliente: "Dr Cassio Goulart"
tipo_entrega: "estrategia"
resumo: "Estratégia de performance Fase 1 finalizada com mapeamento de canais, calendário editorial e distribuição de verba Meta Ads."
itens:
  - nome: "Estratégia de Performance – Fase 1"
    link: "https://app.clickup.com/t/abc123"
  - nome: "Plano de Mídia – Abril"
    link: "https://app.clickup.com/t/def456"
proximo_passo: "Aprovação do cliente até sexta-feira para início da execução na semana seguinte."
canal_id: "903123456789"
```

**Mensagem gerada:**
```
📌 Atualização – Dr Cassio Goulart

• O que foi feito:
Estratégia de performance Fase 1 finalizada com mapeamento de canais, calendário editorial e distribuição de verba Meta Ads.

• Documentos / acessos:
- Estratégia de Performance – Fase 1 → https://app.clickup.com/t/abc123
- Plano de Mídia – Abril → https://app.clickup.com/t/def456

• Próximo passo:
Aprovação do cliente até sexta-feira para início da execução na semana seguinte.

---
🤖 Enviado automaticamente pelo sistema LUQZ
```
