import { galleryCaseStudies, type CaseStudy } from "@/content/caseStudies";

/** Editorial placement is explicit: new projects must never inherit the hero slot. */
export const featuredProjectSlugs = [
  "reading-paver-patio-buildout",
  "lehigh-valley-basement-finish-and-detail",
  "blue-kitchen-cabinet-counters",
] as const;

const residentialOrder = [
  ...featuredProjectSlugs,
  "allentown-kitchen-layout-upgrade",
  "white-cabinet-open-plan-kitchen",
  "bethlehem-interior-flooring-refresh",
  "allentown-exterior-log-home-refresh",
  "hamburg-laundry-bathroom-remodel",
  "ryan-bathroom-remodel",
  "bethlehem-bathroom-refresh",
  "bethlehem-pool-patio-renovation",
  "berks-county-ranch-exterior-refresh",
  "allentown-flooring-replacement-upgrade",
  "ryan-kitchen-remodel",
  "ryan-bedroom-interior-refresh",
  "bethlehem-exterior-staircase-build",
  "bethlehem-drywall-and-finish-repair",
  "lehigh-valley-full-exterior-refresh",
  "lehigh-valley-dormer-shutter-detail-refresh",
  "allentown-fire-damage-interior-rebuild",
];

const commercialSlugs = new Set([
  "allentown-commercial-bathroom-renovation",
  "dark-partition-commercial-restroom",
  "reading-commercial-bar-window-upgrade",
]);

/**
 * How each project is presented. `title` is the editorial name; `spec` is a gallery-label line of what is
 * visible (cards show the name and spec only); `story` opens the project page when the photos carry one,
 * otherwise the page uses the plain summary. Every fact must be visible in the project's own photos.
 */
type Presentation = { title: string; spec: string; story?: string; image?: CaseStudy["images"][number] };

const presentation: Record<string, Presentation> = {
  "allentown-kitchen-layout-upgrade": {
    title: "Put in a navy island with two dishwashers.",
    spec: "Navy island · two dishwashers · double wall ovens",
    story:
      "A navy island with a farmhouse sink and a dishwasher on each side, under three glass globe pendants. Walnut-tone cabinets frame the double wall ovens, next to a built-in stainless refrigerator.",
  },
  "white-cabinet-open-plan-kitchen": {
    title: "Installed a white shaker kitchen open to the living room.",
    spec: "White shaker cabinets · stainless appliances · gray plank floor",
  },
  "reading-paver-patio-buildout": {
    title: "Built a gable-roof pavilion over a new paver patio.",
    spec: "Gable-roof pavilion · stained wood ceiling · paver patio",
    story:
      "Set the posts, raised the trusses and roofed it, then stained a plank ceiling and set recessed lights in it. We laid the paver patio underneath too.",
    image: {
      src: "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg",
      alt: "Front view of a gable-roof pavilion, patio, and planted garden edges beside a house.",
    },
  },
  "lehigh-valley-basement-finish-and-detail": {
    title: "Finished a basement with a poured metallic epoxy floor.",
    spec: "Metallic epoxy floor · media wall · linear fireplace",
    story:
      "Poured a gold and black metallic epoxy floor across the basement. On the far wall we built out a media wall for the TV and a linear fireplace, with speakers set into wood slat panels on both sides.",
  },
  "blue-kitchen-cabinet-counters": {
    title: "Navy cabinets to the ceiling, counter up the wall.",
    spec: "Navy shaker cabinets · full-height backsplash · wine fridge",
    story:
      "Hung navy shaker cabinets to the ceiling and ran the patterned gray counter up the wall behind the sink as a full-height backsplash. Added a wine fridge and a sink with a built-in cutting board by the patio door.",
    image: {
      src: "/images/projects/blue-kitchen-cabinet-counters/after/02-blue-kitchen-after_.jpg",
      alt: "Wide view of blue cabinetry with a gray countertop and backsplash, sink and faucet, microwave and beverage cooler.",
    },
  },
  "bethlehem-interior-flooring-refresh": {
    title: "Honey-toned wood floors with a mirror shine.",
    spec: "Honey-toned wood floor · white trim · gray walls",
  },
  "allentown-exterior-log-home-refresh": {
    title: "Three stories of log siding, gable to garage.",
    spec: "Log siding · green trim · three stories",
  },
  "hamburg-laundry-bathroom-remodel": {
    title: "Rebuilt a tired old laundry room, floor to ceiling.",
    spec: "Laundry · utility sink · half-bath",
    story:
      "Before: an old patterned floor and an open stud wall. We pulled the floor, closed in the wall and built it back with smooth walls, a gray plank floor, open shelving, a utility sink and a new ceiling light.",
  },
  "ryan-bathroom-remodel": {
    title: "Tore out a pink bathroom and put in a double vanity.",
    spec: "Double vanity · granite top · plank floor",
    story:
      "Out went the pink sink, pink toilet, wallpaper and bulb-strip lights. In went a dark double vanity with a granite top, a new toilet, new lights, fresh paint and a light plank floor.",
  },
  "bethlehem-bathroom-refresh": {
    title: "Hung a pine barn door. Put in a black-framed shower.",
    spec: "Barn door · glass shower · black fixtures",
    image: {
      src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
      alt: "Shower enclosure with a molded white insert and black frame.",
    },
  },
  "bethlehem-pool-patio-renovation": {
    title: "Pulled the turf and put down a textured pool deck.",
    spec: "Textured pool deck · stone-pattern border",
    story:
      "Green turf ran right up to the pool's edge. We pulled it and put down a textured gray deck that follows every curve. The lobster and crab tiles on the pool floor stayed put.",
  },
  "ryan-kitchen-remodel": {
    title: "Stripped out, then built back in white.",
    spec: "White cabinets · black counters · glass mosaic backsplash",
    story:
      "Doors off, backsplash gone, fluorescent tubes hanging from the ceiling. We built it back with white cabinets, black counters, a glass mosaic backsplash and recessed lights.",
  },
  "berks-county-ranch-exterior-refresh": {
    title: "Black shutters and a black railing on a white ranch.",
    spec: "White siding · black shutters · black railing",
  },
  "allentown-flooring-replacement-upgrade": {
    title: "Laid wide light planks from the fireplace to the kitchen.",
    spec: "Light oak-look planks · white walls · kitchen opening",
  },
  "ryan-bedroom-interior-refresh": {
    title: "Pulled the carpet, laid planks, painted the walls slate.",
    spec: "Wood-look planks · slate walls · white trim",
    story:
      "Pulled the worn carpet, laid wood-look planks and painted every wall a deep slate, so the white trim and doors stand out.",
  },
  "bethlehem-exterior-staircase-build": {
    title: "Built an exterior stair up to the second floor.",
    spec: "White rails · black balusters · second-floor landing",
  },
  "bethlehem-drywall-and-finish-repair": {
    title: "Drywall repairs you can't find.",
    spec: "Smooth walls · crisp corners · fresh paint",
  },
  "lehigh-valley-full-exterior-refresh": {
    title: "Scraped, primed and painted, then hung black shutters.",
    spec: "Black shutters · three dormers · columned porch",
    story:
      "Paint was flaking off the porch columns and the dormer trim was down to bare wood. We scraped, primed and painted it white, then hung black shutters across the front.",
  },
  "allentown-fire-damage-interior-rebuild": {
    title: "Painted brick over a black marble-look hearth.",
    spec: "Painted brick · marble-look hearth · wood-look floor",
  },
  "reading-commercial-bar-window-upgrade": {
    title: "Put in a row of windows along the bar.",
    spec: "A row of windows · dark trim · beadboard wainscot",
  },
  "dark-partition-commercial-restroom": {
    title: "Charcoal stalls, hung dead straight.",
    spec: "Charcoal partitions · gray walls · plank tile floor",
  },
  "allentown-commercial-bathroom-renovation": {
    title: "Painted the block and put down a seamless gray floor.",
    spec: "Seamless gray floor · painted block walls · restroom stalls",
    story:
      "The hallway concrete was stained and worn, next to a dark block wall. We painted the block light and put down a seamless gray floor through the corridor, the wash area and the restroom.",
    image: {
      src: "/images/projects/allentown-commercial-bathroom/after/hallway-after.png",
      alt: "Corridor with light painted walls, a painted block wall and dark floor surfaces.",
    },
  },
};

export function getProjectPresentation(study: CaseStudy) {
  const entry = presentation[study.slug];
  return {
    title: entry?.title ?? study.title,
    /** Short gallery-label line for cards; falls back to the summary for projects without one. */
    spec: entry?.spec ?? study.summary,
    /** Opening text for the project page: the story where the photos carry one, otherwise the summary. */
    intro: entry?.story ?? study.summary,
    image: entry?.image ?? study.images[0],
  };
}

export function getProjectCollection(study: CaseStudy) {
  if (commercialSlugs.has(study.slug)) return "commercial";
  return "residential";
}

export const featuredProjects = featuredProjectSlugs
  .map((slug) => galleryCaseStudies.find((study) => study.slug === slug))
  .filter((study): study is CaseStudy => Boolean(study));

/**
 * Homepage project spreads: a lead photo and one or two details, all from the project's own photos.
 * The pavilion lead is a different angle from the homepage hero. Basement views that show work in
 * progress, or repeat the media wall, stay in the project gallery.
 */
const featuredProjectPhotoSources: Record<(typeof featuredProjectSlugs)[number], { lead: string; details: string[] }> = {
  "reading-paver-patio-buildout": {
    lead: "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg",
    details: [
      "/images/projects/frontier-patio-gable-roof/after/angle-2.jpg",
      "/images/projects/frontier-patio-gable-roof/after/finished-alt.jpg",
    ],
  },
  "lehigh-valley-basement-finish-and-detail": {
    lead: "/images/projects/lehigh-valley-basement-theater/after/epoxy-floor-big-screen.jpg",
    details: ["/images/projects/lehigh-valley-basement-theater/after/media-room-big-screen.jpg"],
  },
  "blue-kitchen-cabinet-counters": {
    lead: "/images/projects/blue-kitchen-cabinet-counters/after/02-blue-kitchen-after_.jpg",
    details: [
      "/images/projects/blue-kitchen-cabinet-counters/process/01-blue-kitchen-cabinets-counter-top-install.jpg",
      "/images/projects/blue-kitchen-cabinet-counters/after/05-blue-kitchen-cabinets-finished-2.jpg",
    ],
  },
};

/** Resolves the spread photos against the project's own images so alt text stays with the reviewed record. */
export function getFeaturedProjectPhotos(study: CaseStudy) {
  const sources = featuredProjectPhotoSources[study.slug as (typeof featuredProjectSlugs)[number]];
  const find = (src: string) => study.images.find((image) => image.src === src);
  const lead = (sources && find(sources.lead)) ?? getProjectPresentation(study).image;
  const details = (sources?.details ?? []).map(find).filter((image): image is CaseStudy["images"][number] => Boolean(image));
  return { lead, details };
}

export const orderedShowcaseProjects = [...galleryCaseStudies].sort((a, b) => {
  const aIndex = residentialOrder.indexOf(a.slug);
  const bIndex = residentialOrder.indexOf(b.slug);
  return (aIndex < 0 ? residentialOrder.length : aIndex) - (bIndex < 0 ? residentialOrder.length : bIndex);
});
