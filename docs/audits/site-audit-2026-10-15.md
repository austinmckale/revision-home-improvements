# Site audit — October 15, 2026

Scope: all 98 sitemap pages plus the quote page, rendered from the current branch. Checked visible text, captions and labels, alt text, headings and metadata. Accessibility ran through axe-core (WCAG 2.1 AA plus best practices) at 390px and 1440px wide, with console errors and horizontal overflow at both widths. Page speed was measured on a throttled phone connection (4× CPU, 1.6 Mbps). Search Console data covers July 13 – October 12, 2026.

## Already in good shape

- **Accessibility:** no axe violations on any of the 98 pages, on phone or desktop. Nothing scrolls sideways.
- **Speed:** the main content appears in 1.9–3.3 seconds on a throttled phone connection, with no layout shift.
- **Links and indexing:** the rendered SEO audit finds no errors, and every page has one h1.
- **Tracking:** Tag Manager (GTM-ND2W58Q5) loads on every page. Phone taps (`click_to_call`) and quote submissions (`generate_lead`) are pushed to it. Still to confirm in Google Analytics: that both arrive and are marked as key events.

## Needs an owner answer

| Question | Why it matters |
| --- | --- |
| Was the white Berks kitchen ("Stripped out, then built back in white") cabinet refacing? | The before photo shows the original frames with the doors off. If it was refacing, it is the proof the refacing page lacks. Berks kitchen and cabinet searches: about 670 impressions at positions 13–20. |
| Was the Allentown fireplace job a fire-damage rebuild? | Its original record says so; it is filed under drywall because that was never confirmed. Fire searches: about 230 impressions at positions 14–18, and the fire pages show no finished job. |
| Is the dark-tile shower with granite corner shelves your work? | It appears in the bathroom service gallery but belongs to no project. It is filed under the Bethlehem bathroom, which has a white molded shower. |
| Do you offer emergency service (water extraction, board-up, after hours)? | The menu says "Emergency" and the top bar "Emergency damage?". The insurance page, though, tells people with active damage to call a mitigation company first. If RHI Pros rebuilds after the damage, the menu should say "Fire & water damage". |
| A photo of Ryan or the crew | The About page has an empty column where a person should be. The pavilion photo already serves as the hero on the home page, the About page and elsewhere. |
| Make email optional on the quote form? | Name, phone, email and service are all required. Asking only for a phone number usually lets more people finish. The confirmation email would go only to people who give an address. |

## Fixes that need no input

**Status (October 15, 2026): all 14 below are done.** The exceptions are two long titles: the home page title (73 characters) and the Lehigh Valley kitchen title (69). Both are kept for their search wording; Google cuts only the "| RHI Pros" tail.

### Project names, captions and alt text

1. Town and service pages still show the old plain project names and report-style descriptions ("Poolside surround", "Basement media room", "Crisp white kitchen"). Town pages also show the same project twice: once as a "Related project" link and again as a full section. Show it once, with the job-site name.
2. The plain project titles used in Google titles and the small label on project pages are vague, or use words the copy rules ban. Examples: "Poolside surround | Photo Collection | RHI Pros", "Clean interior finishes", "Light floors, open living", "Classic ranch exterior", "Warm wood flooring". Use plain search names with the town ("Pool Deck Renovation in Bethlehem, PA") and drop "Photo Collection".
3. Five photos have alt text in internal evidence wording ("Supplied earlier-condition view…", "Matching corridor view…").
4. Alt text in the service galleries that doesn't match the photo:
   - The blue kitchen has "light countertops"; they're patterned gray.
   - "Updated kitchen overview" and "Cabinet and counter detail" are on unfinished install photos.
   - "Furnished living area" describes an empty room.
   - "Dark trim" on the log home; the trim is green.
   - "Wood-look" for the Bethlehem wood floors.
   - The basement floor isn't called epoxy.
5. The drywall service card uses the slate bedroom repaint. Use the Bethlehem drywall job.
6. The fire & water page's only photo is the Allentown flooring job, captioned "Finished interior", which reads as a restoration job. The six water damage pages use an AI-generated illustration. Replace both with a real rebuild once one is photographed; until then, drop the flooring photo from that page.
7. "Explore" appears 19 times as filler ("Explore the photos", "Projects to explore", "Select a city to explore", "Explore the pool-patio details below").

### Pages

8. `/projects/lehigh-valley-dormer-shutter-detail-refresh` ("Dormer & shutter details") duplicates the colonial project. It has the same photos, shows the before photo as an ordinary gallery photo, and is in the sitemap. Redirect it to the full project.
9. The Allentown patio page is the site's strongest Allentown page: 644 impressions, with "paver patio installation allentown pa" at position 11.6. Yet its local section opens with Bethlehem's pool ("Pool curves, patio edges…"), and the same sentence describes patios on the Allentown hub. Rewrite it around Allentown patios and patio repair.
10. Town hubs describe fire and water damage vaguely ("Water damage can reach several rooms or a single wall.").
11. The same three reviews appear on 17 pages. Match reviews to the page: Karla S. (dining room and kitchen) on kitchen pages, Sara M. (pool patio) on patio pages.
12. On phones, town + service pages put the quote form before the project photos. Show the proof first.
13. Sixteen page descriptions run past 160 characters, including two written today (Allentown bathroom at 184, Allentown kitchen at 162). Nine titles run past 65 characters.
14. Headings mix Title Case ("Basement Finishing in Allentown, PA", "Drywall Installation and Repair") with the site's sentence case.

## Headlines in stock phrasing (propose rewrites; owner approves)

- **Services:** "Remodeling, made personal.", "Your home. Your next chapter.", "Make room for possibility", "Several rooms. One thoughtful renovation.", "One connected plan", and the intro "More room to gather and better flow for every day…".
- **About:** "Built on clarity, delivered with care." Also, "Ryan is a dad, so every project is planned around family life…" reads as a non sequitur.
- **Lehigh Valley pages:**
  - "Create an outdoor space that fits your home"
  - "Give your basement a purpose"
  - "Can a Lehigh Valley kitchen remodel still feel tailored…"
  - "…feels intentional instead of forced…"
  - "…clean and well resolved"
- **Reading patio:** "Bring covered and open-air spaces together".

## Off-site (largest effect on rankings)

98% of search impressions are below page one, and the site earned 31 clicks in the period. The Business Profile, reviews and listings that link to the site (Houzz, BBB, Angi, local chambers) lift every page at once. See `local-pages-search-console-2026-10-15.md`.

## Not worth doing now

These don't justify the effort right now:
- more town pages
- blog posts or cost guides (about 27 impressions for cost searches in the period)
- media wall or garage floor pages
- speed work
