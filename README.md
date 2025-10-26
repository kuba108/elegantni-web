# Elegantní Web

Marketingová prezentace a portfolio pro elegantniweb.cz postavené na Next.js 14, Reactu a Tailwind CSS.

## Development

```bash
pnpm install
pnpm run dev
```

## Production build

```bash
pnpm run build
pnpm run start
```

## Deployment

Spuštěním `pnpm run deploy` se projekt nahraje na vzdálený server (`deploy@217.16.188.195`), provede se `pnpm install`, build a následně se restartuje systemd služba.  
Deploy script (`scripts/deploy.sh`) lze konfigurovat pomocí proměnných prostředí:

- `DEPLOY_REMOTE_HOST` (default `217.16.188.195`)
- `DEPLOY_REMOTE_USER` (default `deploy`)
- `DEPLOY_REMOTE_PATH` (default `/var/www/elegantni-web`)
- `DEPLOY_GIT_BRANCH` (default aktuální větev)
- `DEPLOY_REPO_URL` (default `git remote origin`)
- `DEPLOY_SERVICE_NAME` (default `elegantni-web`)

Před prvním nasazením se ujistěte, že na serveru existuje odpovídající systemd jednotka, např. `/etc/systemd/system/elegantni-web.service`, která spouští `pnpm run start` v adresáři projektu.

### Nginx reverse proxy

Ukázková konfigurace je v `infra/nginx/elegantni-web.conf`. Po úpravě domény/certifikátů ji nahrajte na server:

```bash
sudo cp infra/nginx/elegantni-web.conf /etc/nginx/sites-available/elegantni-web.conf
sudo ln -s /etc/nginx/sites-available/elegantni-web.conf /etc/nginx/sites-enabled/elegantni-web.conf
sudo nginx -t
sudo systemctl reload nginx
```

Nezapomeňte doplnit `server_name` a zprovoznit TLS (např. pomocí Let's Encrypt) v odkomentovaných částech konfigurace.
