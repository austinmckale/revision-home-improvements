# Codex Notes

## Design System: "Drawn to Scope"

The visual identity borrows quietly from architectural drawing sets (crop marks, dimension lines, grids). The motif is visual only; never put drafting puns in visible copy ("Drawn to scope", "Sheet SS-01", "Rev."). Details: `docs/audits/site-polish-2026-10-06.md`.

## Voice (owner direction, October 8, 2026)

- Write like a premium local remodeler talking to a homeowner: short, confident, plain. Sentence-case headings.
- Never use "scope" in visible copy. Say proposal, plan, estimate, the work or the project. Avoid contractor shorthand (closeout, punch list, milestones, sequencing, assemblies, affected-room review).
- Say each promise once, in the right place. The four trust points live in `ConfidenceSection` on About only; the process lives on `/our-process`.
- No stacked link rows or link-box grids. End sections with one clear action. Local SEO links go in one sentence (`placeName()` adds "the" to Lehigh Valley; `serviceLabel()` / `inlineServiceName()` give sentence-case names).
- No "On this page" jump bars, no "Tap to expand" text on photos, no numbered "Client note" labels.
- Project titles and summaries describe the finished space in plain language; card titles are editorial lines in `projectShowcase.ts` (every visible project has one).

- Colors: use `--brand` (`#b4411b`, AA on every light surface) for text, links and buttons. `--brand-bright` is for decorative accents on dark photography only, never text on light backgrounds.
- Type: DM Serif Display (headings), DM Sans (body), IBM Plex Mono 500 via `.annotation` / `font-mono` for drafting labels. Keep annotations short and uppercase.
- Drafting classes live in `@layer components` in `globals.css` so Tailwind utilities can override them: `.annotation`, `.sheet-tag`, `.crop-marks` (tune with `--crop-inset` / `--crop-color`), `.dimension-line` (use `components/ui/DimensionLine.tsx`), `.drafting-grid`, `.blueprint-grid`, `.paper-sheet`.
- Keep the motif in service of the content: no "Sheet A-0x" section tags (removed as noise) and no vanity stat bands. `.sheet-tag` is reserved for the project planner sheet. Figure captions must describe only what is visible and link to the matching collection.
- Scope Builder printing clones the sheet into `.scope-print-root`; site chrome hides in print via `body > header/aside/footer` and `[data-print-hide]`. Never hide bare `header` or `nav` elements in print.
- Headings with a display slogan should include a descriptive eyebrow inside the `h1` (`PageIntro eyebrowInHeading`) and keep a space before any `<br />`.
- Scope Builder (`components/sections/ScopeBuilder.tsx`, shown to visitors as "Project planner"; the internal lead label stays "Scope Builder") uses each service's `whatIncluded`, `pricingFactors` and `qualityFactors`. Never add prices, durations or outcomes to it. "Send this to RHI Pros" opens a contact step inside the sheet and posts directly to `/api/quote` with the same validation (`scopeContactSchema`), honeypot, first-touch attribution and `rhi:generate_lead` conversion as `QuoteForm`; the scope text travels in `details`, and undecided timing is sent as "Exploring options".
- The service-area map (`components/sections/ServiceAreaMap.tsx`) positions places from real coordinates. Only add communities that appear in `locations.ts` priority areas.
- Project preview images go through `next/image`; do not reintroduce `unoptimized`.

## Lead Handling (`src/app/api/quote/route.ts`)

- One endpoint serves the quote form and the Scope Builder; `form_source` labels which one sent the lead.
- Channels: webhook (Discord embed with fields, or generic JSON), lead email, Manager App. Any acknowledged channel is success; otherwise 503 with the phone number.
- Photos (max 4) are resized client-side in `components/forms/PhotoPicker.tsx` and validated in `quoteSchema` and by image signature. They go to Discord (multipart) and the lead email only; keep photo bytes and the Turnstile token out of generic webhooks, Manager App payloads and logs.
- The customer confirmation email runs in `after()` with analytics, repeats only service, timing and location (never free text), and can be disabled with `CUSTOMER_CONFIRMATION_EMAIL=off`.
- Turnstile is enforced only when `TURNSTILE_SECRET_KEY` is set; a Cloudflare outage accepts the lead rather than losing it.
- `scripts/check-lead-delivery.mjs` runs the real route in a VM with only six allowed imports. New route imports must be added to that harness.

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

## Portfolio Presentation

- Curate the largest project placements explicitly in `src/content/projectShowcase.ts`; never let alphabetical or location sorting choose the hero.
- Lead the homepage and Projects page with the patio and pavilion collection, followed by the basement media-room collection and blue-cabinet kitchen collection. Use the reviewed pavilion overview for the homepage hero and a different reviewed angle for its project card. Blue-kitchen photos 02, 04 and 05 show a sink with a wood cutting board and rack; do not describe these accessories as cardboard or an unfinished sink. Choose photo placements for composition, and label actual construction views from what is visible. The September 30 evidence review replaced the mixed kitchen feature; historic slug towns do not authenticate project locations.
- Public project exports apply `projectEvidence.ts`. Preserve the original records for traceability; do not publish their unsupported towns, durations, customer quotes or hidden construction stories without primary job records. Use `projectEvidenceSplits` to publish distinct spaces on separate routes, retaining declared source lineage. Source-link published company review excerpts.
- Customer-facing titles and descriptions should describe the space, design and finishes in plain language. Keep internal evidence/audit explanations in the audit reports. Different kitchens belong in separate project entries, not different groups on one page. Detach companion bathroom, commercial-restroom or condition photos when their association is unproven; present them as independent references without claiming completed jobs. Keep visually matching construction stages and layout diagrams with their own space. Label generated service imagery as illustrative and keep it out of project galleries.
- Keep commercial jobs in the separate commercial section, with the same card size as supporting residential work.
- Owner decision, October 8, 2026: condition photos, construction documentation and planning boards are not shown publicly. Retired collections are listed in `src/content/retiredProjects.ts`; their records and originals stay in the repository and their URLs redirect to the matching service page. The paver patio and gable-roof pavilion were both built by RHI Pros (owner-confirmed).
- Project pages lead with the photos. "More like this" cards sit in a `data-related-projects` section, which the rendered checks exclude when testing that a collection's own photos do not mix.
- Review the actual photos, crops, card order, filters, and mobile layout before publishing portfolio changes.
- Prepared `-preview.webp` assets are derived from the matching real project photos; keep original photos available for the detailed galleries.

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
