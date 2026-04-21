#!/bin/bash
# LUQZ Cockpit — Deploy completo
# Executar localmente: bash deploy.sh
# Requer: VPS_HOST definido abaixo

set -e

VPS_HOST="root@SEU_IP_AQUI"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo ""
echo "======================================="
echo "  LUQZ Cockpit — Deploy para produção"
echo "======================================="
echo ""

# ── 1. Build do frontend ─────────────────────────────────────────────────
echo "==> [1/5] Build do frontend..."
cd "$REPO_DIR/luqz-cockpit"
npm ci --silent
VITE_API_URL="/api" npm run build
echo "    ✓ Build concluído em dist/"

# ── 2. Enviar backend para VPS ───────────────────────────────────────────
echo "==> [2/5] Enviando backend..."
rsync -az --exclude='node_modules' --exclude='.env' \
  "$REPO_DIR/luqz-api/" \
  "$VPS_HOST:/var/www/luqz/luqz-api/"
echo "    ✓ Backend enviado"

# ── 3. Enviar frontend buildado para VPS ─────────────────────────────────
echo "==> [3/5] Enviando frontend..."
rsync -az \
  "$REPO_DIR/luqz-cockpit/dist/" \
  "$VPS_HOST:/var/www/luqz/luqz-cockpit/dist/"
echo "    ✓ Frontend enviado"

# ── 4. Configurar nginx ──────────────────────────────────────────────────
echo "==> [4/5] Configurando nginx..."
scp "$REPO_DIR/deploy/nginx.conf" \
  "$VPS_HOST:/etc/nginx/sites-available/luqz"
ssh "$VPS_HOST" "
  ln -sf /etc/nginx/sites-available/luqz /etc/nginx/sites-enabled/luqz
  rm -f /etc/nginx/sites-enabled/default
  nginx -t && systemctl reload nginx
"
echo "    ✓ Nginx configurado"

# ── 5. Instalar deps e (re)iniciar API com PM2 ───────────────────────────
echo "==> [5/5] Iniciando API com PM2..."
ssh "$VPS_HOST" "
  cd /var/www/luqz/luqz-api
  npm ci --omit=dev --silent
  pm2 delete luqz-api 2>/dev/null || true
  pm2 start ecosystem.config.cjs
  pm2 save
  pm2 startup | tail -1 | bash || true
"
echo "    ✓ API rodando com PM2"

echo ""
echo "======================================="
echo "  Deploy concluído!"
echo "======================================="
echo ""
echo "  Verifique:"
echo "  → Frontend: http://SEU_DOMINIO_OU_IP"
echo "  → API health: http://SEU_DOMINIO_OU_IP/api/health"
echo "  → PM2 status: ssh $VPS_HOST pm2 status"
echo ""
