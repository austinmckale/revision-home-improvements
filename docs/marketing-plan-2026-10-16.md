# RHI Pros traffic and marketing plan — October 16, 2026

## Where things stand

- The website is in good shape. All 98 pages have no accessibility errors, pages load fast (about 2–3 seconds on a slow phone connection) and links work. The local pages, refacing pages, project names and stories are done.
- Search (Search Console, July 13 – October 12): 98% of impressions are below page one, and the site earned 31 clicks in three months. Phones were 12% of impressions but brought more than half the clicks.
- Rankings now depend on trust signals from outside the site: the Google Business Profile, reviews and listings that link to the site. More site features will not bring traffic.
- No ads are running.

## Priorities, fastest results first

1. **Google Local Services Ads**, the "Google Guaranteed" listings at the top of Google. You pay per lead (a call or message), not per click, and they show right away. This requires the Google Guaranteed background check and good reviews.
2. **Google Business Profile.** Most local customers pick from the map results.
   - Post a job photo or video every week.
   - List every service, including cabinet refacing and patio repair.
   - Reply to every review.
   - Use "RHI Pros" everywhere; Facebook still says Revision Home Improvement.
3. **Reviews after every final walkthrough**, ideally mentioning the job and the town. Get the "ask for reviews" link from the Business Profile; the site will then send `rhipros.com/review` straight to it.
4. **Listings that link to rhipros.com:** Houzz, BBB, the Angi profile, the Greater Reading Chamber, the Lehigh Valley Chamber, and supplier "find a contractor" directories if certified with any brand.
5. **Every finished job onto the site**, with photos and the town. Each job strengthens that town's pages.

## Job videos (do this on every job)

Shoot vertical on a phone; no editing needed:
- **Before:** walk the room, about 10 seconds.
- **Mid-job:** one interesting step (framing, pouring epoxy, setting pavers).
- **After:** the same walk-through, from the same spot as the before.

Post each clip to the Business Profile, Facebook, Instagram Reels and YouTube Shorts. Share it in local town Facebook groups and ask happy customers to share it. The best clips go on the project pages.

## Ad budget, from market research

| Channel | Typical cost per lead | Lead quality |
| --- | --- | --- |
| Google Local Services Ads | about $25–$110 (bath often $30–$80) | High: they called from the top of Google |
| Google search ads | about $110–$400 at first, lower after a year of tuning | High, but pricey while learning |
| Facebook / Instagram ads | about $35–$120 (home improvement median about $43) | Colder: browsing, not shopping |

These figures come mostly from marketing agencies and vary by market. Reading and Allentown should run below big-metro prices. Judge results by cost per signed job, not cost per lead.

**Recommended plan:**
1. **Months 1–2:** Local Services Ads only, about $1,000–$1,500 a month. That's roughly 10–30 leads a month at those prices.
2. **If those leads close and there's room:** add Google search ads at about $1,500 a month, sending clicks to job-type landing pages (see below).
3. **Later:** Facebook and Instagram at about $500 a month, once there are 3–4 strong before-and-after videos. Fast call-backs matter most here, because those leads are colder.

One booked kitchen or basement likely covers months of spend. **Open question:** what is the typical job size? That decides how hard to push.

## Ad landing pages

Local Services Ads don't use landing pages; the leads go straight to the phone. Google search ads and Facebook ads do. Each page covers one job type and has:
- one strong project, a matching review and a short form
- no menu to wander off into
- a tag showing which ad brought each lead

A bathroom version already exists (`/landing/bathroom-remodeling`). To build: kitchen, basement and patio.

## Tracking (checked October 16, 2026)

- **Tested in a real browser:** a visitor arriving from a Facebook ad link who taps the phone number and sends a quote request (simulated server, no real lead).
- **Phone taps** (`click_to_call`) reach Google Tag Manager (GTM-ND2W58Q5).
- **Quote requests (`generate_lead`) were not reaching Tag Manager.** Fixed in commit `6756cd6`: the event now goes to Tag Manager, credited to the visitor's first source even after they browse other pages. **Needs a push to go live.**
- **The lead itself** already records its source (Facebook, Google Ads, organic, campaign name, gclid/fbclid).
- **To do in Tag Manager (needs access or screenshots):**
  - send `generate_lead` and `click_to_call` to Google Analytics 4 and mark both as key events
  - once ads run, import them into Google Ads as conversions
  - Watch for double counting if a GA4 ID is also set directly in Vercel.

## Thank-you email and text

- **Email: already built.** Every quote request triggers an automatic "We received your request" email listing the service, timing, location and photo count, plus the phone number. It only sends if email sending (SMTP) is configured in Vercel, so check that a test quote produces one. Its wording can be matched to the site's "Thanks, we'll call you back."
- **Text: skip an automatic one.** Automated texts need an SMS service and carrier registration (weeks of setup and a monthly cost). Ryan texting personally within the hour converts better, for example: "Hi, it's Ryan from RHI Pros, got your request…". Turn on missed-call text-back if your phone service offers it.

## Site ideas considered and skipped

- **3D animation or heavy effects:** they don't bring traffic and they slow pages.
- **Service-area map:** a gimmick. Replace it with a strip of your own job photos labeled by town (Reading, Allentown, Bethlehem, Hamburg, Berks County), each linking to its project.
- **Stock landmark photos or clips:** not your work.
- **More town pages, blog posts or cost guides:** about 27 impressions for cost searches in three months.
- **Media wall and garage floor pages:** almost no searches.

## Owner questions still open

1. Was the white Berks kitchen ("Stripped out, then built back in white") cabinet refacing? If yes, it becomes proof for the refacing page.
2. Was the Allentown fireplace job a fire-damage rebuild? If yes, it becomes proof for the fire pages.
3. Is the dark-tile shower in the bathroom gallery your work?
4. Do you offer emergency service (after hours, water extraction, board-up)? If not, rename the "Emergency" menu item.
5. A photo of Ryan or the crew for the About page.
6. Can email be optional on the quote form?
7. Typical job size, and which jobs you want more of.

## Check-ins

- Re-export Search Console in mid-November and compare positions for the Allentown bathroom, refacing and patio searches.

## Sources (ad costs)

- [Built Right Digital: LSA cost for remodelers](https://builtrightdigital.com/remodeler-google-lsa-cost/)
- [Built Right Digital: bathroom Google Ads cost](https://builtrightdigital.com/google-ads-cost-bathroom-remodeling/)
- [Built Right Digital: kitchen Google Ads cost](https://builtrightdigital.com/kitchen-remodeling-google-ads-cost/)
- [Kitchen Remodeling SEO: kitchen leads by channel](https://kitchenremodelingseo.com/what-kitchen-remodeling-leads-cost-2026/)
- [Valley Marketing Group: bathroom cost per lead](https://thevalleymarketinggroup.com/blog/bathroom-remodel-google-ads-cost-per-lead-2026/)
- [BG Collective: costs from live accounts](https://www.bgcollective.com/solutions-lab/google-ads-for-remodelers-wins)
- [BG Collective: remodeler ad statistics](https://www.bgcollective.com/solutions-lab/google-ads-remodeler-statistics-2026)
- [LocaliQ: Facebook benchmarks 2026](https://localiq.com/blog/facebook-advertising-benchmarks/)
- [M.Wolf Media: Facebook ads for contractors](https://mwolfmedia.com/how-much-do-facebook-ads-cost-for-contractors/)
- [Valley Marketing Group: Facebook vs Google](https://thevalleymarketinggroup.com/blog/facebook-ads-vs-google-ads-home-service-contractors-2026/)
