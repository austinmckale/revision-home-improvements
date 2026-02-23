# 90-Day Execution Roadmap

## Objective
Increase qualified leads and local market share by combining trust-first UX, proof-heavy service pages, and disciplined local SEO.

## Weeks 1-2: Trust Layer + Conversion Upgrades
Status: In progress (major items implemented)

- [x] Add global emergency lane (fire/water call-first path)
- [x] Add trust/confidence section with warranty/process messaging
- [x] Convert quote form to two-step flow for lower friction
- [x] Add emergency-aware messaging in quote flow
- [x] Strengthen conversion CTAs on quote/service-area/city hubs
- [x] Publish trust pages: process, warranty, licenses/insurance, financing terms
- [x] Add deeper quote funnel event tracking for analytics

Current deliverables:
- `src/components/layout/EmergencyBar.tsx`
- `src/components/sections/ConfidenceSection.tsx`
- `src/components/forms/QuoteForm.tsx` (2-step)
- `src/components/TrackingEvents.tsx` (funnel events)
- `src/app/our-process/page.tsx`
- `src/app/warranty/page.tsx`
- `src/app/licenses-and-insurance/page.tsx`
- `src/app/financing-terms/page.tsx`

## Weeks 3-6: Publish 12-15 Real Case Studies
Status: Started (template + first set shipped)

- [x] Create case-study data model and route template
- [x] Publish first 8 case studies with location/service mapping
- [x] Link case studies from service and city/service pages
- [ ] Expand to 12-15 case studies using real project-specific details
- [ ] Add before/after pairs where available

Current deliverables:
- `src/content/caseStudies.ts`
- `src/app/projects/[slug]/page.tsx`
- `src/app/projects/page.tsx` (case-study listing)

## Weeks 7-10: City/Service Uniqueness + Local Proof
Status: In progress

- [x] Add local proof insertion on city/service pages
- [ ] Add unique FAQ pairs per top city/service combinations
- [ ] Add city-specific constraints and permitting notes where relevant
- [ ] Add 2+ location-specific case study links on high-value pages

## Weeks 11-12: GBP + CWV + Search Console Ops
Status: Pending

- [ ] Create GBP posting/review cadence checklist (weekly)
- [ ] Add conversion event QA plan for call + form tracking
- [ ] Run Core Web Vitals pass (LCP, CLS, INP) and tune biggest offenders
- [ ] Submit refreshed sitemap and monitor indexing coverage in Search Console

## Next 2 Sprint Priorities
1. Expand case studies from 4 to 8 using your best projects and tighter outcomes.
2. Add unique FAQs for top service/city combinations (Reading, Wyomissing, Berks, Lehigh Valley).
3. Add review proof module with real customer attribution and recency windows.
