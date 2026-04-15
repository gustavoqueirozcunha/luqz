# Design System Guide — OpenSquad LUQZ

Este é o documento de partida. Explica como extraimos o máximo do squad e parametrizamos do zero a visualização de marca em larga escala com o *Sistema Master OpenSquad Designer*.

## 1. Filosofia de Uso
O Sistema é construído sobre previsibilidade de conversão. Ou seja, nosso output gráfico em base a este sistema busca ser atemporal, veloz e premium. Ele unifica em pastas padrões toda a diretiva, fazendo com que qualquer novo membro do Design ou mesmo automações AI assumam os recortes com 100% de coesão, lendo e executando.

## 2. Rota do Designer / Ciclo de Nova Instância
Quando um Novo Cliente ingressa no OpenSquad via LUQZ, essa é a rota exata:

### A. Geração Técnica
1. Copie todo repositório da rota `/clientes/_TEMPLATE_CLIENTE/design/` e clone dentro destas pasta individual no novo Cliente.
2. Invoque o Designer ou Orquestrador para "Entrevista Mapeada" para preencher **`direcao-visual.md`** a partir das reuniões ou Briefs passados de Mkt.

### B. Mapeamento
Obrigatório que o Head do Squad ou Arquiteto defina:
- Paleta Primária
- Fontes Secundárias e Primárias
- O que o cliente ODEIA (Anti Pattern) em `sistema-visual.md`.

### C. Uso Contínuo e Execução Semanal
O Designer do Squad, quando processa o "M1 de Social Media Orgânico", antes de exportar artes:
- Acessa o `carrossel-base.md` na pasta `templates/` do cliente.
- Confirma e checa no `referencias.md` do mesmo para entender e não descolar da referência de Top Level Design daquele mês.

## 3. Manutenção da Alta Qualidade
A qualidade e os outputs decaem com o tempo quando "faz-se no achismo diário" por inércia de trabalho volumoso e contínuo. 
1. **Auditoria de Ousadia:** Em cada passagem de M3 ou M6, reveja se o peso visual está ainda coerente.
2. **Atualização do Moodboard:** Alinhe os times para checar e retroalimentar links nas "Referências" e "Anti-Patterns", caso o design passe a "Ficar Velho". 
3. Toda imagem precisa ser exportada em densidades superiores, alinhadas dentro da lógica Premium (Seja Stripe Vibe, Clean Minimalist Apple ou Corporate). Nenhuma arte passa pelo QA Gate se flertar minimamente com clichês fáceis de bancos de imagens descoloridas ou com "Excesso de Poluição".

A Excelência aqui não é evento. Ela é Processo documentado no MarkDown e executável aos domínios estéticos estabelecidos.
