export type ServiceFaq = {
  q: string;
  a: string;
};

export type Service = {
  /** URL slug for this service page */
  slug: string;
  /** Manager App job tag used for portfolio filtering; must match app SERVICE_TAG_OPTIONS slug */
  portfolioTag?: string;
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

export const curatedStaticGalleryServiceSlugs = [
  "kitchen-remodeling",
  "bathroom-remodeling",
  "basement-finishing",
  "drywall-installation-repair",
] as const;

function sharedFaqs(serviceName: string, typicalTimeline: string): ServiceFaq[] {
  return [
    {
      q: `How long does a ${serviceName.toLowerCase()} project usually take?`,
      a: `Most ${serviceName.toLowerCase()} projects take ${typicalTimeline}. We give you a specific timeline during your estimate based on your scope, materials, and any prep work needed.`,
    },
    {
      q: "Do I get a written scope before work starts?",
      a: "Yes — always. You get a written proposal with exactly what is included, what it costs, and when each phase happens. Nothing starts until you approve it.",
    },
    {
      q: "What areas do you serve?",
      a: "We serve Reading, Wyomissing, Berks County, Allentown, Bethlehem, and the broader Lehigh Valley. Check our service areas page for your specific neighborhood.",
    },
  ];
}

export const services: Service[] = [
  {
    slug: "kitchen-remodeling",
    name: "Kitchen Remodeling",
    short: "The kitchen you actually want to cook in.",
    description:
      "Full kitchen renovations including layout updates, cabinets, countertops, lighting, and finishes.",
    intro:
      "A kitchen remodel is one of the biggest upgrades you can make to your home. We handle everything from layout changes and cabinetry to countertops and lighting — planned around your daily life so the disruption stays manageable.",
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
      ...sharedFaqs("kitchen remodeling", "4 to 8 weeks"),
      {
        q: "Can you remodel my kitchen in phases?",
        a: "Yes. We can break the project into stages — for example, doing cabinets and countertops first, then coming back for flooring or lighting. This helps spread out cost and disruption.",
      },
      {
        q: "Will I still be able to use my kitchen during the remodel?",
        a: "It depends on the scope. For full gut renovations, you will need a temporary setup for a few weeks. For smaller updates, we can often keep part of the kitchen functional. We will plan this with you upfront.",
      },
    ],
    image: {
      src: "/images/projects/kitchen-1.jpg",
      alt: "Kitchen remodel with updated finishes and fixtures.",
    },
    gallery: [
      { src: "/images/projects/kitchen-1.jpg", alt: "Kitchen remodel with updated finishes and fixtures." },
      { src: "/images/projects/Kitchen-High-End.jpg", alt: "High-end kitchen remodel with modern appliances and island." },
      { src: "/images/projects/img_7833.jpg", alt: "Modern white cabinet kitchen renovation." },
    ],
  },
  {
    slug: "bathroom-remodeling",
    name: "Bathroom Remodeling",
    short: "A bathroom that works as good as it looks.",
    description:
      "Bathroom upgrades with improved storage, tilework, fixtures, and clean modern finishes.",
    intro:
      "Whether you are dealing with an outdated layout or just want something nicer, we handle the full remodel — tile, fixtures, vanity, waterproofing, and everything in between.",
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
      ...sharedFaqs("bathroom remodeling", "2 to 4 weeks"),
      {
        q: "Can you work with my existing plumbing layout?",
        a: "Usually yes. Moving plumbing is possible but adds cost and time. We will tell you upfront whether keeping the current layout makes sense or if a move is worth it for the result you want.",
      },
      {
        q: "Do you handle waterproofing?",
        a: "Yes. Proper waterproofing behind tile and around the shower pan is one of the most important parts of a bathroom remodel. We do not cut corners here.",
      },
    ],
    image: {
      src: "/images/projects/bathroom-after-4.jpg",
      alt: "Finished bathroom renovation with updated shower and vanity.",
    },
    gallery: [
      { src: "/images/projects/bathroom-after-4.jpg", alt: "Finished bathroom renovation with updated shower and vanity." },
      { src: "/images/projects/bathroom-finished-2.jpg", alt: "Finished shower detail with updated fixtures and trim." },
      { src: "/images/projects/bathroom-after.jpg", alt: "Bathroom renovation with updated vanity and finishes." },
      { src: "/images/projects/bathroom-shelves-corner.jpg", alt: "Bathroom shelving and storage detail after remodel." },
    ],
  },
  {
    slug: "basement-finishing",
    portfolioTag: "basement-finishing",
    name: "Basement Finishing",
    short: "Turn your basement into space you actually use.",
    description:
      "Basement finishing and remodeling for family rooms, offices, guest spaces, and storage zones.",
    intro:
      "Most basements are wasted space. We turn them into rooms your family actually uses — whether that is a home office, guest bedroom, media room, or play area. We plan around moisture, lighting, and utility access so the space holds up long-term.",
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
      ...sharedFaqs("basement finishing", "5 to 8 weeks"),
      {
        q: "What about moisture problems?",
        a: "We evaluate moisture conditions before starting. If there are active water issues, those get addressed first. We use moisture-resistant materials in areas that need them and make sure ventilation is adequate.",
      },
      {
        q: "Can I put a bathroom in the basement?",
        a: "Yes, but it depends on your existing plumbing. If there is a rough-in already, it is straightforward. If not, we can discuss options during the estimate.",
      },
    ],
    image: {
      src: "/images/projects/big-screen-basement.jpg",
      alt: "Finished basement media room with large screen.",
    },
    gallery: [
      { src: "/images/projects/big-screen-basement.jpg", alt: "Finished basement media room with large screen." },
      { src: "/images/projects/basement-epoxy-floor-big-screen.jpg", alt: "Basement epoxy flooring finish detail." },
      { src: "/images/projects/pace-3.jpg", alt: "Wide basement view showing finished layout and floor detail." },
      { src: "/images/projects/pace-4.jpg", alt: "Basement wide-angle finish showing completed room flow." },
    ],
  },
  {
    slug: "drywall-installation-repair",
    portfolioTag: "drywall",
    name: "Drywall Installation and Repair",
    short: "Walls and ceilings that look like new.",
    description:
      "Drywall hanging, patching, skim coating, and paint-ready finishing for remodel and restoration jobs.",
    intro:
      "Whether you need a full room of drywall hung or a few patches blended invisible, we get your walls smooth, flat, and ready for paint. No visible seams, no bumps, no shortcuts.",
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
      ...sharedFaqs("drywall work", "3 to 7 days for most repair jobs"),
      {
        q: "Will the repair be visible after painting?",
        a: "That is our standard — repairs should be invisible under paint. We do multiple tape, mud, and sand passes to blend the repair into the surrounding wall. If there is existing texture, we match it.",
      },
      {
        q: "Can you do drywall as part of a bigger remodel?",
        a: "Yes. Drywall is almost always part of larger kitchen, bathroom, or basement projects. We handle it as part of the overall scope rather than subbing it out.",
      },
    ],
    image: {
      src: "/images/projects/living-room-1.jpg",
      alt: "Finished living room with clean drywall and paint-ready surfaces.",
    },
    gallery: [
      { src: "/images/projects/living-room-1.jpg", alt: "Finished living room with smooth drywall and clean corners." },
      { src: "/images/projects/finished-room.jpg", alt: "Finished room with clean drywall lines and finished surfaces." },
    ],
  },
  {
    slug: "flooring-installation",
    portfolioTag: "flooring",
    name: "Flooring Installation",
    short: "Floors that look great and hold up to real life.",
    description:
      "Install and replace flooring systems that fit your budget, style, and daily wear requirements.",
    intro:
      "Good flooring starts with proper subfloor prep — that is where most installers cut corners. We level, prep, and install with tight transitions between rooms so your floors look and feel right for years.",
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
      ...sharedFaqs("flooring installation", "1 to 2 weeks for most homes"),
      {
        q: "Do I need to move my furniture?",
        a: "We can work around furniture in some cases, but for the best result we recommend clearing the rooms being done. We will tell you exactly what needs to move before we start.",
      },
      {
        q: "What type of flooring do you recommend?",
        a: "It depends on the room and how you use it. Luxury vinyl plank works great in kitchens and basements. Hardwood is ideal for living areas. We will walk you through the options during your estimate.",
      },
    ],
    image: {
      src: "/images/projects/img_8219.jpg",
      alt: "Home renovation flooring installation project in Lehigh Valley.",
    },
    gallery: [
      { src: "/images/projects/finished-room.jpg", alt: "Finished interior room after flooring upgrade." },
      { src: "/images/projects/living-room-1.jpg", alt: "Living room finish detail after interior renovation." },
      { src: "/images/projects/img_8219.jpg", alt: "Flooring installation example in remodeled interior." },
      { src: "/images/projects/img_8216.jpg", alt: "Finished flooring in remodeled interior space." },
    ],
  },
  {
    slug: "paver-installation",
    portfolioTag: "paver-installation",
    name: "Paver Installation",
    short: "Patios and walkways built to last.",
    description:
      "Patios, walkways, and paver hardscape upgrades designed for drainage, durability, and curb appeal.",
    intro:
      "A patio is only as good as what is underneath it. We spend the time on proper base prep, compaction, and drainage so your pavers do not shift, sink, or pool water. The result is outdoor space you can actually enjoy year-round.",
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
      ...sharedFaqs("paver installation", "1 to 2 weeks depending on size"),
      {
        q: "How long do pavers last?",
        a: "With proper base prep and drainage, a paver patio can last 25+ years. The base work is the most important factor — we do not rush this step.",
      },
      {
        q: "Can you add a patio to a sloped yard?",
        a: "Yes. We handle grading, retaining, and drainage as part of the project. Sloped yards just need more prep work, which we will scope in your estimate.",
      },
    ],
    image: {
      src: "/images/projects/Patio-3.jpg",
      alt: "Patio remodel and paver construction project in Reading, PA.",
    },
    gallery: [
      { src: "/images/projects/Patio-3.jpg", alt: "Completed paver patio installation." },
      { src: "/images/projects/patio-construction-2.jpg", alt: "Patio construction phase during build." },
      { src: "/images/projects/Frontier-2.jpg", alt: "Outdoor patio build in progress." },
      { src: "/images/projects/Patio-Construction-site-frontier.jpg", alt: "Site prep for patio and paver build." },
      { src: "/images/projects/frontier-final-patio-roof-gable-tongue-groove.jpg", alt: "Finished patio roof and gable detail." },
    ],
  },
  {
    slug: "fire-damage-restoration",
    portfolioTag: "fire-damage",
    name: "Fire Damage Restoration",
    short: "Fast response when fire damage hits your home.",
    description:
      "Emergency stabilization, rebuild planning, and full restoration work after fire damage.",
    intro:
      "Fire damage is overwhelming. We help you move from chaos to a clear plan — starting with safety, then documentation, then a structured rebuild. We handle the reconstruction so you can focus on your family.",
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
      ...sharedFaqs("fire damage restoration", "varies widely — small jobs take a few weeks, major rebuilds can take months"),
      {
        q: "Do you deal with the insurance company for me?",
        a: "We do not negotiate with your insurance company directly, but we provide detailed scope documentation, photos, and cost breakdowns that make the claims process much smoother.",
      },
      {
        q: "How fast can you start?",
        a: "For active damage situations, call us immediately. We prioritize emergency stabilization and can typically be on-site or on the phone with you the same day.",
      },
    ],
    image: {
      src: "/images/projects/Frontier-2.jpg",
      alt: "Fire damage restoration and rebuild work by Revision Home Improvements.",
    },
    gallery: [
      { src: "/images/projects/img_8220.jpg", alt: "Interior restoration and reconstruction in progress." },
      { src: "/images/projects/img_8216.jpg", alt: "Restored interior flooring and finish work." },
    ],
  },
  {
    slug: "water-damage-restoration",
    portfolioTag: "water-damage",
    name: "Water Damage Restoration",
    short: "Get your home back to normal after water damage.",
    description:
      "Water-damage rebuild services for drywall, flooring, trim, and affected finished spaces.",
    intro:
      "Water damage gets worse the longer you wait. We move fast to assess what is affected, remove what cannot be saved, and rebuild the rest. If insurance is involved, we document everything along the way.",
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
      ...sharedFaqs("water damage restoration", "depends on severity — targeted repairs take 1 to 3 weeks, major rebuilds take longer"),
      {
        q: "Can I upgrade things while you are doing the repairs?",
        a: "Absolutely. If we are already replacing flooring or drywall, it often makes sense to upgrade materials or layouts at the same time. We will show you the options so you can decide.",
      },
      {
        q: "What if I find more damage after you start?",
        a: "It happens, especially behind walls. We document everything and communicate immediately so there are no surprises. If insurance is involved, we update the scope documentation for your adjuster.",
      },
    ],
    image: {
      src: "/images/projects/img_7540.jpg",
      alt: "Water-damage reconstruction and interior rebuild work in progress.",
    },
    gallery: [
      { src: "/images/projects/img_7540.jpg", alt: "Interior rebuild work after water-related damage." },
      { src: "/images/projects/img_8219.jpg", alt: "Replacement flooring and finish restoration work." },
    ],
  },
  {
    slug: "insurance-claims",
    portfolioTag: "insurance-restoration",
    name: "Insurance Claims Assistance",
    short: "Help navigating insurance-related repairs.",
    description:
      "Support for homeowners through claim-related repairs with clear scopes and communication.",
    intro:
      "Dealing with insurance after property damage is stressful. We help by providing clear documentation, detailed scope breakdowns, and consistent communication so the repair process moves forward without you having to manage every detail.",
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
      ...sharedFaqs("insurance claim work", "depends on the repair scope and approval timeline"),
      {
        q: "Can you guarantee my claim gets approved?",
        a: "No — no contractor can promise that. But we provide thorough documentation, clear scope breakdowns, and photos that give your adjuster what they need to evaluate the claim fairly.",
      },
      {
        q: "When should I call you — before or after I file the claim?",
        a: "Either works. If you call us first, we can help you document the damage properly before filing. If you have already filed, we can step in to support the scope and rebuild process.",
      },
    ],
    image: {
      src: "/images/projects/img_8216.jpg",
      alt: "Insurance-supported interior repair and finish restoration project.",
    },
    gallery: [
      { src: "/images/projects/img_8216.jpg", alt: "Claim-supported interior restoration result." },
      { src: "/images/projects/img_8220.jpg", alt: "Drywall and finish reconstruction for claim scope." },
      { src: "/images/projects/img_7540.jpg", alt: "Repair-in-progress detail from insurance-supported project." },
    ],
  },
];

export const primaryServices = services.filter((service) => service.slug !== "insurance-claims");

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
