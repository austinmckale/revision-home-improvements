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
