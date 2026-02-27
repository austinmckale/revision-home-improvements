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
      "Many Reading homes were built in the early-to-mid 1900s, which means outdated layouts, aging plumbing, and opportunities to modernize without losing character.",
    priorityAreas: ["Wyomissing", "Shillington", "Sinking Spring", "Exeter Township", "Muhlenberg Township", "Spring Township"],
    whyUs: [
      "Experienced with older Reading row homes, twins, and single-family renovations",
      "We handle permits through the City of Reading building department",
      "Same-day quote follow-up for in-city projects",
    ],
  },
  {
    slug: "wyomissing-pa",
    name: "Wyomissing, PA",
    short: "Wyomissing",
    region: "Berks County",
    localAngle:
      "Wyomissing homeowners typically want clean, modern finishes that match the neighborhood standard. We focus on precise detail work and efficient timelines so your project wraps up on schedule.",
    priorityAreas: ["West Reading", "Sinking Spring", "Spring Township", "Lower Heidelberg Township", "Shillington"],
    whyUs: [
      "Attention to finish details that Wyomissing homes demand",
      "Tight scheduling so projects don't drag into extra weeks",
      "References available from other Wyomissing projects",
    ],
  },
  {
    slug: "berks-county-pa",
    name: "Berks County, PA",
    short: "Berks County",
    region: "Southeastern Pennsylvania",
    localAngle:
      "Berks County covers everything from suburban neighborhoods to rural properties. We adjust our approach based on your home type, access, and local permit requirements.",
    priorityAreas: ["Wyomissing", "Sinking Spring", "Exeter Township", "Muhlenberg Township", "Spring Township", "Cumru Township"],
    whyUs: [
      "County-wide coverage — we work from Reading to the rural townships",
      "One team for both remodeling and storm/water damage restoration",
      "Familiar with Berks County inspection and permit processes",
    ],
  },
  {
    slug: "allentown-pa",
    name: "Allentown, PA",
    short: "Allentown",
    region: "Lehigh County",
    localAngle:
      "Allentown has a mix of historic downtown properties and newer suburban builds. We tailor material choices and layouts to match your home's age and your goals for it.",
    priorityAreas: ["Emmaus", "Macungie", "Upper Macungie Township", "South Whitehall Township", "Whitehall Township"],
    whyUs: [
      "Experience with both older Allentown homes and newer Lehigh County builds",
      "Strong material sourcing relationships with local suppliers",
      "We coordinate around your schedule, especially for occupied homes",
    ],
  },
  {
    slug: "bethlehem-pa",
    name: "Bethlehem, PA",
    short: "Bethlehem",
    region: "Lehigh/Northampton Counties",
    localAngle:
      "Bethlehem's historic homes often need careful renovation that preserves character while upgrading function. We plan around structural constraints so you get modern comfort without losing what makes the home special.",
    priorityAreas: ["Lower Saucon Township", "Hanover Township", "Nazareth area", "Forks Township", "Hellertown"],
    whyUs: [
      "Careful approach with character homes — we preserve what matters",
      "Experienced navigating Bethlehem's historic district requirements",
      "Detailed finish work that matches older architectural styles",
    ],
  },
  {
    slug: "lehigh-valley-pa",
    name: "Lehigh Valley, PA",
    short: "Lehigh Valley",
    region: "Eastern Pennsylvania",
    localAngle:
      "The Lehigh Valley spans everything from downtown row homes to large suburban properties. Whether it's a targeted room upgrade or a full restoration, we scale our approach to fit your home and budget.",
    priorityAreas: ["Allentown area", "Bethlehem area", "Easton area", "Emmaus", "Macungie", "Nazareth"],
    whyUs: [
      "Regional coverage across the entire Lehigh Valley",
      "Flexible project sizing — from single-room updates to full rebuilds",
      "Responsive communication regardless of project size",
    ],
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
