/**
 * Owner decision, October 8, 2026: condition photos, construction documentation and
 * planning boards are not shown as projects. Their records and original photos stay in
 * the repository for traceability; the old addresses redirect to the matching service page.
 * Keep this module free of imports: next.config.ts and the evidence tests load it directly.
 */
export const retiredProjectRedirects: Readonly<Record<string, string>> = {
  "lehigh-valley-fire-damage-documentation": "/services/fire-damage-restoration",
  "boarded-dormer-condition-photos": "/services/fire-damage-restoration",
  "winter-exterior-damage-photos": "/services/fire-damage-restoration",
  "pink-tile-tub-reference": "/services/bathroom-remodeling",
  "beige-bathroom-before-after": "/services/bathroom-remodeling",
  "lehigh-water-damage-rebuild": "/services/water-damage-restoration",
};
