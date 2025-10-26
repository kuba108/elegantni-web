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
- `DEPLOY_REMOTE_PATH` (default `/var/www/production/elegantni_web`)
- `DEPLOY_GIT_BRANCH` (default `main`)
- `DEPLOY_REPO_URL` (default `git remote origin`)
- `DEPLOY_SERVICE_NAME` (default `elegantni-web`)
- `DEPLOY_FORWARD_AGENT` (default `true`, zapne SSH agent forwarding)
- `DEPLOY_PNPM_BIN` (volitelně absolutní cesta k `pnpm`, pokud není v PATH uživatele `deploy`)

Před prvním nasazením se ujistěte, že na serveru existuje odpovídající systemd jednotka, např. `/etc/systemd/system/elegantni-web.service`, která spouští `pnpm run start` v adresáři projektu.

> Tip: deploy skript načítá `/etc/profile`, `~/.profile`, `~/.bash_profile` i `~/.bashrc`. Pokud si do některého z těchto souborů přidáte proměnné PATH k Node/NPM/PNPM, skript je převezme. SSH agent forwarding zůstává zapnutý, takže nezapomeňte mít v lokálním `ssh-agent` přidaný klíč s přístupem do repozitáře (`ssh-add -l`, případně `ssh-add ~/.ssh/id_rsa`).

### Nginx reverse proxy

Ukázková konfigurace je v `infra/nginx/elegantni-web.conf`. Po úpravě domény/certifikátů ji nahrajte na server:

```bash
sudo cp infra/nginx/elegantni-web.conf /etc/nginx/sites-available/elegantni-web.conf
sudo ln -s /etc/nginx/sites-available/elegantni-web.conf /etc/nginx/sites-enabled/elegantni-web.conf
sudo nginx -t
sudo systemctl reload nginx
```

Nezapomeňte doplnit `server_name` a zprovoznit TLS (např. pomocí Let's Encrypt) v odkomentovaných částech konfigurace.
