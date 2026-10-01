# Project evidence review, 2026-09-30

## Decision

The supplied media supports descriptions of visible rooms and details. It does not authenticate the contractor responsible, the customer, a project town, contract boundaries, a build duration, hidden construction work, or customer quotations. We cannot manufacture that evidence by reasoning about pictures.

The public correction is therefore to retain the existing URLs and supplied images, remove unsupported job-story assertions, and describe each record as a photo overview, comparison graphic, or general planning outline. This resolves the unsafe publication claims without asking the owner to supply answers they do not have. The underlying historical facts remain unknown rather than being declared verified.

The implementation data is [projectEvidence.ts](../../src/content/projectEvidence.ts). The root task applies those overrides through the shared content exports and adjusts the page, gallery, and SEO templates. This evidence pass does not independently certify the final rendered integration or deployment.

## Evidence examined

- All 24 existing records and all 103 unique referenced assets: 106 per-record unique references, including the three exact files reused by the exterior records. A fresh SHA-256 comparison found no changed original photo bytes against the prior [inventory](project-photo-inventory-2026-09-30.json).
- All 106 per-record references visually inspected in the contact sheets under `docs/audits/evidence/`. Critical kitchen, bathroom, comparison-board, and cabinet-layout assets were also opened at larger resolution.
- The local `Photos Labeled`, `Bathroom Folder`, and `Basement photos` source inventory; source matches recorded in the prior inventory; the ingestion scripts; and Git history for the case-study data and disputed asset folders.
- Raster dimensions, orientation, and selected EXIF date fields. Only date/orientation/dimension/hash values were saved. GPS, addresses, private owner identifiers, and raw EXIF were not exported.
- Repository document search did not locate signed scopes, invoices, photo releases, property/job identifiers, customer communications, or job-linked completion records. Existing marketing data and AI/co-authored Git changes are not independent evidence that the historical stories happened.

## High-priority findings and concrete corrections

### Kitchen: two rooms, retained separately

The island kitchen has dark island cabinetry, wood-tone wall cabinets, pendant lights, and a large appliance wall. The other kitchen has white cabinets, no comparable island, gray wood-look flooring, and an adjacent ceiling fan. The two high-end photos show matching visible features; the two white-cabinet photos also form a matching pair. They should not be presented as one remodeling job.

The two island photos contain matching EXIF original dates on 2025-02-08; the white-cabinet portrait contains an original date on 2023-10-25. These editable metadata values support the grouping decision but authenticate neither property nor job date. The wide white-cabinet image has no usable capture-date field in this check.

Git `f6c937f` removed a high-end photo from the mixed case; later organization and showcase changes reintroduced the island pair. Git `d7a5334` changed the kitchen town from Reading to Allentown and changed its anonymous testimonial author from “Reading homeowner” to “Allentown homeowner” in the same edit. No job identifier or documentation was introduced with the relabeling.

Correction: main island pair plus a clearly separate white-cabinet group on the existing URL; neutral visible-feature copy; no Allentown assertion, duration, customer quotation, or hidden scope. The mixed record is excluded from service-feature selection. Featured editorial placement should use a coherent collection instead.

### Exterior: confirmed repeated visual collection, unknown contracts and town

The Full Exterior and Dormer/Shutter records reuse the same three exact assets, not just similar photos. Two referenced images also match `Photos Labeled/Wyomissing Exterior Refresh/` originals byte for byte. Git `d7a5334` changed both public locations from Wyomissing to Lehigh Valley. This establishes a source-label conflict and asset reuse; it does not prove whether there were one or multiple contracts.

The pictures show matching dormer, porch, window, and facade arrangements. Correction: keep the full overview as the primary visual collection; preserve the detail URL and its photos, add a shared-collection reference to the overview, and omit the duplicate detail card from the visual grid. No redirect, route deletion, or declaration that contracts were merged is needed. Remove both asserted towns and schedules.

### Fireplace: fireplace work is visible, fire-loss attribution is not

`fireplace-hearth-finished.jpg` and `bathroom-tile-in-progress.jpg` show a matching fireplace surround and dark hearth. The latter is not visibly a bathroom despite its filename. The photos contain selected EXIF original dates of 2022-02-28 and 2022-01-13; these values do not prove who performed the work or why it was needed.

There is no exact shared image or property identifier joining this pair to the 38-image damaged-house field set. Correction: title and captions describe fireplace surround/hearth details; clear the fire-loss story and testimonial; keep the photos; classify the collection under the existing interior-finish/drywall taxonomy and prevent it from being featured as fire restoration evidence.

### Field set: unfinished conditions, three visual groups

All 38 files remain available. They form useful visible groups, without proving that every group is one property:

- 01–08: boarded dormers and stripped interior with exposed boards/framing.
- 09–35: matching entry, staircase, white-coated lower-level framing, upper partitions, insulation, and unfinished bathroom views.
- 36–38: matching winter exterior views of a visibly damaged house with boarded windows, a brick chimney, and a stone-faced lower story.

The public main gallery uses 09–35; separate groups retain 01–08 and 36–38. No completed reconstruction is visible. The ingestion script explicitly places every fire-documentation file in `after`, which invalidates any attempt to infer completed stage from that directory name. Correction: neutral field-photo description and groups; no completed-rebuild, claim-support outcome, town, sequence, or documented relationship to the fireplace pair. Keep the record in the documentation collection rather than promoting it as a completed residential job.

### Bathroom continuity and comparison graphics

The Bethlehem doorway photo and its after-shower photo visibly share the white molded shower insert, dark shower frame, shelving, gray vanity, and rug. The separately supplied pink-tile tub view does not establish a direct pairing to those views. Correction: retain the coherent shower pair as the main gallery; retain the pink-tile tub separately and clear that unsupported before/after toggle. Git `d7a5334` changed this town from Wyomissing to Bethlehem and relabeled the testimonial author; neither town is authenticated by the pictures.

The beige graphics show photo collages with printed before/after labels. Their shower uses patterned tile, niches, and a bench, while the current Bethlehem shower uses a molded white insert. No exact source reuse or shared property between these records is established. An initial thumbnail inference of reuse was withdrawn after full-resolution inspection. The corrected public data makes no such relationship claim.

Git `ff4e597` described the beige assets as supplied layout templates and rewrote a formerly hidden staging record into a completed/planned narrative. That marketing rewrite is not evidence of construction or even of a real planning process. Correction: describe the two assets as comparison boards only; preserve the printed labels inside the graphics; remove RHI authorship, location, build schedule, and completed-project claims.

### Other unsupported scope assertions

- Pool surround: pictures show a gray textured surface and light stone-pattern border. They do not establish a paver material or installed system. Replace “paver lines”/installation assertions with visible surround and border details.
- Ryan bathroom: a bathing area is visible; the “half-bath refresh” label is contradicted by the finished view. Retain it as bathroom details, without a claimed construction scope. The before asset is a screenshot; its EXIF original timestamp is later than the finished photo timestamp, while the screenshot itself displays an earlier photo date. These are not reliable construction dates. Keep the screenshot separately rather than claiming an exact before/after chronology.
- Ryan bedroom: matching images visibly show carpet and wood-look floor surfaces, so “flooring was not the lead scope” cannot be inferred. Describe all visible room differences, without assigning construction responsibilities.
- Blue kitchen — corrected October 1: the earlier review misidentified a wooden cutting board and sink rack as cardboard and an unfinished sink in `after/02`, `after/04`, and `after/05`. Those three frames show a sink, faucet, installed counter and backsplash; `process/01` also shows installed finishes. Actual cabinetry in progress appears in `after/01`, `after/03`, and `process/02`. The public captions now describe those visible differences. The cabinet layout diagram remains in its own reference group. Larger-resolution inspection found dimensions and installation notes, without an owner name or address in the visible diagram. This correction establishes visible features, not RHI job ownership, location or chronology.
- One-frame room, staircase, bar, ranch, and flooring collections establish appearance only. They do not prove preparation, leveling, waterproofing, structural safety, permits, replacements, electrical work, deadlines, or performance outcomes.
- Text-only water case: no verified photos or supporting job record. It becomes general reconstruction planning and expressly says it is not a documented completed project. It remains outside the visual grid and service-feature selection. No generated or unrelated image was inserted.

## Review of all 24 records

Counts are per-record unique original references. “Matching” below describes visible continuity only; it does not certify contract history, RHI authorship, town, or actual construction dates. Exact photo dates and construction durations are omitted from every public record.

| Existing route slug                         | Original refs | Observable evidence and correction                                                                                                                                                                              |
| ------------------------------------------- | ------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allentown-kitchen-layout-upgrade            |             4 | Two matching island views, separate matching white-cabinet views. Split into explicit groups; omit town, job story, testimonial, and feature selection.                                                         |
| bethlehem-bathroom-refresh                  |             3 | Doorway and molded-shower views match. Pink-tile tub relationship unknown; separate group instead of before/after pairing.                                                                                      |
| allentown-commercial-bathroom-renovation    |             5 | Blue-partition restroom views; matching corridor comparison; dark-partition stall has different finishes and its own group. No unified contract or town asserted.                                               |
| allentown-exterior-log-home-refresh         |             3 | Matching log-style exterior elevations and lift. Describe visible access and facade details; no timeline or construction-scope claim.                                                                           |
| bethlehem-exterior-staircase-build          |             1 | Landing, stairs, posts, and railing visible. No structural safety, code compliance, replacement, or town claim.                                                                                                 |
| reading-commercial-bar-window-upgrade       |             1 | Row of windows with dark trim along commercial seating area. No replacement or performance assertion; retain commercial collection and existing category.                                                       |
| lehigh-valley-full-exterior-refresh         |             4 | Matching exterior collection including supplied earlier and work-stage views. Primary visual collection; no town or contract inference.                                                                         |
| lehigh-valley-dormer-shutter-detail-refresh |             3 | Exact three-file reuse from primary exterior collection. Retain URL/photos and shared-collection reference; hide duplicate grid card.                                                                           |
| bethlehem-interior-flooring-refresh         |             1 | Warm-toned floorboards, light walls, lights, and trimmed opening visible. Remove Reading/Bethlehem and replacement/scope assertions.                                                                            |
| berks-county-ranch-exterior-refresh         |             1 | Single-story house with contrasting shutters/railing. Original source name says Berks, but no job record authenticates location; publish appearance only.                                                       |
| lehigh-valley-basement-finish-and-detail    |             4 | Matching media wall, fireplace, speaker positions, columns, and patterned glossy floor. Material system, framing/electrical/audio scope, town, and timeline are unproven.                                       |
| lehigh-water-damage-rebuild                 |             0 | No media/job proof. General reconstruction-planning outline, not a completed project.                                                                                                                           |
| allentown-flooring-replacement-upgrade      |             2 | Matching living-room, kitchen-opening, fireplace and sliding-door views. No subfloor leveling, durability, repair, or testimonial evidence.                                                                     |
| bethlehem-drywall-and-finish-repair         |             1 | Light-walled room, doors, fan/lights, tiled floor visible. No damaged-condition photo or repair-cycle evidence.                                                                                                 |
| reading-paver-patio-buildout                |             5 | Matching pavilion and patio views; separate supplied construction view. No base-compaction, drainage-performance, contract timeline, or town assertion.                                                         |
| bethlehem-pool-patio-renovation             |             3 | Matching curved pool and surrounding views. Preserve visual stage comparison; describe texture/border rather than inventing paver material.                                                                     |
| allentown-fire-damage-interior-rebuild      |             2 | Matching fireplace/hearth visible, fire-loss relationship unsupported. Neutral fireplace details and interior-finish category.                                                                                  |
| ryan-bedroom-interior-refresh               |             6 | Matching window/fan/room arrangement at visible stages. Retain visual stage comparison and work photos; no lead-scope or town assertion.                                                                        |
| blue-kitchen-cabinet-counters               |             8 | Coherent blue-cabinet collection with visible installation stages and separate layout diagram. Correct “finished” overstatements; no project timeline/town claim.                                               |
| ryan-kitchen-remodel                        |             2 | Matching kitchen corner/window arrangement and supplied stage labels. Retain visual comparison, without authenticated construction dates or hidden scope.                                                       |
| ryan-bathroom-remodel                       |             2 | Bathroom has a bathing area. Keep before screenshot separately, remove half-bath and exact chronological transformation assertions.                                                                             |
| hamburg-laundry-bathroom-remodel            |             5 | Matching narrow-room/window/wall-bay configuration across supplied views. Utility sink, toilet, shelving, and appliance visible; retain visual stage comparison. No review-project association or town claimed. |
| lehigh-valley-fire-damage-documentation     |            38 | Three separate visual groups, no finished reconstruction. Retain all files without claiming they are one property or belong to fireplace work.                                                                  |
| beige-bathroom-before-after                 |             2 | Two comparison graphics with embedded labels. No separate completed job, location, authorship, or planning-process assertion.                                                                                   |

## Shared public-data rules

Every override clears `timeline`, `testimonial`, `challenge`, `solution`, and `results`; sets an empty location slug; and replaces detailed construction scope with visible features. Photo records use `mediaType: "photos"`. Water planning and comparison graphics use the existing planning type, with accurate titles and explanatory notes.

The retained stage comparisons are commercial corridor, primary exterior, pool surround, bedroom, Ryan kitchen, and Hamburg utility room. These have matching visible layouts/details and supplied stage labels. They establish a useful visual comparison, not independently verified dates, RHI authorship, or performance claims. Unproven stages go into separately described photo groups.

All original asset paths remain referenced. No photos were erased, source bytes changed, assets reassigned to another claimed job, photos generated, URLs changed, redirects added, towns guessed, or contracts declared merged. Suppressed assertions remain recoverable in the original raw content and Git history.

## Verification of this contribution

- `projectEvidenceOverrides` has all 24 expected record keys.
- VM/transpile coverage check: all original 106 per-record unique references and all 103 distinct assets remain in the union of main galleries, groups, and stage arrays; zero missing file paths.
- Fresh original-file SHA-256 check: zero differences from the earlier inventory.
- Selected metadata check: 16 distinct referenced assets contain EXIF (17 per-record references); eight contain selected date fields. Only one referenced asset requires a display orientation change (Ryan finished bathroom, orientation 6). Metadata is treated as mutable supporting context, not job authentication.
- Prettier 3.6.2, 120-column formatting: passed for the new implementation file.
- `npm run typecheck`: passed after the overrides and root type additions were present.

The root integration still needs formatting/lint/build/rendered SEO/browser checks after all template changes. Live database media, current external credentials/reviews, source ownership/releases, and deployment behavior are separate verification domains. Their absence does not justify publishing unsupported job details.
