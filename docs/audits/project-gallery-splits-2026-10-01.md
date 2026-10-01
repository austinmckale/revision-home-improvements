# Separate project galleries, 2026-10-01

## Correction

The previous review identified two kitchens but left them as separate groups on one detail page. That still implied a shared project and confused visitors. This pass gives distinct spaces independent public entries and detaches other companion photos with unproven associations. It supersedes the earlier reports' same-page grouping decisions.

## Automatic fixes

| Preserved original route                             | Retained photos                                                        | Independent new route                                                                                                               |
| ---------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `/projects/allentown-kitchen-layout-upgrade`         | Two matching island-kitchen views                                      | `/projects/white-cabinet-open-plan-kitchen`: two matching white-kitchen views                                                       |
| `/projects/bethlehem-bathroom-refresh`               | Two matching dark-frame shower views                                   | `/projects/pink-tile-tub-reference`: one existing-condition tub reference                                                           |
| `/projects/allentown-commercial-bathroom-renovation` | Two blue-partition/restroom views and the matching corridor comparison | `/projects/dark-partition-commercial-restroom`: one restroom-finish reference                                                       |
| `/projects/lehigh-valley-fire-damage-documentation`  | 27 internally consistent framed-interior views                         | `/projects/boarded-dormer-condition-photos`: eight condition views; `/projects/winter-exterior-damage-photos`: three exterior views |

Both kitchens have independent cards, pages, viewers, sharing previews and canonical URLs. The white kitchen follows the island kitchen in the residential listing. The tub stays in planning/progress references, the restroom stays in commercial, and the three construction-condition galleries stay in planning/progress references. Detached references are excluded from service showcase selections.

Condition-reference pages label their photos as existing conditions and invite visitors to plan the next steps, replacing the misleading invitation to get a similar damaged or unfinished project. Planning boards keep their planning labels.

Corrected the island kitchen's unsupported “window-side sink” highlight to describe the appliance wall and countertops. Corrected fire frame `31-img_8476.jpg`: unfinished partitions, overhead insulation and a loose window unit, not a bathtub/toilet flange. The detached tub caption now describes the visible jetted tub and wall-mounted handheld shower. Ryan's bathroom describes one visible window; its mirror reflection is not a second window. Adjusted the white kitchen's mobile hero crop to keep cabinets and appliances visible.

## Project-photo integrity

An independent fresh visual audit opened all **103 unique original portfolio image files** serving the 24 legacy records: 65 literal asset paths and 38 fire-documentation frames. All original bytes are unchanged against the immutable September 30 SHA-256 inventory. Each original route plus its declared split descendants preserves exactly the original source's image paths. No original URL, source record or asset was deleted, moved or rewritten.

There are now 29 public entries and 27 gallery listings. The existing text-only water planning route and duplicate exterior companion remain excluded from the gallery.

Repeated geometry supports retaining the coherent basement, log-house, laundry/half-bath, pool, pavilion, bedroom, flooring and exterior galleries. The blue kitchen photographs and layout diagram match. Ryan's kitchen condition views match the window and cabinet corner. Commercial corridor views match their openings, block wall, ceiling and wash-fixture geometry.

Ryan's bathroom phone screenshot and dark-vanity photo share the apparent room arrangement. Different finishes do not prove separate properties; its screenshot remains a labeled reference without an authenticated timeline. The overlapping exterior companion still cross-links the shared collection and stays out of duplicate showcase placements. Fireplace photos remain room/finish references without verified fire-loss attribution.

## SEO and technical fixes

Shared exports append reviewed entries using declared original-source lineage and reject missing sources or collisions with preserved slugs. Static pages, sitemap, canonicals, CreativeWork schema, sharing metadata, filters and related links follow the new entries automatically. Existing redirects and old canonicals remain.

The source SEO guard now follows original asset lineage for split routes and examines companion groups. Evidence tests require disjoint kitchen photos, separate bath/restroom references, three independent condition collections and exact original-image conservation. Rendered checks require all five new sitemap routes and reject cross-contamination of actual image markup.

## Validation

- Formatting, lint and TypeScript checks passed.
- Nine evidence tests passed, including all 103 original hashes and exact per-source photo preservation.
- Source SEO guard: zero errors; existing warning for the deliberately text-only historical water planning page.
- Production build: 129 generated pages, including 29 project pages.
- Rendered crawl: 120 sitemap routes, 29 project pages, 120 internal targets, zero errors. [Output](rendered-project-splits-2026-10-01.json).
- Image audit: 131 page variants, 193 decoded rasters, 80 delivered image URLs, zero errors. [Output](images-project-splits-2026-10-01.json).
- Desktop/mobile review confirmed separate kitchen cards/pages and a white-kitchen viewer limited to its own two photos. The crop adjustment was rebuilt and visually rechecked before publication.

Publication uses the established main-to-Vercel pipeline. The final task response records the deployed commit and live verification.

## Unresolved evidence

Visual similarity supports gallery grouping, not contractor responsibility, job ownership, customer identity, town, scope, completion date or contract boundaries. No job histories, locations, reviews, fire causes or completed restoration claims were inferred. Detached references are not declared separate completed RHI Pros contracts.

The [earlier quality report](site-quality-follow-up-2026-10-01.md) records other completed trust/SEO fixes and outstanding operational facts: current HIC status, insurance documents, job-linked scopes/releases, warranty/financing terms, specialist restoration capabilities and actual lead receipt need primary records or an operational test. Generated water-damage imagery remains labeled generic service imagery, excluded from project galleries and before/after evidence.

This completes known photo-association corrections found in the original inventory; it does not certify every site detail or historical job fact.

## Files modified

- `CODEX.md`
- `src/content/caseStudies.ts`
- `src/content/projectEvidence.ts`
- `src/content/projectShowcase.ts`
- `src/content/imageFocalPoints.ts`
- `src/app/projects/[slug]/page.tsx`
- `scripts/check-content-evidence.mjs`
- `scripts/check-rendered-seo.mjs`
- `scripts/check-seo.ts`
- `docs/audits/project-gallery-splits-2026-10-01.md`
- `docs/audits/project-evidence-2026-09-30.md`
- `docs/audits/site-quality-follow-up-2026-10-01.md`
- `docs/audits/images-project-splits-2026-10-01.json`
- `docs/audits/rendered-project-splits-2026-10-01.json`
