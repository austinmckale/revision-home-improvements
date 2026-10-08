import { insuranceClaimsClarification } from "@/content/restoration";

export const exampleScopeExplanation =
  "An example to help you plan. Your proposal will reflect your home, your priorities and what we find on site.";

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
    short: "Layout, cabinetry, counters and lighting, planned around how you cook and gather.",
    description: "Complete kitchen remodels: layout, cabinetry, countertops, lighting and finishes.",
    intro:
      "The kitchen works harder than any room in the house. We plan the layout, cabinetry, counters and lighting together with the plumbing and electrical behind them, order materials before demolition, and keep the time without a kitchen as short as we can.",
    cta: "Request a kitchen quote",
    bullets: ["Layout planning", "Cabinets and countertops", "Lighting and finishes"],
    whatIncluded: [
      "Layout planning for prep, cooking and storage",
      "Cabinets, countertops, backsplash and fixtures",
      "Lighting and electrical updates for the new layout",
      "Trim, paint and finishing details",
    ],
    qualityFactors: [
      "Level, aligned cabinets with doors and drawers adjusted to close evenly",
      "Tight countertop seams and clean edges",
      "Clean transitions where flooring, trim and cabinets meet",
    ],
    pricingFactors: [
      "Cabinet line and level of customization",
      "Countertop material and edge profile",
      "Moving plumbing or electrical for a new layout",
    ],
    outcomes: ["Better flow between work zones", "Finishes chosen to last", "A kitchen that is easier to use every day"],
    process: [
      "Phone conversation and photo review",
      "In-home visit and proposal",
      "Materials ordered and schedule set",
      "Build and final walkthrough",
    ],
    faqs: [
      {
        q: "Can you remodel my kitchen in phases?",
        a: "Yes. A kitchen can be done in stages, such as cabinets and countertops first and flooring or lighting later, to spread out the cost and the disruption.",
      },
      {
        q: "Will I still be able to use my kitchen during the remodel?",
        a: "It depends on the project. A full remodel usually means a temporary kitchen setup for a few weeks; smaller updates often leave part of the room usable. We plan this with you before work starts.",
      },
    ],
    authoritySnapshot: {
      title: "A full kitchen remodel",
      summary:
        "In an occupied home, a full remodel brings together layout changes, cabinetry, countertops, electrical updates and finish work. Here is how the pieces fit.",
      scope: [
        "Plan demolition and any soffit removal around new sight lines and existing systems",
        "Settle sink, range, refrigerator, prep-counter and storage positions before the layout is final",
        "Allow for scribe rails and fillers where walls or ceilings are out of square",
        "Confirm appliance circuits and any electrical changes before cabinets go in",
        "Template countertops once cabinets are set, checking sink and cooktop cutouts against the chosen products",
        "Install the backsplash after the countertops for clean edges",
        "Plan flooring and transitions around the cabinetry, moisture conditions and the manufacturer’s requirements",
        "Protect the rest of the home and control dust during demolition and drywall work",
      ],
      compliance: "Electrical and plumbing permits and inspections are confirmed once the design is set.",
      note: "Every kitchen is different. Your proposal reflects your layout, existing conditions and selections.",
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
    short: "Showers, tile, vanities and fixtures, with the waterproofing done right underneath.",
    description: "Bathroom remodels with new showers, tile, vanities, storage, lighting and fixtures.",
    intro:
      "A bathroom fits plumbing, waterproofing, tile, ventilation and electrical into a small room your household uses every day. We plan the shower, the waterproofing behind the tile, the ventilation and how you will get by during the work before anything starts, then keep you updated through the final walkthrough.",
    cta: "Request a bathroom quote",
    bullets: ["Showers and vanities", "Tile and waterproofing", "Smarter layouts"],
    whatIncluded: [
      "Shower and tub updates with new fixtures",
      "Vanity, storage, mirror and lighting",
      "Tile with proper waterproofing in wet areas",
      "Ventilation to keep moisture under control",
    ],
    qualityFactors: [
      "Waterproofing and correct slope in the shower",
      "Consistent tile layout and clean grout lines",
      "Ventilation planned to prevent long-term moisture problems",
    ],
    pricingFactors: [
      "Tile and fixture selections",
      "Keeping the current layout or reconfiguring the shower",
      "Subfloor and wall conditions found after demolition",
    ],
    outcomes: ["Better storage and everyday use", "Moisture-smart construction", "A clean, updated look"],
    process: [
      "Conversation about your needs",
      "Measurements and proposal",
      "Fixture and tile selections",
      "Build and final walkthrough",
    ],
    faqs: [
      {
        q: "Can you work with my existing plumbing layout?",
        a: "Usually, yes. Moving drains or supply lines adds cost and time, and we will tell you up front whether keeping the current layout is the better value.",
      },
      {
        q: "Do you handle waterproofing?",
        a: "Yes. Waterproofing behind the tile and at the shower base is where a bathroom succeeds or fails, and we never cut corners there.",
      },
      {
        q: "Do you take on commercial restrooms?",
        a: "Selectively, when the work matches what we do in homes: durable finishes, fixtures and layouts suited to heavier use.",
      },
    ],
    authoritySnapshot: {
      title: "A full bathroom remodel",
      summary:
        "A full remodel usually includes tear-out, repairs to any moisture-damaged materials, waterproofing, plumbing changes, tile and finish work.",
      scope: [
        "Remove tile, drywall, vanity and fixtures where a full tear-out is needed",
        "Inspect the subfloor around the toilet flange and replace any damaged sections",
        "Choose a shower pan and waterproofing system, such as Schluter Kerdi, suited to the assembly",
        "Review supply lines, valve placement and any drain repairs revealed during demolition",
        "Route the exhaust fan to the exterior, insulated where needed to prevent condensation",
        "Choose a tile underlayment, such as Ditra, suited to the subfloor, and plan the shower threshold",
        "Fit the vanity to the walls and coordinate plumbing trim with the countertop cutout",
        "Finish with trim, paint and silicone details after tile and fixtures are in",
      ],
      compliance: "Plumbing inspections and ventilation requirements are confirmed for the final design.",
      note: "Every bathroom is different. Your proposal reflects your layout, existing conditions and selections.",
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
    short: "Family rooms, media rooms, offices and guest space, right below your feet.",
    description: "Basement finishing for family rooms, media rooms, offices, guest space and storage.",
    intro:
      "Most basements go unused because they feel dark, awkward or unfinished. We start with moisture, utilities and how you want to use the space, then plan a lower level that feels like part of the house.",
    cta: "Request a basement quote",
    bullets: ["Framing and drywall", "Flooring and trim", "Moisture-smart planning"],
    whatIncluded: [
      "Layout planning for how you will use the space",
      "Framing, drywall and finish carpentry",
      "Lighting and comfort upgrades",
      "Egress, insulation, electrical, ceiling and HVAC needs for the planned rooms",
      "Storage and utility-area planning",
    ],
    qualityFactors: [
      "Moisture conditions checked before materials are chosen",
      "Lighting and ceilings planned around the layout and utilities",
      "Easy access to mechanicals for future service",
    ],
    pricingFactors: [
      "Square footage and number of rooms",
      "Room types and features, such as a media wall or guest suite",
      "Electrical and HVAC changes for comfort",
    ],
    outcomes: ["More usable living space", "Better comfort and lighting", "Flexible rooms for your family"],
    process: [
      "Space planning and site review",
      "Proposal covering existing conditions and any specialty work",
      "Framing, electrical and mechanical work",
      "Finishes and final walkthrough",
    ],
    faqs: [
      {
        q: "What about moisture or water in the basement?",
        a: "Moisture gets a close look before anything is finished. Active water problems must be fixed first, and the plan accounts for ventilation and materials suited to below-grade rooms.",
      },
      {
        q: "Can I add a bathroom in the basement?",
        a: "Often, yes. An existing rough-in makes it simpler; without one, we walk through the options and cost during the estimate.",
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
    short: "Smooth walls and ceilings, from whole rooms to repairs that blend in.",
    description: "Drywall hanging, patching, skim coating and paint-ready finishing for remodels and repairs.",
    intro:
      "Whether it is a full room of new drywall or a few patches that need to disappear, we leave walls and ceilings flat, smooth and ready for paint.",
    cta: "Request a drywall quote",
    bullets: ["New drywall", "Repairs and patching", "Paint-ready finishing"],
    whatIncluded: [
      "New drywall for full walls and ceilings, or panel replacement",
      "Repairs for cracks, holes and water-damaged areas",
      "Taping, finishing and sanding for paint-ready surfaces",
      "Texture matching where needed",
    ],
    qualityFactors: [
      "Flat, smooth surfaces under the final paint",
      "Repairs that blend into the surrounding wall",
      "Clean, consistent corners and seams",
    ],
    pricingFactors: [
      "How much damage there is and how many surfaces",
      "Ceiling height and wall complexity",
      "Texture matching and finish level",
    ],
    outcomes: ["Paint-ready surfaces", "Repairs that blend in", "A faster finish on repair projects"],
    process: ["Damage and wall review", "Hanging or patching", "Taping, finishing and sanding", "Final finish inspection"],
    faqs: [
      {
        q: "Will the repair be visible after painting?",
        a: "It should not be. We tape, finish and sand until the repair blends into the surrounding wall, and match existing texture when needed.",
      },
      {
        q: "Can drywall be part of a larger remodel?",
        a: "Yes. Drywall is part of most kitchen, bathroom and basement projects, handled within the same project rather than pieced out.",
      },
    ],
    authoritySnapshot: {
      title: "Drywall repairs across several rooms",
      summary:
        "In an occupied home, a repair might cover a hallway and bedrooms, with patch blending, texture matching and dust control.",
      scope: [
        "Cut damaged sections back to sound material and replace with drywall of the right thickness",
        "Tape, finish and sand repairs to blend with the surrounding wall",
        "Match existing texture before painting",
        "Protect floors, isolate work areas and capture sanding dust at the tool",
        "Prepare corners, fasteners and seams for the agreed paint finish",
      ],
      compliance: "We agree on the finish level, such as Level 4, for the surface and lighting in each room.",
      note: "Every repair is different. Your proposal reflects the damage and the finish you want.",
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
    short: "LVP, hardwood and engineered wood, installed over a properly prepared floor.",
    description: "Flooring installation and replacement matched to your budget, style and how each room is used.",
    intro:
      "A beautiful floor starts underneath. We level and prepare the subfloor, then install with tight, clean transitions between rooms so your floors look and feel right for years.",
    cta: "Request a flooring quote",
    bullets: ["Subfloor preparation", "Precise installation", "Trim and transitions"],
    whatIncluded: [
      "Removal of the existing flooring",
      "Subfloor preparation, leveling and moisture checks",
      "Installation with clean transitions and thresholds",
      "Trim and cleanup",
    ],
    qualityFactors: [
      "Subfloor preparation, the key to a floor that lasts",
      "Correct expansion gaps and clean transitions",
      "A consistent layout across connected rooms",
    ],
    pricingFactors: [
      "Flooring material and product line",
      "Subfloor repairs needed before installation",
      "Number of rooms, stairs and transitions",
    ],
    outcomes: ["Flatter, quieter floors", "Clean transitions and trim", "A finish that lasts"],
    process: [
      "Material and room-use review",
      "Subfloor preparation and leveling",
      "Installation and trim",
      "Final walkthrough and care tips",
    ],
    faqs: [
      {
        q: "Do I need to clear the room completely?",
        a: "An empty room gives the best result. We will tell you exactly what needs to move before we start, and in tight situations we can sometimes work around furniture.",
      },
      {
        q: "How do you choose materials for each space?",
        a: "We match the product to how the room is used and its moisture risk, such as LVP where water is a concern and hardwood or engineered wood where it suits your goals, and walk through the tradeoffs at the estimate.",
      },
    ],
    authoritySnapshot: {
      title: "New floors across several rooms",
      summary:
        "A multi-room project might cover a living room, hallway and bedrooms, with subfloor corrections before the new floor goes down.",
      scope: [
        "Remove the existing flooring and prepare the subfloor for the new material",
        "Check flatness and correct high spots and dips to meet the product’s requirements",
        "Find loose or squeaking panels and fasten or repair them",
        "Test moisture before choosing an underlayment or deciding whether a vapor barrier is needed",
        "Plan the LVP layout and expansion gaps for the selected product",
        "Undercut door jambs and casings so the flooring fits cleanly",
        "Plan transitions and reducers where materials or heights change",
        "Reinstall and finish base trim as agreed",
      ],
      compliance:
        "Manufacturer requirements for flatness, moisture, underlayment, expansion and acclimation are confirmed before installation.",
      note: "Every floor is different. Your proposal reflects the subfloor, the number of rooms and the material you choose.",
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
    short: "Paver patios, gable-roof pavilions and outdoor rooms, built on a solid base.",
    description:
      "Paver patios, gable-roof pavilions, covered patios, pool surrounds and connected outdoor living spaces.",
    intro:
      "A patio that lasts starts below the surface. We look at the layout, access, grade, drainage and edges first, then build the patio, pavilion or pool surround to suit the site.",
    cta: "Request a patio quote",
    bullets: ["Patios and pool surrounds", "Pavilions and covered patios", "Base preparation and grading"],
    whatIncluded: [
      "Layout and drainage planning for patios, pool surrounds and walkways",
      "Excavation and base preparation suited to your soil and site",
      "Bedding, pavers, edge restraint and joint material for the chosen system",
      "Gable-roof pavilions and covered patios planned with the patio",
      "Final grading, transitions and cleanup",
    ],
    qualityFactors: [
      "A properly compacted aggregate base, with fabric where the site needs it",
      "Drainage pitched away from the house before the surface is set",
      "Edge restraint and transitions suited to the installation",
    ],
    pricingFactors: ["Site access and excavation", "Paver style and pattern", "Drainage and grading corrections"],
    outcomes: ["More usable outdoor space", "Better drainage and durability", "Stronger curb appeal"],
    process: [
      "Site and grade review",
      "Layout and material selection",
      "Base preparation and installation",
      "Compaction and finishing",
    ],
    faqs: [
      {
        q: "What makes a paver patio last?",
        a: "What is underneath it. Base preparation, drainage, grading and edge restraint decide how a patio holds up, so we review them before the layout is final.",
      },
      {
        q: "Can you build on a sloped yard?",
        a: "Often, yes. A sloped yard can still support a patio, but grading, drainage and access need to be evaluated first.",
      },
      {
        q: "Do you build pavilions or covered patios?",
        a: "Yes. We build gable-roof pavilions with the patio, so the footings, posts, roof framing, ceiling and lighting are planned together with the layout and drainage.",
      },
      {
        q: "Do you work on pool surrounds?",
        a: "Yes. We install and renovate pool surrounds as part of larger patio and hardscape projects.",
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
    short: "Siding, trim, windows and stairs that sharpen curb appeal and stand up to weather.",
    description: "Exterior remodeling for siding, trim, windows, stairs, entries and garage facades.",
    intro:
      "Exterior work has to look good and hold up. We plan around access, exposure and durability so siding, trim, windows, stairs and entries stand up to Pennsylvania weather and everyday use.",
    cta: "Request an exterior quote",
    bullets: ["Siding, stairs and trim", "Windows and entries", "Garage and facade updates"],
    whatIncluded: [
      "Siding, trim, window and facade updates",
      "Surface preparation and finishes on weather-exposed walls",
      "Exterior stairs, landings and entries",
      "Safe access for upper stories and hard-to-reach areas",
      "Cleanup and a final walkthrough",
    ],
    qualityFactors: [
      "Thorough surface preparation before finishes",
      "Consistent finish lines across trim, siding, windows and garage",
      "Level stairs and landings with solid railings",
      "Safe access planning for upper-story work",
    ],
    pricingFactors: [
      "Height, access and any lift or scaffolding",
      "How much repair and preparation the surfaces need",
      "How much siding, trim, window, stair and facade work is included",
    ],
    outcomes: ["Stronger curb appeal", "Safer, cleaner access", "Better protection from the weather"],
    process: [
      "Site visit and photo review",
      "Access and project planning",
      "Preparation and exterior work",
      "Final walkthrough and touch-ups",
    ],
    faqs: [
      {
        q: "Do you work on second-story or hard-to-reach areas?",
        a: "Yes. We plan access with ladders or lifts so upper areas are done safely and the finish stays consistent.",
      },
      {
        q: "Can we improve curb appeal without residing the whole house?",
        a: "Often, yes. Targeted siding, trim, window or facade updates can change the look of a home without a full tear-off.",
      },
    ],
    authoritySnapshot: {
      title: "Refreshing an exterior elevation",
      summary:
        "A typical exterior project addresses weathered trim, failed joints and siding transitions, with concealed materials inspected as repairs proceed.",
      scope: [
        "Remove damaged siding and trim to inspect and repair the sheathing underneath",
        "Check weather-barrier overlaps and drainage at repair areas",
        "Flash window and door heads into the weather barrier",
        "Install replacement siding, such as fiber cement, to the manufacturer’s spacing and fastening requirements",
        "Review soffit, fascia, drip edge and gutter transitions for water management",
        "Seal trim joints only where the product and assembly call for it",
        "Plan access equipment and protect landscaping near the work",
        "Paint after preparation and once sealants have cured",
      ],
      compliance:
        "Flashing, weather-barrier and manufacturer installation requirements are confirmed for the chosen materials.",
      note: "Every exterior is different. Your proposal reflects existing conditions, the elevations involved and your selections.",
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
    short: "Rebuilding fire-damaged rooms, from drywall and flooring to the final finishes.",
    description: "Fire damage reconstruction: drywall, flooring, trim and finishes rebuilt after a fire.",
    intro:
      "After a fire, the first priorities are safety, emergency response and specialist cleanup. Once those are handled, we rebuild the rooms you live in: drywall, flooring, trim and finishes, with photos and a detailed estimate for your insurance claim.",
    cta: "Talk to us about fire damage",
    bullets: ["Rebuild planning", "Drywall, flooring and finishes", "Claim documentation"],
    whatIncluded: [
      "A room-by-room review of the damage",
      "A detailed rebuild plan for structural and finish repairs",
      "Reconstruction in clear phases",
      "Photos and estimates for your insurance claim",
    ],
    qualityFactors: [
      "Hidden conditions documented and reviewed as walls are opened",
      "Trades sequenced in the right order",
      "Clear updates through every phase of the rebuild",
    ],
    pricingFactors: [
      "How much structural and finish damage there is",
      "Size of the affected area",
      "Special materials or a phased rebuild",
    ],
    outcomes: ["Clear repair priorities", "An organized rebuild", "Documentation for your claim"],
    process: [
      "Confirm safety and any specialist cleanup",
      "Room-by-room review and rebuild plan",
      "Reconstruction and finishes",
      "Final walkthrough and handoff",
    ],
    faqs: [
      {
        q: "How do you help with the insurance side of a fire rebuild?",
        a: insuranceClaimsClarification,
      },
      {
        q: "How quickly can you respond after a fire?",
        a: "Call us to check current availability. A quote request is not an emergency dispatch, and emergency response, safety clearance and specialist cleanup need to happen before reconstruction begins.",
      },
    ],
    authoritySnapshot: {
      title: "Rebuilding after an interior fire",
      summary:
        "A rebuild plan separates emergency response and specialist cleanup from the demolition, repairs and finish work that follow. Who handles each part is settled before work starts.",
      scope: [
        "Confirm that structural and utility safety have been addressed and the home is safe to work in",
        "Remove damaged drywall, trim and insulation, saving sound materials where it makes sense",
        "Identify whether smoke, soot or odor cleanup needs a separate specialist",
        "Request drying records for water used to put out the fire, and check materials before walls are closed",
        "Confirm any structural assessment and repair design before framing changes",
        "Complete electrical and mechanical rough-in before drywall, paint and trim",
        "Organize photos by room and stage for your adjuster",
        "Walk through the finished work and close out any remaining cleanup items",
      ],
      compliance: "Required inspections are completed before walls are closed, and structural repairs are documented.",
      note: "Every fire is different. Your proposal reflects the damage, the systems involved and what the assessment finds.",
    },
    image: {
      src: "/images/projects/allentown-flooring-replacement/after/living-room-finished.jpg",
      alt: "Finished living area with light wood-look flooring and freshly painted walls.",
    },
    gallery: [],
  },
  {
    slug: "water-damage-restoration",
    portfolioTag: "water-damage",
    name: "Water Damage Restoration",
    short: "Rebuilding water-damaged drywall, flooring, trim and finishes once drying is done.",
    description: "Water damage repairs: drywall, flooring, trim and finishes rebuilt after a leak or flood.",
    intro:
      "Once the water source is fixed and the space is dry, we put your rooms back together: drywall, flooring, trim and finishes, with photos and a detailed estimate for your insurance claim.",
    cta: "Talk to us about water damage",
    bullets: ["Room-by-room planning", "Drywall and finish repairs", "Claim documentation"],
    whatIncluded: [
      "A review of the affected rooms",
      "Drywall, flooring, trim and finish repairs",
      "Phased work to get rooms back in use",
      "Photos and estimates for your insurance claim",
    ],
    qualityFactors: [
      "Review of affected materials and any drying records",
      "Repairs completed in the right order, through to the finish",
      "Durable materials where the water reached",
    ],
    pricingFactors: [
      "How far the water spread and what it damaged",
      "Number of finishes that need replacing",
      "Phasing and access",
    ],
    outcomes: ["A clear repair plan", "An organized rebuild", "Documented repairs"],
    process: [
      "Site review and repair plan",
      "Removal of damaged materials",
      "Rebuild and finishes",
      "Final review and cleanup",
    ],
    faqs: [
      {
        q: "Can we upgrade finishes while you are already replacing damaged areas?",
        a: "Often, yes. If drywall or flooring is coming out anyway, it can be the right time to improve materials or the layout. We lay out the options so you can decide.",
      },
      {
        q: "What if more damage shows up after demolition?",
        a: "We document it, tell you right away and adjust the plan. On insurance work we update the estimate so your adjuster sees the full picture.",
      },
    ],
    authoritySnapshot: {
      title: "Rebuilding after water damage",
      summary:
        "A leak can reach ceilings, walls and floors. A rebuild plan confirms which drying steps are complete, what conditions remain and who handles each part of the work.",
      scope: [
        "Request moisture readings and drying records from the mitigation company",
        "Confirm who handles any extraction, drying or specialist cleanup still needed",
        "Remove and replace damaged drywall, trim and insulation",
        "Agree on the checks that show materials are dry before new work goes in",
        "Resolve any remaining moisture or mold concerns with a specialist before walls are closed",
        "Repair the subfloor, then drywall, paint and trim, in that order",
        "Keep photos, repair details and approved changes together for you and your insurer",
      ],
      compliance:
        "Construction requirements are confirmed before rebuilding, and your proposal names anything handled separately by a mitigation company.",
      note: "Every water loss is different. Your proposal reflects the source, how long it lasted and the materials affected.",
    },
    image: {
      src: "/images/service-illustrations/water-damage-interior.png",
      alt: "AI-generated illustration of a water-damaged room with stained walls, exposed lower framing and damaged flooring.",
    },
    gallery: [],
  },
  {
    slug: "insurance-claims",
    portfolioTag: "insurance-restoration",
    name: "Insurance Claims Assistance",
    short: "Photos and detailed estimates for claim-related repairs, then the rebuild.",
    description: "Help with insurance-related repairs: documentation, detailed estimates and the rebuild.",
    intro:
      "Insurance repairs go more smoothly with good documentation. We provide photos, a detailed repair estimate and written approval of any changes, then complete the rebuild. Coverage decisions stay with your insurer and anyone authorized to represent you.",
    cta: "Request claim help",
    bullets: ["Detailed repair estimates", "Photo documentation", "Clear communication"],
    whatIncluded: [
      "A repair estimate that matches the damage",
      "Photos and details for your adjuster",
      "Planning from approval through completion",
      "Regular updates during the rebuild",
    ],
    qualityFactors: [
      "Clear, thorough documentation",
      "Prompt communication with everyone involved",
      "An organized, well-sequenced rebuild",
    ],
    pricingFactors: [
      "Extent of the approved repairs",
      "Materials and finishes being replaced",
      "Coordination across phases",
    ],
    outcomes: ["Clear documentation", "A coordinated repair plan", "Smoother communication"],
    process: ["Damage and claim review", "Estimate and documentation", "Repair planning", "Rebuild with regular updates"],
    faqs: [
      {
        q: "Can you guarantee my claim gets approved?",
        a: "No contractor can promise that. We focus on thorough documentation, clear estimates and photos so your claim is easy for an adjuster to evaluate.",
      },
      {
        q: "Should I call before or after I file?",
        a: "Either works. Calling early helps with documentation; if you have already filed, we pick up with the estimate and rebuild plan.",
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

/** Service names as they read inside a sentence or a sentence-case list. */
const inlineServiceNames: Record<string, string> = {
  "paver-installation": "patios and pavilions",
  "drywall-installation-repair": "drywall",
  "fire-damage-restoration": "fire damage repair",
  "water-damage-restoration": "water damage repair",
};

export function inlineServiceName(service: Pick<Service, "slug" | "name">) {
  return inlineServiceNames[service.slug] ?? service.name.toLowerCase();
}

/** Sentence-case label for lists and headings ("Kitchen remodeling", "Patios & outdoor living"). */
export function serviceLabel(service: Pick<Service, "slug" | "name">) {
  if (service.slug === "paver-installation") return "Patios & outdoor living";
  const name = service.name.replace(" and ", " & ");
  return name.charAt(0) + name.slice(1).toLowerCase();
}
