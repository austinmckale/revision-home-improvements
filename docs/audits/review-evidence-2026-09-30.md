# Review evidence and publishing decisions — 2026-09-30

This audit replaces the previous request for owner answers with evidence-based publishing decisions. The source-checked public set contains three short Angi excerpts. None is presented as evidence for a particular city, service, photograph, or case study. All 15 historical named records remain recoverable in the unpublished `withheldTestimonials` export in `src/content/testimonials.ts`.

## Primary source checked

[Angi: RHI Solutions LLC](https://www.angi.com/companylist/us/pa/temple/rhi-solutions-llc-reviews-1.htm) identifies the legal name and links rhipros.com. The retrieved profile includes nine dated five-star reviews. The browsing result was cached; it does not prove a live rating/count as of today. No aggregate rating/count is published from this snapshot.

| Historical name | Original review month | Finding / publishing decision                                                                    |
| --------------- | --------------------- | ------------------------------------------------------------------------------------------------ |
| Curin R.        | Feb 2025              | Name/rating/date and text found. Unproved service and city tags withheld.                        |
| Alice H.        | Aug 2024              | Name/rating/date found. Short exact excerpt published with source link.                          |
| Walter M.       | Aug 2024              | Name/rating/date found. Stored wording edits withheld.                                           |
| Elsie M.        | Aug 2024              | Name/rating/date found. Stored rewrite withheld.                                                 |
| David H.        | Jul 2024              | Name/rating/date found. Stored rewrite withheld.                                                 |
| Richard K.      | Jun 2024              | Name/rating/date found. Stored rewrite and unproved project/city association withheld.           |
| Paul C.         | Mar 2024              | Name/rating/date found. Stored edits withheld.                                                   |
| Albert S.       | Mar 2024              | Name/rating/date found. Original wording excerpt published without kitchen/location attribution. |
| Ron K.          | Feb 2024              | Name/rating/date found. Original wording excerpt published without fixture/location attribution. |

The three published excerpts total 21 words of direct quotation. The source link, individual rating, published month, retrieval check date, and company-only association are stored with each record. The wording is not silently polished or recast as the customer's quotation. The nine historical Angi records are not described as false; their originals were located, but the legacy display records combine edited wording and undocumented marketing associations.

## Sources that could not provide original review text

[The configured Google Maps profile](https://www.google.com/maps/place/RHI+Pros/@40.565969,-77.5904957,8z/data=!4m8!3m7!1s0xaacdc9559cf13b27:0xa432cdb7cf5eefa0!8m2!3d40.565969!4d-77.5904957!9m1!1b1!16s%2Fg%2F11x27867dk) could not be retrieved with the browsing tool. [The configured Facebook page](https://www.facebook.com/people/Revision-Home-Improvement/61550081845634/) returned a fetch/cache failure. Public links are retained so visitors can review the profiles themselves. A retrieval failure is not evidence that a review is false or does not exist.

The six historical Google-labeled display records (Janus R., Sara M., Shawn C., Bruce T., Michelle D., Tom W.) are withheld from promotional display because their original Google reviews were not retrieved. No service or location tags from them enter the public helpers.

## Secondary corroboration

[Experience.com: RHI Pros](https://www.experience.com/reviews/RHI-Pros) is a claimed aggregator profile matching the domain and phone. It corroborates Janus R. and Sara M. and surfaces Tammy Y. and a commercial reviewer named Cryptonaire17. Its Sara date is March 23, 2026, contrary to the historical April label. It cannot prove the photo/job/city mapping, and was not substituted for a retrieved original Google review. The first visible results do not authenticate the other four historical Google names.

## Project quote decisions

The repository has 11 project-level quotes. No durable customer-to-project mapping was found. The root cleanup withholds them from public project pages, preserving original records in its evidence archive. These are not declared fraudulent; the decision is to stop promoting an unsupported relationship.

| Project slug                             | Association decision                                                                               |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| allentown-kitchen-layout-upgrade         | Anonymous customer and city unproved.                                                              |
| bethlehem-bathroom-refresh               | Anonymous customer and city unproved.                                                              |
| allentown-commercial-bathroom-renovation | Secondary commercial text match; specific job and Allentown mapping unproved.                      |
| lehigh-valley-basement-finish-and-detail | Anonymous customer and regional mapping unproved.                                                  |
| lehigh-water-damage-rebuild              | Anonymous quote; no project photographs or job mapping.                                            |
| allentown-flooring-replacement-upgrade   | Anonymous customer and city unproved.                                                              |
| bethlehem-drywall-and-finish-repair      | Anonymous customer and city unproved.                                                              |
| reading-paver-patio-buildout             | Anonymous customer and city unproved.                                                              |
| bethlehem-pool-patio-renovation          | Historical Sara excerpt / secondary source match; Bethlehem and photographed job mapping unproved. |
| allentown-fire-damage-interior-rebuild   | Anonymous customer and city unproved.                                                              |
| hamburg-laundry-bathroom-remodel         | Secondary Tammy name/text match; Hamburg and photographed job mapping unproved.                    |

Repository history is evidence of editorial changes, not authentication. Commit `d261024` replaced earlier generic examples with Angi-labeled records; `87755d1` added six Google-labeled records; `323db9a` changed service tags and featured choices. No per-review export, screenshot, original review ID, or customer/job record accompanied those changes. Commit `d7a5334` relabeled certain project markets/anonymous attributions; those labels therefore do not prove customer locations.

## Shared behavior

- `testimonials` contains only source-checked display records; `withheldTestimonials` is an unpublished evidence archive.
- Featured selection returns available checked records and does not throw when an editorial record is withheld.
- Location and service selectors remain strict; with no established associations, they return no tagged reviews.
- `TestimonialStrip` checks the verification metadata, links every displayed excerpt, explains the company-level context, and offers profile links with an honest heading when no verified excerpts are supplied.
- The previously unused `ReviewsSection` delegates to that same component and no longer asserts a static overall rating/count.
- Root owns homepage/landing/manual quote cleanup and general-review placement; those pages must not label company reviews as a particular city's homeowners or a photographed job's customers.

## Validation

Scoped ESLint passed for all three edited testimonial files. Thirteen isolated runtime/server-render checks passed: archive/display separation, strict associations, missing-feature resilience, per-excerpt source links, empty-state rendering, and rejection of withheld records. Repository typecheck initially encountered the root task's in-progress missing `projectEvidence` module; root performs the final integrated typecheck/build after the concurrent edits. No real contact or review message was sent.
