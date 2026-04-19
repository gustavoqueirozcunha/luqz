# 📣 Notificação Automática de Entregas no ClickUp

> Documentação operacional do sistema de comunicação automática de entregas.
> Última atualização: Abril 2026

---

## O que é

Sempre que uma entrega é publicada na Torre de Controle de um cliente no ClickUp, o sistema agora publica automaticamente uma mensagem de atualização no canal correto daquele cliente — sem intervenção manual.

A mensagem inclui o que foi feito, os links dos documentos gerados e o próximo passo esperado.

---

## Arquitetura

```
Squad/Agente gera entrega
        ↓
Davi Docs formata e publica na Torre de Controle
        ↓
Agente chamador aciona Kai Notificador com metadados
        ↓
Kai lê canais-clickup.yaml → encontra canal_id do cliente
        ↓
Kai verifica duplicidade no canal
        ↓
Kai publica mensagem no canal do cliente via MCP ClickUp
        ↓
✅ Cliente notificado / ⚠️ Log de pendência salvo
```

---

## Componentes criados

| Componente | Caminho | Função |
|-----------|---------|--------|
| Skill | `skills/clickup-delivery-notifier/SKILL.md` | Formato e regras da mensagem de notificação |
| Agente | `squads/luqz-documentacao/agents/kai-notificador.agent.md` | Roteamento e publicação no canal correto |
| Config | `clientes/_config/canais-clickup.yaml` | Mapeamento cliente → canal ClickUp |

---

## Componentes modificados

| Componente | O que mudou |
|-----------|------------|
| `skills/clickup-torre-uploader/SKILL.md` | Passo 6 adicionado: acionar Kai após upload |
| `squads/luqz-documentacao/squad.yaml` | Kai Notificador adicionado como agente do squad |

---

## Como funciona na prática

### Fluxo padrão (executado pelo agente)

1. Agente finaliza entrega e Davi Docs publica na Torre de Controle
2. Agente chamador (ou Davi Docs) aciona Kai Notificador com:

```yaml
cliente: "Nome Exato do Cliente"
tipo_entrega: "estrategia"          # ou: conteudo, relatorio, reuniao, handover, generico
resumo: "O que foi feito em 1-2 frases"
itens:
  - nome: "Nome do Documento"
    link: "https://app.clickup.com/t/..."
proximo_passo: "Ação esperada (opcional)"
```

3. Kai consulta `canais-clickup.yaml`, verifica duplicidade, monta mensagem e publica

---

## Como adicionar um novo cliente

1. Abra `clientes/_config/canais-clickup.yaml`
2. Encontre o `canal_id` do cliente no ClickUp (URL do chat: `app.clickup.com/chat/[canal_id]`)
3. Adicione o bloco:

```yaml
"Nome do Cliente":
  canal_id: "ID_AQUI"
  espaco: "Nome do Espaço no ClickUp"
  ativo: true
  notas: ""
```

4. Salve o arquivo. Kai usará o novo mapeamento imediatamente.

---

## Como preencher os canal_ids existentes

Os clientes já estão mapeados em `canais-clickup.yaml` com `canal_id: "PREENCHER"`. Para ativar a notificação:

1. Abra o ClickUp
2. Vá ao espaço do cliente → seção Chat (canal principal do projeto)
3. Copie o ID da URL
4. Substitua `"PREENCHER"` pelo ID real no arquivo

---

## Como desativar notificações para um cliente

No `canais-clickup.yaml`, defina `ativo: false` para o cliente:

```yaml
"Nome do Cliente":
  canal_id: "903123456789"
  ativo: false
```

---

## Como testar

### Teste manual
1. Execute qualquer pipeline que publique na Torre de Controle de um cliente com `canal_id` configurado
2. Ao final, acione Kai Notificador diretamente com os inputs acima
3. Verifique o canal no ClickUp — a mensagem deve aparecer em < 30 segundos

### Teste de duplicidade
1. Envie a mesma notificação duas vezes seguidas
2. A segunda deve ser bloqueada com a mensagem: `"Notificação duplicada detectada. Publicação ignorada."`

### Teste de canal não configurado
1. Use um cliente com `canal_id: "PREENCHER"`
2. Kai deve reportar: `"Canal não configurado. Acesse clientes/_config/canais-clickup.yaml e adicione o ID."`

### Teste de MCP indisponível
1. Desative o MCP ClickUp
2. Acione Kai — ele deve salvar a mensagem em `clientes/[cliente]/logs/notificacoes-pendentes.md`

---

## Prevenção de duplicidade

Kai verifica as últimas 10 mensagens do canal via `clickup_get_chat_channel_messages` antes de publicar.

Se houver mensagem do mesmo cliente + mesmo tipo de entrega publicada há menos de 2 horas, a publicação é bloqueada.

---

## Formato da mensagem publicada

```
📌 Atualização – [nome do cliente]

• O que foi feito:
[resumo]

• Documentos / acessos:
- [nome] → [link]

• Próximo passo:
[ação — omitida se não houver]

---
🤖 Enviado automaticamente pelo sistema LUQZ
```

---

## Sugestões de melhorias futuras

| Melhoria | Complexidade | Impacto |
|----------|-------------|---------|
| Trigger automático via webhook N8N na criação de task na Torre | Alta | Elimina necessidade de acionar Kai manualmente |
| Log centralizado de todas as notificações enviadas por cliente | Baixa | Rastreabilidade e auditoria |
| Relatório semanal automático de entregas por cliente | Média | Aumenta percepção de valor |
| Template de mensagem por tipo de entrega (`estrategia` vs `conteudo`) | Baixa | Personalização da comunicação |
| Confirmação de leitura: check automático se cliente visualizou | Alta | Fechamento de loop completo |

---

> Documentação criada em Abril 2026 | Sistema LUQZ
