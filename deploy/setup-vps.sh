#!/bin/bash
# LUQZ Cockpit — Setup inicial da VPS
# Rodar uma única vez como root

set -e

echo "==> Atualizando pacotes..."
apt update && apt upgrade -y

echo "==> Instalando Node 20, nginx, PM2..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs nginx git

npm install -g pm2

echo "==> Criando estrutura de diretórios..."
mkdir -p /var/www/luqz/luqz-api
mkdir -p /var/www/luqz/luqz-cockpit/dist
mkdir -p /var/log/pm2

echo "==> Setup concluído. Próximo passo: rodar deploy.sh"
