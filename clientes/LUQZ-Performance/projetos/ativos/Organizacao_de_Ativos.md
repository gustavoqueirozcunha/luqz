# Organização de Ativos e Estrutura Digital — LUQZ Performance

## 📊 Inventário Técnico (Tech Stack)

| Ferramenta | Função | URL / Identificador | Status |
| :--- | :--- | :--- | :--- |
| **Site Principal** | Hub de Conversão | [luqz.com.br](https://luqz.com.br) | ✅ Ativo |
| **CRM** | Gestão Comercial | Kommo | 🛠️ Em Configuração |
| **Ads (Meta)** | Geração de Demanda | Gerenciador de Negócios LUQZ | ✅ Ativo |
| **Ads (Google)** | Geração de Demanda | Conta Google Ads LUQZ | ✅ Ativo |
| **Gestão** | Operação Integrada | ClickUp | ✅ Ativo |
| **Tracking** | Auditoria de Dados | GTM (Google Tag Manager) | ✅ Configurado |

---

## 🏗️ Estrutura de Ativos em Projetos

### 1. Ativos de Conversão (Landing Pages)
- **LP Principal:** [luqz.com.br](https://luqz.com.br)
- **Foco:** Captação de Leads para Sessão Estratégica.
- **Tracking:** Eventos de `lead_form_submit` e `whatsapp_click` configurados via GTM.

### 2. Ativos de Geração de Demanda (Ads)
- **Meta Ads:** Pixel implementado e validado. Foco em campanhas de Distribuição de Conteúdo e Conversão Inbound.
- **Google Ads:** Tag Global configurada. Foco em rede de pesquisa para termos institucionais e "Assessoria B2B".

### 3. Ativos Comerciais (CRM)
- **Pipeline:** Deve refletir as 4 etapas da Jornada de Compra (Triagem → Sessão Estratégica → Proposta → Fechamento).
- **Integração:** Webhook da LP para o Kommo CRM deve ser o próximo passo tático.

---

## 🏷️ Protocolo de Nomenclatura (Padrão LUQZ)
Para manter a organização e previsibilidade dos dados, todas as campanhas devem seguir o padrão:
`[PRODUTO] | [TRILHA] | [CANAL] | [OBJECTIVE]`
*Ex: AP360 | T4 | META | CONV*

---
> *Status: Documento Operacional S2 — Versão 1.0*
