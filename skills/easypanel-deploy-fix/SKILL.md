---
name: easypanel-deploy-fix
description: Deploy correto de build estático em serviços geridos pelo Easypanel (Docker Swarm + Traefik + Nixpacks). Use quando o site mostra build antigo mesmo após copiar arquivos para o servidor.
description_pt-BR: Diagnóstico e correção de deploys em containers Easypanel. Cobre o caso em que o tráfego público passa pelo Traefik → container Swarm, e não pelo nginx do host — tornando a cópia direta para /var/www ineficaz.
type: prompt
version: "1.0.0"
categories:
  - devops
  - deploy
  - docker
  - easypanel
  - debug
---

# Easypanel Deploy Fix

## When to use

Use esta skill quando:

- Site hospedado em VPS com **Easypanel** mostra build antigo após deploy
- `curl` direto no nginx do host (`127.0.0.1:<porta>`) retorna build novo, mas domínio público retorna antigo
- Confirmou que existe um container Docker com a imagem `easypanel/<projeto>/<serviço>:latest`
- Precisa atualizar um serviço de frontend estático gerido pelo Easypanel

**Não use** quando:
- O site é servido diretamente pelo nginx do host (sem container)
- O deploy é via CI/CD com pipeline próprio (GitHub Actions, GitLab CI etc.)

## Pré-requisitos

- Acesso SSH root ao VPS
- Docker Swarm inicializado (`docker node ls` funcional)
- Build local (`dist/`) pronto e já enviado ao servidor

## Contexto arquitetural

Em servidores Easypanel, o tráfego segue este caminho:

```
Internet → Cloudflare → Traefik (Easypanel) → Docker Swarm Service → Container
```

O **nginx do host NÃO atende o tráfego público**. Copiar arquivos para `/var/www/...` atualiza apenas o nginx local — que não é exposto.

O Easypanel usa **Nixpacks** para buildar imagens a partir de `/etc/easypanel/projects/<projeto>/<serviço>/code/`. A imagem é rodada como serviço Swarm.

## Playbook de diagnóstico (1 comando por vez)

### 1. Identificar o container

```bash
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}' | grep -i <nome-serviço>
```

Formato do nome: `<projeto>_<serviço>.<replica>.<id>` → confirma Docker Swarm.

### 2. Localizar a pasta de código do Easypanel

```bash
ls /etc/easypanel/projects/<projeto>/<serviço>/code/
```

Esperado: `index.html`, `assets/`, `.nixpacks/`.

### 3. Comparar o hash do bundle antigo vs. novo

```bash
# Build servido em produção
curl -s https://<dominio>/ | grep -oE 'assets/index-[a-zA-Z0-9]+\.js' | head -1

# Build atual na pasta do Easypanel
grep -oE 'assets/index-[a-zA-Z0-9]+\.js' /etc/easypanel/projects/<projeto>/<serviço>/code/index.html | head -1

# Build novo que você gerou localmente
ls <pasta-do-novo-build>/assets/ | grep -oE 'index-[a-zA-Z0-9]+\.js'
```

Se os três forem diferentes → a imagem do container está desatualizada E a pasta code/ também.

## Playbook de correção

### 4. Sincronizar o build novo para a pasta do Easypanel

```bash
sudo rsync -av --delete \
  --exclude='.nixpacks' \
  <pasta-do-novo-build>/ \
  /etc/easypanel/projects/<projeto>/<serviço>/code/
```

**Importante:** o `--exclude='.nixpacks'` preserva o Dockerfile gerado pelo Nixpacks.

**Atenção:** se a pasta origem contiver lixo do sistema (ex: `systemd-private-*`, `snap-private-tmp`), limpe após o rsync:

```bash
cd /etc/easypanel/projects/<projeto>/<serviço>/code/
sudo rm -rf snap-private-tmp systemd-private-* dist-deploy.zip
```

### 5. Rebuildar a imagem com a mesma tag

```bash
cd /etc/easypanel/projects/<projeto>/<serviço>/code/
docker build -f .nixpacks/Dockerfile -t easypanel/<projeto>/<serviço>:latest .
```

Primeira build pode demorar 80-120s (instalação de pacotes Nix). Builds seguintes ~15s (cache de layers).

### 6. Forçar o serviço Swarm a atualizar

```bash
docker service update --force --image easypanel/<projeto>/<serviço>:latest <projeto>_<serviço>
```

Esperado: `overall progress: 1 out of 1 tasks` → `verify: Service converged`.

### 7. Validar (bypass cache externo)

```bash
curl -s "https://<dominio>/?nocache=$(date +%s)" | grep -oE 'assets/index-[a-zA-Z0-9]+\.js' | head -1
```

O hash retornado deve bater com o hash do novo build local.

No browser: **Ctrl+Shift+R** para limpar cache local.

## Regras importantes

- **Não mexer no nginx do host.** Ele não é quem serve o tráfego público.
- **Sempre usar a mesma tag** (`:latest`) no rebuild — o serviço Swarm está vinculado a ela.
- **`docker service update --force`** é obrigatório — sem `--force`, o Swarm mantém o container atual porque a tag não mudou.
- **Cloudflare cache:** se após todos os passos o site ainda mostrar antigo, purgar cache na Cloudflare (Caching → Configuration → Purge Everything).
- **Não deletar a pasta `.nixpacks/`** — sem o Dockerfile gerado, não é possível rebuildar sem reinstalar o projeto no Easypanel.

## Troubleshooting

| Sintoma | Diagnóstico | Fix |
|---------|-------------|-----|
| `service <nome> not found` | Nome do serviço diferente do esperado | `docker service ls \| grep <keyword>` |
| Build falha em `nix-env -if` | Rede lenta ou pacote removido | Retentar; se persistir, reinstalar projeto pelo UI Easypanel |
| `permission denied` em `/etc/easypanel/` | Não é root | Prefixar com `sudo` |
| Após tudo, site ainda antigo | Cache Cloudflare | Purgar cache no painel Cloudflare |
| `docker build` não acha Dockerfile | Pasta `.nixpacks/` foi deletada | Reinstalar o projeto via UI Easypanel |

## Referência rápida (copiar/colar)

Fluxo completo para um serviço `<projeto>_<serviço>`:

```bash
# 1. Sync
sudo rsync -av --delete --exclude='.nixpacks' \
  <origem>/ /etc/easypanel/projects/<projeto>/<serviço>/code/

# 2. Build
cd /etc/easypanel/projects/<projeto>/<serviço>/code/
docker build -f .nixpacks/Dockerfile -t easypanel/<projeto>/<serviço>:latest .

# 3. Deploy
docker service update --force \
  --image easypanel/<projeto>/<serviço>:latest \
  <projeto>_<serviço>

# 4. Validar
curl -s "https://<dominio>/?nocache=$(date +%s)" | grep -oE 'index-[a-zA-Z0-9]+\.js' | head -1
```
