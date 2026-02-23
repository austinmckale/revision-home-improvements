export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  locationName: string;
  locationSlug: string;
  serviceName: string;
  serviceSlug: string;
  timeline: string;
  scope: string[];
  challenge: string;
  solution: string;
  results: string[];
  testimonial: {
    quote: string;
    author: string;
  };
  images: Array<{
    src: string;
    alt: string;
  }>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "reading-kitchen-layout-upgrade",
    title: "Kitchen Layout Upgrade in Reading",
    summary: "Full kitchen refresh with improved workflow, cabinetry upgrades, and finish detailing.",
    locationName: "Reading, PA",
    locationSlug: "reading-pa",
    serviceName: "Kitchen Remodeling",
    serviceSlug: "kitchen-remodeling",
    timeline: "4 to 6 weeks",
    scope: ["Cabinet and countertop planning", "Lighting and finish updates", "Final trim and detail work"],
    challenge:
      "The original layout had limited prep flow and uneven finish transitions between cabinet and flooring lines.",
    solution:
      "The project was resequenced around cleaner work zones, tighter install tolerances, and coordinated finish transitions.",
    results: [
      "Better cooking and prep workflow",
      "Cleaner cabinet and countertop alignment",
      "A modernized kitchen with stronger day-to-day usability",
    ],
    testimonial: {
      quote: "Clear communication from estimate to closeout and the final details came out excellent.",
      author: "Reading homeowner",
    },
    images: [
      { src: "/images/projects/DSC00338-1.jpg", alt: "Completed kitchen remodeling project in Reading, PA." },
      { src: "/images/projects/img_7833.jpg", alt: "Kitchen renovation with updated cabinets and modern finishes." },
    ],
  },
  {
    slug: "wyomissing-bathroom-refresh",
    title: "Bathroom Refresh in Wyomissing",
    summary: "Practical bathroom upgrade focused on durable materials, better storage, and clean finish quality.",
    locationName: "Wyomissing, PA",
    locationSlug: "wyomissing-pa",
    serviceName: "Bathroom Remodeling",
    serviceSlug: "bathroom-remodeling",
    timeline: "2 to 3 weeks",
    scope: ["Vanity and fixture replacement", "Moisture-aware wall and floor finishes", "Final cleanup and walkthrough"],
    challenge:
      "The homeowner needed a cleaner layout and better material durability in a high-use bathroom footprint.",
    solution:
      "The team upgraded key fixtures and finishes with attention to waterproofing and long-term maintenance.",
    results: [
      "Improved bathroom storage and function",
      "More durable daily-use surfaces",
      "Consistent finish quality across walls, trim, and flooring",
    ],
    testimonial: {
      quote: "The process was straightforward and we felt informed at every stage.",
      author: "Wyomissing homeowner",
    },
    images: [
      { src: "/images/projects/img_7547.jpg", alt: "Finished bathroom renovation project in Wyomissing, PA." },
    ],
  },
  {
    slug: "berks-basement-finish-and-detail",
    title: "Basement Finish and Detail Work in Berks County",
    summary: "Converted unfinished basement zones into livable interior space with flooring and custom detailing.",
    locationName: "Berks County, PA",
    locationSlug: "berks-county-pa",
    serviceName: "Basement Finishing",
    serviceSlug: "basement-finishing",
    timeline: "5 to 7 weeks",
    scope: ["Layout planning for multi-use space", "Flooring and trim installation", "Custom finish feature detailing"],
    challenge:
      "The space needed better lighting, cleaner utility transitions, and practical room usage without feeling cramped.",
    solution:
      "A phased finish plan was used to sequence framing, flooring, and final details with clean transitions.",
    results: ["More usable square footage", "Improved comfort and flow", "A finished basement with strong visual consistency"],
    testimonial: {
      quote: "They took a blank basement and turned it into a space our family actually uses every day.",
      author: "Berks County homeowner",
    },
    images: [
      { src: "/images/projects/img_7548.jpg", alt: "Finished basement interior with custom feature detail." },
      { src: "/images/projects/img_7540.jpg", alt: "Basement remodeling in progress during finish stage." },
    ],
  },
  {
    slug: "lehigh-water-damage-rebuild",
    title: "Water Damage Interior Rebuild in Lehigh Valley",
    summary: "Interior restoration project with phased repair scope and coordinated finish replacement.",
    locationName: "Lehigh Valley, PA",
    locationSlug: "lehigh-valley-pa",
    serviceName: "Water Damage Restoration",
    serviceSlug: "water-damage-restoration",
    timeline: "Scope-dependent, staged rebuild",
    scope: ["Damage-area scope mapping", "Drywall and flooring replacement", "Finish restoration and closeout walkthrough"],
    challenge:
      "The home required an organized rebuild path after water-related damage across multiple affected finishes.",
    solution:
      "Work was sequenced by priority zones so repairs could move quickly while maintaining quality control.",
    results: [
      "Stabilized and rebuilt damaged interior areas",
      "Clear communication through a phased scope",
      "Restored living space quality with documented progress",
    ],
    testimonial: {
      quote: "Fast response and clear next steps made a stressful situation manageable.",
      author: "Lehigh Valley homeowner",
    },
    images: [
      { src: "/images/projects/img_7540.jpg", alt: "Interior restoration in progress after water damage." },
      { src: "/images/projects/img_8219.jpg", alt: "Completed interior flooring and finish restoration." },
    ],
  },
  {
    slug: "allentown-flooring-replacement-upgrade",
    title: "Flooring Replacement and Interior Upgrade in Allentown",
    summary: "Replaced worn flooring across key living zones with cleaner transitions and better long-term durability.",
    locationName: "Allentown, PA",
    locationSlug: "allentown-pa",
    serviceName: "Flooring Installation",
    serviceSlug: "flooring-installation",
    timeline: "1 to 2 weeks",
    scope: ["Subfloor preparation and leveling", "New flooring installation", "Trim and transition detailing"],
    challenge:
      "The existing floor had uneven sections and inconsistent transitions between connected rooms.",
    solution:
      "The team corrected prep conditions first, then installed new flooring with tighter transition and trim alignment.",
    results: ["Smoother floor performance", "Cleaner connected-room transitions", "A refreshed interior look with lower maintenance"],
    testimonial: {
      quote: "The floor feels solid and the finishing details made a big difference in the final look.",
      author: "Allentown homeowner",
    },
    images: [
      { src: "/images/projects/img_8219.jpg", alt: "Completed flooring installation project in Allentown, PA." },
      { src: "/images/projects/img_8216.jpg", alt: "Interior finish quality after flooring replacement." },
    ],
  },
  {
    slug: "bethlehem-drywall-and-finish-repair",
    title: "Drywall and Finish Repair in Bethlehem",
    summary: "Targeted drywall repair and finish prep completed for paint-ready interior surfaces.",
    locationName: "Bethlehem, PA",
    locationSlug: "bethlehem-pa",
    serviceName: "Drywall Installation and Repair",
    serviceSlug: "drywall-installation-repair",
    timeline: "3 to 6 days",
    scope: ["Damaged area repairs", "Seam blending and finish prep", "Final inspection for paint readiness"],
    challenge:
      "Visible wall damage and uneven surfaces needed to be corrected without obvious patch lines.",
    solution:
      "Repair zones were rebuilt and blended through staged tape/mud/sand cycles to deliver consistent finish quality.",
    results: ["Cleaner wall appearance", "Better prep for final paint", "Faster closeout for connected room upgrades"],
    testimonial: {
      quote: "The repaired walls blended in perfectly and saved us from a bigger remodel.",
      author: "Bethlehem homeowner",
    },
    images: [
      { src: "/images/projects/img_8220.jpg", alt: "Drywall and finish repair scope in Bethlehem, PA." },
      { src: "/images/projects/img_8216.jpg", alt: "Interior surface quality after repair and prep." },
    ],
  },
  {
    slug: "reading-paver-patio-buildout",
    title: "Paver Patio Buildout in Reading",
    summary: "Outdoor hardscape project with base prep, layout detailing, and finished patio installation.",
    locationName: "Reading, PA",
    locationSlug: "reading-pa",
    serviceName: "Paver Installation",
    serviceSlug: "paver-installation",
    timeline: "1 to 2 weeks",
    scope: ["Site layout and grading", "Compacted base preparation", "Paver install and edge detailing"],
    challenge:
      "The outdoor area needed better structure and drainage while improving usable entertaining space.",
    solution:
      "The project focused on strong base prep and clean pattern alignment to improve durability and visual consistency.",
    results: ["Better outdoor usability", "Improved drainage performance", "Upgraded curb appeal and patio function"],
    testimonial: {
      quote: "The patio feels like a complete extension of the home now. Great planning and finish.",
      author: "Reading homeowner",
    },
    images: [
      { src: "/images/projects/Patio-3.jpg", alt: "Finished paver patio project in Reading, PA." },
      { src: "/images/projects/Patio-Construction-site-frontier.jpg", alt: "Patio construction and base prep work in progress." },
    ],
  },
  {
    slug: "berks-fire-damage-interior-rebuild",
    title: "Fire Damage Interior Rebuild in Berks County",
    summary: "Structured interior rebuild after fire-related damage with phased repairs and finish restoration.",
    locationName: "Berks County, PA",
    locationSlug: "berks-county-pa",
    serviceName: "Fire Damage Restoration",
    serviceSlug: "fire-damage-restoration",
    timeline: "Scope-dependent, phased reconstruction",
    scope: ["Damage assessment and rebuild planning", "Drywall and finish restoration", "Closeout walkthrough and correction list"],
    challenge:
      "The project required a clear rebuild sequence to restore interior areas while controlling scope changes.",
    solution:
      "A phase-based plan was used to prioritize safety, restore affected assemblies, and maintain communication through completion.",
    results: ["Clearer path from damage to rebuild", "Better coordination across repair stages", "Restored interior function and appearance"],
    testimonial: {
      quote: "They brought structure to a chaotic situation and delivered quality work from start to finish.",
      author: "Berks County homeowner",
    },
    images: [
      { src: "/images/projects/img_8220.jpg", alt: "Interior reconstruction work after fire-related damage." },
      { src: "/images/projects/img_7540.jpg", alt: "Rebuild work in progress during restoration phase." },
    ],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
