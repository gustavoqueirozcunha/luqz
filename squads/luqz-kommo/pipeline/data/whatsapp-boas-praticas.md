# Boas Práticas WhatsApp — Referência Bruno CRM

> Regras operacionais para disparos sem risco de bloqueio e com máxima taxa de resposta.

---

## Regras Antiblqueio

### Número e Conta
- Nunca usar número pessoal para disparos comerciais em volume
- Sempre usar WhatsApp Business (não WhatsApp comum)
- Aquecer número novo por 2–4 semanas antes de qualquer disparo em escala
- Manter perfil comercial completo: foto, descrição, horário, site

### Volume e Intervalo
- Respeitar os limites por tipo de conta (ver funil-benchmarks.md)
- Variar intervalos entre mensagens — nunca intervalo fixo e idêntico (robôs são detectados por padrão)
- Não disparar em horários atípicos: evitar 22h–8h
- Não disparar mais de 3 horas seguidas sem pausa

### Conteúdo das Mensagens
- Nunca enviar texto 100% idêntico para mais de 20 pessoas sem nenhuma variação
- Usar variáveis de personalização: nome, produto, referência à origem do lead
- Evitar links encurtados genéricos (bit.ly, etc.) — usar links rastreados próprios (Tintim ou similares)
- Evitar palavras de gatilho de spam: "GRÁTIS", "CLIQUE AGORA", "OFERTA EXCLUSIVA" em maiúsculas
- Não incluir múltiplos links em uma única mensagem de abertura

### Gestão da Conta
- Monitorar indicadores de qualidade da conta no WhatsApp Business Manager
- Reduzir volume imediatamente se receber alertas de qualidade
- Nunca forçar volume após alerta de restrição — aguardar 24–48h e retomar gradualmente
- Manter proporção de mensagens respondidas alta: qualidade > volume

---

## Templates para API Oficial (quando aplicável)

### Estrutura Obrigatória de Template
- **Cabeçalho (opcional):** texto ou mídia (imagem/vídeo/documento)
- **Corpo:** mensagem principal (até 1024 caracteres) com variáveis {{1}}, {{2}}, etc.
- **Rodapé (opcional):** texto curto de identificação ou opt-out
- **Botões (opcional):** máximo 3 botões de resposta rápida ou CTA

### Categorias de Template Meta
- **Utilidade:** confirmações, lembretes, atualizações de pedido (aprovação mais rápida)
- **Autenticação:** OTPs e verificações (aprovação automática)
- **Marketing:** promoções, ofertas, conteúdo (revisão mais rigorosa)

---

## Janela de Atendimento (24h)

- A Meta permite mensagens livres (fora de template) apenas dentro da janela de 24h após o último contato do lead
- Fora dessa janela → obrigatório usar template aprovado para reabrir conversa
- Monitorar janelas ativas no Kommo para não perder timing de follow-up orgânico

---

## Humanização Obrigatória

- Toda sequência deve ter pelo menos uma mensagem claramente humana (não parecer bot)
- Usar linguagem conversacional: contrações, pontuação natural, comprimento variado
- Evitar: listas com bullet points, linguagem corporativa, múltiplas perguntas em uma mensagem
- Regra de ouro: se você não enviaria essa mensagem para um amigo, não envie para um lead
