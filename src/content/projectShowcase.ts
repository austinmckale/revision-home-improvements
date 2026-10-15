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
    title: "Glass globes over a navy island.",
    spec: "Navy island · two dishwashers · double wall ovens",
    story:
      "Two dishwashers flank the farmhouse sink in the navy island, under three glass globe pendants. Behind it, walnut-tone cabinets frame double wall ovens beside a built-in stainless refrigerator.",
  },
  "white-cabinet-open-plan-kitchen": {
    title: "A white kitchen with room to run.",
    spec: "White shaker cabinets · stainless appliances · gray plank floor",
  },
  "reading-paver-patio-buildout": {
    title: "The backyard got a ceiling.",
    spec: "Gable-roof pavilion · stained wood ceiling · paver patio",
    story:
      "Posts first, then trusses, then a stained plank ceiling with recessed lights. We laid the paver patio underneath too, so it feels like one room that happens to be outdoors.",
    image: {
      src: "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg",
      alt: "Front view of a gable-roof pavilion, patio, and planted garden edges beside a house.",
    },
  },
  "lehigh-valley-basement-finish-and-detail": {
    title: "A floor like poured gold.",
    spec: "Metallic epoxy floor · media wall · linear fireplace",
    story:
      "Gold and black epoxy, glossy enough to mirror the ceiling lights. At the far end, a built-out wall holds the TV over a linear fireplace, with speakers set into wood slat panels on both sides.",
  },
  "blue-kitchen-cabinet-counters": {
    title: "Navy, floor to ceiling. No half measures.",
    spec: "Navy shaker cabinets · full-height backsplash · wine fridge",
    story:
      "The navy cabinets go all the way to the ceiling, and the patterned gray counter climbs the wall behind the sink to meet them. A wine fridge and a sink with a built-in cutting board finish the run beside the patio door.",
    image: {
      src: "/images/projects/blue-kitchen-cabinet-counters/after/02-blue-kitchen-after_.jpg",
      alt: "Wide view of blue cabinetry with a gray countertop and backsplash, sink and faucet, microwave and beverage cooler.",
    },
  },
  "bethlehem-interior-flooring-refresh": {
    title: "Honey-toned floors with a mirror shine.",
    spec: "Honey-toned wood floor · white trim · gray walls",
  },
  "allentown-exterior-log-home-refresh": {
    title: "Three stories of log siding. We brought a lift.",
    spec: "Log siding · green trim · three stories",
  },
  "hamburg-laundry-bathroom-remodel": {
    title: "Open studs to laundry day.",
    spec: "Laundry · utility sink · half-bath",
    story:
      "It started as an open stud bay over an old patterned floor. Now it's bright walls and a gray plank floor, with open shelves beside the laundry and a utility sink by the toilet.",
  },
  "ryan-bathroom-remodel": {
    title: "The pink sink is gone. Now there are two.",
    spec: "Double vanity · granite top · plank floor",
    story:
      "A pink sink, a pink toilet and patterned wallpaper, all gone. In their place: a dark double vanity with a speckled granite top, warm beige walls and a light plank floor.",
  },
  "bethlehem-bathroom-refresh": {
    title: "A pine barn door opens on a black-framed shower.",
    spec: "Barn door · glass shower · black fixtures",
    image: {
      src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
      alt: "Shower enclosure with a molded white insert and black frame.",
    },
  },
  "bethlehem-pool-patio-renovation": {
    title: "The turf's gone. The lobster stayed.",
    spec: "Textured pool deck · stone-pattern border",
    story:
      "Green turf used to run right up to the water. Now a textured gray deck follows every curve of the pool, and the lobster, crab and fish on the pool floor stayed right where they were.",
  },
  "ryan-kitchen-remodel": {
    title: "Stripped out, then built back in white.",
    spec: "White cabinets · black counters · glass mosaic backsplash",
    story:
      "Doors off, backsplash gone, fluorescent tubes hanging from the ceiling. It came back with white cabinets, black counters, a glass mosaic backsplash and recessed lights.",
  },
  "berks-county-ranch-exterior-refresh": {
    title: "Black-tie trim for a white ranch.",
    spec: "White siding · black shutters · black railing",
  },
  "allentown-flooring-replacement-upgrade": {
    title: "Wide light planks from the fireplace to the kitchen.",
    spec: "Light oak-look planks · white walls · kitchen opening",
  },
  "ryan-bedroom-interior-refresh": {
    title: "Carpet out, planks in, walls gone slate.",
    spec: "Wood-look planks · slate walls · white trim",
    story:
      "It had worn carpet and two different wall colors. Now it's warm wood-look planks, deep slate on every wall and bright white trim.",
  },
  "bethlehem-exterior-staircase-build": {
    title: "Built from the ground up. Literally.",
    spec: "White rails · black balusters · second-floor landing",
  },
  "bethlehem-drywall-and-finish-repair": {
    title: "You'd never know it needed fixing.",
    spec: "Smooth walls · crisp corners · fresh paint",
  },
  "lehigh-valley-full-exterior-refresh": {
    title: "Peeling paint out, black shutters up.",
    spec: "Black shutters · three dormers · columned porch",
    story:
      "Paint was flaking off the porch columns and the dormer trim was down to bare wood. Now the house is crisp white again, with black shutters across the front and a full-width porch at the end of the brick walk.",
  },
  "allentown-fire-damage-interior-rebuild": {
    title: "White brick over a hearth like black marble.",
    spec: "Painted brick · marble-look hearth · wood-look floor",
  },
  "reading-commercial-bar-window-upgrade": {
    title: "Daylight along the bar.",
    spec: "A row of windows · dark trim · beadboard wainscot",
  },
  "dark-partition-commercial-restroom": {
    title: "Charcoal stalls, hung dead straight.",
    spec: "Charcoal partitions · gray walls · plank tile floor",
  },
  "allentown-commercial-bathroom-renovation": {
    title: "The hallway floor went from stained to seamless.",
    spec: "Seamless gray floor · painted block walls · restroom stalls",
    story:
      "The hallway's concrete was stained and worn, beside a dark block wall. Now the corridor, the wash area and the restroom all have a seamless gray floor, and the block wall is painted light.",
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
