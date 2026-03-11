import type { ServiceFaq } from "@/content/services";

export type InternalLinkSuggestion = {
  href: string;
  anchorText: string;
  reason: string;
};

export type CityServiceLocalContent = {
  metadataTitle: string;
  metadataDescription: string;
  heroHeading: string;
  localProjectHeading: string;
  localProjectSnippet: string;
  localChallengesHeading: string;
  localChallenges: string[];
  localizedFaqs: ServiceFaq[];
  internalLinks: InternalLinkSuggestion[];
};

const cityServiceLocalContent: Record<string, CityServiceLocalContent> = {
  "reading-pa/kitchen-remodeling": {
    metadataTitle: "Kitchen Remodeling in Reading, PA",
    metadataDescription:
      "Kitchen remodeling in Reading, PA for older rowhomes, twins, and single-family homes. Local permit coordination, phased scheduling, and detail-focused finish work.",
    heroHeading: "Top Kitchen Remodelers in Reading, PA",
    localProjectHeading: "Common Reading Kitchen Scope",
    localProjectSnippet:
      "Many Reading kitchens need both design upgrades and hidden infrastructure fixes. A common scope includes leveling uneven subfloors, upgrading older electrical lines, and rebuilding cabinet runs so everything lands square before countertop install.",
    localChallengesHeading: "Reading Kitchen Challenges We Plan For",
    localChallenges: [
      "Uneven floors and out-of-square walls in early-to-mid 1900s homes",
      "Plumbing and electrical updates tied to layout changes",
      "Permit sequencing for structural, plumbing, and electrical work",
    ],
    localizedFaqs: [
      {
        q: "Do I need permits for kitchen remodeling in Reading?",
        a: "Most kitchen projects involving plumbing, electrical, or wall changes require permits. We scope this early and handle submissions with the local building office before work begins.",
      },
      {
        q: "How do older Reading homes affect kitchen remodeling cost?",
        a: "Older homes can add prep work for leveling, wiring, or hidden repairs after demo. We call out those risk items in writing so budget and schedule are realistic.",
      },
      {
        q: "Can my kitchen remodel be phased if I need to manage budget?",
        a: "Yes. We can phase cabinet, countertop, flooring, and finish scopes so core function is restored first and upgrades follow on a planned timeline.",
      },
    ],
    internalLinks: [
      {
        href: "/reading-pa",
        anchorText: "Remodeling and restoration in Reading, PA",
        reason: "City hub and local services overview",
      },
      {
        href: "/services/kitchen-remodeling",
        anchorText: "Kitchen remodeling service details",
        reason: "Full scope and process breakdown",
      },
      {
        href: "/financing",
        anchorText: "Financing options for your kitchen remodel",
        reason: "Conversion support for planning and budget",
      },
      {
        href: "/projects",
        anchorText: "Recent kitchen and renovation projects",
        reason: "Proof of workmanship and outcomes",
      },
    ],
  },
  "reading-pa/bathroom-remodeling": {
    metadataTitle: "Bathroom Remodeling in Reading, PA",
    metadataDescription:
      "Bathroom remodeling in Reading, PA with waterproofing-first builds, code-aware electrical updates, and finish quality for older homes.",
    heroHeading: "Licensed Bathroom Remodelers in Reading, PA",
    localProjectHeading: "Common Reading Bathroom Scope",
    localProjectSnippet:
      "In Reading bathrooms, we often uncover moisture damage, aging drain lines, and ventilation gaps during demo. We prioritize waterproofing, drainage corrections, and code-compliant electrical updates before tile and finish work.",
    localChallengesHeading: "Reading Bathroom Challenges We Plan For",
    localChallenges: [
      "Old waste lines and moisture-related subfloor repairs",
      "GFCI and ventilation upgrades in older bathroom layouts",
      "Tight floorplans that require efficient fixture placement",
    ],
    localizedFaqs: [
      {
        q: "Are bathroom electrical upgrades common in Reading remodels?",
        a: "Yes. Older bathrooms often need outlet, fan, and circuit updates to meet current code and improve daily reliability.",
      },
      {
        q: "What is the biggest risk item in older Reading bathrooms?",
        a: "Water damage behind tile and around tubs or showers is common. We inspect those areas early so the scope is accurate before finish materials are selected.",
      },
      {
        q: "Do you handle permit coordination for bathroom remodels?",
        a: "Yes. If plumbing, electrical, or structural work needs permits, we handle permitting as part of the project planning process.",
      },
    ],
    internalLinks: [
      {
        href: "/reading-pa",
        anchorText: "Home improvement in Reading, PA",
        reason: "City hub with related local services",
      },
      {
        href: "/services/bathroom-remodeling",
        anchorText: "Bathroom remodeling service details",
        reason: "Complete process and quality factors",
      },
      {
        href: "/financing",
        anchorText: "Financing for bathroom remodeling",
        reason: "Budget support and project kickoff",
      },
      {
        href: "/projects",
        anchorText: "Bathroom remodeling project examples",
        reason: "Visual proof and case-study context",
      },
    ],
  },
  "reading-pa/water-damage-restoration": {
    metadataTitle: "Water Damage Restoration in Reading, PA",
    metadataDescription:
      "Emergency water damage restoration in Reading, PA with fast response, structured rebuild scopes, and insurance-ready documentation.",
    heroHeading: "Water and Flood Damage Restoration in Reading, PA",
    localProjectHeading: "Common Reading Water Damage Scope",
    localProjectSnippet:
      "Reading water damage projects often start with basement or first-floor saturation from burst lines or drainage events. We move from damage mapping to rebuild sequencing quickly so homeowners can stabilize the property and recover living space faster.",
    localChallengesHeading: "Reading Water Damage Challenges We Plan For",
    localChallenges: [
      "Hidden moisture in wall and flooring assemblies",
      "Staged rebuild sequencing for occupied homes",
      "Documentation quality for adjuster and claim communication",
    ],
    localizedFaqs: [
      {
        q: "How fast should water damage repairs start in Reading?",
        a: "Immediately after the source is controlled. Fast moisture evaluation and scope planning reduce secondary damage and shorten total rebuild time.",
      },
      {
        q: "Can you help with insurance-related documentation?",
        a: "Yes. We provide scope details, photo documentation, and change tracking so communication with your adjuster is clearer.",
      },
      {
        q: "Do all water damage projects require full gut rebuilds?",
        a: "No. Some projects are targeted repairs, while others need deeper reconstruction. We map affected assemblies first so repairs stay right-sized.",
      },
    ],
    internalLinks: [
      {
        href: "/reading-pa",
        anchorText: "Restoration services in Reading, PA",
        reason: "Local service context by city",
      },
      {
        href: "/services/water-damage-restoration",
        anchorText: "Water damage restoration service details",
        reason: "Process and rebuild expectations",
      },
      {
        href: "/insurance-claims",
        anchorText: "Insurance claims assistance for water damage",
        reason: "Claim-oriented conversion path",
      },
      {
        href: "/projects",
        anchorText: "Recent restoration project outcomes",
        reason: "Proof of local execution quality",
      },
    ],
  },
  "allentown-pa/kitchen-remodeling": {
    metadataTitle: "Kitchen Remodeling in Allentown, PA",
    metadataDescription:
      "Kitchen remodeling in Allentown, PA for older city homes and newer suburban properties. Strong scope planning, finish quality, and schedule control.",
    heroHeading: "Kitchen Remodelers in Allentown, PA",
    localProjectHeading: "Common Allentown Kitchen Scope",
    localProjectSnippet:
      "Allentown kitchen remodels often blend layout improvements with practical infrastructure upgrades. We frequently coordinate cabinet and lighting redesigns with plumbing and electrical adjustments to deliver cleaner function and better day-to-day flow.",
    localChallengesHeading: "Allentown Kitchen Challenges We Plan For",
    localChallenges: [
      "Layout constraints in older downtown homes",
      "Material lead-time planning to protect schedule",
      "Mechanical updates needed for modern appliance layouts",
    ],
    localizedFaqs: [
      {
        q: "Can you remodel kitchens in both older and newer Allentown homes?",
        a: "Yes. We tailor scope planning to the home condition, whether it needs infrastructure upgrades or finish-focused modernization.",
      },
      {
        q: "What drives kitchen timeline changes most in Allentown projects?",
        a: "Hidden conditions after demo and long-lead materials are the two most common schedule variables. We build timeline buffers around both.",
      },
      {
        q: "Do you provide written scopes before work starts?",
        a: "Yes. Every project begins with a clear written scope, milestone sequence, and documented assumptions.",
      },
    ],
    internalLinks: [
      {
        href: "/allentown-pa",
        anchorText: "Home improvement in Allentown, PA",
        reason: "City-level local relevance",
      },
      {
        href: "/services/kitchen-remodeling",
        anchorText: "Kitchen remodeling service details",
        reason: "Broader process and standards",
      },
      {
        href: "/financing",
        anchorText: "Kitchen remodeling financing options",
        reason: "Conversion support",
      },
      {
        href: "/projects",
        anchorText: "Allentown and Lehigh Valley project gallery",
        reason: "Project proof content",
      },
    ],
  },
  "allentown-pa/bathroom-remodeling": {
    metadataTitle: "Bathroom Remodeling in Allentown, PA",
    metadataDescription:
      "Bathroom remodeling in Allentown, PA with moisture-aware construction, code-compliant upgrades, and durable material selection.",
    heroHeading: "Bathroom Remodelers in Allentown, PA",
    localProjectHeading: "Common Allentown Bathroom Scope",
    localProjectSnippet:
      "In Allentown bathrooms, the biggest wins usually come from combining waterproofing upgrades with smarter storage and fixture layouts. We focus on long-term durability first, then finish detailing that keeps the room easy to maintain.",
    localChallengesHeading: "Allentown Bathroom Challenges We Plan For",
    localChallenges: [
      "Ventilation and moisture management in high-use bathrooms",
      "Subfloor corrections discovered after demo",
      "Balancing premium finishes with practical daily durability",
    ],
    localizedFaqs: [
      {
        q: "Do you include waterproofing in Allentown bathroom remodels?",
        a: "Yes. Waterproofing and moisture-control planning are foundational steps in our bathroom scopes, not add-ons.",
      },
      {
        q: "Can you improve storage without expanding the footprint?",
        a: "Usually yes. We often improve bathroom usability through fixture placement, vanity layout, and vertical storage planning.",
      },
      {
        q: "How do you prevent surprise costs during bathroom work?",
        a: "We call out likely risk zones up front and document any field changes quickly, so scope decisions stay controlled.",
      },
    ],
    internalLinks: [
      {
        href: "/allentown-pa",
        anchorText: "Bathroom and remodeling services in Allentown",
        reason: "City hub support",
      },
      {
        href: "/services/bathroom-remodeling",
        anchorText: "Bathroom remodeling service details",
        reason: "Service-level authority",
      },
      {
        href: "/financing",
        anchorText: "Bathroom project financing options",
        reason: "Decision-stage support",
      },
      {
        href: "/projects",
        anchorText: "Bathroom and interior project gallery",
        reason: "Visual local trust signal",
      },
    ],
  },
  "allentown-pa/water-damage-restoration": {
    metadataTitle: "Water Damage Restoration in Allentown, PA",
    metadataDescription:
      "Emergency water damage restoration in Allentown, PA with rapid response, phased rebuild scopes, and insurance documentation support.",
    heroHeading: "Emergency Water Damage Restoration in Allentown, PA",
    localProjectHeading: "Common Allentown Water Damage Scope",
    localProjectSnippet:
      "Allentown restoration projects often involve multi-room moisture events after storms, plumbing failures, or appliance leaks. We prioritize drying and reconstruction sequencing so affected spaces can return to normal as quickly as possible.",
    localChallengesHeading: "Allentown Water Damage Challenges We Plan For",
    localChallenges: [
      "Coordinating multi-area repairs without losing schedule control",
      "Replacing damaged finishes while preserving unaffected zones",
      "Maintaining clean claim communication from start to closeout",
    ],
    localizedFaqs: [
      {
        q: "Do you offer emergency response for Allentown water damage projects?",
        a: "Yes. We prioritize active-damage situations and move quickly into stabilization and rebuild planning.",
      },
      {
        q: "Will you coordinate with my insurance claim documentation needs?",
        a: "Yes. We provide organized photos and scoped repair details to support communication with your adjuster.",
      },
      {
        q: "Can part of my home stay usable during restoration?",
        a: "Often yes. We phase work by affected zone whenever possible so critical areas stay accessible.",
      },
    ],
    internalLinks: [
      {
        href: "/allentown-pa",
        anchorText: "Restoration services in Allentown, PA",
        reason: "Local relevance reinforcement",
      },
      {
        href: "/services/water-damage-restoration",
        anchorText: "Water damage restoration service details",
        reason: "Service scope and expectations",
      },
      {
        href: "/insurance-claims",
        anchorText: "Insurance claims assistance for restoration",
        reason: "High-intent conversion support",
      },
      {
        href: "/projects",
        anchorText: "Lehigh Valley restoration project examples",
        reason: "Proof and credibility",
      },
    ],
  },
  "bethlehem-pa/kitchen-remodeling": {
    metadataTitle: "Kitchen Remodeling in Bethlehem, PA",
    metadataDescription:
      "Kitchen remodeling in Bethlehem, PA for character homes and modern layouts, with detail-oriented planning and high-quality finish execution.",
    heroHeading: "Kitchen Remodelers in Bethlehem, PA",
    localProjectHeading: "Common Bethlehem Kitchen Scope",
    localProjectSnippet:
      "Bethlehem kitchens frequently require careful layout planning in older footprints. We focus on maximizing storage, preserving character details where possible, and integrating modern lighting and appliance zones without forcing the space.",
    localChallengesHeading: "Bethlehem Kitchen Challenges We Plan For",
    localChallenges: [
      "Narrow layouts in older townhome and character-home kitchens",
      "Finish selections that match existing architectural style",
      "Sequencing specialty materials with install milestones",
    ],
    localizedFaqs: [
      {
        q: "Can you preserve original character during a Bethlehem kitchen remodel?",
        a: "Yes. We regularly blend modern function with existing architectural features when homeowners want to retain character.",
      },
      {
        q: "How do you approach small or narrow kitchen footprints?",
        a: "We prioritize circulation, storage efficiency, and appliance placement so the finished kitchen feels larger and works better.",
      },
      {
        q: "Do you help with finish and fixture selections?",
        a: "Yes. We guide selections so style, durability, and lead-time realities stay aligned with your build schedule.",
      },
    ],
    internalLinks: [
      {
        href: "/bethlehem-pa",
        anchorText: "Home remodeling in Bethlehem, PA",
        reason: "City cluster linkage",
      },
      {
        href: "/services/kitchen-remodeling",
        anchorText: "Kitchen remodeling service details",
        reason: "Complete service context",
      },
      {
        href: "/financing",
        anchorText: "Kitchen remodeling financing options",
        reason: "Support conversion for larger projects",
      },
      {
        href: "/projects",
        anchorText: "Kitchen and home renovation project gallery",
        reason: "Project trust signals",
      },
    ],
  },
  "bethlehem-pa/bathroom-remodeling": {
    metadataTitle: "Bathroom Remodeling in Bethlehem, PA",
    metadataDescription:
      "Bathroom remodeling in Bethlehem, PA focused on waterproofing, long-term durability, and design updates for historic and modern homes.",
    heroHeading: "Bathroom Remodelers in Bethlehem, PA",
    localProjectHeading: "Common Bethlehem Bathroom Scope",
    localProjectSnippet:
      "Bethlehem bathroom projects often combine moisture repairs with complete design refreshes. Our scopes focus on durable waterproofing systems, cleaner layouts, and fixture packages that hold up to daily use.",
    localChallengesHeading: "Bethlehem Bathroom Challenges We Plan For",
    localChallenges: [
      "Moisture damage behind legacy tile assemblies",
      "Efficient fixture upgrades in compact room footprints",
      "Durability-first material choices for long-term performance",
    ],
    localizedFaqs: [
      {
        q: "Is waterproofing included in your Bethlehem bathroom remodel scopes?",
        a: "Yes. We treat waterproofing as a core construction requirement in showers and wet zones.",
      },
      {
        q: "Can you modernize an older bathroom without changing every surface?",
        a: "Yes. We can phase updates or target key zones while still improving function and overall appearance.",
      },
      {
        q: "How do you handle hidden damage found during demo?",
        a: "We document conditions immediately, explain options, and keep scope changes transparent before proceeding.",
      },
    ],
    internalLinks: [
      {
        href: "/bethlehem-pa",
        anchorText: "Bathroom and remodeling services in Bethlehem",
        reason: "Strengthens city topical cluster",
      },
      {
        href: "/services/bathroom-remodeling",
        anchorText: "Bathroom remodeling service details",
        reason: "Service authority page",
      },
      {
        href: "/financing",
        anchorText: "Bathroom project financing options",
        reason: "Conversion support",
      },
      {
        href: "/projects",
        anchorText: "Bathroom renovation project gallery",
        reason: "Proof of local work outcomes",
      },
    ],
  },
  "bethlehem-pa/water-damage-restoration": {
    metadataTitle: "Water Damage Restoration in Bethlehem, PA",
    metadataDescription:
      "Water and flood damage restoration in Bethlehem, PA with emergency response, structured rebuild scopes, and clear insurance-ready documentation.",
    heroHeading: "Water and Flood Damage Restoration in Bethlehem, PA",
    localProjectHeading: "Common Bethlehem Water Damage Scope",
    localProjectSnippet:
      "Bethlehem water damage jobs often require quick triage followed by staged reconstruction. We map affected materials, sequence the rebuild by priority zones, and keep homeowners informed with clear milestone communication.",
    localChallengesHeading: "Bethlehem Water Damage Challenges We Plan For",
    localChallenges: [
      "Rapid transition from damage event to reconstruction planning",
      "Multi-phase repairs in occupied homes",
      "Moisture risk control in enclosed wall and flooring systems",
    ],
    localizedFaqs: [
      {
        q: "What is the first step after water damage in Bethlehem?",
        a: "Stop the active source, then move immediately into damage assessment and moisture mapping so repairs are prioritized correctly.",
      },
      {
        q: "Do you coordinate restoration around insurance claim workflows?",
        a: "Yes. We provide organized scope documentation to keep adjuster communication and approval decisions moving.",
      },
      {
        q: "Can you rebuild only the affected areas instead of renovating everything?",
        a: "Yes. We scope to affected assemblies first and only expand when damage conditions require it.",
      },
    ],
    internalLinks: [
      {
        href: "/bethlehem-pa",
        anchorText: "Restoration services in Bethlehem, PA",
        reason: "Local city relevance",
      },
      {
        href: "/services/water-damage-restoration",
        anchorText: "Water damage restoration service details",
        reason: "Service scope and process support",
      },
      {
        href: "/insurance-claims",
        anchorText: "Insurance claims assistance for flood damage",
        reason: "Claim-driven user journey",
      },
      {
        href: "/projects",
        anchorText: "Recent restoration and rebuild projects",
        reason: "Proof and trust reinforcement",
      },
    ],
  },
};

export function getCityServiceLocalContent(citySlug: string, serviceSlug: string) {
  return cityServiceLocalContent[`${citySlug}/${serviceSlug}`];
}
