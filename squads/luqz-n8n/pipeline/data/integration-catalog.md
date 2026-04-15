# Catálogo de Integrações — N8N LUQZ

**Versão:** 1.0
**Última atualização:** 2026-04-09

> Registro de todas as integrações externas conhecidas nos fluxos N8N da LUQZ. Atualizar sempre que um novo sistema for integrado.

---

## Integrações Ativas

| Sistema | Tipo | Autenticação | Uso nos fluxos | Responsável |
|---|---|---|---|---|
| **Kommo CRM** | API REST | API Key | Criar/atualizar leads, buscar contatos | Squad Comercial |
| **Meta Ads** | API REST | OAuth 2.0 | Gerenciar campanhas, extrair métricas | Squad Demanda |
| **Google Ads** | API REST | OAuth 2.0 | Gerenciar campanhas, extrair métricas | Squad Demanda |
| **WhatsApp Business API** | API REST | Bearer Token | Envio de mensagens, automações de follow-up | Squad Comercial |
| **Instagram Graph API** | API REST | Bearer Token | Publicar posts e carrosseis | Squad Demanda |
| **ClickUp** | API REST | API Key | Criar/atualizar tarefas de projeto | Squad Operações |

---

## Integrações Configuradas (uso a confirmar)

| Sistema | Tipo | Status | Observação |
|---|---|---|---|
| **N8N** (API interna) | REST | Configurado | Endpoint: `http://editor.luqz.com.br/api/v1/` — fluxos não documentados |

---

## Integrações Planejadas (não implementadas)

| Sistema | Tipo | Propósito | Prioridade |
|---|---|---|---|
| **LinkedIn API** | API REST | Publicação de posts LinkedIn | Alta |
| **Resend** | SMTP/API | Envio de emails automatizados | Média |

---

## Rate Limits Conhecidos

| Sistema | Limite | Janela | Consequência se exceder |
|---|---|---|---|
| Instagram Graph API | 25 posts | 24 horas | Bloqueio temporário de publicação |
| Meta Ads API | 200 req | hora | Throttling — respostas lentas |
| Kommo CRM | 600 req | minuto | HTTP 429 — retry obrigatório |

---

## Credenciais (referência, não os valores)

| Sistema | Onde está configurado | Expiração |
|---|---|---|
| Instagram Bearer Token | `.env` (INSTAGRAM_ACCESS_TOKEN) | Verificar a cada 60 dias |
| Instagram User ID | `.env` (INSTAGRAM_USER_ID) | Permanente |
| ImgBB API Key | `.env` (IMGBB_API_KEY) | Verificar a cada 90 dias |
| N8N JWT | `.claude/settings.json` | [PENDÊNCIA: verificar expiração] |

> ⚠️ NUNCA commitar valores de credenciais. Sempre referenciar variáveis de ambiente.
