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
 * How each project is presented. `title` is the editorial name, written the way the contractor who did
 * the job would say it; cards show the photo and the name only. `story` opens the project page only when
 * it adds something the name and photos do not (before and after, how it was built). Every fact must be
 * visible in the project's own photos or confirmed by the owner.
 */
type Presentation = { title: string; story?: string; image?: CaseStudy["images"][number] };

const presentation: Record<string, Presentation> = {
  "allentown-kitchen-layout-upgrade": {
    title: "Built the whole kitchen around a big navy island.",
  },
  "white-cabinet-open-plan-kitchen": {
    title: "Put in a white shaker kitchen that opens onto a big, bright room.",
  },
  "reading-paver-patio-buildout": {
    title: "Built a gable-roof pavilion that turned the backyard into a room.",
    story:
      "Set the posts, raised the trusses and roofed it, then stained a plank ceiling and set recessed lights in it. We laid the paver patio underneath too.",
    image: {
      src: "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg",
      alt: "Front view of a gable-roof pavilion, patio, and planted garden edges beside a house.",
    },
  },
  "lehigh-valley-basement-finish-and-detail": {
    title: "Turned a basement into a media room with a poured gold epoxy floor.",
    story:
      "Poured a gold and black metallic epoxy floor across the basement. On the far wall we built out a media wall for the TV and a linear fireplace, with speakers set into wood slat panels on both sides.",
  },
  "blue-kitchen-cabinet-counters": {
    title: "Navy cabinets to the ceiling, counter up the wall.",
    image: {
      src: "/images/projects/blue-kitchen-cabinet-counters/after/02-blue-kitchen-after_.jpg",
      alt: "Wide view of blue cabinetry with a gray countertop and backsplash, sink and faucet, microwave and beverage cooler.",
    },
  },
  "bethlehem-interior-flooring-refresh": {
    title: "Honey-toned wood floors with a mirror shine.",
  },
  "allentown-exterior-log-home-refresh": {
    title: "Three stories of log siding, from the roof down to the garage.",
  },
  "hamburg-laundry-bathroom-remodel": {
    title: "Rebuilt a tired old laundry room, floor to ceiling.",
    story:
      "Before: an old patterned floor and an open stud wall. We pulled the floor, closed in the wall and built it back with smooth walls, a gray plank floor, open shelving, a utility sink and a new ceiling light.",
  },
  "ryan-bathroom-remodel": {
    title: "Tore out a pink bathroom and put in a double vanity.",
    story:
      "Out went the pink sink, pink toilet, wallpaper and bulb-strip lights. In went a dark double vanity with a granite top, a new toilet, new lights, fresh paint and a light plank floor.",
  },
  "bethlehem-bathroom-refresh": {
    title: "Gave a small bathroom a pine barn door and a black-framed glass shower.",
    image: {
      src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
      alt: "Shower enclosure with a molded white insert and black frame.",
    },
  },
  "bethlehem-pool-patio-renovation": {
    title: "Pulled the turf and put down a textured pool deck.",
    story:
      "Green turf ran right up to the pool's edge. We pulled it and put down a textured gray deck that follows every curve.",
  },
  "ryan-kitchen-remodel": {
    title: "Stripped out, then built back in white.",
    story:
      "Doors off, backsplash gone, fluorescent tubes hanging from the ceiling. We built it back with white cabinets, black counters, a glass mosaic backsplash and recessed lights.",
  },
  "berks-county-ranch-exterior-refresh": {
    title: "Sharpened up a white ranch with black shutters and a black railing.",
  },
  "allentown-flooring-replacement-upgrade": {
    title: "Laid wide light planks from the fireplace to the kitchen.",
  },
  "ryan-bedroom-interior-refresh": {
    title: "Pulled the carpet, laid planks, painted the walls slate.",
  },
  "bethlehem-exterior-staircase-build": {
    title: "Built the second floor its own way in.",
  },
  "bethlehem-drywall-and-finish-repair": {
    title: "Drywall repairs you can't find.",
  },
  "lehigh-valley-full-exterior-refresh": {
    title: "Scraped, primed and painted, then hung black shutters.",
    story:
      "Paint was flaking off the porch columns and the dormer trim was down to bare wood. We scraped, primed and painted it white, then hung black shutters across the front.",
  },
  "allentown-fire-damage-interior-rebuild": {
    title: "Painted the brick white and gave the hearth a black marble look.",
  },
  "reading-commercial-bar-window-upgrade": {
    title: "Brought daylight in along the whole bar.",
  },
  "dark-partition-commercial-restroom": {
    title: "Charcoal stalls, hung dead straight.",
  },
  "allentown-commercial-bathroom-renovation": {
    title: "Painted the block and put down a seamless gray floor.",
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
    story: entry?.story,
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
