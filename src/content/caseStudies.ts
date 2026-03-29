export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  locationName: string;
  locationSlug: string;
  serviceName: string;
  serviceSlug: string;
  timeline: string;
  featureInServiceListings?: boolean;
  /** When true, this case study is excluded from all public listings. */
  hidden?: boolean;
  scope: string[];
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
  };
  images: Array<{
    src: string;
    alt: string;
  }>;
  beforeImages?: Array<{
    src: string;
    alt: string;
  }>;
  afterImages?: Array<{
    src: string;
    alt: string;
  }>;
};

const fireDamageDocumentationAfterFiles = [
  "01-img_7761.jpg",
  "02-img_7762.jpg",
  "03-img_7764.jpg",
  "04-img_7765.jpg",
  "05-img_7766.jpg",
  "06-img_7768.jpg",
  "07-img_7769.jpg",
  "08-img_7770.jpg",
  "09-img_8454.jpg",
  "10-img_8455.jpg",
  "11-img_8456.jpg",
  "12-img_8457.jpg",
  "13-img_8458.jpg",
  "14-img_8459.jpg",
  "15-img_8460.jpg",
  "16-img_8461.jpg",
  "17-img_8462.jpg",
  "18-img_8463.jpg",
  "19-img_8464.jpg",
  "20-img_8465.jpg",
  "21-img_8466.jpg",
  "22-img_8467.jpg",
  "23-img_8468.jpg",
  "24-img_8469.jpg",
  "25-img_8470.jpg",
  "26-img_8471.jpg",
  "27-img_8472.jpg",
  "28-img_8473.jpg",
  "29-img_8474.jpg",
  "30-img_8475.jpg",
  "31-img_8476.jpg",
  "32-img_8477.jpg",
  "33-img_8478.jpg",
  "34-img_8479.jpg",
  "35-img_8480.jpg",
  "36-img_8933.jpg",
  "37-img_8934.jpg",
  "38-img_8935.jpg",
] as const;

export const caseStudies: CaseStudy[] = [
  {
    slug: "allentown-kitchen-layout-upgrade",
    title: "Kitchen Layout Upgrade in Allentown",
    summary:
      "Kitchen refresh focused on better layout flow, cleaner cabinet alignment, and more polished finish detailing.",
    locationName: "Allentown, PA",
    locationSlug: "allentown-pa",
    serviceName: "Kitchen Remodeling",
    serviceSlug: "kitchen-remodeling",
    timeline: "4 to 6 weeks",
    scope: [
      "Plan cabinet and countertop updates for better workflow",
      "Coordinate lighting and finish improvements across the kitchen",
      "Clean up trim and final-detail work for a more resolved finish",
    ],
    challenge:
      "The original layout limited prep flow, and the finish transitions between cabinets, counters, and flooring felt uneven.",
    solution:
      "The upgrade was organized around cleaner work zones, coordinated cabinetry and lighting updates, and tighter finish detailing so the room would function better and feel more complete.",
    results: [
      "Smoother prep and cooking workflow",
      "Cleaner alignment across cabinets, counters, and finish lines",
      "A more polished kitchen that feels easier to use every day",
    ],
    testimonial: {
      quote: "Clear communication from estimate to closeout and the final details came out excellent.",
      author: "Allentown homeowner",
    },
    images: [
      { src: "/images/projects/allentown-kitchen-upgrade/after/kitchen-white-cabinets.jpg", alt: "Kitchen renovation with updated cabinets and modern finishes." },
      { src: "/images/projects/allentown-kitchen-upgrade/after/kitchen-remodel-finishes.jpg", alt: "Kitchen remodel with updated finishes and fixtures." },
    ],
  },
  {
    slug: "bethlehem-bathroom-refresh",
    title: "Bathroom Refresh in Bethlehem",
    summary: "Practical bathroom upgrade focused on durable materials, better storage, and clean finish quality.",
    locationName: "Bethlehem, PA",
    locationSlug: "bethlehem-pa",
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
      author: "Bethlehem homeowner",
    },
    images: [
      { src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg", alt: "Finished bathroom shower enclosure after remodel." },
      { src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-finished-shower-detail.jpg", alt: "Closer view of glass shower enclosure and hardware after remodel." },
      { src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-shelves-corner.jpg", alt: "Bathroom shelving and storage detail after remodel." },
    ],
    beforeImages: [
      { src: "/images/projects/bethlehem-bathroom-refresh/before/bathroom-before-shower.jpg", alt: "Bathroom before remodel with original shower layout." },
      { src: "/images/projects/bethlehem-bathroom-refresh/before/bathroom-before-tile.jpg", alt: "Bathroom before remodel with dated tile and fixtures." },
    ],
    afterImages: [
      {
        src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
        alt: "Finished bathroom after remodel — full room view with vanity, shower, and updated finishes.",
      },
    ],
  },
  {
    slug: "allentown-commercial-bathroom-renovation",
    title: "Commercial Bathroom Renovation in Allentown",
    summary:
      "High-traffic restroom and corridor refresh: worn surfaces and dated finishes were replaced with durable materials and a cleaner, more professional presentation end to end.",
    locationName: "Allentown, PA",
    locationSlug: "allentown-pa",
    serviceName: "Bathroom Remodeling",
    serviceSlug: "bathroom-remodeling",
    timeline: "Phased around business operations",
    scope: [
      "Refresh restroom stalls, fixture areas, and visible finish surfaces",
      "Update hallway walls, ceilings, and flooring for a cleaner presentation",
      "Install durable finish selections suited to daily high-traffic use",
    ],
    challenge:
      "The restroom and corridor read as tired and dated, but the setting still needed finishes that could stand up to steady daily traffic.",
    solution:
      "We treated stalls, sink wall, floor, and corridor as one coordinated scope so materials, colors, and transitions would feel intentional rather than patched zone by zone.",
    results: [
      "A cleaner restroom and hallway presentation",
      "More consistent finish quality across stalls, floors, walls, and sink areas",
      "Durable surfaces that fit everyday commercial traffic",
    ],
    testimonial: {
      quote:
        "They took a worn, outdated space and turned it into a clean, modern, professional-looking bathroom and hallway area. The finished work looks sharp, durable, and well thought out.",
      author: "Allentown commercial client",
    },
    images: [
      {
        src: "/images/projects/allentown-commercial-bathroom/after/stall-finished.jpg",
        alt: "Finished commercial restroom stall run after renovation in Allentown.",
      },
      {
        src: "/images/projects/allentown-commercial-bathroom/after/floor-after.png",
        alt: "Restroom floor zone after refresh — durable finish and cleaner transitions.",
      },
      {
        src: "/images/projects/allentown-commercial-bathroom/after/sink-area-after.png",
        alt: "Sink and mirror wall after renovation with updated surfaces and lighting-ready finishes.",
      },
    ],
    beforeImages: [
      {
        src: "/images/projects/allentown-commercial-bathroom/before/hallway-before.png",
        alt: "Commercial restroom corridor before renovation — worn walls and flooring.",
      },
    ],
    afterImages: [
      {
        src: "/images/projects/allentown-commercial-bathroom/after/hallway-after.png",
        alt: "Same corridor after renovation — brighter surfaces, refreshed flooring, cleaner sightlines.",
      },
    ],
  },
  {
    slug: "allentown-exterior-log-home-refresh",
    title: "Log-Style Exterior Home Refresh in Allentown",
    summary:
      "Exterior remodeling project on a large Allentown home with lift-access facade work, siding and trim cleanup, and a sharper finished appearance.",
    locationName: "Allentown, PA",
    locationSlug: "allentown-pa",
    serviceName: "Exterior Remodeling",
    serviceSlug: "exterior-remodeling",
    timeline: "Multi-day exterior access project",
    scope: [
      "Lift-assisted access for upper exterior elevations",
      "Siding, trim, and facade refresh work",
      "Garage-front cleanup and finish detailing",
    ],
    challenge:
      "The home's large exterior footprint and upper-story elevations required careful access planning while improving the look and consistency of weather-exposed surfaces.",
    solution:
      "The scope was sequenced around safe lift access, staged exterior prep, and finish work across the garage elevation and upper facade so the exterior could be cleaned up without rushed shortcuts.",
    results: [
      "Cleaner curb appeal across the full front elevation",
      "More consistent exterior finish from garage level to upper-story lines",
      "Better-looking siding and trim details on a highly visible facade",
    ],
    images: [
      {
        src: "/images/projects/allentown-exterior-log-home/after/front-finished.jpg",
        alt: "Finished log-style home exterior after remodeling work in Allentown.",
      },
      {
        src: "/images/projects/allentown-exterior-log-home/after/garage-elevation.jpg",
        alt: "Garage-side exterior elevation during remodeling work on a log-style home in Allentown.",
      },
      {
        src: "/images/projects/allentown-exterior-log-home/process/lift-access-work.jpg",
        alt: "Lift-access exterior remodeling work underway on an Allentown home.",
      },
    ],
  },
  {
    slug: "bethlehem-exterior-staircase-build",
    title: "Exterior Staircase Build in Bethlehem",
    summary:
      "New exterior staircase and landing built to create safer elevated entry access with a clean finished look and strong railing detail.",
    locationName: "Bethlehem, PA",
    locationSlug: "bethlehem-pa",
    serviceName: "Exterior Remodeling",
    serviceSlug: "exterior-remodeling",
    timeline: "Several days to 2 weeks",
    scope: [
      "Elevated landing and stair build",
      "Railing and guard system installation",
      "Structural support posts and exterior finish alignment",
    ],
    challenge:
      "The elevated exterior doorway needed a safer, more usable access path that could fit the site cleanly without looking like an afterthought.",
    solution:
      "The project was built around a dedicated landing and stair system with sturdy support framing, clean white-and-black railing details, and a layout that made the entry easier to access from grade.",
    results: [
      "Safer exterior entry access",
      "A cleaner finished look that complements the exterior",
      "More usable day-to-day access to the elevated doorway",
    ],
    images: [
      {
        src: "/images/projects/bethlehem-exterior-staircase/after/staircase-finished.jpg",
        alt: "Finished exterior staircase and landing build in Bethlehem.",
      },
    ],
  },
  {
    slug: "reading-commercial-bar-window-upgrade",
    title: "Commercial Bar Window Upgrade in Reading",
    summary:
      "Commercial window replacement and trim refresh that brightened a bar interior and gave the wall line a cleaner, more polished finish.",
    locationName: "Reading, PA",
    locationSlug: "reading-pa",
    serviceName: "Drywall Installation and Repair",
    serviceSlug: "drywall-installation-repair",
    timeline: "Several days to 2 weeks",
    featureInServiceListings: false,
    scope: [
      "Window and trim coordination within the bar interior",
      "Wall-finish cleanup along the seating area",
      "Paint and lighting-ready finish detailing",
    ],
    challenge:
      "The bar needed cleaner window lines and a sharper finished look along a long seating wall without losing the darker trim style that fit the space.",
    solution:
      "The project paired the new windows with coordinated trim and cleaner wall-finish work so the natural light improved while the bar interior still felt polished and intentional.",
    results: [
      "Brighter natural light along the bar",
      "Cleaner finish detail around each window opening",
      "A more polished commercial interior appearance",
    ],
    images: [
      {
        src: "/images/projects/reading-commercial-bar-window/after/window-upgrade.jpg",
        alt: "Commercial bar window upgrade with new trim and brighter interior light in Reading.",
      },
    ],
  },
  {
    slug: "lehigh-valley-full-exterior-refresh",
    title: "Full Exterior Refresh in Lehigh Valley",
    summary:
      "Whole-home exterior refresh with a cleaner paint palette, new shutters, dormer detail cleanup, and a sharper front-elevation presentation.",
    locationName: "Lehigh Valley, PA",
    locationSlug: "lehigh-valley-pa",
    serviceName: "Exterior Remodeling",
    serviceSlug: "exterior-remodeling",
    timeline: "Several days to 2 weeks",
    scope: [
      "Exterior paint and finish refresh",
      "Shutter installation and contrast updates",
      "Dormer, trim, and front-entry detail cleanup",
    ],
    challenge:
      "The home had worn exterior details and a flatter overall look, especially across the dormers, porch, and front facade, and needed a cleaner, more intentional finish direction.",
    solution:
      "The refresh focused on crisp white exterior surfaces, black shutter contrast, and cleanup of weathered dormer and trim details so the front elevation would feel brighter, more balanced, and more polished.",
    results: [
      "Stronger curb appeal across the full facade",
      "Cleaner dormer, porch, and trim presentation",
      "A more timeless and higher-contrast exterior finish",
    ],
    images: [
      {
        src: "/images/projects/lehigh-valley-exterior-refresh/after/exterior-after.jpg",
        alt: "Finished full exterior refresh on a historic-style home in the Lehigh Valley.",
      },
      {
        src: "/images/projects/lehigh-valley-exterior-refresh/process/exterior-in-progress.jpg",
        alt: "Exterior refresh in progress on the Lehigh Valley home.",
      },
      {
        src: "/images/projects/lehigh-valley-exterior-refresh/after/exterior-finished.jpg",
        alt: "Finished front elevation after the Lehigh Valley exterior refresh.",
      },
    ],
    beforeImages: [
      {
        src: "/images/projects/lehigh-valley-exterior-refresh/before/exterior-before.jpg",
        alt: "Home exterior before shutters and finish updates in the Lehigh Valley.",
      },
    ],
    afterImages: [
      {
        src: "/images/projects/lehigh-valley-exterior-refresh/after/exterior-after.jpg",
        alt: "Home exterior after shutters and finish updates in the Lehigh Valley.",
      },
    ],
  },
  {
    slug: "lehigh-valley-dormer-shutter-detail-refresh",
    title: "Dormer and Shutter Detail Refresh in Lehigh Valley",
    summary:
      "Front-elevation exterior detail refresh focused on cleaned-up dormers, sharper shutter contrast, and a brighter, more polished entry presentation.",
    locationName: "Lehigh Valley, PA",
    locationSlug: "lehigh-valley-pa",
    serviceName: "Exterior Remodeling",
    serviceSlug: "exterior-remodeling",
    timeline: "Front-elevation detail refresh",
    scope: [
      "Dormer trim cleanup and finish restoration",
      "Shutter installation for stronger window contrast",
      "Front-entry paint and detail refinishing",
    ],
    challenge:
      "The upper dormer areas and front facade details looked weathered and flat, which kept the home from having the crisp, finished appearance the owners wanted from the street.",
    solution:
      "The scope concentrated on the most visible front-elevation details: dormer cleanup, trim refinishing, and darker shutter contrast to frame the windows and sharpen the whole facade.",
    results: [
      "Cleaner dormer presentation from the street",
      "Stronger shutter contrast across the front elevation",
      "A brighter, more intentional front-entry appearance",
    ],
    images: [
      {
        src: "/images/projects/lehigh-valley-exterior-refresh/after/exterior-after.jpg",
        alt: "Finished front elevation after dormer, shutter, and exterior detail refresh in the Lehigh Valley.",
      },
      {
        src: "/images/projects/lehigh-valley-exterior-refresh/after/exterior-finished.jpg",
        alt: "Refinished dormer and front-entry details after the Lehigh Valley exterior update.",
      },
    ],
    beforeImages: [
      {
        src: "/images/projects/lehigh-valley-exterior-refresh/before/exterior-before.jpg",
        alt: "Front elevation before dormer cleanup and shutter updates in the Lehigh Valley.",
      },
    ],
    afterImages: [
      {
        src: "/images/projects/lehigh-valley-exterior-refresh/after/exterior-after.jpg",
        alt: "Front elevation after dormer cleanup and shutter updates in the Lehigh Valley.",
      },
    ],
  },
  {
    slug: "bethlehem-interior-flooring-refresh",
    title: "Interior Flooring and Finish Refresh in Bethlehem",
    summary:
      "Interior refresh with updated flooring appearance, new paint, recessed lighting, windows, and a cleaner pass-through opening between rooms.",
    locationName: "Bethlehem, PA",
    locationSlug: "bethlehem-pa",
    serviceName: "Flooring Installation",
    serviceSlug: "flooring-installation",
    timeline: "Several days to 2 weeks",
    scope: [
      "Flooring and room-finish refresh",
      "New paint, lighting, and window updates",
      "Pass-through opening cleanup for better room-to-room flow",
    ],
    challenge:
      "The room needed a brighter, more connected feel, and the finishes had to work together instead of making the flooring update look isolated from the rest of the space.",
    solution:
      "The project paired flooring-focused improvements with paint, lighting, window updates, and cleanup around the pass-through opening so the room felt more open, brighter, and more finished as a whole.",
    results: [
      "Brighter room with cleaner finish lines",
      "Better visual flow between connected spaces",
      "A more polished interior anchored by the updated floor look",
    ],
    images: [
      {
        src: "/images/projects/bethlehem-interior-flooring-refresh/after/flooring-refresh.jpg",
        alt: "Interior flooring and finish refresh with updated paint, lighting, and windows in Bethlehem.",
      },
    ],
  },
  {
    slug: "berks-county-ranch-exterior-refresh",
    title: "Ranch Exterior Refresh in Berks County",
    summary:
      "Exterior refresh on a ranch-style home with clean black accents, updated trim contrast, and sharper curb appeal.",
    locationName: "Berks County, PA",
    locationSlug: "berks-county-pa",
    serviceName: "Exterior Remodeling",
    serviceSlug: "exterior-remodeling",
    timeline: "Several days to 2 weeks",
    scope: [
      "Exterior finish and accent refresh",
      "Updated shutter and trim contrast",
      "Front-entry and facade cleanup for stronger curb appeal",
    ],
    challenge:
      "The home needed a cleaner, more cohesive exterior look that would sharpen the front elevation without overcomplicating the facade.",
    solution:
      "The refresh focused on crisp black accents, cleaned-up trim lines, and a more intentional front-entry presentation to give the ranch exterior stronger contrast and a more updated feel.",
    results: [
      "Stronger curb appeal from the street",
      "Cleaner front-entry presentation",
      "A more cohesive exterior style across windows, trim, and siding",
    ],
    images: [
      {
        src: "/images/projects/berks-county-ranch-exterior/after/exterior-refresh.jpg",
        alt: "Ranch-style home exterior refresh in Berks County with updated black accents and clean siding lines.",
      },
    ],
  },
  {
    slug: "lehigh-valley-basement-finish-and-detail",
    title: "Full Basement Theater and Entertainment Build in Lehigh Valley",
    summary:
      "Complete basement transformation including drywall, new lighting, epoxy flooring, and a custom home theater entertainment wall with integrated audio and fireplace.",
    locationName: "Lehigh Valley, PA",
    locationSlug: "lehigh-valley-pa",
    serviceName: "Basement Finishing",
    serviceSlug: "basement-finishing",
    timeline: "5 to 7 weeks",
    scope: [
      "Full basement framing, drywall, and finish prep",
      "Home theater entertainment wall with fireplace integration",
      "Speaker and audio package setup with clean wire management",
      "Epoxy floor installation and trim detailing",
      "New recessed lighting and final electrical finish-out",
    ],
    challenge:
      "The goal was to turn a mostly unfinished basement into a true entertainment space without making it feel dark, cluttered, or disconnected across zones.",
    solution:
      "Work was sequenced from framing and drywall through lighting, theater/audio integration, fireplace installation, and epoxy finishing so each phase could be completed cleanly.",
    results: [
      "Full basement upgrade from blank space to finished entertainment zone",
      "Custom theater focal wall with integrated speakers and fireplace",
      "Durable epoxy floor with cleaner transitions and easier maintenance",
      "Brighter lighting and more usable square footage for everyday family use",
    ],
    testimonial: {
      quote: "They took a blank basement and turned it into a space our family actually uses every day.",
      author: "Lehigh Valley homeowner",
    },
    images: [
      { src: "/images/projects/lehigh-valley-basement-theater/after/media-room-big-screen.jpg", alt: "Finished basement media room with large screen." },
      { src: "/images/projects/lehigh-valley-basement-theater/after/epoxy-floor-big-screen.jpg", alt: "Basement epoxy flooring finish detail." },
      { src: "/images/projects/lehigh-valley-basement-theater/after/wide-view-layout.jpg", alt: "Wide basement view showing finished layout and floor detail." },
      { src: "/images/projects/lehigh-valley-basement-theater/after/wide-angle-room-flow.jpg", alt: "Basement wide-angle finish showing completed room flow." },
    ],
  },
  {
    slug: "lehigh-water-damage-rebuild",
    title: "Water Damage Interior Rebuild in Lehigh Valley",
    hidden: true,
    summary:
      "Interior rebuild after water-related damage with organized scope mapping, phased repairs, and coordinated finish restoration. The work moved from affected-area review to rebuilt bathroom, flooring, and wall finishes with clear communication throughout.",
    locationName: "Lehigh Valley, PA",
    locationSlug: "lehigh-valley-pa",
    serviceName: "Water Damage Restoration",
    serviceSlug: "water-damage-restoration",
    timeline: "Scope-dependent, staged rebuild",
    scope: [
      "Map affected interior areas and organize the repair scope",
      "Replace damaged drywall, flooring, and connected finishes",
      "Complete finish restoration and closeout review",
    ],
    challenge:
      "Water-related damage had affected multiple interior finishes, and the home needed a clear rebuild path instead of piecemeal repairs.",
    solution:
      "The project was sequenced by affected area so drywall, flooring, and finish restoration could move in an organized order with clearer updates at each stage.",
    results: [
      "Rebuilt interior areas with cleaner finished surfaces",
      "A more organized repair process from scope review through closeout",
      "Restored bathroom, flooring, and wall-finish quality in affected spaces",
    ],
    testimonial: {
      quote: "Fast response and clear next steps made a stressful situation manageable.",
      author: "Lehigh Valley homeowner",
    },
    images: [],
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
      { src: "/images/projects/allentown-flooring-replacement/after/living-room-finished.jpg", alt: "Completed light wood flooring installation in an Allentown living area." },
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
      { src: "/images/projects/bethlehem-drywall-finish-repair/after/finished-room.jpg", alt: "Paint-ready room surfaces after drywall repair and finish prep." },
    ],
  },
  {
    slug: "reading-paver-patio-buildout",
    title: "Paver Patio Buildout in Reading",
    hidden: true,
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
    images: [],
  },
  {
    slug: "bethlehem-pool-patio-renovation",
    title: "Pool Patio Renovation in Bethlehem",
    summary:
      "Pool surround hardscape renovation: a worn deck surface and soft edges were replaced with cleaner paver lines, tighter radius work at the pool, and a more finished backyard focal point.",
    locationName: "Bethlehem, PA",
    locationSlug: "bethlehem-pa",
    serviceName: "Paver Installation",
    serviceSlug: "paver-installation",
    timeline: "1 to 2 weeks",
    scope: [
      "Renovate the pool patio surface and surrounding layout",
      "Refine hardscape edges around the pool's curved lines",
      "Complete finish work for a cleaner poolside presentation",
    ],
    challenge:
      "The pool area felt worn and dated, and the curved shape made it important to improve the look without leaving awkward edges or transitions.",
    solution:
      "The renovation was planned around the pool's curves so the updated surface, edge detailing, and finish work would read as one cleaner, more intentional hardscape.",
    results: [
      "A visibly cleaner and more finished pool patio",
      "Sharper edge lines that follow the pool more naturally",
      "A backyard space that feels more usable and updated",
    ],
    testimonial: {
      quote:
        "Ryan and his team did an awesome job on our pool patio renovation. The area looks completely transformed and the quality of the work really shows.",
      author: "Bethlehem homeowner",
    },
    images: [
      {
        src: "/images/projects/bethlehem-pool-patio/after/pool-patio-overview.jpg",
        alt: "Finished pool patio — wide view of new hardscape and pool surround in Bethlehem.",
      },
      {
        src: "/images/projects/bethlehem-pool-patio/after/pool-patio-steps.jpg",
        alt: "Step and radius detail along the pool edge after renovation.",
      },
    ],
    beforeImages: [
      {
        src: "/images/projects/bethlehem-pool-patio/before/pool-patio-before.jpg",
        alt: "Pool patio before renovation — worn surface and dated pool surround.",
      },
    ],
    afterImages: [
      {
        src: "/images/projects/bethlehem-pool-patio/after/pool-patio-overview.jpg",
        alt: "Pool patio after renovation — updated hardscape and cleaner lines around the full surround.",
      },
    ],
  },
  {
    slug: "allentown-fire-damage-interior-rebuild",
    title: "Fire Damage Interior Rebuild in Allentown",
    summary:
      "Interior fire-damage rebuild with phased repairs, documented scope planning, and coordinated finish restoration. The project focused on turning a chaotic damage situation into a clearer path back to usable interior space.",
    locationName: "Allentown, PA",
    locationSlug: "allentown-pa",
    serviceName: "Fire Damage Restoration",
    serviceSlug: "fire-damage-restoration",
    timeline: "Scope-dependent, phased reconstruction",
    scope: [
      "Review damage and organize the rebuild scope",
      "Restore affected drywall and interior finish surfaces",
      "Complete phased closeout review and correction items",
    ],
    challenge:
      "After fire-related damage, the project needed a clear rebuild sequence that could restore affected interior areas without letting the scope drift.",
    solution:
      "The rebuild was organized in phases so damaged areas could be restored in a controlled order, with clearer communication as interior finishes moved back into place.",
    results: [
      "A more structured path from damage to rebuild",
      "Better coordination across repair and finish stages",
      "Restored interior spaces with cleaner finished results",
    ],
    testimonial: {
      quote: "They brought structure to a chaotic situation and delivered quality work from start to finish.",
      author: "Allentown homeowner",
    },
    images: [
      { src: "/images/projects/fireplace-construction-project/after/bathroom-tile-in-progress.jpg", alt: "Repair area prepared during the restoration rebuild phase." },
      { src: "/images/projects/fireplace-construction-project/after/fireplace-hearth-finished.jpg", alt: "Rebuilt interior finish work after a fire-damage restoration project." },
    ],
  },
  {
    slug: "ryan-bedroom-interior-refresh",
    title: "Bedroom Interior Refresh (Blue Palette)",
    summary:
      "Bedroom interior refresh with updated wall color, cleaner finish lines, and coordinated trim and detail work from early prep through final walkthrough.",
    locationName: "Berks County, PA",
    locationSlug: "berks-county-pa",
    serviceName: "Flooring Installation",
    serviceSlug: "flooring-installation",
    timeline: "Several days to 2 weeks",
    scope: [
      "Interior finish refresh and paint coordination",
      "Protection and sequencing for occupied living space",
      "Final cleanup and punch-list walkthrough",
    ],
    challenge:
      "The room needed a clearer color direction and more polished finish transitions without dragging out disruption in a lived-in home.",
    solution:
      "Work was phased from prep through final coat and detail touch-ups, with process checkpoints so the refreshed palette and trim lines would read clean in everyday light.",
    results: [
      "A more intentional bedroom color story",
      "Cleaner finish transitions along trim and corners",
      "A space that feels more finished without overbuilding the scope",
    ],
    beforeImages: [
      {
        src: "/images/projects/ryan-bedroom/before/01-interior-refresh-before.jpg",
        alt: "Bedroom before interior refresh with original wall and trim condition.",
      },
    ],
    afterImages: [
      {
        src: "/images/projects/ryan-bedroom/after/05-interior-refresh-blue-done.jpg",
        alt: "Bedroom interior refresh after updated blue wall color and finished trim.",
      },
    ],
    images: [
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
        src: "/images/projects/ryan-bedroom/before/02-interior-refresh-blue-before-2.jpg",
        alt: "Additional before view of bedroom walls prior to refresh.",
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
    slug: "blue-kitchen-cabinet-counters",
    title: "Blue Kitchen Cabinets and Countertops",
    summary:
      "Kitchen upgrade focused on cabinet installation, countertop coordination, and clean finish sequencing from layout planning through final hardware and punch list.",
    locationName: "Lehigh Valley, PA",
    locationSlug: "lehigh-valley-pa",
    serviceName: "Kitchen Remodeling",
    serviceSlug: "kitchen-remodeling",
    timeline: "4 to 6 weeks",
    scope: [
      "Cabinet layout coordination and installation",
      "Countertop templating, install, and seam detailing",
      "Trim, backsplash-adjacent prep, and final finish walkthrough",
    ],
    challenge:
      "The kitchen needed a bolder cabinet direction and countertops that would line up cleanly with the layout without leaving awkward gaps or rushed transitions.",
    solution:
      "The build followed a clear sequence from cabinet set to countertop install, with layout documentation and field adjustments so the finished kitchen would read tight and intentional.",
    results: [
      "Coordinated blue cabinet run with cleaner sight lines",
      "Countertops set square to cabinets with disciplined edge and seam detail",
      "A kitchen that feels more custom without unnecessary scope creep",
    ],
    images: [
      { src: "/images/projects/blue-kitchen-cabinet-counters/after/05-blue-kitchen-cabinets-finished-2.jpg", alt: "Finished kitchen with blue cabinets and installed countertops." },
      { src: "/images/projects/blue-kitchen-cabinet-counters/after/04-blue-kitchen-cabinets-done.jpg", alt: "Kitchen cabinets and counters complete after installation." },
      { src: "/images/projects/blue-kitchen-cabinet-counters/after/02-blue-kitchen-after_.jpg", alt: "Kitchen after cabinet and counter upgrade." },
      { src: "/images/projects/blue-kitchen-cabinet-counters/after/01-blue-kitchen-2.jpg", alt: "Updated kitchen overview with blue cabinet finish." },
      { src: "/images/projects/blue-kitchen-cabinet-counters/after/03-blue-kitchen-cabinets-1.jpg", alt: "Cabinet and counter detail after kitchen upgrade." },
      { src: "/images/projects/blue-kitchen-cabinet-counters/process/01-blue-kitchen-cabinets-counter-top-install.jpg", alt: "Countertop installation phase during kitchen remodel." },
      { src: "/images/projects/blue-kitchen-cabinet-counters/process/02-blue-kitchen-cabinets-process.jpg", alt: "Kitchen cabinets during installation and alignment." },
      { src: "/images/projects/blue-kitchen-cabinet-counters/marketing/01-blue-kitchen-cabinet-layout-diagram.png", alt: "Cabinet layout diagram used to coordinate the kitchen plan." },
    ],
  },
  {
    slug: "ryan-kitchen-remodel",
    title: "Kitchen Remodel in Berks County",
    summary:
      "Complete kitchen reset: dated cabinets and finishes were replaced with a coordinated cabinet, counter, and fixture package, built on a phased schedule the household could plan around.",
    locationName: "Berks County, PA",
    locationSlug: "berks-county-pa",
    serviceName: "Kitchen Remodeling",
    serviceSlug: "kitchen-remodeling",
    timeline: "4 to 8 weeks",
    scope: [
      "Kitchen demo prep and protection",
      "Cabinet, counter, and fixture coordination",
      "Final finishes, cleanup, and walkthrough",
    ],
    challenge:
      "The kitchen needed a complete visual and functional reset while keeping the project organized enough that the household could plan around a predictable build schedule.",
    solution:
      "We built a phased schedule around cabinet and counter milestones, communicated checkpoints as finishes came together, and closed out with a punch list focused on daily-use details.",
    results: [
      "A fully updated kitchen presentation from the working triangle to storage",
      "Cleaner appliance and fixture integration",
      "A finished space that feels move-in ready",
    ],
    images: [
      {
        src: "/images/projects/ryan-kitchen/after/01-ryans-kitchen-after-done.jpg",
        alt: "Kitchen after remodel — updated cabinets, counters, appliances, and lighting.",
      },
    ],
    beforeImages: [
      {
        src: "/images/projects/ryan-kitchen/before/01-ryans-kitchen-before.jpg",
        alt: "Kitchen before remodel — original cabinets, counters, and layout prior to demolition.",
      },
    ],
    afterImages: [
      {
        src: "/images/projects/ryan-kitchen/after/01-ryans-kitchen-after-done.jpg",
        alt: "Kitchen after remodel — same vantage as before, showing the full transformation.",
      },
    ],
  },
  {
    slug: "ryan-bathroom-remodel",
    title: "Bathroom Remodel in Berks County",
    summary:
      "Half-bath refresh: darker dated finishes were swapped for a brighter, modern palette with a coordinated vanity, wall, and floor package in a compact footprint.",
    locationName: "Berks County, PA",
    locationSlug: "berks-county-pa",
    serviceName: "Bathroom Remodeling",
    serviceSlug: "bathroom-remodeling",
    timeline: "2 to 4 weeks",
    scope: [
      "Vanity, fixture, and finish replacement",
      "Moisture-aware prep in wet-adjacent zones",
      "Final detailing and turnover cleaning",
    ],
    challenge:
      "The bathroom needed a full finish reset that would feel brighter and more current without overcomplicating a compact footprint.",
    solution:
      "We focused on a tight material palette, disciplined waterproofing at critical transitions, and installation sequencing that kept the room out of service for as short a window as practical.",
    results: [
      "A brighter, more modern bathroom presentation",
      "Coordinated vanity, wall, and floor finishes",
      "A compact space that feels intentional, not cramped",
    ],
    images: [
      {
        src: "/images/projects/ryan-bathroom/after/ryans-bathroom-finished.jpg",
        alt: "Bathroom after remodel — vanity, mirror, and wall finishes in the finished half bath.",
      },
    ],
    beforeImages: [
      {
        src: "/images/projects/ryan-bathroom/before/ryans-bathroom-before.jpg",
        alt: "Bathroom before remodel — original vanity, mirror wall, and floor at the same viewpoint.",
      },
    ],
    afterImages: [
      {
        src: "/images/projects/ryan-bathroom/after/ryans-bathroom-finished.jpg",
        alt: "Bathroom after remodel — same viewpoint as before for a direct before/after read.",
      },
    ],
  },
  {
    slug: "lehigh-valley-fire-damage-documentation",
    title: "Fire Damage Rebuild — Field Documentation",
    summary:
      "Field photo set from a fire-damage rebuild: conditions after loss, exposed framing and MEP, and progress through restoration. Useful for understanding how we document scope and sequencing on complex interior rebuilds.",
    locationName: "Lehigh Valley, PA",
    locationSlug: "lehigh-valley-pa",
    serviceName: "Fire Damage Restoration",
    serviceSlug: "fire-damage-restoration",
    timeline: "Scope-dependent, phased reconstruction",
    scope: [
      "Photo documentation for affected areas and rebuild phasing",
      "Coordinated demolition, stabilization, and reconstruction planning",
      "Interior finish restoration aligned with documented scope",
    ],
    challenge:
      "Fire losses need traceable documentation so owners and adjusters can follow what was affected and how the rebuild advances.",
    solution:
      "We captured conditions across demolition, rough-in, and finish stages so the project story stays clear from loss through completion.",
    results: [
      "Stronger alignment on what changed at each stage",
      "Clearer communication during a high-stress rebuild",
      "Better support for insurance-related documentation needs",
    ],
    images: fireDamageDocumentationAfterFiles.map((file, i) => ({
      src: `/images/projects/fire-damage-documentation/after/${file}`,
      alt: `Fire damage rebuild documentation - project photo ${i + 1}.`,
    })),
  },
  {
    slug: "beige-bathroom-before-after",
    title: "Beige Bathroom Refresh (Layouts)",
    hidden: true,
    summary:
      "Reserved case study for a beige bathroom refresh. Current assets are design-template PNGs only — add real before/after job photos, then set hidden to false and rewrite copy to match the actual scope.",
    locationName: "Lehigh Valley, PA",
    locationSlug: "lehigh-valley-pa",
    serviceName: "Bathroom Remodeling",
    serviceSlug: "bathroom-remodeling",
    timeline: "TBD",
    featureInServiceListings: false,
    scope: [
      "Bathroom finish refresh planning",
      "Before/after documentation once photography is available",
      "Fixture and material coordination to be confirmed on site",
    ],
    challenge:
      "Placeholder visuals need to be swapped for real project photography before this page represents a completed job.",
    solution:
      "Treat this entry as a staging record: upload true before/after photos into public/images/projects/beige-bathroom-before-after/, update copy to match the real scope, and remove or archive the template PNGs.",
    results: [
      "Clear placeholder until real documentation is added",
      "No claim of finished photography where templates are shown",
    ],
    images: [
      {
        src: "/images/projects/beige-bathroom-before-after/marketing/01-beige-minimalist-skincare-before-and-after-instagram-post-1-.png",
        alt: "Design template graphic for before/after layout — not on-site job photography.",
      },
      {
        src: "/images/projects/beige-bathroom-before-after/marketing/02-beige-minimalist-skincare-before-and-after-instagram-post.png",
        alt: "Design template graphic for before/after layout — not on-site job photography.",
      },
    ],
  },
];

const caseStudyLocationPriority = [
  "allentown-pa",
  "bethlehem-pa",
  "lehigh-valley-pa",
  "reading-pa",
  "berks-county-pa",
  "wyomissing-pa",
] as const;

export const visibleCaseStudies = caseStudies.filter((cs) => !cs.hidden);

export function sortCaseStudiesByMarketPriority(items: CaseStudy[]) {
  return [...items].sort((a, b) => {
    const aPriority = caseStudyLocationPriority.indexOf(
      a.locationSlug as (typeof caseStudyLocationPriority)[number],
    );
    const bPriority = caseStudyLocationPriority.indexOf(
      b.locationSlug as (typeof caseStudyLocationPriority)[number],
    );
    const normalizedAPriority = aPriority === -1 ? caseStudyLocationPriority.length : aPriority;
    const normalizedBPriority = bPriority === -1 ? caseStudyLocationPriority.length : bPriority;

    if (normalizedAPriority !== normalizedBPriority) {
      return normalizedAPriority - normalizedBPriority;
    }

    return a.title.localeCompare(b.title);
  });
}

export function getCaseStudyBySlug(slug: string) {
  return visibleCaseStudies.find((caseStudy) => caseStudy.slug === slug);
}

/** Other visible case studies for project detail “similar work” blocks: same service first, then same market. */
export function getSimilarCaseStudiesForProject(current: CaseStudy, limit = 4): CaseStudy[] {
  const byService = visibleCaseStudies.filter(
    (c) => c.slug !== current.slug && c.serviceSlug === current.serviceSlug,
  );
  const serviceOrdered = sortCaseStudiesByMarketPriority(byService);
  if (serviceOrdered.length >= limit) return serviceOrdered.slice(0, limit);

  const byLocation = visibleCaseStudies.filter(
    (c) =>
      c.slug !== current.slug &&
      c.locationSlug === current.locationSlug &&
      !serviceOrdered.some((s) => s.slug === c.slug),
  );
  const locationOrdered = sortCaseStudiesByMarketPriority(byLocation);
  return [...serviceOrdered, ...locationOrdered].slice(0, limit);
}
