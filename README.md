# vlt.money Landing Page

Next.js 14 (App Router) landing page for Vault — email waitlist capture.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- Deployed to Vercel at **https://vlt.money** *(pending deploy)*

## Local dev

```bash
npm install
npm run dev     # http://localhost:3000
```

## Production build

```bash
npm run build
npm run start   # http://localhost:3000
```

## Deploy to Vercel

```bash
npx vercel --yes --token <VERCEL_TOKEN>
```

Or connect the GitHub repo `ZeroTimeDrift/vlt-landing` to Vercel for automatic deploys.

## Waitlist storage

Emails are stored at `/tmp/vault/waitlist.json` by default.
Set the `WAITLIST_PATH` env var to override (e.g. `/root/vault/waitlist.json`).

## Design tokens

| Token    | Value     |
|----------|-----------|
| BG       | `#020810` |
| Primary  | `#0066FF` |
| Font     | Inter     |
