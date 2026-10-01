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
      "Planning a Reading renovation? Consider the home's age, existing layout, plumbing and electrical conditions, and any character details you want to keep.",
    priorityAreas: [
      "Wyomissing",
      "Shillington",
      "Sinking Spring",
      "Exeter Township",
      "Muhlenberg Township",
      "Spring Township",
    ],
    whyUs: [
      "Identify existing layout and utility constraints before choosing finishes",
      "Confirm required permits, inspections, and who is responsible for each in the written scope",
      "Ask about current availability and the next step for your Reading address",
    ],
  },
  {
    slug: "wyomissing-pa",
    name: "Wyomissing, PA",
    short: "Wyomissing",
    region: "Berks County",
    localAngle:
      "For a Wyomissing remodel, plan finish selections, material lead times, and access together. A clear scope helps you compare priorities before committing to a construction schedule.",
    priorityAreas: ["West Reading", "Sinking Spring", "Spring Township", "Lower Heidelberg Township", "Shillington"],
    whyUs: [
      "Review finish transitions and material choices for the rooms being updated",
      "Discuss lead times, occupied-room access, and realistic schedule allowances",
      "Ask for relevant project examples and available references for the proposed scope",
    ],
  },
  {
    slug: "berks-county-pa",
    name: "Berks County, PA",
    short: "Berks County",
    region: "Southeastern Pennsylvania",
    localAngle:
      "Planning work in Berks County starts with the property address, site access, existing conditions, and the municipality responsible for permits and inspections.",
    priorityAreas: [
      "Wyomissing",
      "Sinking Spring",
      "Exeter Township",
      "Muhlenberg Township",
      "Spring Township",
      "Cumru Township",
    ],
    whyUs: [
      "Confirm service availability for your specific Berks County address",
      "Separate reconstruction work from any specialist mitigation or cleanup needed",
      "Identify the applicable municipality and permit responsibilities before work begins",
    ],
  },
  {
    slug: "allentown-pa",
    name: "Allentown, PA",
    short: "Allentown",
    region: "Lehigh County",
    localAngle:
      "An Allentown project should account for the home's age, room layout, material choices, and daily access needs. Share your priorities and known conditions when requesting a scope.",
    priorityAreas: ["Emmaus", "Macungie", "Upper Macungie Township", "South Whitehall Township", "Whitehall Township"],
    whyUs: [
      "Review existing room and utility conditions before deciding on layout changes",
      "Confirm product availability and alternatives before setting the schedule",
      "Discuss work-zone access and temporary arrangements for an occupied home",
    ],
  },
  {
    slug: "bethlehem-pa",
    name: "Bethlehem, PA",
    short: "Bethlehem",
    region: "Lehigh/Northampton Counties",
    localAngle:
      "For a Bethlehem renovation, identify the features you want to retain and check whether historic-district review or other approvals apply to the property and proposed work.",
    priorityAreas: ["Lower Saucon Township", "Hanover Township", "Nazareth area", "Forks Township", "Hellertown"],
    whyUs: [
      "List the existing architectural details and materials you want to preserve",
      "Confirm any historic-district review and permit responsibilities in the written scope",
      "Discuss how new finish details will meet the retained parts of the home",
    ],
  },
  {
    slug: "lehigh-valley-pa",
    name: "Lehigh Valley, PA",
    short: "Lehigh Valley",
    region: "Eastern Pennsylvania",
    localAngle:
      "For a Lehigh Valley remodel or reconstruction project, start with the property location, affected rooms, existing conditions, and budget priorities so the proposed scope fits the work needed.",
    priorityAreas: ["Allentown area", "Bethlehem area", "Easton area", "Emmaus", "Macungie", "Nazareth"],
    whyUs: [
      "Confirm current service availability for your Lehigh Valley address",
      "Identify whether the scope is a room update or a larger reconstruction project",
      "Agree on project contacts, decision points, and update expectations before starting",
    ],
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
