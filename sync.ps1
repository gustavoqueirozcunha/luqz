# Script de sincronização fluida LUQZ
# Este script automatiza o processo de "baixar as novidades" (pull), "salvar suas edições" (commit) e "enviar para a nuvem" (push).

# Força o carregamento do Git no Path, caso tenha acabado de ser instalado
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Iniciando sincronização fluida..." -ForegroundColor Cyan

# 1. Puxar alterações da nuvem
Write-Host "`n>> Baixando alterações do GitHub (git pull)..." -ForegroundColor Yellow
git pull origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro ao fazer pull. Verifique se há conflitos ou se você precisa autenticar." -ForegroundColor Red
    Pause
    exit
}

# 2. Adicionar mudanças locais
if ($args.Count -eq 0) {
    Write-Host "`n>> Nenhum caminho informado para staging." -ForegroundColor Yellow
    Write-Host "Execute assim: .\sync.ps1 <arquivo-ou-pasta> <arquivo-ou-pasta> ..." -ForegroundColor Yellow
    Write-Host "Exemplo: .\sync.ps1 CLAUDE.md skills\meta-ads squads\luqz-trafego" -ForegroundColor Yellow
    Pause
    exit
}

Write-Host "`n>> Preparando os caminhos informados (git add)..." -ForegroundColor Yellow
git add -- @args

# 3. Criar o commit
Write-Host "`n>> Salvando as edições (git commit)..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Atualização automática (Sync) - $timestamp"
git commit -m $commitMessage

# 4. Enviar para a nuvem
Write-Host "`n>> Enviando alterações para o GitHub (git push)..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSincronização concluída com sucesso! Seu repositório está atualizado." -ForegroundColor Green
} else {
    Write-Host "`nErro durante o push. Você está autenticado no GitHub?" -ForegroundColor Red
}

Write-Host "`nPressione qualquer tecla para fechar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
