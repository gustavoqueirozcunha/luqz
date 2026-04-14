---
name: clickup-torre-uploader
description: Automatiza a transferência de documentos estratégicos (briefing, estratégia, mídia, copy) para a Torre de Controle do cliente no ClickUp, garantindo formatação premium e organização por subpáginas.
version: 1.0.0
---

# ClickUp Torre Uploader

Esta skill permite que agentes enviem insumos estratégicos gerados localmente para as seções corretas de um documento da Torre de Controle no ClickUp.

## Quando usar
- Ao finalizar peças de conteúdo (roteiros, carrosseis, copies).
- Ao concluir documentos estratégicos (briefing, estratégia de performance, plano de mídia).
- Durante etapas de "Handover" ou entrega final.

## Guia de Formatação Premium (CRÍTICO)

Para manter o padrão LUQZ de excelência visual, **NUNCA** apenas cole o markdown puro no ClickUp. O editor do ClickUp é rico em blocos e deve ser operado como tal:

### 1. Estrutura de Blocos
- **Cabeçalhos**: Use o comando de barra `/h1 ` para títulos principais e `/h2 ` para seções secundárias. Pressione espaço após o comando para ativar o bloco.
- **Divisores**: Use `/divider` entre grandes seções de conteúdo (ex: entre um roteiro e outro no Plano Criativo).
- **Tabelas**: Use o comando `/table` para criar uma tabela nativa do ClickUp. **Não use tabelas em markdown de texto**. Preencha as células individualmente.

### 2. Tratamento de Acentos e Caracteres Especiais
Devido a limitações de simulação de teclado em alguns navegadores, se ao digitar você notar que caracteres como `á`, `ç`, `õ` ou `—` estão falhando:
- Use um script de **JS injection** para inserir o texto diretamente no elemento focado:
  ```javascript
  document.execCommand('insertText', false, "Texto com acentos: Cássio, Estratégia, Produção");
  ```

### 3. Classificação Automática
Mapeie os arquivos para as subpáginas da Torre:
- `Análise da conta`: Diagnósticos, levantamentos, auditorias.
- `Plano de mídia`: Estratégia de canais, distribuição, verbas.
- `Plano Criativo`: Roteiros, copies, v0/v1 de criativos econômicos.
- `Briefing e Entendimento do Cliente`: Briefings de reunião e setup.
- `Documentos`: Caso o arquivo não se encaixe em nenhuma categoria específica.

## Procedimento de Execução
1. Identifique a URL da Torre de Controle do cliente no contexto.
2. Navegue até a subpágina correta.
3. Limpe qualquer conteúdo temporário ou duplicado.
4. Insira o conteúdo novo seguindo as regras de **Formatação Premium**.
5. Finalize capturando um screenshot para validação visual.
