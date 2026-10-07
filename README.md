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
- `CUSTOMER_CONFIRMATION_EMAIL` (optional; set to `off` to stop the automatic receipt email to customers)

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
- Homepage Scope Builder lets visitors draft a "scope starter" from real service checklists, print it, or send it directly from the sheet (name, phone, email, city, ZIP). It is delivered through `POST /api/quote` like any quote request, so it reaches the webhook/Discord, email and Manager App channels with the scope in the details.
- If both Turnstile keys are set, the quote form and Scope Builder show Cloudflare Turnstile (usually invisible) and the server verifies the token before accepting a lead. With no keys, the check is off. Add **both** keys together, then redeploy (the site key is built into the page).
- Visitors can attach up to 4 photos. They are resized in the browser (JPEG, location metadata dropped) to keep requests under Vercel's 4.5 MB limit, then attached to the Discord message and lead email. The Manager App notes record the photo count.
- After a lead is delivered, the visitor receives a plain confirmation email (service, timing, location; never their free-text notes) when SMTP is configured.
- Discord messages use labeled fields, show "via Quote form" or "via Scope Builder", display the first photo inline and never ping anyone.
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
