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
  "allentown-kitchen-layout-upgrade": { title: "Room to gather. Space to cook." },
  "white-cabinet-open-plan-kitchen": { title: "Bright, open and easy to live in." },
  "reading-paver-patio-buildout": {
    title: "An outdoor room under a gable roof.",
    image: {
      src: "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg",
      alt: "Front view of a gable-roof pavilion, patio, and planted garden edges beside a house.",
    },
  },
  "lehigh-valley-basement-finish-and-detail": { title: "Room for movie nights." },
  "blue-kitchen-cabinet-counters": {
    title: "A kitchen in deep blue.",
    image: {
      src: "/images/projects/blue-kitchen-cabinet-counters/after/02-blue-kitchen-after_.jpg",
      alt: "Wide view of blue cabinetry with a gray countertop and backsplash, sink and faucet, microwave and beverage cooler.",
    },
  },
  "bethlehem-interior-flooring-refresh": { title: "Warm floors, connected rooms." },
  "allentown-exterior-log-home-refresh": { title: "Log-style siding, crisp trim." },
  "hamburg-laundry-bathroom-remodel": { title: "A hardworking laundry & half-bath." },
  "ryan-bathroom-remodel": { title: "A bathroom made for every day." },
  "bethlehem-bathroom-refresh": {
    title: "Black-framed shower, warm wood door.",
    image: {
      src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
      alt: "Shower enclosure with a molded white insert and black frame.",
    },
  },
  "bethlehem-pool-patio-renovation": { title: "A place to spend the summer." },
  "ryan-kitchen-remodel": { title: "Crisp white, dark counters." },
  "berks-county-ranch-exterior-refresh": { title: "Classic curb appeal." },
  "allentown-flooring-replacement-upgrade": { title: "Light floors, open living." },
  "ryan-bedroom-interior-refresh": { title: "A bedroom in deep blue." },
  "bethlehem-exterior-staircase-build": { title: "A stair to the upper entry." },
  "bethlehem-drywall-and-finish-repair": { title: "Clean, simple finishes." },
  "lehigh-valley-full-exterior-refresh": { title: "Dormers, shutters and a front porch." },
  "allentown-fire-damage-interior-rebuild": { title: "A fireplace as the focal point." },
  "reading-commercial-bar-window-upgrade": { title: "Daylight along the bar." },
  "dark-partition-commercial-restroom": { title: "Charcoal stalls, clean lines." },
  "allentown-commercial-bathroom-renovation": {
    title: "Commercial restroom & corridor.",
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

export const orderedShowcaseProjects = [...galleryCaseStudies].sort((a, b) => {
  const aIndex = residentialOrder.indexOf(a.slug);
  const bIndex = residentialOrder.indexOf(b.slug);
  return (aIndex < 0 ? residentialOrder.length : aIndex) - (bIndex < 0 ? residentialOrder.length : bIndex);
});
