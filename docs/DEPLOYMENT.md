# Deployment

Two apps, two hosts:

| App | Runs on | Address |
|---|---|---|
| `apps/web` — Next.js site | Vercel | `takeoverfc.com` |
| `apps/api` — Laravel + Filament admin | Hostinger (Business shared, hPanel) | `api.takeoverfc.com` |

They talk over two links: the site **reads** content from the API, and the panel
**pings** the site to rebuild pages when content changes.

---

## Before you start

**Check the PHP version.** Laravel 13 requires **PHP 8.3 or newer**. In hPanel go
to **Advanced → PHP Configuration** and confirm the version, then set these:

| Setting | Value |
|---|---|
| `memory_limit` | 256M or higher |
| `max_execution_time` | 120 |
| `upload_max_filesize` | 16M |
| `post_max_size` | 16M |

Enable these extensions if they aren't already: `pdo_mysql`, `mbstring`,
`openssl`, `tokenizer`, `xml`, `ctype`, `bcmath`, `fileinfo`, `curl`, `zip`,
`gd`, `intl`.

---

## Backend — Hostinger

### 1. The directory layout that matters

The single most common Laravel-on-shared-hosting mistake is putting the whole
app inside the web root, which exposes `.env` to the internet. Don't.

```
~/domains/api.takeoverfc.com/
  public_html/        <- document root. Only Laravel's public/ contents go here.
~/takeover-api/       <- the application itself, ABOVE the web root
  app/ config/ routes/ storage/ vendor/ .env
```

If your hPanel plan lets you set a subdomain's document root directly
(**Websites → Subdomains**), point it at `~/takeover-api/public` and skip the
split entirely — that is cleaner and preferred.

### 2. Create the subdomain and database

1. **Websites → Subdomains** → add `api`.
2. **Databases → MySQL Databases** → create a database and user. Copy the
   credentials; Hostinger prefixes both with your account name.

### 3. Get the code up

Business plans include SSH (**Advanced → SSH Access**):

```bash
ssh -p 65002 uXXXXXXXX@your-server-ip

git clone https://github.com/johnseyi/takeover-fc-website.git ~/repo
cp -r ~/repo/apps/api ~/takeover-api
cd ~/takeover-api

composer install --no-dev --optimize-autoloader
```

If Composer runs out of memory, use `php -d memory_limit=-1 $(which composer) install --no-dev --optimize-autoloader`.

No SSH? Run `composer install` locally, then upload the whole folder — including
`vendor/` — over FTP.

### 4. Configure

```bash
cp .env.example .env
php artisan key:generate
nano .env
```

```ini
APP_NAME="Takeover FC"
APP_ENV=production
APP_DEBUG=false                      # never true in production
APP_URL=https://api.takeoverfc.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=uXXXXXXXX_takeoverfc
DB_USERNAME=uXXXXXXXX_admin
DB_PASSWORD=<from hPanel>

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database                 # no Redis on shared hosting

FRONTEND_REVALIDATE_URL=https://takeoverfc.com/api/revalidate
FRONTEND_REVALIDATE_SECRET=<same value as Vercel's REVALIDATE_SECRET>
```

Generate the shared secret once with `openssl rand -hex 32` and use the same
value in both places.

### 5. Migrate, seed and link storage

```bash
php artisan migrate --force
php artisan db:seed --class=ClubSeeder --force   # first deploy only
php artisan storage:link
php artisan config:cache && php artisan route:cache && php artisan view:cache
chmod -R 775 storage bootstrap/cache
```

### 6. Create the first admin

```bash
php artisan tinker
```

```php
App\Models\User::create([
    'name' => 'Your Name',
    'email' => 'you@takeoverfc.com',
    'password' => 'a-long-unique-password',
    'role' => 'admin',
    'is_active' => true,
]);
```

Change that password immediately after first sign-in, and create everyone else
from **Administration → Panel Users** with the narrowest role that fits their
job — media staff do not need to edit the squad.

### 7. Cron

**Advanced → Cron Jobs**, every minute:

```bash
cd ~/takeover-api && php artisan schedule:run >> /dev/null 2>&1
```

Shared hosting can't run a persistent queue worker, so run one on a short lease
every five minutes instead:

```bash
cd ~/takeover-api && php artisan queue:work --stop-when-empty --max-time=55 >> /dev/null 2>&1
```

### 8. If you had to split public/ from the app

Copy the contents of `~/takeover-api/public/` into
`~/domains/api.takeoverfc.com/public_html/`, then edit `index.php` there so both
paths point up one level:

```php
require __DIR__.'/../../takeover-api/vendor/autoload.php';
$app = require_once __DIR__.'/../../takeover-api/bootstrap/app.php';
```

Adjust the `../` depth to match where the folders actually sit.

---

## Frontend — Vercel

1. Import `johnseyi/takeover-fc-website`.
2. **Set Root Directory to `apps/web`.** This is a monorepo; the build fails
   without it.
3. Framework preset: Next.js. Leave build and output settings default.
4. Environment variables:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://api.takeoverfc.com/api/v1` |
| `REVALIDATE_SECRET` | the same secret as the backend |

5. Point `takeoverfc.com` at the deployment, and update `site.url` in
   `apps/web/src/content/site.ts` to the live domain — it drives every canonical
   URL, sitemap entry and share card.

---

## Verifying the loop

```bash
# 1. API is up
curl https://api.takeoverfc.com/api/v1/health

# 2. Content is served
curl https://api.takeoverfc.com/api/v1/players

# 3. Revalidation is wired (should return 401, not 503 —
#    503 means REVALIDATE_SECRET is missing on Vercel)
curl -X POST https://takeoverfc.com/api/revalidate \
  -H 'x-revalidate-secret: wrong' -H 'content-type: application/json' \
  -d '{"tag":"players"}'
```

Then the real test: change a player's name in the panel, save, and reload the
site. It should update within seconds.

---

## Security checklist (§65)

- [ ] `APP_DEBUG=false` in production — a stack trace leaks your database credentials
- [ ] `.env` is above the web root, or unreachable over HTTP
- [ ] HTTPS forced on both domains (hPanel issues free SSL)
- [ ] Every panel user has the narrowest role that fits their job
- [ ] Admin passwords are long and unique
- [ ] Database backups scheduled in hPanel
- [ ] `storage/` and `bootstrap/cache` are `775`, not `777`

---

## Routine deploys

```bash
cd ~/repo && git pull
rsync -a --delete --exclude='.env' --exclude='storage' ~/repo/apps/api/ ~/takeover-api/
cd ~/takeover-api
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

The frontend redeploys itself whenever `main` is pushed.
