export type ServiceFaq = {
  q: string;
  a: string;
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  intro: string;
  cta: string;
  bullets: string[];
  whatIncluded: string[];
  qualityFactors: string[];
  pricingFactors: string[];
  outcomes: string[];
  process: string[];
  faqs: ServiceFaq[];
  image: {
    src: string;
    alt: string;
  };
  gallery: Array<{
    src: string;
    alt: string;
  }>;
};

function sharedFaqs(serviceName: string): ServiceFaq[] {
  return [
    {
      q: `How long does a ${serviceName.toLowerCase()} project usually take?`,
      a: "Timelines vary by scope, material lead times, and site conditions. We provide a clear schedule during estimate review.",
    },
    {
      q: "Do you provide a detailed scope before work begins?",
      a: "Yes. We review scope, budget range, and sequencing so you know what to expect before construction starts.",
    },
    {
      q: "Can I request this service in Reading, Berks County, and Lehigh Valley?",
      a: "Yes. We serve Reading, Wyomissing, Berks County, Allentown, Bethlehem, and Lehigh Valley.",
    },
  ];
}

export const services: Service[] = [
  {
    slug: "kitchen-remodeling",
    name: "Kitchen Remodeling",
    short: "Custom kitchens built for daily living.",
    description:
      "Full kitchen renovations including layout updates, cabinets, countertops, lighting, and finishes.",
    intro:
      "A kitchen remodel should improve flow, storage, and comfort. We plan each phase carefully so your home keeps moving while work is in progress.",
    cta: "Request a kitchen quote",
    bullets: ["Layout planning", "Cabinets and countertops", "Lighting and finishes"],
    whatIncluded: [
      "Space planning for prep, cooking, and storage flow",
      "Cabinet, countertop, backsplash, and fixture coordination",
      "Electrical and lighting updates tied to final layout",
      "Trim, paint, and final finish detailing",
    ],
    qualityFactors: [
      "Cabinet installation alignment and door/drawer tuning",
      "Countertop seam quality and edge detailing",
      "Clean transitions where flooring, trim, and cabinets meet",
    ],
    pricingFactors: [
      "Cabinet quality and customization level",
      "Countertop material choice and edge complexity",
      "Layout changes that require plumbing/electrical moves",
    ],
    outcomes: ["Better traffic flow and work zones", "Durable finish selections", "Higher resale and day-to-day usability"],
    process: ["Discovery call and photo review", "In-home scope and estimate", "Material coordination and schedule lock", "Build execution and final walkthrough"],
    faqs: [
      ...sharedFaqs("kitchen remodeling"),
      {
        q: "Can you remodel in phases?",
        a: "Yes. For some homes we can sequence work to reduce disruption and align with budget priorities.",
      },
    ],
    image: {
      src: "/images/projects/DSC00338-1.jpg",
      alt: "Beautiful home kitchen remodel by Revision Home Improvements in Lehigh Valley and Reading.",
    },
    gallery: [
      { src: "/images/projects/DSC00338-1.jpg", alt: "Kitchen remodeling project hero image." },
      { src: "/images/projects/img_7833.jpg", alt: "Modern white cabinet kitchen renovation." },
      { src: "/images/projects/DSC00325.jpg", alt: "Kitchen remodel with updated cabinets and appliances in Reading, PA." },
    ],
  },
  {
    slug: "bathroom-remodeling",
    name: "Bathroom Remodeling",
    short: "Functional, durable bathroom renovations.",
    description:
      "Bathroom upgrades with improved storage, tilework, fixtures, and clean modern finishes.",
    intro:
      "We design bathroom upgrades around practical daily use: durable materials, efficient layout choices, and clean finish details.",
    cta: "Request a bathroom quote",
    bullets: ["Showers and vanities", "Tile and waterproofing", "Efficient layouts"],
    whatIncluded: [
      "Shower/tub area upgrades and fixture replacement",
      "Vanity, storage, and mirror/lighting improvements",
      "Tile install with waterproofing details in wet zones",
      "Ventilation and moisture-control improvements",
    ],
    qualityFactors: [
      "Waterproofing and slope accuracy in shower assemblies",
      "Tile layout consistency and grout finish quality",
      "Proper ventilation planning to reduce long-term moisture issues",
    ],
    pricingFactors: [
      "Tile/material selection and install complexity",
      "Shower reconfiguration vs. fixture-in-place update",
      "Subfloor/wall condition after demo",
    ],
    outcomes: ["Better storage and usability", "Moisture-aware build details", "Modernized look and function"],
    process: ["Initial needs review", "Measurement and scope confirmation", "Fixture/tile planning", "Build and quality walkthrough"],
    faqs: [
      ...sharedFaqs("bathroom remodeling"),
      {
        q: "Do you handle older bathroom layouts?",
        a: "Yes. We can rework awkward layouts to improve movement, storage, and fixture placement.",
      },
    ],
    image: {
      src: "/images/projects/img_7547.jpg",
      alt: "Modern bathroom renovation by Revision Home Improvements serving Reading and Berks County.",
    },
    gallery: [
      { src: "/images/projects/img_7547.jpg", alt: "Bathroom renovation with updated vanity and wall finish." },
      { src: "/images/projects/img_8216.jpg", alt: "Interior remodel detail for bathroom-related finish work." },
      { src: "/images/projects/img_8220.jpg", alt: "Finish carpentry and drywall detail in bathroom project." },
    ],
  },
  {
    slug: "basement-finishing",
    name: "Basement Finishing",
    short: "Turn unused space into livable square footage.",
    description:
      "Basement finishing and remodeling for family rooms, offices, guest spaces, and storage zones.",
    intro:
      "Basements need planning around moisture, lighting, and utility access. We build finished spaces that stay functional long-term.",
    cta: "Request a basement quote",
    bullets: ["Framing and drywall", "Flooring and trim", "Moisture-aware planning"],
    whatIncluded: [
      "Basement layout planning for multi-use living",
      "Framing, drywall, and finish carpentry",
      "Lighting and comfort-focused room setup",
      "Storage integration and utility-area planning",
    ],
    qualityFactors: [
      "Moisture-aware material choices and wall assembly details",
      "Lighting design that avoids dark corner zones",
      "Clean mechanical access planning for long-term maintenance",
    ],
    pricingFactors: [
      "Square footage and number of finished zones",
      "New room functions (office, media, guest) and feature scope",
      "Electrical/HVAC adjustments required for comfort",
    ],
    outcomes: ["More usable living space", "Improved comfort and lighting", "Flexible layouts for family needs"],
    process: ["Space planning and constraints review", "Framing/electrical/mechanical coordination", "Finish material installation", "Final punch-list completion"],
    faqs: [
      ...sharedFaqs("basement finishing"),
      {
        q: "Can a basement include office or media areas?",
        a: "Yes. We can plan multi-use layouts for work, guests, and entertainment zones.",
      },
    ],
    image: {
      src: "/images/projects/img_8216.jpg",
      alt: "Interior home remodeling project for a basement finish in Berks County.",
    },
    gallery: [
      { src: "/images/projects/img_8216.jpg", alt: "Basement interior remodeling zone." },
      { src: "/images/projects/img_8219.jpg", alt: "Finished basement flooring and trim detail." },
      { src: "/images/projects/img_8220.jpg", alt: "Basement drywall and finish prep." },
    ],
  },
  {
    slug: "drywall-installation-repair",
    name: "Drywall Installation and Repair",
    short: "Clean walls and ceilings with pro-level finish.",
    description:
      "Drywall hanging, patching, skim coating, and paint-ready finishing for remodel and restoration jobs.",
    intro:
      "From full-room installs to targeted patch work, we focus on clean finish consistency and readiness for final paint.",
    cta: "Call now",
    bullets: ["New drywall install", "Repair and patching", "Smooth finish prep"],
    whatIncluded: [
      "Panel replacement or full wall/ceiling drywall install",
      "Patch repair for cracks, cuts, and water-damaged areas",
      "Tape, mud, sanding, and prep for paint-ready surfaces",
      "Texture matching where needed",
    ],
    qualityFactors: [
      "Flatness and smoothness under final paint",
      "Patch blending so repairs are not visually obvious",
      "Consistent corner and seam finishing",
    ],
    pricingFactors: [
      "Extent of damage and number of affected surfaces",
      "Height/complexity of ceilings and wall geometry",
      "Texture matching and finish level expectations",
    ],
    outcomes: ["Paint-ready surfaces", "Cleaner transitions at repairs", "Faster closeout on restoration scopes"],
    process: ["Damage and substrate review", "Board install or repair patching", "Tape/mud/sand cycles", "Final finish inspection"],
    faqs: [
      ...sharedFaqs("drywall repair"),
      {
        q: "Can drywall work be paired with restoration projects?",
        a: "Yes. Drywall is often sequenced with water or fire restoration rebuild scopes.",
      },
    ],
    image: {
      src: "/images/projects/img_8220.jpg",
      alt: "Drywall and interior renovation work by Revision Home Improvements in Reading, PA.",
    },
    gallery: [
      { src: "/images/projects/img_8220.jpg", alt: "Drywall repair and finishing detail." },
      { src: "/images/projects/img_8216.jpg", alt: "Interior wall preparation and repair." },
      { src: "/images/projects/img_8219.jpg", alt: "Post-repair ready-to-paint interior." },
    ],
  },
  {
    slug: "flooring-installation",
    name: "Flooring Installation",
    short: "Durable flooring for high-traffic homes.",
    description:
      "Install and replace flooring systems that fit your budget, style, and daily wear requirements.",
    intro:
      "Flooring quality depends on subfloor prep and layout precision. We install systems designed for durability and clean finish transitions.",
    cta: "Request flooring quote",
    bullets: ["Subfloor prep", "Precision installation", "Trim and transition details"],
    whatIncluded: [
      "Removal and replacement planning for existing flooring",
      "Subfloor prep, leveling, and moisture checks",
      "Material install with transitions and threshold detailing",
      "Final trim and cleanup",
    ],
    qualityFactors: [
      "Subfloor prep quality (critical for long-term performance)",
      "Expansion gap and transition detail accuracy",
      "Pattern/layout consistency across connected spaces",
    ],
    pricingFactors: [
      "Material type and product tier",
      "Subfloor repair/prep required before install",
      "Room count, stairs, and transition complexity",
    ],
    outcomes: ["Smoother, quieter floors", "Cleaner transitions and trim", "Longer-lasting finish performance"],
    process: ["Material and use-case review", "Subfloor prep and leveling", "Install and trim detailing", "Final walkthrough and care guidance"],
    faqs: [
      ...sharedFaqs("flooring installation"),
      {
        q: "Do you replace damaged flooring after water events?",
        a: "Yes. We handle replacement scopes tied to restoration and insurance-supported projects.",
      },
    ],
    image: {
      src: "/images/projects/img_8219.jpg",
      alt: "Home renovation flooring installation project in Lehigh Valley.",
    },
    gallery: [
      { src: "/images/projects/img_8219.jpg", alt: "Flooring installation example in remodeled interior." },
      { src: "/images/projects/img_8216.jpg", alt: "Interior flooring transition detail." },
      { src: "/images/projects/img_7833.jpg", alt: "Kitchen flooring and cabinetry alignment detail." },
    ],
  },
  {
    slug: "paver-installation",
    name: "Paver Installation",
    short: "Outdoor hardscapes that hold up year-round.",
    description:
      "Patios, walkways, and paver hardscape upgrades designed for drainage, durability, and curb appeal.",
    intro:
      "Outdoor projects are only as strong as base preparation and drainage. We focus on long-term performance and clean layout geometry.",
    cta: "Request a paver quote",
    bullets: ["Patio design", "Walkways and edging", "Base prep and grading"],
    whatIncluded: [
      "Site layout and drainage-aware design planning",
      "Excavation, base prep, and compaction",
      "Paver installation with edge restraint and joint fill",
      "Final grading and cleanup",
    ],
    qualityFactors: [
      "Base depth and compaction quality",
      "Drainage control to avoid settling or pooling",
      "Edge restraint and pattern lock-in stability",
    ],
    pricingFactors: [
      "Site access and excavation requirements",
      "Paver product type and pattern complexity",
      "Drainage and grading corrections needed",
    ],
    outcomes: ["Improved outdoor usability", "Better drainage and durability", "Stronger curb appeal"],
    process: ["Site and grade review", "Layout and material planning", "Base prep and install", "Compaction and final finish"],
    faqs: [
      ...sharedFaqs("paver installation"),
      {
        q: "Can you rebuild aging patio sections?",
        a: "Yes. We can repair or replace worn sections and rework grading where needed.",
      },
    ],
    image: {
      src: "/images/projects/Patio-3.jpg",
      alt: "Patio remodel and paver construction project in Reading, PA.",
    },
    gallery: [
      { src: "/images/projects/Patio-3.jpg", alt: "Completed paver patio installation." },
      { src: "/images/projects/Frontier-2.jpg", alt: "Outdoor patio build in progress." },
      { src: "/images/projects/Patio-Construction-site-frontier.jpg", alt: "Site prep for patio and paver build." },
    ],
  },
  {
    slug: "fire-damage-restoration",
    name: "Fire Damage Restoration",
    short: "Fast response for urgent property damage.",
    description:
      "Emergency stabilization, rebuild planning, and full restoration work after fire damage.",
    intro:
      "Fire events require fast planning and careful reconstruction. We coordinate stabilization and rebuild scopes with clear next steps.",
    cta: "Call now",
    bullets: ["Urgent response", "Damage assessment", "Rebuild coordination"],
    whatIncluded: [
      "Initial damage assessment and safety-first planning",
      "Reconstruction scope for affected structural and finish areas",
      "Coordination for staged rebuild work",
      "Documentation support for claim-related communication",
    ],
    qualityFactors: [
      "Accurate early scope to avoid mid-project surprises",
      "Sequencing discipline across trades",
      "Clear communication through each rebuild phase",
    ],
    pricingFactors: [
      "Extent of structural and finish damage",
      "Size of affected area and rebuild depth",
      "Special materials or phased reconstruction requirements",
    ],
    outcomes: ["Faster path to recovery", "Structured rebuild scope", "Clear communication through claim-driven work"],
    process: ["Initial site evaluation", "Safety and damage scope planning", "Rebuild sequence and materials", "Final quality and handoff"],
    faqs: [
      ...sharedFaqs("fire damage restoration"),
      {
        q: "Do you work with insurance claim documentation?",
        a: "Yes. We support project scope documentation and communication for claim-related rebuild work.",
      },
    ],
    image: {
      src: "/images/projects/Frontier-1.jpg",
      alt: "Restoration and reconstruction project by Revision Home Improvements in Berks County.",
    },
    gallery: [
      { src: "/images/projects/Frontier-1.jpg", alt: "Restoration-focused rebuild project." },
      { src: "/images/projects/Frontier-2.jpg", alt: "Structural repair and reconstruction example." },
      { src: "/images/projects/before-after-patio_mp4_hd.original.jpg", alt: "Before and after transformation from damage project." },
    ],
  },
  {
    slug: "water-damage-restoration",
    name: "Water Damage Restoration",
    short: "Restore structure and finishes after water events.",
    description:
      "Water-damage rebuild services for drywall, flooring, trim, and affected finished spaces.",
    intro:
      "Water damage can spread quickly. We focus on practical reconstruction scopes that restore structural and finish quality efficiently.",
    cta: "Call now",
    bullets: ["Rapid mitigation support", "Structural and finish repairs", "Insurance-ready documentation"],
    whatIncluded: [
      "Damage mapping and affected-area reconstruction planning",
      "Drywall, flooring, trim, and finish restoration",
      "Phased work to return spaces to functional condition",
      "Documentation support for claim communication",
    ],
    qualityFactors: [
      "Complete identification of affected assemblies",
      "Clean sequencing from repair to finish restoration",
      "Durable material choices in previously affected areas",
    ],
    pricingFactors: [
      "Extent and depth of water intrusion damage",
      "Number of finishes needing replacement",
      "Project phasing and access constraints",
    ],
    outcomes: ["Stabilized damaged areas", "Coordinated rebuild sequencing", "Cleaner closeout with documented scope"],
    process: ["Damage mapping and scope", "Material removal/repair planning", "Rebuild and finish restoration", "Final review and cleanup"],
    faqs: [
      ...sharedFaqs("water damage restoration"),
      {
        q: "Can water damage and remodeling be combined in one scope?",
        a: "Yes. In many cases we combine required repairs with strategic upgrades to avoid duplicate disruption.",
      },
    ],
    image: {
      src: "/images/projects/Patio-Construction-site-frontier.jpg",
      alt: "Active restoration site work by Revision Home Improvements in Reading and Berks County.",
    },
    gallery: [
      { src: "/images/projects/Patio-Construction-site-frontier.jpg", alt: "Water-damage restoration jobsite preparation." },
      { src: "/images/projects/img_8220.jpg", alt: "Interior recovery and rebuild scope detail." },
      { src: "/images/projects/img_8219.jpg", alt: "Post-restoration flooring and finish result." },
    ],
  },
  {
    slug: "insurance-claims",
    name: "Insurance Claims Assistance",
    short: "Work scopes built for claim-driven projects.",
    description:
      "Support for homeowners through claim-related repairs with clear scopes and communication.",
    intro:
      "Claim-driven projects need documentation, scope clarity, and consistent communication. We help you move from claim to completed work.",
    cta: "Request claim help",
    bullets: ["Claim-friendly scope writing", "Photo documentation", "Project communication"],
    whatIncluded: [
      "Scope documentation aligned with repair needs",
      "Photo and detail support for communication clarity",
      "Project planning from approval through completion",
      "Consistent updates during reconstruction",
    ],
    qualityFactors: [
      "Scope clarity and documentation quality",
      "Communication speed across stakeholders",
      "Sequencing control during rebuild execution",
    ],
    pricingFactors: [
      "Extent of repairs required after approval",
      "Material and finish replacement level",
      "Coordination complexity across project phases",
    ],
    outcomes: ["Clearer next steps for approval", "Coordinated repair planning", "Reduced friction in project communication"],
    process: ["Damage and claim context review", "Scope drafting and documentation", "Repair planning and sequencing", "Project execution updates"],
    faqs: [
      ...sharedFaqs("insurance claim repair"),
      {
        q: "Do you guarantee claim approval?",
        a: "No contractor can guarantee claim approval, but we provide clear documentation and practical scope support.",
      },
    ],
    image: {
      src: "/images/projects/before-after-patio_mp4_hd.original.jpg",
      alt: "Before and after remodeling project showing insurance claim repair quality.",
    },
    gallery: [
      { src: "/images/projects/before-after-patio_mp4_hd.original.jpg", alt: "Claim-related before and after example." },
      { src: "/images/projects/Frontier-1.jpg", alt: "Insurance scope restoration example." },
      { src: "/images/projects/img_8216.jpg", alt: "Interior reconstruction tied to claim work." },
    ],
  },
];

export const primaryServices = services.filter((service) => service.slug !== "insurance-claims");

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
