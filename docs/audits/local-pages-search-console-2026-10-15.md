# Local pages and Search Console — October 15, 2026

Source: Search Console export, Web search, July 13 – October 12, 2026 (31 clicks, 12,882 US impressions). The raw export is not committed.

## What the data says

- The town pages are where the site is visible. The three biggest pages by impressions are town + service pages: `/lehigh-valley-pa/kitchen-remodeling` (1,457, position 36.5), `/lehigh-valley-pa/bathroom-remodeling` (1,409, 44.5) and `/berks-county-pa/kitchen-remodeling` (1,228, 22.1). Removing them would remove most of the site's search visibility.
- They rank too low to be clicked. Searches closest to page one:

| Query | Impressions | Position | Page Google shows |
| --- | --- | --- | --- |
| paver patio installation allentown pa | 80 | 11.6 | `/allentown-pa/paver-installation` |
| basement finishing reading pa | 87 (1 click) | 11.5 | `/reading-pa/basement-finishing` |
| cabinet remodel berks county | 143 | 13.0 | `/berks-county-pa/kitchen-remodeling` |
| kitchen cabinet remodel berks county | 127 | 14.8 | `/berks-county-pa/kitchen-remodeling` |
| basement remodel in wyomissing pa | 57 | 17.2 | `/wyomissing-pa/basement-finishing` |
| patio repair allentown | 105 | 18.2 | `/allentown-pa/paver-installation` |
| basement finishing bethlehem | 60 | 18.6 | `/bethlehem-pa/basement-finishing` |
| flooring installers reading pa | 57 | 18.9 | `/reading-pa/flooring-installation` |

- The town pages repeated most of their text: 81–84% of each town hub's sentences also appeared on the other hubs once town names were masked; town + service pages repeated 50–85%.
- `/allentown-pa` and `/bethlehem-pa` had no impressions; Google showed other pages for those towns.

## Changes

| Change | Detail |
| --- | --- |
| 16 pages noindexed | Town + service pages with no local content of their own and no impressions in the period (`noindexCityServicePages` in `src/content/localSeo.ts`). They stay live with `noindex, follow`, leave the sitemap (114 → 98 URLs) and are no longer linked; links that pointed to them now go to the town hub or the service page. Every page with impressions keeps its URL and stays indexed. |
| Local content first | Town + service pages open with their local planning section; the general service summary follows it. |
| Town hubs describe each service locally | Each service row uses the first sentence of that town's own planning note where one exists. Hub sentence overlap fell from 81–84% to 55–72%. |
| Guard | `check:rendered-seo` fails if any page links to a noindexed town + service page or lists one in the sitemap; the hub water-damage rule accepts the service page where the local page is noindexed. |

## Owner confirmations (October 15, 2026)

RHI Pros offers cabinet refacing and patio repair. Added:

- `/berks-county-pa/kitchen-cabinet-installation` now covers refacing and replacement ("Cabinet Refacing & Remodeling in Berks County, PA"), with refacing questions and a box-condition factor.
- `/allentown-pa/paver-installation` is "Paver Patio Installation & Repair in Allentown, PA"; its FAQ that steered people away from small repairs is replaced. The Lehigh Valley patio page, the patio service page and the kitchen pages (Berks, Lehigh Valley, service) answer repair and refacing questions.

## Follow-up changes (October 15, 2026)

| Change | Why (same export) |
| --- | --- |
| `/allentown-pa/bathroom-remodeling` rewritten around Allentown homes (rowhomes and twins, older plumbing, permits), the commercial-restroom lead removed, and a nearby bathroom job linked | 601 impressions for Allentown bathroom searches went to the Lehigh Valley page at positions 45–57; the Allentown page had none |
| Lehigh Valley bathroom page links to the Allentown and Bethlehem bathroom pages | Points town searches at the town pages |
| Cabinet refacing added to the Allentown and Lehigh Valley kitchen titles and pages; the Lehigh Valley page links to the Allentown one | 357 impressions for refacing searches (129 for "cabinet refacing lehigh valley pa" at 43.7); 403 for Allentown kitchen searches; "kitchen cabinets allentown pa" at 7.7 |
| Home page title leads with "Home Remodeling Contractor in the Lehigh Valley & Berks County" | "home remodeling & improvement contractor lehigh valley": 277 impressions at 41.6 |

Considered and skipped: a media wall page (two impressions in the period) and an epoxy or garage floor page (71 impressions, mostly "garage pit installation", a service RHI Pros does not offer).

## Still needs owner input

- **Local proof.** Completed jobs with a confirmed town, photos and permission to name the town are the strongest local signal; current project records do not authenticate towns.
- **Google Business Profile.** Map-pack results for "near me" searches depend on the profile and its reviews more than on these pages.
- Queries for "lehigh acres" (Florida) are unrelated and need no action.

Re-export Search Console in about four weeks and compare positions for the queries above.
