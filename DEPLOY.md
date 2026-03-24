# Deployment

This project deploys to **Vercel**. Never run `next start` or serve locally.

## Deploy to production

```bash
vercel --prod --yes --token "$VERCEL_TOKEN"
```

Set `VERCEL_TOKEN` as an environment variable. Never commit tokens to this file or any tracked file.

## Credentials

- Token: set via `VERCEL_TOKEN` env var (never hardcode)
- Project ID: `prj_WnVbTWYosQN6tRDeOBaQxwhAj6LX`
- Org/Team ID: `team_96UJEWVeB79OIQIXeGB5MbcX`

## Git

Push to `main` branch on `ZeroTimeDrift/vlt-landing`. Vercel auto-deploys on push if configured.

## Domain

Target: `vlt.money` (DNS not yet pointed). Interim: `https://landing-lime-iota-52.vercel.app`
