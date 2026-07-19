# RHI Pros Website

Conversion-first Next.js App Router website for **RHI Pros** (legal entity: **RHI Solutions LLC**) — calls, quote requests, and local SEO across Berks County and the Lehigh Valley.

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
npm run check:seo
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
- `EMAIL_TO`
- `LEADS_WEBHOOK_URL`
- `DISCORD_WEBHOOK_URL` (optional alias; use this if you only want Discord delivery)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_ID` (e.g. `AW-16834624221`)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

## Current route coverage

- Core: `/`, `/services`, `/service-areas`, `/request-a-quote`, `/projects`, `/about`, `/our-process`, `/warranty`, `/licenses-and-insurance`, `/financing`, `/financing-terms`, `/insurance-claims`, `/fire-water-damage-restoration`, `/privacy`
- Services: `/services/[service]`, `/services/whole-home-remodeling`
- Projects: `/projects/[slug]`
- Local: `/[city]` and `/[city]/[service]`
- SEO: `/sitemap.xml`, `/robots.txt`
- API: `POST /api/quote`
- Health check: `GET /healthz`

## Conversion + anti-spam behavior

- Every main template includes prominent call and quote CTAs.
- Global emergency bar routes fire/water damage users into a call-first path.
- Mobile sticky CTA keeps call/quote actions visible.
- Quote form uses a two-step flow, honeypot protection, and Zod validation.
- If Turnstile keys are set, server validates Turnstile token before accepting lead.
- If `LEADS_WEBHOOK_URL` or `DISCORD_WEBHOOK_URL` is configured, accepted leads are posted server-side to that endpoint.
- Client tracking emits events for call clicks, quote steps, quote submit attempts, quote errors, and successful lead submissions.

## Photo workflow (HEIC / iPhone)

Do **not** place HEIC/HEIF files in `public/` production assets.

1. Prefer capturing iPhone project photos with **Camera → Formats → Most Compatible** (JPEG).
2. Convert existing HEIC photos to JPEG (or WebP) **before** upload.
3. Keep originals outside the production asset folder.
4. Use descriptive filenames based on real project type and location (no keyword stuffing).
5. Write natural alt text; do not keyword-stuff filenames or alt text.
6. Group photographs by actual project folders under `public/images/projects/`.
7. Record before, during, and after photographs when practical.
8. Strip location metadata when privacy requires it.

Optional local-only conversion (dev machine with ImageMagick or similar) can be used outside the Next.js runtime. Do not add a large HEIC conversion dependency to the production app.

## Media sync script

To sync starter images from the WordPress backup:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sync-legacy-photos.ps1
```

## Monitoring

See `MONITORING.md` for uptime and lead-flow checks.
