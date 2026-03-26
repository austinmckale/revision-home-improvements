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
      { src: "/images/projects/img_7833.jpg", alt: "Kitchen renovation with updated cabinets and modern finishes." },
      { src: "/images/projects/kitchen-1.jpg", alt: "Kitchen remodel with updated finishes and fixtures." },
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
      { src: "/images/projects/bathroom-after-4.jpg", alt: "Finished bathroom shower enclosure after remodel." },
      { src: "/images/projects/bathroom-finished-2.jpg", alt: "Finished shower detail with updated fixtures and trim." },
      { src: "/images/projects/bathroom-shelves-corner.jpg", alt: "Bathroom shelving and storage detail after remodel." },
    ],
    beforeImages: [
      { src: "/images/projects/bathroom-before-3.jpg", alt: "Bathroom before remodel with original shower layout." },
      { src: "/images/projects/bathroom-before-4.jpg", alt: "Bathroom before remodel with dated tile and fixtures." },
    ],
    afterImages: [
      { src: "/images/projects/bathroom-after-4.jpg", alt: "Finished bathroom shower enclosure after remodel." },
      { src: "/images/projects/bathroom-finished-2.jpg", alt: "Finished shower detail with updated fixtures and trim." },
    ],
  },
  {
    slug: "allentown-commercial-bathroom-renovation",
    title: "Commercial Bathroom Renovation in Allentown",
    summary:
      "Commercial bathroom and hallway renovation that updated worn restroom surfaces with cleaner, more durable finishes. The finished space reads sharper, brighter, and more professional from the stall area through the hallway.",
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
      "The bathroom and adjoining hallway looked worn and outdated, and the client needed the space cleaned up without sacrificing the durability required for daily commercial use.",
    solution:
      "The renovation treated the stall, wash, floor, and hallway areas as one connected refresh so the finish palette, wall surfaces, and flooring would feel cleaner, more consistent, and better suited to a busy commercial setting.",
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
        src: "/images/projects/allentown-commercial-bathroom-stall-finished.jpg",
        alt: "Finished commercial bathroom stall area after renovation in Allentown.",
      },
      {
        src: "/images/projects/allentown-commercial-bathroom-floor-after.png",
        alt: "Commercial bathroom floor area after renovation with refreshed finishes.",
      },
      {
        src: "/images/projects/allentown-commercial-bathroom-hallway-after.png",
        alt: "Commercial bathroom hallway after renovation in Allentown.",
      },
      {
        src: "/images/projects/allentown-commercial-bathroom-sink-area-after.png",
        alt: "Commercial bathroom sink area after renovation with updated surfaces.",
      },
    ],
    beforeImages: [
      {
        src: "/images/projects/allentown-commercial-bathroom-floor-before.png",
        alt: "Commercial bathroom floor area before renovation in Allentown.",
      },
      {
        src: "/images/projects/allentown-commercial-bathroom-hallway-before.png",
        alt: "Commercial bathroom hallway before renovation in Allentown.",
      },
      {
        src: "/images/projects/allentown-commercial-bathroom-sink-area-before.png",
        alt: "Commercial bathroom sink area before renovation in Allentown.",
      },
    ],
    afterImages: [
      {
        src: "/images/projects/allentown-commercial-bathroom-floor-after.png",
        alt: "Commercial bathroom floor area after renovation with a cleaner, more durable finish.",
      },
      {
        src: "/images/projects/allentown-commercial-bathroom-hallway-after.png",
        alt: "Commercial bathroom hallway after renovation with brighter walls and refreshed flooring.",
      },
      {
        src: "/images/projects/allentown-commercial-bathroom-sink-area-after.png",
        alt: "Commercial bathroom sink area after renovation with improved finish quality.",
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
        src: "/images/projects/allentown-exterior-log-style-home-front-finished.jpg",
        alt: "Finished log-style home exterior after remodeling work in Allentown.",
      },
      {
        src: "/images/projects/allentown-exterior-log-style-home-garage-elevation.jpg",
        alt: "Garage-side exterior elevation during remodeling work on a log-style home in Allentown.",
      },
      {
        src: "/images/projects/allentown-exterior-log-style-home-lift-access-work.jpg",
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
        src: "/images/projects/bethlehem-exterior-staircase-finished.jpg",
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
        src: "/images/projects/reading-commercial-bar-window-upgrade.jpg",
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
        src: "/images/projects/wyomissing-exterior-refresh-after.jpg",
        alt: "Finished full exterior refresh on a historic-style home in the Lehigh Valley.",
      },
      {
        src: "/images/projects/wyomissing-exterior-refresh-in-progress.jpg",
        alt: "Exterior refresh in progress on the Lehigh Valley home.",
      },
      {
        src: "/images/projects/wyomissing-exterior-refresh-finished.jpg",
        alt: "Finished front elevation after the Lehigh Valley exterior refresh.",
      },
    ],
    beforeImages: [
      {
        src: "/images/projects/wyomissing-exterior-refresh-before.jpg",
        alt: "Home exterior before shutters and finish updates in the Lehigh Valley.",
      },
    ],
    afterImages: [
      {
        src: "/images/projects/wyomissing-exterior-refresh-after.jpg",
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
        src: "/images/projects/wyomissing-exterior-refresh-after.jpg",
        alt: "Finished front elevation after dormer, shutter, and exterior detail refresh in the Lehigh Valley.",
      },
      {
        src: "/images/projects/wyomissing-exterior-refresh-finished.jpg",
        alt: "Refinished dormer and front-entry details after the Lehigh Valley exterior update.",
      },
    ],
    beforeImages: [
      {
        src: "/images/projects/wyomissing-exterior-refresh-before.jpg",
        alt: "Front elevation before dormer cleanup and shutter updates in the Lehigh Valley.",
      },
    ],
    afterImages: [
      {
        src: "/images/projects/wyomissing-exterior-refresh-after.jpg",
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
        src: "/images/projects/reading-interior-flooring-refresh.jpg",
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
        src: "/images/projects/berks-county-exterior-refresh.jpg",
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
      { src: "/images/projects/big-screen-basement.jpg", alt: "Finished basement media room with large screen." },
      { src: "/images/projects/basement-epoxy-floor-big-screen.jpg", alt: "Basement epoxy flooring finish detail." },
      { src: "/images/projects/pace-3.jpg", alt: "Wide basement view showing finished layout and floor detail." },
      { src: "/images/projects/pace-4.jpg", alt: "Basement wide-angle finish showing completed room flow." },
    ],
  },
  {
    slug: "lehigh-water-damage-rebuild",
    title: "Water Damage Interior Rebuild in Lehigh Valley",
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
    images: [
      { src: "/images/projects/img_7547.jpg", alt: "Completed bathroom-area finish restoration after water damage rebuild." },
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
      { src: "/images/projects/living-room-1.jpg", alt: "Completed light wood flooring installation in an Allentown living area." },
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
      { src: "/images/projects/finished-room.jpg", alt: "Paint-ready room surfaces after drywall repair and finish prep." },
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
      { src: "/images/projects/patio-construction-2.jpg", alt: "Patio construction phase during build." },
      { src: "/images/projects/Patio-Construction-site-frontier.jpg", alt: "Patio construction and base prep work in progress." },
    ],
  },
  {
    slug: "bethlehem-pool-patio-renovation",
    title: "Pool Patio Renovation in Bethlehem",
    summary:
      "Poolside patio renovation that replaced a worn surface with cleaner hardscape lines, stronger edge detailing, and a more finished backyard look.",
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
      { src: "/images/projects/bethlehem-pool-patio-after-overview.jpg", alt: "Finished pool patio renovation overview in Bethlehem." },
      { src: "/images/projects/bethlehem-pool-patio-after-steps.jpg", alt: "Finished pool patio detail showing updated curves and edge work." },
      { src: "/images/projects/bethlehem-pool-patio-before.jpg", alt: "Pool patio area before renovation with worn green surface." },
    ],
    beforeImages: [
      { src: "/images/projects/bethlehem-pool-patio-before.jpg", alt: "Pool patio before renovation in Bethlehem." },
    ],
    afterImages: [
      { src: "/images/projects/bethlehem-pool-patio-after-overview.jpg", alt: "Pool patio after renovation with updated hardscape around the pool." },
      { src: "/images/projects/bethlehem-pool-patio-after-steps.jpg", alt: "Pool patio step and curve detail after renovation in Bethlehem." },
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
      { src: "/images/projects/fire-place-construction.jpg", alt: "Interior reconstruction work after fire-related damage." },
      { src: "/images/projects/img_7540.jpg", alt: "Repair area prepared during the restoration rebuild phase." },
      { src: "/images/projects/img_7548.jpg", alt: "Rebuilt interior finish work after a fire-damage restoration project." },
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
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
