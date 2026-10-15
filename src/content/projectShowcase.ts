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

const presentation: Record<string, { title: string; image?: CaseStudy["images"][number] }> = {
  "allentown-kitchen-layout-upgrade": { title: "Glass globes over a navy island." },
  "white-cabinet-open-plan-kitchen": { title: "No wall between the stove and the sofa." },
  "reading-paver-patio-buildout": {
    title: "The backyard got a ceiling.",
    image: {
      src: "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg",
      alt: "Front view of a gable-roof pavilion, patio, and planted garden edges beside a house.",
    },
  },
  "lehigh-valley-basement-finish-and-detail": { title: "A floor like poured gold." },
  "blue-kitchen-cabinet-counters": {
    title: "Navy cabinets, all the way to the ceiling.",
    image: {
      src: "/images/projects/blue-kitchen-cabinet-counters/after/02-blue-kitchen-after_.jpg",
      alt: "Wide view of blue cabinetry with a gray countertop and backsplash, sink and faucet, microwave and beverage cooler.",
    },
  },
  "bethlehem-interior-flooring-refresh": { title: "Warm boards, one room into the next." },
  "allentown-exterior-log-home-refresh": { title: "Cabin character, three stories tall." },
  "hamburg-laundry-bathroom-remodel": { title: "One room, two jobs: laundry and a half-bath." },
  "ryan-bathroom-remodel": { title: "Two sinks, two windows, no waiting." },
  "bethlehem-bathroom-refresh": {
    title: "A white shower, outlined in black.",
    image: {
      src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
      alt: "Shower enclosure with a molded white insert and black frame.",
    },
  },
  "bethlehem-pool-patio-renovation": { title: "Fresh edges on every curve." },
  "ryan-kitchen-remodel": { title: "Stripped out, then built back in white." },
  "berks-county-ranch-exterior-refresh": { title: "Black shutters on a bright ranch." },
  "allentown-flooring-replacement-upgrade": { title: "Light floors that run right into the kitchen." },
  "ryan-bedroom-interior-refresh": { title: "Carpet out, wood in, walls gone slate." },
  "bethlehem-exterior-staircase-build": { title: "A new stair up to the upper entry." },
  "bethlehem-drywall-and-finish-repair": { title: "Smooth walls, sharp corners, ready to live in." },
  "lehigh-valley-full-exterior-refresh": { title: "Three dormers, black shutters, one big porch." },
  "allentown-fire-damage-interior-rebuild": { title: "White brick over a black-veined hearth." },
  "reading-commercial-bar-window-upgrade": { title: "Daylight along the bar." },
  "dark-partition-commercial-restroom": { title: "Charcoal stalls against pale gray walls." },
  "allentown-commercial-bathroom-renovation": {
    title: "Blue stalls, and a corridor brought back to bright.",
    image: {
      src: "/images/projects/allentown-commercial-bathroom/after/hallway-after.png",
      alt: "Corridor with light painted walls, a painted block wall and dark floor surfaces.",
    },
  },
};

export function getProjectPresentation(study: CaseStudy) {
  return {
    title: presentation[study.slug]?.title ?? study.title,
    image: presentation[study.slug]?.image ?? study.images[0],
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
