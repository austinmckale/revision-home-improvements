import type { CaseStudy } from "@/content/caseStudies";

type Photo = CaseStudy["images"][number];

const photo = (path: string, alt: string): Photo => ({ src: `/images/projects/${path}`, alt });

/**
 * Public descriptions limited to visible features in supplied media.
 * Source filenames and legacy URLs are retained, but do not establish a town,
 * contract, completion date, hidden construction scope, or customer quotation.
 */
const overview = (details: Partial<CaseStudy>): Partial<CaseStudy> => ({
  mediaType: "photos",
  locationName: "Photo collection",
  locationSlug: "",
  timeline: "",
  scope: [],
  challenge: "",
  solution: "",
  results: [],
  testimonial: undefined,
  beforeImages: [],
  afterImages: [],
  photoGroups: [],
  ...details,
});

const exteriorViews = [
  photo(
    "lehigh-valley-exterior-refresh/after/exterior-finished.jpg",
    "Wide front view of a house with dormer windows, a porch, and contrasting shutters.",
  ),
  photo(
    "lehigh-valley-exterior-refresh/after/exterior-after.jpg",
    "Closer front view of dormers, contrasting shutters, and the porch entry.",
  ),
];
const exteriorEarlier = photo(
  "lehigh-valley-exterior-refresh/before/exterior-before.jpg",
  "Supplied earlier-condition front view showing the same dormer, window, and porch arrangement.",
);

const fireFrames: Array<[string, string]> = [
  ["01-img_7761.jpg", "Boarded dormer window with light-colored trim above a shingled roof."],
  ["02-img_7762.jpg", "Boarded dormer window with darkened gable trim."],
  ["03-img_7764.jpg", "Exposed interior wall studs, ceiling framing, and floorboards."],
  ["04-img_7765.jpg", "Open wall framing beside a boarded window."],
  ["05-img_7766.jpg", "View through exposed wall partitions and ceiling framing."],
  ["06-img_7768.jpg", "Boarded window and surrounding exposed wall studs."],
  ["07-img_7769.jpg", "Boarded window centered in a wall stripped to framing."],
  ["08-img_7770.jpg", "Boarded window with daylight visible around the opening."],
  ["09-img_8454.jpg", "Open front entry with sidelights and exposed interior framing."],
  ["10-img_8455.jpg", "Inside the front entry, showing wall studs and ceiling joists."],
  ["11-img_8456.jpg", "Exposed framing and wiring along the entry passage."],
  ["12-img_8457.jpg", "Staircase beside open wall framing and an unfinished floor."],
  ["13-img_8458.jpg", "Wide interior view with open ceiling joists and wall partitions."],
  ["14-img_8459.jpg", "Interior room with exposed ceiling framing, wall studs, and materials on the floor."],
  ["15-img_8460.jpg", "Window-side view across an interior stripped to framing."],
  ["16-img_8461.jpg", "Long interior view beneath exposed ceiling framing."],
  ["17-img_8462.jpg", "Exposed wall and ceiling framing along an unfinished room."],
  ["18-img_8463.jpg", "Stair landing beside open framing and bagged materials."],
  ["19-img_8464.jpg", "View toward the staircase through the unfinished entry area."],
  ["20-img_8465.jpg", "Staircase leading upward between exposed wall framing."],
  ["21-img_8466.jpg", "Upper-level passage with exposed studs and ceiling insulation."],
  ["22-img_8467.jpg", "Room opening with exposed studs, ceiling insulation, and a window beyond."],
  ["23-img_8468.jpg", "Framed doorway leading into an unfinished room."],
  ["24-img_8469.jpg", "Unfinished room with ceiling insulation and exposed perimeter framing."],
  ["25-img_8470.jpg", "Open room with bare wall studs and ceiling insulation."],
  ["26-img_8471.jpg", "View across wall partitions toward a sunlit unfinished room."],
  ["27-img_8472.jpg", "Sunlight crossing the floor between exposed wall partitions."],
  ["28-img_8473.jpg", "Window-side corner with exposed studs and ceiling insulation."],
  ["29-img_8474.jpg", "Exposed framing around a window and interior partition."],
  ["30-img_8475.jpg", "White bathtub and surrounding unfinished wall framing."],
  ["31-img_8476.jpg", "Unfinished interior partitions with overhead insulation and a loose window unit."],
  ["32-img_8477.jpg", "Interior corner with wall studs, wiring, and overhead insulation."],
  ["33-img_8478.jpg", "View through exposed partitions into a room with a window."],
  ["34-img_8479.jpg", "Narrow view beside a window through unfinished framing."],
  ["35-img_8480.jpg", "Wide room view with exposed framing and ceiling insulation."],
  ["36-img_8933.jpg", "Snow-covered exterior with boarded windows and a brick chimney."],
  ["37-img_8934.jpg", "Visibly damaged upper exterior above a stone-faced lower story."],
  ["38-img_8935.jpg", "Side view of a damaged house with boarded windows in snow."],
];
const fieldPhotos = fireFrames.map(([file, alt]) => photo(`fire-damage-documentation/after/${file}`, alt));

export const projectEvidenceOverrides: Record<string, Partial<CaseStudy>> = {
  "allentown-kitchen-layout-upgrade": overview({
    title: "Two-tone island kitchen",
    summary:
      "A dark island with bright countertops and pendant lights sits at the center of the room, framed by warm wood cabinetry and a full stainless appliance wall.",
    featureInServiceListings: true,
    scope: [
      "Island seating and contrasting cabinetry",
      "Pendant and recessed lighting",
      "Stainless appliance wall and bright countertops",
    ],
    evidenceNote: "",
    images: [
      photo(
        "allentown-kitchen-upgrade/hero/kitchen-high-end-hero.jpg",
        "Kitchen island with a white countertop, dark base cabinets, pendant lights, and an appliance wall.",
      ),
      photo(
        "allentown-kitchen-upgrade/after/kitchen-high-end-island.jpg",
        "Opposite view of the island kitchen showing wood-tone wall cabinets and pendant lights.",
      ),
    ],
  }),
  "bethlehem-bathroom-refresh": overview({
    title: "Black-framed shower & sliding door",
    summary:
      "A white shower with a black frame and a gray vanity keep the palette crisp, while a sliding wood door adds warmth at the entry.",
    scope: [
      "White shower enclosure with a dark frame",
      "Gray vanity and dark hardware",
      "Sliding wood door and adjacent trim",
    ],
    images: [
      photo(
        "bethlehem-bathroom-refresh/after/bathroom-door-open.jpg",
        "Sliding wood door opening to a bathroom with a dark-framed white shower enclosure.",
      ),
      photo(
        "bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
        "White shower enclosure with a dark frame beside a gray vanity and toilet.",
      ),
    ],
  }),
  "allentown-commercial-bathroom-renovation": overview({
    title: "Commercial restroom & corridor",
    summary:
      "Blue stall partitions and gray flooring in the restroom, and a bright, freshly painted corridor outside it. Compare the corridor before and after.",
    featureInServiceListings: false,
    scope: ["Blue restroom partitions and floor surfaces", "Painted block-wall corridor", "Stall and fixture details"],
    images: [
      photo(
        "allentown-commercial-bathroom/after/sink-area-after.png",
        "Commercial restroom with blue stall partitions, gray floor surfaces, and a urinal.",
      ),
      photo(
        "allentown-commercial-bathroom/after/floor-after.png",
        "Restroom passage showing gray floor surfaces, fixtures, and a suspended ceiling.",
      ),
    ],
    beforeImages: [
      photo(
        "allentown-commercial-bathroom/before/hallway-before.png",
        "Supplied earlier-condition view along a block-wall corridor.",
      ),
    ],
    afterImages: [
      photo(
        "allentown-commercial-bathroom/after/hallway-after.png",
        "Matching corridor view with light painted walls and dark floor surfaces.",
      ),
    ],
  }),
  "allentown-exterior-log-home-refresh": overview({
    title: "Log-style exterior",
    summary:
      "Log-style siding and crisp contrasting trim carry from the front of the house around to the garage side.",
    scope: ["Log-style wall surfaces and contrasting trim", "Front and garage-side elevations", "Upper-facade access"],
    images: [
      photo(
        "allentown-exterior-log-home/after/front-finished.jpg",
        "Front elevation of a log-style house with contrasting window trim and a garage below.",
      ),
      photo(
        "allentown-exterior-log-home/after/garage-elevation.jpg",
        "Garage-side elevation of the same log-style house.",
      ),
      photo(
        "allentown-exterior-log-home/process/lift-access-work.jpg",
        "Access lift positioned beside the upper facade of the log-style house.",
      ),
    ],
  }),
  "bethlehem-exterior-staircase-build": overview({
    title: "Exterior stair & landing",
    summary:
      "A compact exterior stair rises to an elevated landing, with light posts and dark railing infill.",
    scope: ["Elevated exterior landing", "Stair run and support posts", "Light posts with dark railing infill"],
    images: [
      photo(
        "bethlehem-exterior-staircase/after/staircase-finished.jpg",
        "Exterior staircase and elevated landing with light posts and dark railing infill.",
      ),
    ],
  }),
  "reading-commercial-bar-window-upgrade": overview({
    title: "Bar room windows & trim",
    summary:
      "A long run of windows with dark trim and wall panels fills the bar seating area with daylight.",
    featureInServiceListings: false,
    scope: ["Windows along the seating wall", "Dark window trim and wall panels", "Natural light across the bar area"],
    images: [
      photo(
        "reading-commercial-bar-window/after/window-upgrade.jpg",
        "Row of windows with dark trim beside a long commercial bar seating area.",
      ),
    ],
  }),
  "lehigh-valley-full-exterior-refresh": overview({
    title: "Dormers, shutters & front porch",
    summary:
      "Light siding and dark shutters frame the dormers and the front porch. See the full front, the trim up close and a before view.",
    scope: ["Dormer and window trim details", "Contrasting shutters and porch entry", "Front and side elevation views"],
    evidenceNote: "",
    images: [
      ...exteriorViews,
      photo(
        "lehigh-valley-exterior-refresh/process/exterior-in-progress.jpg",
        "Side and front exterior view with unfinished upper facade surfaces and materials beside the house.",
      ),
    ],
    beforeImages: [exteriorEarlier],
    afterImages: [exteriorViews[0]],
  }),
  "lehigh-valley-dormer-shutter-detail-refresh": overview({
    title: "Dormer & shutter details",
    summary: "A closer look at the window trim, dark shutters and porch from the full exterior project.",
    scope: ["Dormer trim and window arrangement", "Contrasting shutters", "Porch and front-entry details"],
    showInGallery: false,
    featureInServiceListings: false,
    sharedCollectionSlug: "lehigh-valley-full-exterior-refresh",
    evidenceNote: "",
    images: [exteriorViews[1], exteriorViews[0]],
    photoGroups: [{ title: "Earlier exterior view", images: [exteriorEarlier] }],
  }),
  "bethlehem-interior-flooring-refresh": overview({
    title: "Warm wood flooring",
    summary:
      "Rich, warm-toned floorboards against light walls and crisp white trim, with a cased opening into the next room.",
    scope: ["Warm-toned floorboards", "Trimmed opening between rooms", "Light walls and recessed ceiling lights"],
    images: [
      photo(
        "bethlehem-interior-flooring-refresh/after/flooring-refresh.jpg",
        "Interior room with warm-toned floorboards, light walls, recessed lights, and a trimmed wall opening.",
      ),
    ],
  }),
  "berks-county-ranch-exterior-refresh": overview({
    title: "Classic ranch exterior",
    summary:
      "Light siding, dark shutters and a dark entry railing give this single-story home clean, classic curb appeal.",
    scope: ["Single-story front elevation", "Contrasting shutters and railing", "Front entry and landscaping"],
    images: [
      photo(
        "berks-county-ranch-exterior/after/exterior-refresh.jpg",
        "Single-story house with light siding, dark shutters, a compact front entry, and lawn.",
      ),
    ],
  }),
  "lehigh-valley-basement-finish-and-detail": overview({
    title: "Basement media room",
    summary:
      "A large screen and a linear fireplace share one feature wall, with recessed lighting overhead and a high-gloss patterned floor below.",
    scope: [
      "Media wall with screen and linear fireplace",
      "Speaker placement and wall detailing",
      "Glossy patterned floor and ceiling lights",
    ],
    images: [
      photo(
        "lehigh-valley-basement-theater/after/media-room-big-screen.jpg",
        "Basement media wall with a large screen, linear fireplace, and glossy patterned floor.",
      ),
      photo(
        "lehigh-valley-basement-theater/after/epoxy-floor-big-screen.jpg",
        "Wide basement view showing the media wall, columns, ceiling lights, and glossy patterned floor.",
      ),
      photo(
        "lehigh-valley-basement-theater/after/wide-view-layout.jpg",
        "Closer media-wall view with visible speaker positions and a linear fireplace.",
      ),
      photo(
        "lehigh-valley-basement-theater/after/wide-angle-room-flow.jpg",
        "Wide room view showing columns, furniture, ceiling lights, and the media wall.",
      ),
    ],
  }),
  "lehigh-water-damage-rebuild": overview({
    title: "Water-damage reconstruction planning",
    summary:
      "Plan the path back to usable rooms after source control and drying: affected finishes, repair priorities, access, and inspection needs.",
    mediaType: "planning",
    showInGallery: false,
    featureInServiceListings: false,
    scope: [
      "Affected rooms and finish selections",
      "Repair priorities after source control and drying",
      "Access, sequencing, and inspection planning",
    ],
    evidenceNote: "Illustrative planning outline, not a completed project.",
    images: [],
  }),
  "allentown-flooring-replacement-upgrade": overview({
    title: "Light floors, open living",
    summary:
      "Light wood-look flooring runs from the living room to the kitchen opening and fireplace wall, with sliding doors bringing in daylight.",
    scope: ["Light wood-look floor surfaces", "Fireplace-wall and trim details", "Kitchen opening and sliding doors"],
    images: [
      photo(
        "allentown-flooring-replacement/after/living-room-finished.jpg",
        "Living room with light wood-look flooring and an opening to the kitchen.",
      ),
      photo(
        "allentown-flooring-replacement/after/fireplace-wall-renovation.jpg",
        "Opposite room view showing the fireplace wall, light floor surfaces, and sliding doors.",
      ),
    ],
  }),
  "bethlehem-drywall-and-finish-repair": overview({
    title: "Clean interior finishes",
    summary:
      "Smooth light walls, clean corners and white closet doors over a tile floor, finished with ceiling lights and a fan.",
    featureInServiceListings: false,
    scope: ["Walls, corners, and doorways", "Ceiling lights and fan", "Tile floor and closet doors"],
    images: [
      photo(
        "bethlehem-drywall-finish-repair/after/finished-room.jpg",
        "Interior room with light walls, ceiling lights and fan, tiled floor, and closet doors.",
      ),
    ],
  }),
  "reading-paver-patio-buildout": overview({
    title: "Paver patio & gable-roof pavilion",
    summary:
      "We built the paver patio and the gable-roof pavilion over it as one outdoor room, with a warm wood ceiling, recessed lighting and planted edges.",
    scope: ["Patio surface and garden edges", "Gable-roof pavilion and support posts", "Wood ceiling and lighting"],
    images: [
      photo(
        "frontier-patio-gable-roof/after/finished-overview.jpg",
        "Patio and gable-roof pavilion with garden edges beside a house.",
      ),
      photo(
        "frontier-patio-gable-roof/after/angle-1.jpg",
        "Front view of the gable-roof pavilion, support posts, and patio surface.",
      ),
      photo("frontier-patio-gable-roof/after/angle-2.jpg", "Pavilion wood ceiling and roof framing viewed from below."),
      photo(
        "frontier-patio-gable-roof/after/finished-alt.jpg",
        "Side view beneath the pavilion roof showing posts, patio edges, and garden planting.",
      ),
    ],
    photoGroups: [
      {
        title: "Framing in progress",
        images: [
          photo(
            "frontier-patio-gable-roof/process/patio-construction.jpg",
            "Timber support framing, bracing, and a ladder beside the patio area during construction.",
          ),
        ],
      },
    ],
  }),
  "bethlehem-pool-patio-renovation": overview({
    title: "Poolside surround",
    summary:
      "A gray textured surround with a light stone-pattern border that follows every curve of the pool, from the steps to the rounded edges.",
    scope: ["Curved poolside surface", "Light stone-pattern border", "Pool-step and radius details"],
    images: [
      photo(
        "bethlehem-pool-patio/after/pool-patio-overview.jpg",
        "Curved pool surround with a gray textured surface and a light stone-pattern border.",
      ),
      photo(
        "bethlehem-pool-patio/after/pool-patio-steps.jpg",
        "Pool-step and curved edge view beside the gray surround and light border.",
      ),
    ],
    beforeImages: [
      photo(
        "bethlehem-pool-patio/before/pool-patio-before.jpg",
        "Supplied earlier-condition view of the curved pool with a green surrounding surface.",
      ),
    ],
    afterImages: [
      photo(
        "bethlehem-pool-patio/after/pool-patio-overview.jpg",
        "Matching pool shape with a gray textured surround and light stone-pattern border.",
      ),
    ],
  }),
  "allentown-fire-damage-interior-rebuild": overview({
    title: "Fireplace surround & hearth",
    summary:
      "A light fireplace surround above a dark hearth makes a clean focal point for the room.",
    serviceName: "Drywall Installation and Repair",
    serviceSlug: "drywall-installation-repair",
    featureInServiceListings: false,
    scope: ["Light fireplace surround", "Dark hearth and side opening", "Surface and flooring transitions"],
    evidenceNote: "",
    images: [
      photo(
        "fireplace-construction-project/after/fireplace-hearth-finished.jpg",
        "Light fireplace surround above a dark hearth beside a rectangular side opening.",
      ),
      photo(
        "fireplace-construction-project/after/bathroom-tile-in-progress.jpg",
        "Angled view of the same fireplace surround and dark hearth with unfinished adjacent surfaces.",
      ),
    ],
  }),
  "ryan-bedroom-interior-refresh": overview({
    title: "Bedroom in deep blue",
    summary:
      "Deep wall color, bright white trim and warm wood-look flooring. Compare the room before and after, and see it mid-project.",
    scope: ["Wall colors and white trim", "Carpet and wood-look floor surfaces", "Windows and ceiling fan"],
    images: [
      photo(
        "ryan-bedroom/after/01-interior-refresh-blue-completed.jpg",
        "Bedroom with dark walls, white trim, wood-look flooring, and a dark ceiling fan.",
      ),
      photo(
        "ryan-bedroom/before/02-interior-refresh-blue-before-2.jpg",
        "Matching bedroom with lighter walls, carpet, and the same window arrangement and ceiling fan.",
      ),
      photo(
        "ryan-bedroom/process/01-interior-refresh-blue-2-process.jpg",
        "Bedroom work-stage view with dark walls, wood-look flooring, and materials near the doorway.",
      ),
      photo(
        "ryan-bedroom/process/02-interior-refresh-blue-in-progress.jpg",
        "Bedroom work-stage view with materials beside the wood-look floor and partially painted walls.",
      ),
    ],
    beforeImages: [
      photo(
        "ryan-bedroom/before/01-interior-refresh-before.jpg",
        "Supplied earlier-condition bedroom view with carpet, light walls, and a ceiling fan.",
      ),
    ],
    afterImages: [
      photo(
        "ryan-bedroom/after/01-interior-refresh-blue-completed.jpg",
        "Matching bedroom with dark walls, white trim, and wood-look flooring.",
      ),
      photo(
        "ryan-bedroom/after/04-interior-refresh-blue-4.jpg",
        "Doorway view of the bedroom with dark walls and wood-look flooring.",
      ),
    ],
  }),
  "blue-kitchen-cabinet-counters": overview({
    title: "Blue cabinet kitchen",
    summary:
      "Deep blue cabinetry with patterned gray countertops and a matching backsplash. Follow it from the cabinet layout through installation to the finished kitchen.",
    scope: [
      "Blue cabinet doors and hardware",
      "Countertop and appliance details",
      "Installation stages and cabinet layout",
    ],
    images: [
      photo(
        "blue-kitchen-cabinet-counters/after/05-blue-kitchen-cabinets-finished-2.jpg",
        "Kitchen with blue cabinets, patterned countertops and backsplash, a microwave, and a sink with a wood board and slatted rack.",
      ),
      photo(
        "blue-kitchen-cabinet-counters/after/04-blue-kitchen-cabinets-done.jpg",
        "Blue cabinet run with patterned countertops and backsplash, a sink and faucet, microwave, and beverage cooler.",
      ),
      photo(
        "blue-kitchen-cabinet-counters/after/02-blue-kitchen-after_.jpg",
        "Wide view of blue cabinets, patterned countertops and backsplash, a sink and faucet, microwave, and beverage cooler.",
      ),
      photo(
        "blue-kitchen-cabinet-counters/after/01-blue-kitchen-2.jpg",
        "Blue upper and lower cabinets with the countertop and sink area not yet installed.",
      ),
      photo(
        "blue-kitchen-cabinet-counters/after/03-blue-kitchen-cabinets-1.jpg",
        "Blue cabinet run with tools and installation materials on the floor.",
      ),
      photo(
        "blue-kitchen-cabinet-counters/process/01-blue-kitchen-cabinets-counter-top-install.jpg",
        "Close-up of patterned countertop and backsplash beside blue cabinetry, with a faucet and microwave above.",
      ),
      photo(
        "blue-kitchen-cabinet-counters/process/02-blue-kitchen-cabinets-process.jpg",
        "Blue cabinet installation with an open appliance space and unfinished counter area.",
      ),
    ],
    photoGroups: [
      {
        title: "Cabinet layout",
        description: "Cabinet sizes, appliance spaces and the plan for the main run.",
        images: [
          photo(
            "blue-kitchen-cabinet-counters/marketing/01-blue-kitchen-cabinet-layout-diagram.png",
            "Cabinet layout diagram with appliance spaces and dimension annotations.",
          ),
        ],
      },
    ],
  }),
  "ryan-kitchen-remodel": overview({
    title: "Crisp white kitchen",
    summary:
      "White cabinets, dark countertops and stainless appliances under recessed lighting. Compare the same corner before and after.",
    scope: [
      "Kitchen corner and window arrangement",
      "White cabinets and dark countertops",
      "Appliances and recessed lights",
    ],
    images: [
      photo(
        "ryan-kitchen/after/01-ryans-kitchen-after-done.jpg",
        "Kitchen corner with white cabinets, dark countertops, stainless appliances, and recessed lights.",
      ),
    ],
    beforeImages: [
      photo(
        "ryan-kitchen/before/01-ryans-kitchen-before.jpg",
        "Supplied earlier-condition kitchen corner with open cabinet frames and patterned flooring.",
      ),
    ],
    afterImages: [
      photo(
        "ryan-kitchen/after/01-ryans-kitchen-after-done.jpg",
        "Matching kitchen corner with white cabinets, dark countertops, and stainless appliances.",
      ),
    ],
  }),
  "ryan-bathroom-remodel": overview({
    title: "Double-vanity bathroom",
    summary:
      "A dark double-sink vanity, light walls and warm wood-look flooring, with a window that fills the room with daylight.",
    scope: ["Double-sink vanity and mirror", "Wall, window, and floor finishes", "Bathing area beside the vanity"],
    images: [
      photo(
        "ryan-bathroom/after/ryans-bathroom-finished.jpg",
        "Bathroom with a dark double-sink vanity, a window, wood-look floor, toilet, and bathing area.",
      ),
    ],
    photoGroups: [
      {
        title: "Another view",
        description: "A wood-tone vanity with darker flooring.",
        images: [
          photo(
            "ryan-bathroom/before/ryans-bathroom-before.jpg",
            "Source screenshot of a bathroom with a wood-tone vanity, darker floor, and window details.",
          ),
        ],
      },
    ],
  }),
  "hamburg-laundry-bathroom-remodel": overview({
    title: "Laundry & half-bath",
    summary:
      "One compact room that does double duty: laundry, a utility sink and open shelving beside a half-bath, finished in light walls and gray flooring.",
    scope: ["Utility sink and toilet area", "Laundry appliance and open shelving", "Window trim and floor surfaces"],
    images: [
      photo(
        "hamburg-laundry-bathroom/after/laundry-bathroom-doorway-view.jpg",
        "Doorway view of a laundry and half-bath with a laundry appliance, shelving, and gray floor surfaces.",
      ),
      photo(
        "hamburg-laundry-bathroom/after/vanity-toilet-and-shelving.jpg",
        "Utility-sink vanity, toilet, open shelves, and laundry appliance in a compact room.",
      ),
      photo(
        "hamburg-laundry-bathroom/after/laundry-bathroom-full-view.jpg",
        "Laundry and half-bath view showing shelving, appliance, toilet, and ceiling light.",
      ),
      photo(
        "hamburg-laundry-bathroom/after/window-trim-and-washer.jpg",
        "White window trim and roller shade beside the laundry appliance.",
      ),
    ],
    beforeImages: [
      photo(
        "hamburg-laundry-bathroom/before/laundry-bathroom-before.jpg",
        "Supplied earlier-condition view of the same narrow room with patterned flooring and an open wall bay.",
      ),
    ],
    afterImages: [
      photo(
        "hamburg-laundry-bathroom/after/laundry-bathroom-doorway-view.jpg",
        "Matching narrow-room view with a laundry appliance, open shelves, and updated floor surfaces.",
      ),
    ],
  }),
  "lehigh-valley-fire-damage-documentation": overview({
    title: "Open framing & interior conditions",
    summary:
      "Exposed studs, ceiling framing, and stairways show the interior conditions that reconstruction planning has to account for. Explore the entry, room partitions, and upper landing.",
    featureInServiceListings: false,
    scope: [
      "Exposed interior framing and stairways",
      "Unfinished room and bathroom conditions",
      "Entry, room partitions, and upper landing",
    ],
    evidenceNote: "Interior condition references for reconstruction planning.",
    images: fieldPhotos.slice(8, 35),
  }),
  "beige-bathroom-before-after": overview({
    title: "Bathroom comparison boards",
    summary: "Compare vanity, lighting, shower, and tile combinations across two bathroom finish boards.",
    mediaType: "planning",
    featureInServiceListings: false,
    scope: ["Vanity, mirror, and lighting combinations", "Shower fixtures and tile patterns"],
    evidenceNote: "Finish comparison graphics, not a completed RHI Pros project.",
    images: [
      photo(
        "beige-bathroom-before-after/beige-bathroom-layout-board-1.png",
        "Supplied graphic comparing two vanity-area photographs with printed before-and-after labels.",
      ),
      photo(
        "beige-bathroom-before-after/beige-bathroom-layout-board-2.png",
        "Supplied graphic comparing two shower photographs with printed before-and-after labels.",
      ),
    ],
  }),
};

/** Distinct spaces get their own public entry while retaining their original asset lineage. */
export const projectEvidenceSplits: Record<string, { sourceSlug: string; evidence: Partial<CaseStudy> }> = {
  "white-cabinet-open-plan-kitchen": {
    sourceSlug: "allentown-kitchen-layout-upgrade",
    evidence: overview({
      title: "White open-plan kitchen",
      summary:
        "Crisp white cabinetry and stainless appliances open straight into the living area, with gray wood-look flooring carrying through both spaces.",
      featureInServiceListings: true,
      scope: [
        "White cabinetry and stainless appliances",
        "Window-side sink and patterned countertops",
        "Open living area and gray wood-look flooring",
      ],
      images: [
        photo(
          "allentown-kitchen-upgrade/after/kitchen-remodel-finishes.jpg",
          "White-cabinet kitchen opening into a room with gray wood-look flooring and a ceiling fan.",
        ),
        photo(
          "allentown-kitchen-upgrade/after/kitchen-white-cabinets.jpg",
          "Closer view of the white-cabinet kitchen with a window above the sink and stainless appliances.",
        ),
      ],
    }),
  },
  "pink-tile-tub-reference": {
    sourceSlug: "bethlehem-bathroom-refresh",
    evidence: overview({
      title: "Pink tile & a jetted tub",
      summary:
        "Pink tile bands surround a white jetted tub, with grab bars and a wall-mounted handheld shower. This condition reference can help frame a conversation about an existing bathroom.",
      featureInServiceListings: false,
      scope: ["Pink tile bands and white wall tile", "Jetted tub and handheld shower", "Wall-mounted grab bars"],
      evidenceNote: "Existing-condition reference for bathroom planning.",
      images: [
        photo(
          "bethlehem-bathroom-refresh/before/bathroom-before-shower.jpg",
          "White jetted tub with pink tile bands, grab bars, and a wall-mounted handheld shower.",
        ),
      ],
    }),
  },
  "dark-partition-commercial-restroom": {
    sourceSlug: "allentown-commercial-bathroom-renovation",
    evidence: overview({
      title: "Charcoal restroom stalls",
      summary:
        "Charcoal stall partitions against light gray walls and plank-style floor tile, for a clean, modern commercial restroom.",
      featureInServiceListings: false,
      scope: [
        "Dark restroom partitions",
        "Rectangular floor tile and gray walls",
        "Toilet fixture and suspended ceiling",
      ],
      evidenceNote: "",
      images: [
        photo(
          "allentown-commercial-bathroom/after/stall-finished.jpg",
          "Toilet stall with dark partitions, gray walls, and rectangular floor tile.",
        ),
      ],
    }),
  },
  "boarded-dormer-condition-photos": {
    sourceSlug: "lehigh-valley-fire-damage-documentation",
    evidence: overview({
      title: "Boarded dormers & exposed walls",
      summary:
        "Boarded window openings, roof trim, and stripped interior walls show existing conditions before finish work. Explore the dormer details and exposed wall framing.",
      featureInServiceListings: false,
      scope: [
        "Boarded dormer windows and roof trim",
        "Exposed wall studs and ceiling framing",
        "Stripped interior window openings",
      ],
      evidenceNote: "Condition references for reconstruction planning.",
      images: fieldPhotos.slice(0, 8),
    }),
  },
  "winter-exterior-damage-photos": {
    sourceSlug: "lehigh-valley-fire-damage-documentation",
    evidence: overview({
      title: "Winter exterior conditions",
      summary:
        "Snow surrounds a house with boarded windows, a brick chimney, and visible damage above a stone-faced lower story. These exterior views document conditions for reconstruction planning.",
      featureInServiceListings: false,
      scope: ["Boarded windows and brick chimney", "Damaged upper exterior walls", "Stone-faced lower story"],
      evidenceNote: "Exterior condition references for reconstruction planning.",
      images: fieldPhotos.slice(35),
    }),
  },
};
