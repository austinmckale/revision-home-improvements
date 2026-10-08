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
      "Many Reading homes are older, so we plan around existing layouts, plumbing, wiring and the character details worth keeping.",
    priorityAreas: [
      "Wyomissing",
      "Shillington",
      "Sinking Spring",
      "Exeter Township",
      "Muhlenberg Township",
      "Spring Township",
    ],
    whyUs: [
      "Existing layout, plumbing and wiring reviewed before you choose finishes",
      "Permits and inspections listed in your proposal, with who handles each",
      "Availability for your Reading address confirmed by phone or online",
    ],
  },
  {
    slug: "wyomissing-pa",
    name: "Wyomissing, PA",
    short: "Wyomissing",
    region: "Berks County",
    localAngle:
      "In Wyomissing, we plan finishes, material lead times and access together before the schedule is set.",
    priorityAreas: ["West Reading", "Sinking Spring", "Spring Township", "Lower Heidelberg Township", "Shillington"],
    whyUs: [
      "Finishes and transitions planned for every room being updated",
      "Lead times and access planned around an occupied home",
      "Photos of related projects to help you plan",
    ],
  },
  {
    slug: "berks-county-pa",
    name: "Berks County, PA",
    short: "Berks County",
    region: "Southeastern Pennsylvania",
    localAngle:
      "Each Berks County township and borough sets its own permit rules, so we confirm them for your address before work begins.",
    priorityAreas: [
      "Wyomissing",
      "Sinking Spring",
      "Exeter Township",
      "Muhlenberg Township",
      "Spring Township",
      "Cumru Township",
    ],
    whyUs: [
      "Availability confirmed for your Berks County address",
      "Rebuild work kept separate from any specialist mitigation or cleanup",
      "The right municipality and permits identified before work begins",
    ],
  },
  {
    slug: "allentown-pa",
    name: "Allentown, PA",
    short: "Allentown",
    region: "Lehigh County",
    localAngle:
      "From older city homes to newer suburban houses, we plan around your home's age, its layout and how you will live in it during the work.",
    priorityAreas: ["Emmaus", "Macungie", "Upper Macungie Township", "South Whitehall Township", "Whitehall Township"],
    whyUs: [
      "Existing rooms and utilities reviewed before layout changes",
      "Products and alternatives confirmed before the schedule is set",
      "Work areas and temporary arrangements planned for an occupied home",
    ],
  },
  {
    slug: "bethlehem-pa",
    name: "Bethlehem, PA",
    short: "Bethlehem",
    region: "Lehigh/Northampton Counties",
    localAngle:
      "In Bethlehem, we plan around the original features you want to keep and confirm whether historic-district review applies before work begins.",
    priorityAreas: ["Lower Saucon Township", "Hanover Township", "Nazareth area", "Forks Township", "Hellertown"],
    whyUs: [
      "The original details you want to keep, planned around from the start",
      "Historic-district review and permits confirmed in your proposal",
      "New finishes planned to meet the original parts of the home",
    ],
  },
  {
    slug: "lehigh-valley-pa",
    name: "Lehigh Valley, PA",
    short: "Lehigh Valley",
    region: "Eastern Pennsylvania",
    localAngle:
      "Across the Lehigh Valley, every project starts with your address, the rooms involved, existing conditions and your budget priorities.",
    priorityAreas: ["Allentown area", "Bethlehem area", "Easton area", "Emmaus", "Macungie", "Nazareth"],
    whyUs: [
      "Availability confirmed for your Lehigh Valley address",
      "A clear plan, whether it is one room or a larger rebuild",
      "Contacts, decisions and updates agreed before work starts",
    ],
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}

/** The place name as it reads mid-sentence: "in the Lehigh Valley", "in Reading". */
export function placeName(location: Pick<Location, "slug" | "short">) {
  return location.slug === "lehigh-valley-pa" ? "the Lehigh Valley" : location.short;
}
