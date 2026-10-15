# Codex Notes

## Design System: "Drawn to Scope"

The visual identity borrows quietly from architectural drawing sets (crop marks, dimension lines, grids). The motif is visual only; never put drafting puns in visible copy ("Drawn to scope", "Sheet SS-01", "Rev."). Details: `docs/audits/site-polish-2026-10-06.md`.

## Two voices (owner, October 15, 2026) — read before writing any copy

The site speaks in two voices. Choose by where the words sit, never mix them.

**1. Brand voice: page headlines, heroes, section headings, intros, buttons.** A premium design-build firm talking to a homeowner: confident, polished, short, a little aspirational. It sells the experience and the result. Sentence-case headings. Owner-approved examples: "Designed with you. Built to the last detail." (home hero), "Spaces worth coming home to." (Projects), "You'll always know where things stand.", "Straight answers.", "Tell us about your project." Never flatten a headline into job-site talk: "Jobs we've built." was rejected as worse than "Spaces worth coming home to." No contractor jargon here (scope, closeout, punch list, milestones, sequencing).

**2. Job-site voice: project names and project stories only.** How the contractor or carpenter who did the job would tell another tradesman: what was there, what we did, plain trade verbs (built, set, hung, laid, poured, pulled, tore out, scraped, primed). Examples: "Built a gable-roof pavilion over a new paver patio.", "Tore out a pink bathroom and put in a double vanity.", "Scraped, primed and painted, then hung black shutters.", "Drywall repairs you can't find." No punchlines, puns, cute twists or filler tags. Rejected: "The pink sink is gone. Now there are two.", "Black-tie trim for a white ranch.", "Built from the ground up. Literally.", "Navy, floor to ceiling. No half measures.", "Three stories of log siding. We brought a lift.", "Open studs to laundry day."

**Both voices:** every fact true to the photos or confirmed by the owner ("the photos tell the story"); plain enough to understand at first read, no riddles; no stock slogans any contractor could use ("Reimagine. Build. Enjoy.", "Made for real life.", "inside and out"); plain homeowner words ("patio", not "surround"). Less text beats weak text: cut any caption or story that repeats the name, reads like an inspection report or looks bad.

**Don't change what wasn't asked for.** Never rewrite an owner-approved headline to satisfy a rule in these notes; propose the change and ask first.

## Voice details (owner direction, October 8, 2026)

- Never use "scope" in visible copy. Say proposal, plan, estimate, the work or the project. Avoid contractor shorthand (closeout, punch list, milestones, sequencing, assemblies, affected-room review).
- Say each promise once, in the right place. The four trust points live in `ConfidenceSection` on About only; the process lives on `/our-process`.
- No stacked link rows or link-box grids. End sections with one clear action. Local SEO links go in one sentence (`placeName()` adds "the" to Lehigh Valley; `serviceLabel()` / `inlineServiceName()` give sentence-case names).
- No "On this page" jump bars, no "Tap to expand" text on photos, no numbered "Client note" labels.
- Service area (owner, October 13, 2026): RHI Pros covers the whole strip from Reading to Bethlehem. The footer tagline and the "Where we work" section say so.
- Team statements (October 14, 2026): "We are kind and communicate consistently. Ryan answers consistently and always calls back." The owner's proudest jobs are the gable-roof pavilion and the basement media room.
- Owner direction (October 15, 2026): the homepage presents a high-end design-build firm and focuses on the work, not the owner. Hero: "Designed with you. Built to the last detail." with the services and "from Reading to Bethlehem" underneath. Avoid handyman framing ("We fix that") and wordplay that needs explaining; no owner name in the hero or buttons. Search wording goes in titles, descriptions and small labels.
- Local pages (October 15, 2026, from Search Console): town + service pages are where the site is visible, so they stay; 16 template-only pages with no impressions are noindexed via `noindexCityServicePages` in `localSeo.ts` (no sitemap entry, no internal links). Town + service pages lead with their local section; town hubs describe each service with that town's own planning note. Report: `docs/audits/local-pages-search-console-2026-10-15.md`. Don't index a page from that list again until it has real local content.
- Project towns (owner, October 15, 2026): the towns in the original job records were confirmed as roughly correct, so `ownerConfirmedProjectLocations` in `projectEvidence.ts` publishes each project's recorded town (region-only records show the region). Never invent or guess a town for a project without one in its record, even when asked; leave it blank.
- Reviews (October 15, 2026): Google reviews come from the owner's Business Profile screenshots and are quoted word for word, only complete sentences, as "Google review · 2026" with first name and initial. A review links to a project only when its own photos show that project (the pool). Rating-only reviews, screen names and reviews from people involved with the business are not published. The basement media room floor is epoxy (owner). The crew brought the boom lift on the log-style exterior, and the navy island kitchen has two dishwashers (owner, October 15, 2026).
- Services (owner, October 15, 2026): RHI Pros offers cabinet refacing and patio repair. Don't steer people away from small patio repairs.
- Homepage order (October 14, 2026): hero, service index, project spreads (the two favourites first, alternating sides, then the blue kitchen), pool before/after, owner and reviews, where we work, project planner, FAQ, closing call. On phones the hero photo sits uncropped above the headline. Each project appears once; the process stays on `/our-process` (linked from the FAQ intro). Spreads use `components/sections/ProjectSpread.tsx` with photos picked in `getFeaturedProjectPhotos()` (`projectShowcase.ts`) from that project's own images only. The eight town-and-service links sit in the "Find a service in your town" disclosure. The mobile sticky quote bar shows on the homepage once the hero has scrolled away.
- Project titles and summaries describe the finished space in plain language (search and meta descriptions); the visible names and stories are job-site lines in `projectShowcase.ts` (every visible project has a name).
- Project presentation (owner, October 15, 2026): cards and homepage spreads show the photo, the service and town label, and the name; nothing else. Project pages open with a short story only when it adds something the name and photos don't (before and after, how it was built); otherwise no paragraph and no highlight list. "Don't be afraid to remove captions or stories that look bad": cut any line that repeats the name or reads like an inspection report. Name only materials that are certain ("patterned gray counter", not "quartz").
- Project names everywhere (October 15, 2026): town, service and project cards use the job-site name from `getProjectPresentation()`, show each project once per page, and add a story only where one exists. Plain project titles (`projectEvidence.ts`) are search names used in Google titles as "<title> in <town>". The duplicate "Dormer & shutter details" page redirects to the full exterior project (`retiredProjectRedirects`).
- Reviews on service pages come from `getServiceTestimonials()`: a review about that kind of work first (Karla S. on kitchens, Sara M. on patios), then the featured company reviews.
- Town + service pages on phones: local section, project photos, quote form, then the "More in" links.
- Photo edits: originals stay byte-for-byte (their hashes are checked in `check:evidence`). Crop screenshot frames or burned-in labels into a `-preview.webp`, list it in `projectImagePreviews.ts` and `croppedOriginals` (`photoCuration.ts`, for the lightbox), then run `npm run images:dimensions`.

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
