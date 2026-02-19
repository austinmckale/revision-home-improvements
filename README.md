# RHI Pros Website Rebuild

Conversion-first Next.js App Router website for Revision Home Improvements (calls + quote requests + local SEO).

## Goals

- Drive qualified phone calls and quote form submissions.
- Build out scalable local SEO routes: services, city hubs, and city+service pages.
- Reuse migrated WordPress media with optimized page architecture.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Metadata API + `sitemap.ts` + `robots.ts`
- API route for lead form handling with Zod validation

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build and quality checks

```powershell
npm run lint
npm run typecheck
npm run build
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo into Vercel.
3. Set environment variables from `.env.example`.
4. Deploy from `main`.
5. After deploy, validate:
   - `/`
   - `/request-a-quote`
   - `/sitemap.xml`
   - `/healthz`

## Environment variables

Copy `.env.example` to `.env.local` and fill values:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `LEADS_TO_EMAIL`
- `LEADS_WEBHOOK_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

## Current route coverage

- Core: `/`, `/services`, `/service-areas`, `/request-a-quote`, `/projects`, `/about`, `/financing`, `/insurance-claims`, `/privacy`
- Services: `/services/[service]`
- Local: `/[city]` and `/[city]/[service]`
- SEO: `/sitemap.xml`, `/robots.txt`
- API: `POST /api/quote`
- Health check: `GET /healthz`

## Conversion + anti-spam behavior

- Every main template includes prominent call and quote CTAs.
- Mobile sticky CTA keeps call/quote actions visible.
- Quote form uses honeypot + Zod validation.
- If Turnstile keys are set, server validates Turnstile token before accepting lead.
- If `LEADS_WEBHOOK_URL` is configured, accepted leads are posted server-side to that endpoint.

## Media sync script

To sync starter images from the WordPress backup:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sync-legacy-photos.ps1
```

## Monitoring

See `MONITORING.md` for uptime and lead-flow checks.
