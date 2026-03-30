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
  authoritySnapshot?: {
    title: string;
    location: string;
    summary: string;
    scope: string[];
    compliance: string;
    note: string;
  };
  image: {
    src: string;
    alt: string;
  };
  /** Optional: pin featured case study + “Featured project photos” to this slug (visible case study for this service). */
  featuredCaseStudySlug?: string;
  gallery: Array<{
    src: string;
    alt: string;
  }>;
  processGallery?: {
    title: string;
    intro: string;
    /** How many images to show inline; the rest are accessible via lightbox. Defaults to all. */
    inlineCount?: number;
    images: Array<{
      src: string;
      alt: string;
      caption: string;
    }>;
  };
};

export const curatedStaticGalleryServiceSlugs = [
  "kitchen-remodeling",
  "bathroom-remodeling",
  "basement-finishing",
  "drywall-installation-repair",
  "flooring-installation",
  "paver-installation",
  "exterior-remodeling",
  "fire-damage-restoration",
  "water-damage-restoration",
  "insurance-claims",
] as const;

export const services: Service[] = [
  {
    slug: "kitchen-remodeling",
    featuredCaseStudySlug: "blue-kitchen-cabinet-counters",
    name: "Kitchen Remodeling",
    short: "Layout, cabinets, countertops, and finishes — planned around your daily life.",
    description:
      "Full kitchen renovations including layout updates, cabinets, countertops, lighting, and finishes.",
    intro:
      "Kitchen remodels touch layout, cabinets, countertops, electrical, and plumbing — all in the room you use most. We coordinate materials before demo, keep disruption short, and give you a written scope before work begins.",
    cta: "Request a Kitchen Quote",
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
      {
        q: "Can you remodel my kitchen in phases?",
        a: "Yes. We can break the project into stages — for example cabinets and countertops first, then flooring or lighting later — so cost and disruption are easier to manage.",
      },
      {
        q: "Will I still be able to use my kitchen during the remodel?",
        a: "It depends on scope. Full gut jobs usually mean a temporary setup for a few weeks; smaller updates can often leave part of the kitchen usable. We plan that with you before work starts.",
      },
    ],
    image: {
      src: "/images/projects/blue-kitchen-cabinet-counters/after/05-blue-kitchen-cabinets-finished-2.jpg",
      alt: "Finished kitchen remodel with blue cabinets and new countertops.",
    },
    gallery: [
      {
        src: "/images/projects/blue-kitchen-cabinet-counters/after/04-blue-kitchen-cabinets-done.jpg",
        alt: "Kitchen cabinets and counters complete after installation.",
      },
      {
        src: "/images/projects/blue-kitchen-cabinet-counters/after/01-blue-kitchen-2.jpg",
        alt: "Updated kitchen overview with blue cabinet finish.",
      },
      {
        src: "/images/projects/blue-kitchen-cabinet-counters/after/03-blue-kitchen-cabinets-1.jpg",
        alt: "Cabinet and counter detail after kitchen upgrade.",
      },
    ],
  },
  {
    slug: "bathroom-remodeling",
    featuredCaseStudySlug: "bethlehem-bathroom-refresh",
    name: "Bathroom Remodeling",
    short: "Bathrooms built right — tile, waterproofing, fixtures, and finishes you can count on.",
    description:
      "Bathroom upgrades with improved storage, tilework, fixtures, and clean modern finishes.",
    intro:
      "A bathroom remodel touches plumbing, waterproofing, tile, electrical, and finishes — all in a space your household uses every day. We plan the work around your daily routine, handle waterproofing properly so nothing fails behind the walls, and keep the jobsite clean throughout. You get a written scope before we start and consistent updates until the final walkthrough.",
    cta: "Request a Bathroom Quote",
    bullets: ["Showers and vanities", "Tile and waterproofing", "Efficient layouts"],
    whatIncluded: [
      "Shower/tub area upgrades and fixture replacement",
      "Vanity, storage, mirror/lighting, and select fixture-area improvements",
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
      {
        q: "Can you work with my existing plumbing layout?",
        a: "Usually yes. Moving drains or supplies adds cost and time; we tell you upfront whether keeping the current layout is the better value for the result you want.",
      },
      {
        q: "Do you handle waterproofing?",
        a: "Yes. Proper waterproofing behind tile and at the shower base is critical — we do not shortcut wet-zone assemblies.",
      },
      {
        q: "Do you take on commercial restroom refresh projects?",
        a: "Selectively, when the scope matches our bathroom remodeling work: durable finishes, fixture areas, and layouts suited to higher-traffic use.",
      },
    ],
    image: {
      src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-vanity.png",
      alt: "Finished bathroom renovation with updated vanity, lighting, shower enclosure, and matte black fixtures.",
    },
    gallery: [
      { src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-vanity.png", alt: "Finished bathroom renovation with updated vanity, lighting, and shower enclosure." },
      { src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg", alt: "Finished bathroom renovation with updated shower and vanity." },
      { src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-finished-shower-detail.jpg", alt: "Finished shower detail with updated fixtures and trim." },
      { src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-shelves-corner.jpg", alt: "Bathroom shelving and storage detail after remodel." },
    ],
  },
  {
    slug: "basement-finishing",
    featuredCaseStudySlug: "lehigh-valley-basement-finish-and-detail",
    portfolioTag: "basement-finishing",
    name: "Basement Finishing",
    short: "Turn your basement into space you actually use.",
    description:
      "Basement finishing and remodeling for family rooms, offices, guest spaces, and storage zones.",
    intro:
      "Most basements sit unused — too damp, too dark, or too awkward to feel like real living space. We plan around your foundation conditions, moisture concerns, and mechanical systems so the finished space is comfortable, dry, and built to last. The result is a basement that feels like part of your home, not an afterthought.",
    cta: "Request a Basement Quote",
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
    process: [
      "Space planning and constraints review",
      "Permit and inspection coordination",
      "Framing/electrical/mechanical coordination",
      "Finish material installation and final punch-list completion",
    ],
    faqs: [
      {
        q: "What about moisture or water in the basement?",
        a: "We assess conditions before finishing. Active water issues get addressed first; assemblies and materials are chosen for below-grade risk, and ventilation is planned so the space stays comfortable long term.",
      },
      {
        q: "Can I add a bathroom in the basement?",
        a: "Often yes. An existing rough-in makes it straightforward; without one, we walk through options and cost during the estimate.",
      },
    ],
    authoritySnapshot: {
      title: "Basement Buildout — Fogelsville, PA",
      location: "Fogelsville, PA (Lehigh County)",
      summary:
        "Example scope for a partially unfinished basement covering layout, utilities, drainage, insulation, and finish sequencing.",
      scope: [
        "Framing for mechanical room, fitness room, workshop, wet bar zone, and custom built-ins",
        "Pressure-treated bottom plates at concrete contact points and required fire blocking",
        "Recessed lighting, dedicated 20-amp fitness circuits, wet bar electrical, and hardwired smoke/CO detectors",
        "Wet bar plumbing rough-in plus sump and drainage coordination",
        "Exterior wall insulation, 6-mil vapor barrier, and Rockwool in ceiling cavities",
        "Slab prep with vapor barrier and LVP flooring in finished areas",
        "Interior French drain and up to two sump pump systems for water management",
      ],
      compliance:
        "Scope aligned with local building, electrical, plumbing, and energy-code requirements.",
      note:
        "Shown to illustrate planning depth. Your scope will vary based on home conditions, access, and finish selections.",
    },
    image: {
      src: "/images/projects/lehigh-valley-basement-theater/after/media-room-big-screen.jpg",
      alt: "Finished basement media room with large screen.",
    },
    gallery: [
      { src: "/images/projects/lehigh-valley-basement-theater/after/media-room-big-screen.jpg", alt: "Finished basement media room with large screen." },
      { src: "/images/projects/lehigh-valley-basement-theater/after/epoxy-floor-big-screen.jpg", alt: "Basement epoxy flooring finish detail." },
      { src: "/images/projects/lehigh-valley-basement-theater/after/wide-view-layout.jpg", alt: "Wide basement view showing finished layout and floor detail." },
      { src: "/images/projects/lehigh-valley-basement-theater/after/wide-angle-room-flow.jpg", alt: "Basement wide-angle finish showing completed room flow." },
    ],
    processGallery: {
      title: "What Happens Before the Walls Close Up",
      intro:
        "Finished walls hide a lot of work. These photos show what framing, insulation, plumbing, and HVAC look like before drywall goes up.",
      inlineCount: 6,
      images: [
        {
          src: "/images/projects/fogelsville-basement-in-progress/process/basement-process-wide-view-framing-insulation-bathroom-rough-in.jpg",
          alt: "Wide view of basement framing with insulation and bathroom rough-in visible.",
          caption: "Layout taking shape — insulation going in, bathroom roughed in toward the back.",
        },
        {
          src: "/images/projects/fogelsville-basement-in-progress/process/basement-process-metal-stud-framing-bathroom-rough-in.jpg",
          alt: "Metal stud partition walls framing out a basement bathroom.",
          caption: "Bathroom walls framed and squared before plumbing goes in.",
        },
        {
          src: "/images/projects/fogelsville-basement-in-progress/process/basement-process-bathroom-plumbing-rough-in-supply-drain.jpg",
          alt: "Basement bathroom plumbing rough-in with supply lines and drain piping.",
          caption: "Supply lines, drain piping, and pump installed before walls close up.",
        },
        {
          src: "/images/projects/fogelsville-basement-in-progress/process/basement-process-mechanical-room-framing-tankless-water-heater.jpg",
          alt: "Framed mechanical room with tankless water heater and copper piping.",
          caption: "Mechanical room framed with tankless water heater mounted and connected.",
        },
        {
          src: "/images/projects/fogelsville-basement-in-progress/process/basement-process-staircase-framing-ceiling-grid-aquarium-wall.jpg",
          alt: "Basement staircase framing with ceiling grid and open floor area.",
          caption: "Staircase framed in with ceiling grid overhead — shows the scale of the finished space.",
        },
        {
          src: "/images/projects/fogelsville-basement-in-progress/process/basement-process-hallway-framing-drywall-stairway-electrical-boxes.jpg",
          alt: "Basement hallway with drywall going up and electrical boxes placed.",
          caption: "Drywall going up with electrical boxes set. Framing turning into finished rooms.",
        },
        {
          src: "/images/projects/fogelsville-basement-in-progress/process/basement-process-stairway-view-framing-electrical-panel.jpg",
          alt: "View down basement stairway showing steel stud framing and electrical panel.",
          caption: "Steel stud framing along the foundation with electrical panel access kept clear.",
        },
        {
          src: "/images/projects/fogelsville-basement-in-progress/process/basement-process-wide-view-ceiling-framing-insulation-hvac.jpg",
          alt: "Wide angle of basement ceiling framing with insulation and HVAC register placement.",
          caption: "Ceiling insulation between joists with HVAC register placed for the finished layout.",
        },
      ],
    },
  },
  {
    slug: "drywall-installation-repair",
    featuredCaseStudySlug: "ryan-bedroom-interior-refresh",
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
      {
        q: "Will the repair be visible after painting?",
        a: "It should not be. We run tape, mud, and sand cycles until the repair blends into the surrounding wall; we match existing texture when needed.",
      },
      {
        q: "Can drywall be part of a larger remodel?",
        a: "Yes — it is usually in scope for kitchens, baths, and basements, handled as part of the same job rather than pieced out.",
      },
    ],
    image: {
      src: "/images/projects/ryan-bedroom/after/01-interior-refresh-blue-completed.jpg",
      alt: "Completed bedroom interior with smooth wall and ceiling finish — blue palette refresh in Berks County.",
    },
    gallery: [
      {
        src: "/images/projects/ryan-bedroom/after/01-interior-refresh-blue-completed.jpg",
        alt: "Bedroom refresh showing completed blue palette and cleaned-up finish lines.",
      },
      {
        src: "/images/projects/ryan-bedroom/after/02-interior-refresh-blue-1.jpg",
        alt: "Alternate angle of refreshed bedroom with blue wall color.",
      },
      {
        src: "/images/projects/ryan-bedroom/after/03-interior-refresh-blue-3.jpg",
        alt: "Bedroom interior with updated blue walls and coordinated finishes.",
      },
      {
        src: "/images/projects/ryan-bedroom/after/04-interior-refresh-blue-4.jpg",
        alt: "Wide view of refreshed bedroom interior after completion.",
      },
      {
        src: "/images/projects/ryan-bedroom/process/01-interior-refresh-blue-2-process.jpg",
        alt: "Bedroom refresh in progress during paint and finish prep.",
      },
      {
        src: "/images/projects/ryan-bedroom/process/02-interior-refresh-blue-in-progress.jpg",
        alt: "Interior refresh underway with protection and phased finish work.",
      },
    ],
  },
  {
    slug: "flooring-installation",
    featuredCaseStudySlug: "allentown-flooring-replacement-upgrade",
    portfolioTag: "flooring",
    name: "Flooring Installation",
    short: "Floors that look great and hold up to real life.",
    description:
      "Install and replace flooring systems that fit your budget, style, and daily wear requirements.",
    intro:
      "Good flooring starts with proper subfloor prep because that is where most installers cut corners. We level, prep, and install with tight transitions between rooms so your floors look and feel right for years.",
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
      {
        q: "Do I need to clear the room completely?",
        a: "Clear rooms get the best result. We tell you exactly what should be moved before we start; in tight situations we can sometimes work around partial clearing.",
      },
      {
        q: "How do you choose materials for each space?",
        a: "We match product to room use and moisture risk — for example LVP where water matters, hardwood or engineered wood where it fits your goals — and walk through tradeoffs at the estimate.",
      },
    ],
    image: {
      src: "/images/projects/allentown-flooring-replacement/after/living-room-finished.jpg",
      alt: "Light wood flooring installation in a finished living area.",
    },
    gallery: [
      {
        src: "/images/projects/allentown-flooring-replacement/after/living-room-finished.jpg",
        alt: "Completed light wood flooring installation in an Allentown living area.",
      },
      {
        src: "/images/projects/allentown-flooring-replacement/after/fireplace-wall-renovation.jpg",
        alt: "Allentown living area — flooring and trim detailed along the fireplace wall.",
      },
      {
        src: "/images/projects/bethlehem-interior-flooring-refresh/after/flooring-refresh.jpg",
        alt: "Bethlehem interior refresh with new wood-look flooring, paint, and lighting.",
      },
    ],
  },
  {
    slug: "paver-installation",
    featuredCaseStudySlug: "reading-paver-patio-buildout",
    portfolioTag: "paver-installation",
    name: "Paver Installation",
    short: "Patios and walkways built to last.",
    description:
      "Patios, walkways, and paver hardscape upgrades designed for drainage, durability, and curb appeal.",
    intro:
      "A patio or poolside hardscape area is only as good as what is underneath it. We spend the time on proper base prep, compaction, and drainage so your pavers do not shift, sink, or pool water. The result is outdoor space you can actually enjoy year-round.",
    cta: "Request a paver quote",
    bullets: ["Patios and poolside hardscapes", "Walkways and edging", "Base prep and grading"],
    whatIncluded: [
      "Site layout and drainage-aware design planning for patios, walkways, and poolside hardscape areas",
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
      {
        q: "What actually makes a paver patio last?",
        a: "Base depth, compaction, and drainage matter more than the pavers themselves. We scope prep honestly so the surface does not shift or hold water.",
      },
      {
        q: "Can you build on a sloped yard?",
        a: "Yes — grading, retaining, and drainage are part of the job; slopes mean more prep, which we call out in the estimate.",
      },
      {
        q: "Do you work on pool surrounds?",
        a: "Yes when the scope is the same class of work: layout, base, edge restraint, and clean radius detail at the pool.",
      },
    ],
    image: {
      src: "/images/projects/frontier-patio-gable-roof/after/finished-overview.jpg",
      alt: "Finished patio, pavilion roof, and hardscape outdoor living space.",
    },
    gallery: [
      { src: "/images/projects/frontier-patio-gable-roof/after/finished-overview.jpg", alt: "Finished patio, pavilion roof, and hardscape outdoor living space." },
      { src: "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg", alt: "Outdoor living area with paver patio and pavilion roof detail." },
      { src: "/images/projects/frontier-patio-gable-roof/after/angle-2.jpg", alt: "Alternate view of finished patio and integrated pavilion structure." },
      { src: "/images/projects/frontier-patio-gable-roof/after/finished-alt.jpg", alt: "Finished hardscape and pavilion from another angle." },
      { src: "/images/projects/frontier-patio-gable-roof/process/patio-construction.jpg", alt: "Patio and pavilion structure during construction." },
    ],
  },
  {
    slug: "exterior-remodeling",
    featuredCaseStudySlug: "allentown-exterior-log-home-refresh",
    name: "Exterior Remodeling",
    short: "Exterior updates that improve curb appeal, access, and weather resistance.",
    description:
      "Exterior remodeling for siding, trim, windows, stairs, garage facades, and weather-worn elevations.",
    intro:
      "Exterior work has to do more than look better. We plan around access, exposure, and finish durability so siding, trim, window, stair, and facade updates hold up through weather and daily use.",
    cta: "Request an exterior quote",
    bullets: ["Siding, stairs, and trim updates", "Window and entry improvements", "Garage and facade updates"],
    whatIncluded: [
      "Exterior siding, trim, window, and facade scope planning",
      "Surface prep and finish updates on weather-exposed elevations",
      "Exterior stair, landing, and entry-access builds when part of scope",
      "Access coordination for multi-story sections and hard-to-reach areas",
      "Cleanup and final walkthrough of exterior improvements",
    ],
    qualityFactors: [
      "Surface prep quality before finish work starts",
      "Consistent finish transitions across trim, siding, windows, and garage elevations",
      "Stair and landing alignment with solid railing and guard details",
      "Safe access planning for upper-story exterior work",
    ],
    pricingFactors: [
      "Height, access difficulty, and lift or stair-build requirements",
      "Extent of surface wear, repairs, or prep needed",
      "Amount of siding, trim, window, stair, and facade work included in scope",
    ],
    outcomes: ["Stronger curb appeal", "Safer and cleaner exterior access", "Better protection for weather-exposed surfaces"],
    process: ["Site review and photo assessment", "Access and scope planning", "Exterior prep and improvement work", "Final detail walk and touch-ups"],
    faqs: [
      {
        q: "Do you work on second-story or hard-to-reach elevations?",
        a: "Yes — access is planned with ladders or lifts as needed so upper areas are done safely and finishes stay consistent.",
      },
      {
        q: "Can we improve curb appeal without residing the whole house?",
        a: "Often yes. Targeted siding, trim, window, or facade updates can sharpen the look without a full tear-off.",
      },
    ],
    image: {
      src: "/images/projects/allentown-exterior-log-home/after/front-finished.jpg",
      alt: "Finished log-style home exterior after remodeling work in Allentown.",
    },
    gallery: [
      { src: "/images/projects/allentown-exterior-log-home/after/front-finished.jpg", alt: "Finished exterior remodeling project on a log-style home in Allentown." },
      { src: "/images/projects/allentown-exterior-log-home/after/garage-elevation.jpg", alt: "Garage-side exterior elevation during remodeling work on a log-style home." },
      { src: "/images/projects/allentown-exterior-log-home/process/lift-access-work.jpg", alt: "Lift-access exterior remodeling work underway on an Allentown home." },
      { src: "/images/projects/berks-county-ranch-exterior/after/exterior-refresh.jpg", alt: "Ranch-style home exterior refresh in Berks County with crisp black accents." },
      { src: "/images/projects/lehigh-valley-exterior-refresh/after/exterior-after.jpg", alt: "Full exterior refresh with updated shutters and paint in the Lehigh Valley." },
      { src: "/images/projects/bethlehem-exterior-staircase/after/staircase-finished.jpg", alt: "Finished exterior staircase build with landing and rail system in Bethlehem." },
    ],
  },
  {
    slug: "fire-damage-restoration",
    featuredCaseStudySlug: "allentown-fire-damage-interior-rebuild",
    portfolioTag: "fire-damage",
    name: "Fire Damage Restoration",
    short: "Damage assessment, structured rebuild planning, and insurance-ready documentation.",
    description:
      "Emergency stabilization, rebuild planning, and full restoration work after fire damage.",
    intro:
      "After a fire, you need a clear path forward — not more confusion. We start with a damage assessment and safety review, then build a structured reconstruction plan with documented scope for insurance. You get consistent communication through every phase of the rebuild so you always know what is happening and what comes next.",
    cta: "Call for Immediate Help",
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
      {
        q: "How do you support the insurance side of a fire rebuild?",
        a: "We do not negotiate on your behalf, but we supply clear scope write-ups, photos, and cost detail so adjusters can review the work fairly.",
      },
      {
        q: "How quickly can you respond after a fire?",
        a: "Call as soon as you can. We prioritize stabilization and same-day phone or on-site contact when the situation is active.",
      },
    ],
    image: {
      src: "/images/projects/fire-damage-documentation/after/14-img_8459.jpg",
      alt: "Active interior rebuild of a fire-damaged home — exposed framing, rough-in electrical, and restoration in progress.",
    },
    gallery: [
      { src: "/images/projects/fireplace-construction-project/after/bathroom-tile-in-progress.jpg", alt: "Interior rebuild work in progress during a fire-damage restoration project." },
      { src: "/images/projects/fireplace-construction-project/after/fireplace-hearth-finished.jpg", alt: "Completed interior finishes after restoration and rebuild work." },
    ],
  },
  {
    slug: "water-damage-restoration",
    portfolioTag: "water-damage",
    name: "Water Damage Restoration",
    short: "Fast damage assessment, structured rebuild, and insurance-ready documentation.",
    description:
      "Water-damage rebuild services for drywall, flooring, trim, and affected finished spaces.",
    intro:
      "Water damage gets worse the longer you wait. Call us to start with a damage assessment — we identify what is affected, map the rebuild scope, and document everything for insurance if needed. From there, we handle the full restoration: drywall, flooring, trim, and finishes, with clear communication at every stage so you know exactly where things stand.",
    cta: "Call for Immediate Help",
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
      {
        q: "Can we upgrade finishes while you are already replacing damaged areas?",
        a: "Often yes — if drywall or flooring is coming out anyway, it can be the right time to improve materials or layout. We lay out options so you can decide.",
      },
      {
        q: "What if more damage shows up after demo?",
        a: "We document it, tell you right away, and adjust the plan. For claim work we update written scope so your adjuster sees the full picture.",
      },
    ],
    image: {
      src: "",
      alt: "",
    },
    gallery: [],
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
      {
        q: "Can you guarantee my claim gets approved?",
        a: "No contractor can promise that. We focus on thorough documentation, scope clarity, and photos so the file is easy for an adjuster to evaluate.",
      },
      {
        q: "Should I call before or after I file?",
        a: "Either. Early calls help with damage documentation; if you have already filed, we support scope and rebuild planning from there.",
      },
    ],
    image: {
      src: "/images/projects/fireplace-construction-project/after/fireplace-hearth-finished.jpg",
      alt: "Insurance-supported interior repair and finish restoration project.",
    },
    gallery: [
      { src: "/images/projects/fireplace-construction-project/after/bathroom-tile-in-progress.jpg", alt: "Repair-in-progress detail from insurance-supported project." },
    ],
  },
];

export const primaryServices = services.filter((service) => service.slug !== "insurance-claims");

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
