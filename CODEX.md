# Codex Notes

## Proven Pattern: Before/After Case Study Toggle

- Keep `before` photos out of generic "Recent Work" galleries.
- Use a dedicated `Before/After` toggle only inside the relevant case study page.
- Default the toggle to `After` so visitors first see finished outcomes.
- Add explicit labels (`Before`, `After`) on the images to avoid ambiguity.
- Use this pattern when a project has mixed-stage photos and we want clarity without cluttering service pages.

## Where Implemented

- Component: `src/components/sections/BeforeAfterToggle.tsx`
- Page integration: `src/app/projects/[slug]/page.tsx`
- Bathroom case study data: `src/content/caseStudies.ts`

## Current Live Content Control (Plan Ahead)

### What the app already controls safely

- Portfolio photos are pulled from Supabase and shown only when:
  - `isPortfolio = true`
  - `type = PHOTO`
  - Job `categoryTags` match site service tags
- Main logic: `src/lib/portfolio.ts`
- Cache bust endpoint (no deploy needed): `POST /api/revalidate` in `src/app/api/revalidate/route.ts`

### Where app-tagged portfolio photos appear on site

- Projects feed: `src/app/projects/page.tsx`
- Service pages (`/services/[service]`): `src/app/services/[service]/page.tsx`
- City-service pages (`/[city]/[service]`): `src/app/[city]/[service]/page.tsx`
- Gallery renderer: `src/components/sections/PortfolioGallery.tsx`

### Important current behavior

- Filtering currently uses job `categoryTags` (not photo-level tags).
- These services currently use curated static galleries (not app portfolio feed):
  - `kitchen-remodeling`
  - `bathroom-remodeling`
  - `basement-finishing`
  - `drywall-installation-repair`
- Config: `curatedStaticGalleryServiceSlugs` in `src/content/services.ts`

### What is still code-managed (requires deploy)

- Case studies and long-form marketing copy:
  - `src/content/caseStudies.ts`
  - `src/content/services.ts`
  - `src/content/locations.ts`
  - `src/content/testimonials.ts`

### Low-risk plan (do not disrupt live app)

1. Keep portfolio photo publishing app-driven (current).
2. Keep case studies curated/manual for quality control.
3. Add a lightweight future "display rules" layer (slot/page/service allowlist) rather than hardcoding placement.
4. Add preview + fallback rules so broken configs never blank live sections.
