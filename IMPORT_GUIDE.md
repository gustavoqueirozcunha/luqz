# 📥 Guia de Importação: OpenSquad em Novo Computador

Siga este passo a passo para configurar o ambiente de trabalho em outro computador da agência.

## 1. Pré-requisitos
Certifique-se de que a nova máquina tenha:
*   **Node.js** (Versão 18 ou superior): [Baixe aqui](https://nodejs.org/)
*   **VS Code** (ou seu IDE de preferência)
*   **Antigravity AI** (ou o assistente que você utiliza para rodar os comandos `/opensquad`)

## 2. Passo a Passo da Instalação
1.  **Extraia o Arquivo**: Descompacte o arquivo `OpenSquad_Renato_Asse_Export.zip` na pasta de sua preferência (ex: `C:\Projetos\OpenSquad`).
2.  **Abra no VS Code**: Abra a pasta extraída no seu editor de código.
3.  **Instale Dependências (Opcional)**: No terminal do VS Code, execute:
    ```bash
    npm install
    ```
4.  **Inicie o Sistema**: Digite o comando no chat do seu assistente de IA:
    ```
    /opensquad
    ```

## 3. Configurações de Credenciais
Por segurança, chaves de API e tokens não são exportados. Você precisará reconectar:
*   **Canva**: Execute `/opensquad skills` e siga as instruções para autenticar o Canva MCP.
*   **Apify/Resend**: Verifique os arquivos de configuração das skills se necessário.

## 4. Verificação de Funcionamento
Para garantir que tudo está ok, tente listar os squads:
```
/opensquad list
```
Se os squads (Estratégia, Demanda, etc.) aparecerem na lista, a importação foi um sucesso! 🚀
