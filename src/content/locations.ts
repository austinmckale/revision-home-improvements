export type Location = {
  slug: string;
  name: string;
  short: string;
  region: string;
  localAngle: string;
  priorityAreas: string[];
  whyUs: string[];
};

export const locations: Location[] = [
  {
    slug: "reading-pa",
    name: "Reading, PA",
    short: "Reading",
    region: "Berks County",
    localAngle:
      "Reading projects often combine older-home layout updates with durable finish upgrades. We plan scopes around long-term usability.",
    priorityAreas: ["Wyomissing", "Shillington", "Sinking Spring", "Exeter Township", "Muhlenberg Township", "Spring Township"],
    whyUs: ["Fast quote response in-city", "Experience with mixed-age housing stock", "Clear communication for occupied homes"],
  },
  {
    slug: "wyomissing-pa",
    name: "Wyomissing, PA",
    short: "Wyomissing",
    region: "Berks County",
    localAngle:
      "Wyomissing clients often prioritize clean finishes and efficient project timelines. We focus on predictable scheduling and finish quality.",
    priorityAreas: ["West Reading", "Sinking Spring", "Spring Township", "Lower Heidelberg Township", "Shillington"],
    whyUs: ["Detail-focused finish work", "Tight project coordination", "Straightforward scope and approvals"],
  },
  {
    slug: "berks-county-pa",
    name: "Berks County, PA",
    short: "Berks County",
    region: "Southeastern Pennsylvania",
    localAngle:
      "Across Berks County we handle full interior remodels, outdoor upgrades, and restoration jobs with practical, phase-aware planning.",
    priorityAreas: ["Wyomissing", "Sinking Spring", "Exeter Township", "Muhlenberg Township", "Spring Township", "Cumru Township"],
    whyUs: ["County-wide coverage", "Remodel + restoration in one team", "Reliable call-to-quote workflow"],
  },
  {
    slug: "allentown-pa",
    name: "Allentown, PA",
    short: "Allentown",
    region: "Lehigh County",
    localAngle:
      "Allentown homeowners often need modernized layouts and durable material selections. We align scopes to performance and style goals.",
    priorityAreas: ["Emmaus", "Macungie", "Upper Macungie Township", "South Whitehall Township", "Whitehall Township"],
    whyUs: ["Strong planning before demo", "Material guidance by use-case", "Consistent milestone communication"],
  },
  {
    slug: "bethlehem-pa",
    name: "Bethlehem, PA",
    short: "Bethlehem",
    region: "Lehigh/Northampton Counties",
    localAngle:
      "Bethlehem projects frequently balance character-home constraints with modern function upgrades. We scope carefully before buildout.",
    priorityAreas: ["Lower Saucon Township", "Hanover Township", "Nazareth area", "Forks Township", "Hellertown"],
    whyUs: ["Scope clarity for older homes", "Practical sequencing", "High attention to finish details"],
  },
  {
    slug: "lehigh-valley-pa",
    name: "Lehigh Valley, PA",
    short: "Lehigh Valley",
    region: "Eastern Pennsylvania",
    localAngle:
      "Lehigh Valley work ranges from targeted room upgrades to full restoration scopes. We deliver clear planning and responsive communication.",
    priorityAreas: ["Allentown area", "Bethlehem area", "Easton area", "Emmaus", "Macungie", "Nazareth"],
    whyUs: ["Regional service footprint", "Conversion-focused quote process", "Flexible project scoping by priority"],
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
