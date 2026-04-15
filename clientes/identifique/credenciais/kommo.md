---
cliente: Identifique Marcas e Patentes
ferramenta: Kommo CRM
atualizado: 2026-04-14
---

# Kommo — Credenciais e IDs de Referência

> CONFIDENCIAL — Nunca expor em outputs ou commits públicos.

---

## Conta

| Campo | Valor |
|-------|-------|
| Subdomínio | `comercialidentifiquemarcasepatentescombr` |
| URL base API | `https://comercialidentifiquemarcasepatentescombr.kommo.com/api/v4` |
| Account ID | `35431039` |
| User ID | `12219827` |

## Autenticação

| Tipo | Valor |
|------|-------|
| Token de longa duração (JWT) | `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIyMDFmNjJmMDNkZDkwZjg0OWNiNDk2NmZjOGI4NWEyZDM5NGU0Njk1NzE0OWVjYzIyMzE4ZjIwMTQyOGJlNjc1OWQwYjE3NzQ0NDEwNmE4In0.eyJhdWQiOiIyZTBmNjZlNi05OTIxLTQ1NzAtYmIwNi00YjIzZGNlYWQyOGYiLCJqdGkiOiJiMjAxZjYyZjAzZGQ5MGY4NDljYjQ5NjZmYzhiODVhMmQzOTRlNDY5NTcxNDllY2MyMjMxOGYyMDE0MjhiZTY3NTlkMGIxNzc0NDQxMDZhOCIsImlhdCI6MTc3NjIxNzE1MSwibmJmIjoxNzc2MjE3MTUxLCJleHAiOjE5MjMzNTA0MDAsInN1YiI6IjEyMjE5ODI3IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM1NDMxMDM5LCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZTQ2OGU1NGMtYjYyNS00MzQ2LWJiNzQtZTk4Y2FiNTVkNGJiIiwiYXBpX2RvbWFpbiI6ImFwaS1nLmtvbW1vLmNvbSJ9.bMAH9B3hdKsyjddUf-qrJHHZEEC0ngvPwDn0NVUcoJQZbzYUaikB0BHb9C1ANFzwecqMRtyYwXzY_JBTQTGzIAK6xwiVfgWn8kpEiaf4X1tRSXYTJI-9iJ7VbcuKSkYOHnlCVkbo5QBzP0xrwLvawe1ktkX4uOO3UOjMkXDm-08a02KwOgEYWVb_BTtZjlByd8YPLOvV7qt4E4v14LfINsY-EsVbgQMREWVeLVktevV-OdFb6TCZxbkbI8tpa3TpnYFT-rK2qxK8j96cxjXGaQNLrWxFiS7gk0xHM4RszIp3lX9nzXQUpGBmqsZju7mH266zWYtg1UrHnONzKmf3FQ` |
| ID de Integração | `2e0f66e6-9921-4570-bb06-4b23dcead28f` |
| Expiração token | 2031-02-10 |

**Header de autenticação:**
```
Authorization: Bearer <token acima>
```

---

## Pipelines

| Pipeline | ID | Etapas principais |
|----------|-----|------------------|
| COMERCIAL (principal) | `12279559` | Leads entrada → OPORTUNIDADE → EM CONTATO → NEGOCIAÇÃO FRIA → NEGOCIAÇÃO QUENTE → AG. ASSINATURA |
| RECOMPRA | `12544331` | ENTRADA → EM CONTATO → NEGOCIAÇÃO FRIA → NEGOCIAÇÃO QUENTE → PRAZO ESGOTANDO → AG. CONTRATO |
| Triagem | `12692911` | Contato inicial |
| ADMINISTRATIVO \| GERAL | `13005052` | ADMINISTRATIVO → FINANCEIRO → PROGRAME-SE |
| PARCEIROS | `13005172` | NOVA INDICAÇÃO → REATIVAR |
| MARKETING | `13338296` | PRÉ SELEÇÃO → **Clube ID - Disparo** → DISPARO → ARQUIVO |

---

## Campos Personalizados — Contatos (Clube ID)

| Campo | ID | Tipo | Enums (ID: valor) |
|-------|-----|------|-------------------|
| Clube ID Branch | `3877759` | select | `4296021`:Acessou, `4296023`:Entendeu, `4296025`:Rejeitou |
| Momento Declarado | `3877757` | text | — |
| Posicionamento Declarado | `3877761` | text | — |
| Monitoramento Ativo | `3877765` | select | `4296027`:Sim, `4296029`:Não, `4296031`:Não sabe |
| Motivo Objeção | `3877763` | text | — |
| Clube ID Status | `3877767` | select | `4296033`:Entrou, `4296035`:Interessado, `4296037`:Saiu, `4296039`:Recontato |

---

## Etapa de Disparo — Clube ID

| Campo | Valor |
|-------|-------|
| Pipeline | MARKETING (`13338296`) |
| Etapa | Clube ID - Disparo |
| ID da etapa | `104508012` |
| Uso | Mover lead para esta etapa para acionar o Salesbot do Clube ID |
