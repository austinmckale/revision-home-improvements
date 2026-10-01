import { insuranceClaimsClarification } from "@/content/restoration";

export const exampleScopeExplanation =
  "A sample scope to help you plan. Your written proposal will reflect your home, priorities and existing conditions.";

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
  /** Hypothetical planning content; never use as project evidence. */
  authoritySnapshot?: {
    title: string;
    summary: string;
    scope: string[];
    compliance: string;
    note: string;
  };
  image: {
    src: string;
    alt: string;
    caption?: string;
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
    short: "Layout, cabinets, countertops, and finishes planned around your daily life.",
    description: "Full kitchen renovations including layout updates, cabinets, countertops, lighting, and finishes.",
    intro:
      "Kitchen remodels touch layout, cabinets, countertops, electrical, and plumbing, all in the room you use most. We coordinate materials before demo, keep disruption short, and give you a written scope before work begins.",
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
    outcomes: [
      "Better traffic flow and work zones",
      "Durable finish selections",
      "Higher resale and day-to-day usability",
    ],
    process: [
      "Discovery call and photo review",
      "In-home scope and estimate",
      "Material coordination and schedule lock",
      "Build execution and final walkthrough",
    ],
    faqs: [
      {
        q: "Can you remodel my kitchen in phases?",
        a: "Yes. We can break the project into stages (for example cabinets and countertops first, then flooring or lighting later) so cost and disruption are easier to manage.",
      },
      {
        q: "Will I still be able to use my kitchen during the remodel?",
        a: "It depends on scope. Full gut jobs usually mean a temporary setup for a few weeks; smaller updates can often leave part of the kitchen usable. We plan that with you before work starts.",
      },
    ],
    authoritySnapshot: {
      title: "Kitchen gut and rebuild",
      summary:
        "An example scope for an occupied home might combine layout changes, cabinetry, countertops, electrical updates, and coordinated finish work.",
      scope: [
        "Plan demolition and any soffit removal around the proposed sight lines and existing systems",
        "Review sink, range, refrigerator, prep-counter, and storage positions before confirming a revised layout",
        "Allow for cabinet scribe rails and filler strips where walls or ceilings are out of square",
        "Review appliance circuit requirements and any electrical changes before cabinet installation",
        "Template countertops after cabinets are set, with sink and cooktop cutouts checked against the selected products",
        "Sequence backsplash installation after countertop placement for clean edge transitions",
        "Plan flooring and transitions around cabinetry, moisture conditions, and the flooring manufacturer’s requirements",
        "Protect adjacent occupied spaces and plan dust control for demolition and drywall work",
      ],
      compliance:
        "Confirm applicable electrical and plumbing permits and inspections when the actual scope is defined.",
      note: "Actual scope depends on the layout, existing conditions, and finish selections.",
    },
    image: {
      src: "/images/projects/blue-kitchen-cabinet-counters/after/05-blue-kitchen-cabinets-finished-2.jpg",
      alt: "Kitchen with blue cabinets and light countertops.",
    },
    gallery: [
      {
        src: "/images/projects/blue-kitchen-cabinet-counters/after/04-blue-kitchen-cabinets-done.jpg",
        alt: "Blue kitchen cabinetry and light countertops.",
      },
      {
        src: "/images/projects/blue-kitchen-cabinet-counters/after/01-blue-kitchen-2.jpg",
        alt: "Updated kitchen overview with blue cabinet finish.",
      },
      {
        src: "/images/projects/blue-kitchen-cabinet-counters/after/03-blue-kitchen-cabinets-1.jpg",
        alt: "Cabinet and counter detail.",
      },
    ],
  },
  {
    slug: "bathroom-remodeling",
    featuredCaseStudySlug: "bethlehem-bathroom-refresh",
    name: "Bathroom Remodeling",
    short: "Bathrooms built right: tile, waterproofing, fixtures, and finishes you can count on.",
    description: "Bathroom upgrades with improved storage, tilework, fixtures, and clean modern finishes.",
    intro:
      "A bathroom remodel touches plumbing, waterproofing, tile, electrical, and finishes, all in a space your household uses every day. Plan wet-zone assemblies, ventilation, work-zone protection, and temporary access before construction begins. You get a written scope before we start and consistent updates until the final walkthrough.",
    cta: "Get My Bathroom Quote",
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
    process: [
      "Initial needs review",
      "Measurement and scope confirmation",
      "Fixture/tile planning",
      "Build and quality walkthrough",
    ],
    faqs: [
      {
        q: "Can you work with my existing plumbing layout?",
        a: "Usually yes. Moving drains or supplies adds cost and time; we tell you upfront whether keeping the current layout is the better value for the result you want.",
      },
      {
        q: "Do you handle waterproofing?",
        a: "Yes. Proper waterproofing behind tile and at the shower base is critical; we do not shortcut wet-zone assemblies.",
      },
      {
        q: "Do you take on commercial restroom refresh projects?",
        a: "Selectively, when the scope matches our bathroom remodeling work: durable finishes, fixture areas, and layouts suited to higher-traffic use.",
      },
    ],
    authoritySnapshot: {
      title: "Bathroom gut and rebuild",
      summary:
        "An example bathroom scope may include tear-out, repairs to moisture-damaged materials, waterproofing, plumbing changes, tile, and finish work.",
      scope: [
        "Plan removal of tile, drywall, vanity, and fixtures where a full tear-out is needed",
        "Inspect the subfloor around the toilet flange and replace damaged sections if found",
        "Select a shower-pan and waterproofing system, such as Schluter Kerdi, suited to the assembly and installation requirements",
        "Review supply-line routing, valve placement, and any drain repairs revealed during demolition",
        "Plan an exhaust duct route to the exterior and insulation where required to control condensation",
        "Select floor-tile underlayment, such as Ditra, to suit the substrate and coordinate the shower threshold",
        "Fit the vanity to the wall conditions and coordinate plumbing trim with the countertop cutout",
        "Sequence trim, paint, and silicone detailing after tile and fixture work",
      ],
      compliance: "Confirm plumbing inspection and ventilation requirements for the actual design and location.",
      note: "Actual scope depends on the layout, existing conditions, and finish selections.",
    },
    image: {
      src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
      alt: "Bathroom with a white shower enclosure, dark frame, and gray vanity.",
    },
    gallery: [
      {
        src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-door-open.jpg",
        alt: "Bathroom doorway and vanity.",
      },
      {
        src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
        alt: "Bathroom shower and vanity.",
      },
      {
        src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-finished-shower-detail.jpg",
        alt: "Shower fixtures and trim detail.",
      },
      {
        src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-shelves-corner.jpg",
        alt: "Bathroom shelving and storage detail.",
      },
    ],
  },
  {
    slug: "basement-finishing",
    featuredCaseStudySlug: "lehigh-valley-basement-finish-and-detail",
    portfolioTag: "basement-finishing",
    name: "Basement Finishing",
    short: "Turn your basement into space you actually use.",
    description: "Basement finishing and remodeling for family rooms, offices, guest spaces, and storage zones.",
    intro:
      "Most basements sit unused because they are dark, awkward, or not organized around how the household needs to use the space. We review existing conditions, utility access, and the intended room layout before defining a finish scope that feels connected to the rest of the home.",
    cta: "Request a Basement Quote",
    bullets: ["Framing and drywall", "Flooring and trim", "Moisture-aware planning"],
    whatIncluded: [
      "Basement layout planning for multi-use living",
      "Framing, drywall, and finish carpentry",
      "Lighting and comfort-focused room setup",
      "Review of egress, insulation, electrical, ceiling, and HVAC needs tied to the intended use",
      "Storage integration and utility-area planning",
    ],
    qualityFactors: [
      "Existing moisture conditions reviewed before finish materials are selected",
      "Lighting and ceiling planning around the room layout and utilities",
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
      "Scope review for existing conditions and required specialty work",
      "Framing/electrical/mechanical coordination",
      "Finish material installation and final punch-list completion",
    ],
    faqs: [
      {
        q: "What about moisture or water in the basement?",
        a: "Existing conditions should be reviewed before finishing. Active water issues need to be resolved before finish work begins, and the final scope should account for below-grade moisture risk, ventilation, and material selection.",
      },
      {
        q: "Can I add a bathroom in the basement?",
        a: "Often yes. An existing rough-in makes it straightforward; without one, we walk through options and cost during the estimate.",
      },
    ],
    image: {
      src: "/images/projects/lehigh-valley-basement-theater/after/media-room-big-screen.jpg",
      alt: "Finished basement media room with large screen.",
    },
    gallery: [
      {
        src: "/images/projects/lehigh-valley-basement-theater/after/media-room-big-screen.jpg",
        alt: "Finished basement media room with large screen.",
      },
      {
        src: "/images/projects/lehigh-valley-basement-theater/after/epoxy-floor-big-screen.jpg",
        alt: "Reflective patterned basement floor finish.",
      },
      {
        src: "/images/projects/lehigh-valley-basement-theater/after/wide-view-layout.jpg",
        alt: "Wide basement view showing finished layout and floor detail.",
      },
      {
        src: "/images/projects/lehigh-valley-basement-theater/after/wide-angle-room-flow.jpg",
        alt: "Basement wide-angle finish showing completed room flow.",
      },
    ],
  },
  {
    slug: "drywall-installation-repair",
    portfolioTag: "drywall",
    name: "Drywall Installation and Repair",
    short: "Walls and ceilings that look like new.",
    description: "Drywall hanging, patching, skim coating, and paint-ready finishing for remodel and restoration jobs.",
    intro:
      "Whether you need a full room of drywall hung or a few patches blended invisibly, we get your walls smooth, flat, and ready for paint. No visible seams, no bumps, no shortcuts.",
    cta: "Request a drywall quote",
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
    process: [
      "Damage and substrate review",
      "Board install or repair patching",
      "Tape/mud/sand cycles",
      "Final finish inspection",
    ],
    faqs: [
      {
        q: "Will the repair be visible after painting?",
        a: "It should not be. We run tape, mud, and sand cycles until the repair blends into the surrounding wall; we match existing texture when needed.",
      },
      {
        q: "Can drywall be part of a larger remodel?",
        a: "Yes. It is usually in scope for kitchens, baths, and basements, handled as part of the same job rather than pieced out.",
      },
    ],
    authoritySnapshot: {
      title: "Multi-room drywall repair and finish preparation",
      summary:
        "An example scope for an occupied home may include repairs across a hallway and bedrooms, patch blending, texture matching, and dust control.",
      scope: [
        "Cut damaged sections back to sound material and use replacement drywall of the appropriate thickness",
        "Tape, mud, and sand repaired areas to blend with the surrounding wall plane",
        "Match existing texture where needed before painting",
        "Protect floors, isolate work areas, and manage sanding dust at the tool",
        "Prepare corner bead, fastener spots, and seams for the agreed paint finish",
      ],
      compliance:
        "Agree on the required finish level, such as Level 4, for the planned surface and lighting conditions.",
      note: "Actual scope depends on the damage extent and finish requirements.",
    },
    image: {
      src: "/images/projects/ryan-bedroom/after/01-interior-refresh-blue-completed.jpg",
      alt: "Bedroom interior with blue walls and a light ceiling.",
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
        alt: "Interior room with work-area protection and unfinished surfaces.",
      },
    ],
  },
  {
    slug: "flooring-installation",
    featuredCaseStudySlug: "allentown-flooring-replacement-upgrade",
    portfolioTag: "flooring",
    name: "Flooring Installation",
    short: "Floors that look great and hold up to real life.",
    description: "Install and replace flooring systems that fit your budget, style, and daily wear requirements.",
    intro:
      "Proper subfloor preparation is critical to a durable, even finished floor. We level, prep, and install with tight transitions between rooms so your floors look and feel right for years.",
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
    process: [
      "Material and use-case review",
      "Subfloor prep and leveling",
      "Install and trim detailing",
      "Final walkthrough and care guidance",
    ],
    faqs: [
      {
        q: "Do I need to clear the room completely?",
        a: "Clear rooms get the best result. We tell you exactly what should be moved before we start; in tight situations we can sometimes work around partial clearing.",
      },
      {
        q: "How do you choose materials for each space?",
        a: "We match product to room use and moisture risk (for example LVP where water matters, hardwood or engineered wood where it fits your goals) and walk through tradeoffs at the estimate.",
      },
    ],
    authoritySnapshot: {
      title: "Multi-room flooring replacement",
      summary:
        "An example flooring scope may cover a living room, hallway, and bedrooms, with subfloor corrections before new finish materials are installed.",
      scope: [
        "Remove existing flooring and prepare the substrate for the selected replacement material",
        "Check subfloor flatness and plan corrections for high spots and dips to meet product requirements",
        "Assess loose or squeaking panels and specify appropriate repairs and fasteners",
        "Test moisture conditions before selecting underlayment or deciding whether a vapor-control layer is required",
        "Plan LVP joint layout and expansion clearances according to the selected product",
        "Coordinate door-jamb and casing details so the flooring fits cleanly",
        "Plan transitions and reducers where floor materials or heights change",
        "Reinstall and finish base trim as included in the agreed scope",
      ],
      compliance:
        "Confirm manufacturer requirements for flatness, moisture, underlayment, expansion, and acclimation before installation.",
      note: "Actual scope depends on subfloor condition, room count, and material choice.",
    },
    image: {
      src: "/images/projects/allentown-flooring-replacement/after/living-room-finished.jpg",
      alt: "Light wood-look flooring in a furnished living area.",
    },
    gallery: [
      {
        src: "/images/projects/allentown-flooring-replacement/after/living-room-finished.jpg",
        alt: "Light wood-look flooring.",
      },
      {
        src: "/images/projects/allentown-flooring-replacement/after/fireplace-wall-renovation.jpg",
        alt: "Living area with flooring and trim along a fireplace wall.",
      },
      {
        src: "/images/projects/bethlehem-interior-flooring-refresh/after/flooring-refresh.jpg",
        alt: "Interior room showing wood-look flooring, wall finishes, and ceiling lighting.",
      },
    ],
  },
  {
    slug: "paver-installation",
    featuredCaseStudySlug: "reading-paver-patio-buildout",
    portfolioTag: "paver-installation",
    name: "Paver Installation",
    short: "Paver patios, substantial renovations, and connected outdoor living areas.",
    description:
      "Paver patio installation, substantial patio renovation, pool surrounds, and connected outdoor-living projects.",
    intro:
      "Paver patio installation starts with the site, not just the surface. We review the layout, access, existing grade, drainage path, and edge conditions before defining the work for a new patio, substantial renovation, pool surround, or connected outdoor-living project.",
    cta: "Request a paver quote",
    bullets: ["Patios and pool surrounds", "Substantial patio renovation", "Base preparation and grading"],
    whatIncluded: [
      "Site layout and drainage-aware planning for patios, pool surrounds, and connected walkways",
      "Excavation depth and base preparation matched to site and soil conditions",
      "Consistent bedding layer, paver installation, appropriate edge restraint, and joint material matched to the selected system",
      "Final grading, transitions, and cleanup",
    ],
    qualityFactors: [
      "Prepared and compacted aggregate base, with geotextile where site conditions call for it",
      "Drainage pitched away from structures before the finished surface is set",
      "Edge restraint and transitions appropriate to the installation",
    ],
    pricingFactors: [
      "Site access and excavation requirements",
      "Paver product type and pattern complexity",
      "Drainage and grading corrections needed",
    ],
    outcomes: ["Improved outdoor usability", "Better drainage and durability", "Stronger curb appeal"],
    process: [
      "Site and grade review",
      "Layout and material planning",
      "Base prep and install",
      "Compaction and final finish",
    ],
    faqs: [
      {
        q: "What actually makes a paver patio last?",
        a: "The preparation below and around the surface matters. Site conditions, base preparation, drainage, grading, and edge restraint all affect the scope, so they should be reviewed before a patio layout is finalized.",
      },
      {
        q: "Can you build on a sloped yard?",
        a: "A sloped site may still support a patio, but grading, drainage, access, and the required preparation need to be evaluated before the scope is defined.",
      },
      {
        q: "Do you work on pool surrounds?",
        a: "Yes. Pool-surround installation or renovation can be part of the work when the site, layout, and surrounding hardscape call for a substantial scope.",
      },
    ],
    image: {
      src: "/images/projects/frontier-patio-gable-roof/after/finished-overview.jpg",
      alt: "Finished patio, pavilion roof, and hardscape outdoor living space.",
    },
    gallery: [
      {
        src: "/images/projects/frontier-patio-gable-roof/after/finished-overview.jpg",
        alt: "Finished patio, pavilion roof, and hardscape outdoor living space.",
      },
      {
        src: "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg",
        alt: "Outdoor living area with paver patio and pavilion roof detail.",
      },
      {
        src: "/images/projects/frontier-patio-gable-roof/after/angle-2.jpg",
        alt: "Alternate view of finished patio and integrated pavilion structure.",
      },
      {
        src: "/images/projects/frontier-patio-gable-roof/after/finished-alt.jpg",
        alt: "Finished hardscape and pavilion from another angle.",
      },
      {
        src: "/images/projects/frontier-patio-gable-roof/process/patio-construction.jpg",
        alt: "Patio and pavilion structure during construction.",
      },
    ],
  },
  {
    slug: "exterior-remodeling",
    featuredCaseStudySlug: "allentown-exterior-log-home-refresh",
    name: "Exterior Remodeling",
    short: "Exterior updates that improve curb appeal, access, and weather resistance.",
    description: "Exterior remodeling for siding, trim, windows, stairs, garage facades, and weather-worn elevations.",
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
    outcomes: [
      "Stronger curb appeal",
      "Safer and cleaner exterior access",
      "Better protection for weather-exposed surfaces",
    ],
    process: [
      "Site review and photo assessment",
      "Access and scope planning",
      "Exterior prep and improvement work",
      "Final detail walk and touch-ups",
    ],
    faqs: [
      {
        q: "Do you work on second-story or hard-to-reach elevations?",
        a: "Yes. Access is planned with ladders or lifts as needed so upper areas are done safely and finishes stay consistent.",
      },
      {
        q: "Can we improve curb appeal without residing the whole house?",
        a: "Often yes. Targeted siding, trim, window, or facade updates can sharpen the look without a full tear-off.",
      },
    ],
    authoritySnapshot: {
      title: "Exterior elevation and finish refresh",
      summary:
        "An example exterior scope may address weathered trim, failed joints, and cladding transitions, with inspection of concealed materials as repairs proceed.",
      scope: [
        "Remove damaged siding and trim where needed to inspect and repair underlying sheathing",
        "Check weather-barrier overlaps and drainage continuity at repair areas",
        "Coordinate window and door head flashing with the weather barrier",
        "Install replacement siding, such as fiber cement, to the selected product’s spacing and fastening requirements",
        "Review soffit, fascia, drip-edge, and gutter transitions for water management",
        "Seal trim joints only where the assembly and product requirements call for it",
        "Plan appropriate access equipment and protection for landscaping near the work",
        "Sequence exterior paint after preparation and the required sealant cure time",
      ],
      compliance:
        "Confirm flashing, weather-barrier, and manufacturer installation requirements for the selected assembly.",
      note: "Actual scope depends on existing conditions, elevation count, and material selections.",
    },
    image: {
      src: "/images/projects/allentown-exterior-log-home/after/front-finished.jpg",
      alt: "Log-style house exterior.",
    },
    gallery: [
      {
        src: "/images/projects/allentown-exterior-log-home/after/front-finished.jpg",
        alt: "Log-style house exterior with dark trim and garage doors.",
      },
      {
        src: "/images/projects/allentown-exterior-log-home/after/garage-elevation.jpg",
        alt: "Garage-side exterior elevation of a log-style house.",
      },
      {
        src: "/images/projects/allentown-exterior-log-home/process/lift-access-work.jpg",
        alt: "Lift equipment beside a log-style house exterior.",
      },
      {
        src: "/images/projects/berks-county-ranch-exterior/after/exterior-refresh.jpg",
        alt: "Ranch-style house exterior with dark accents.",
      },
      {
        src: "/images/projects/lehigh-valley-exterior-refresh/after/exterior-after.jpg",
        alt: "House exterior with shutters and light wall finishes.",
      },
      {
        src: "/images/projects/bethlehem-exterior-staircase/after/staircase-finished.jpg",
        alt: "Exterior staircase with landing and railings.",
      },
    ],
  },
  {
    slug: "fire-damage-restoration",
    portfolioTag: "fire-damage",
    name: "Fire Damage Restoration",
    short: "Reconstruction planning, affected finish repairs, and construction-scope documentation.",
    description: "Fire-damage reconstruction planning and repairs to affected interior finishes.",
    intro:
      "After a fire, reconstruction should follow any required emergency response, safety clearance, and specialist cleanup. Contact RHI Pros to discuss affected rooms, repair priorities, and current availability. The written construction scope should identify the work included, any separate specialist responsibilities, and the sequence for rebuilding drywall, flooring, trim, and finishes.",
    cta: "Discuss Fire-Damage Repairs",
    bullets: ["Reconstruction planning", "Affected finish repairs", "Construction-scope documentation"],
    whatIncluded: [
      "Affected-room review for a proposed construction scope",
      "Reconstruction scope for affected structural and finish areas",
      "Coordination for staged rebuild work",
      "Documentation support for claim-related communication",
    ],
    qualityFactors: [
      "Documented scope and a process for reviewing concealed conditions",
      "Sequencing discipline across trades",
      "Clear communication through each rebuild phase",
    ],
    pricingFactors: [
      "Extent of structural and finish damage",
      "Size of affected area and rebuild depth",
      "Special materials or phased reconstruction requirements",
    ],
    outcomes: ["Defined repair priorities", "Structured rebuild scope", "Documented construction work"],
    process: [
      "Confirm site access and any specialist work needed before reconstruction",
      "Affected-room review and construction-scope planning",
      "Rebuild sequence and materials",
      "Final quality and handoff",
    ],
    faqs: [
      {
        q: "How do you support the insurance side of a fire rebuild?",
        a: insuranceClaimsClarification,
      },
      {
        q: "How quickly can you respond after a fire?",
        a: "Call to confirm current availability and whether your repair scope is a fit. A quote request does not confirm an emergency dispatch or same-day visit. Emergency response, safety clearance, and any specialist cleanup should be addressed before reconstruction begins.",
      },
    ],
    authoritySnapshot: {
      title: "Interior fire-damage rebuild",
      summary:
        "An illustrative fire-loss reconstruction plan separates emergency response and specialist cleanup from the subsequent demolition, repairs, and finish work. Confirm who performs each part before work starts.",
      scope: [
        "Confirm that appropriate professionals have addressed structural and utility safety and established access for construction",
        "Plan selective removal of damaged drywall, trim, and insulation, separating salvageable materials where appropriate",
        "Identify whether smoke, soot, or odor cleanup requires a separate specialist scope",
        "Request available drying records for suppression-water damage and define readiness checks before enclosure",
        "Confirm any required structural assessment and repair design before specifying framing changes",
        "Sequence rough electrical and mechanical work before drywall, paint, and trim",
        "Organize photos by room and stage to support construction-scope communication with the adjuster",
        "Review completed finish work and identify any unresolved specialist-cleanup items before closeout",
      ],
      compliance:
        "Confirm required rough-in inspections before closing walls and document structural repairs for scope review.",
      note: "Actual scope depends on the damage extent, affected systems, and work required after assessment.",
    },
    image: {
      src: "/images/projects/fire-damage-documentation/after/37-img_8934.jpg",
      alt: "House with charred upper siding and boarded openings in snow.",
    },
    gallery: [],
    processGallery: {
      title: "Damage & repair details",
      intro: "Exterior conditions that affect access, safety and the reconstruction scope.",
      images: [
        {
          src: "/images/projects/fire-damage-documentation/after/36-img_8933.jpg",
          alt: "Snow-covered exterior with boarded windows and a brick chimney.",
          caption: "Boarded openings and exterior access",
        },
        {
          src: "/images/projects/fire-damage-documentation/after/37-img_8934.jpg",
          alt: "Damaged upper exterior above a stone-faced lower story.",
          caption: "Damage at the upper exterior",
        },
        {
          src: "/images/projects/fire-damage-documentation/after/38-img_8935.jpg",
          alt: "Side view of a damaged house with boarded windows in snow.",
          caption: "Side elevation and site conditions",
        },
      ],
    },
  },
  {
    slug: "water-damage-restoration",
    portfolioTag: "water-damage",
    name: "Water Damage Restoration",
    short: "Water-damage reconstruction planning and repairs to affected interior finishes.",
    description: "Water-damage rebuild services for drywall, flooring, trim, and affected finished spaces.",
    intro:
      "Bring your space back together after water damage. Once the water source, drying and cleanup needs have been addressed, we help plan repairs to drywall, flooring, trim and interior finishes.",
    cta: "Discuss Water-Damage Repairs",
    bullets: ["Affected-room planning", "Drywall and finish repairs", "Construction-scope documentation"],
    whatIncluded: [
      "Affected-area review for a proposed reconstruction scope",
      "Drywall, flooring, trim, and finish restoration",
      "Phased work to return spaces to functional condition",
      "Documentation support for claim communication",
    ],
    qualityFactors: [
      "Review of affected assemblies and any available mitigation records",
      "Clean sequencing from repair to finish restoration",
      "Durable material choices in previously affected areas",
    ],
    pricingFactors: [
      "Extent and depth of water intrusion damage",
      "Number of finishes needing replacement",
      "Project phasing and access constraints",
    ],
    outcomes: ["Defined reconstruction scope", "Coordinated rebuild sequencing", "Documented finish repairs"],
    process: [
      "Existing conditions and reconstruction scope",
      "Material removal/repair planning",
      "Rebuild and finish restoration",
      "Final review and cleanup",
    ],
    faqs: [
      {
        q: "Can we upgrade finishes while you are already replacing damaged areas?",
        a: "Often yes. If drywall or flooring is coming out anyway, it can be the right time to improve materials or layout. We lay out options so you can decide.",
      },
      {
        q: "What if more damage shows up after demo?",
        a: "We document it, tell you right away, and adjust the plan. For claim work we update written scope so your adjuster sees the full picture.",
      },
    ],
    authoritySnapshot: {
      title: "Planning an interior rebuild after water damage",
      summary:
        "An illustrative water-loss scenario could affect ceilings, walls, and flooring. Reconstruction planning should establish which mitigation steps are complete, what conditions remain, and who is responsible for each part of the work.",
      scope: [
        "Request available affected-area assessments and drying records from the mitigation provider",
        "Confirm responsibility for any extraction, drying, or specialist cleanup still needed",
        "Define selective removal and replacement of damaged drywall, trim, and insulation in the construction scope",
        "Agree on the documentation and substrate-readiness checks needed before new materials are installed",
        "Resolve any remaining moisture or contamination concerns with an appropriate specialist before enclosure",
        "Sequence subfloor repairs, drywall, paint, and trim around dry, prepared substrates",
        "Keep construction photos, written repair details, and approved scope changes together for homeowner and claim communication",
      ],
      compliance:
        "Confirm applicable construction requirements and readiness for reconstruction; the written scope should identify any separate mitigation or remediation responsibilities.",
      note: "Actual scope depends on the water source, duration, affected materials, and assessment of the site.",
    },
    image: {
      src: "/images/service-illustrations/water-damage-interior.png",
      alt: "AI-generated illustration of a water-damaged room with stained walls, exposed lower framing and damaged flooring.",
      caption: "AI-generated illustration of water damage",
    },
    gallery: [],
  },
  {
    slug: "insurance-claims",
    portfolioTag: "insurance-restoration",
    name: "Insurance Claims Assistance",
    short: "Help navigating insurance-related repairs.",
    description: "Support for homeowners through claim-related repairs with clear scopes and communication.",
    intro:
      "For insurance-related construction work, a written repair scope, photos, cost details, and approved changes help explain the proposed work. RHI Pros supports construction planning and documentation. Coverage and claim decisions remain with your insurer and the people authorized to represent you.",
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
    outcomes: [
      "Clearer construction-scope documentation",
      "Coordinated repair planning",
      "Reduced friction in project communication",
    ],
    process: [
      "Damage and claim context review",
      "Scope drafting and documentation",
      "Repair planning and sequencing",
      "Project execution updates",
    ],
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
      src: "",
      alt: "",
    },
    gallery: [],
  },
];

export const primaryServices = services.filter((service) => service.slug !== "insurance-claims");

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
