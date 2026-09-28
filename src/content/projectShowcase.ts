import { galleryCaseStudies, type CaseStudy } from "@/content/caseStudies";

/** Editorial placement is explicit: new projects must never inherit the hero slot. */
export const featuredProjectSlugs = [
  "allentown-kitchen-layout-upgrade",
  "reading-paver-patio-buildout",
  "lehigh-valley-basement-finish-and-detail",
] as const;

const residentialOrder = [
  ...featuredProjectSlugs,
  "blue-kitchen-cabinet-counters",
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
  "reading-commercial-bar-window-upgrade",
]);

const processSlugs = new Set([
  "lehigh-valley-fire-damage-documentation",
  "beige-bathroom-before-after",
]);

const presentation: Record<string, { title: string; image?: CaseStudy["images"][number] }> = {
  "allentown-kitchen-layout-upgrade": { title: "A kitchen, reimagined." },
  "reading-paver-patio-buildout": {
    title: "Outdoor living, all together.",
    image: {
      src: "/images/projects/frontier-patio-gable-roof/after/finished-overview-preview.webp",
      alt: "Completed paver patio and timber pavilion beside a Reading home.",
    },
  },
  "lehigh-valley-basement-finish-and-detail": { title: "Room for movie nights." },
  "blue-kitchen-cabinet-counters": { title: "Blue cabinets. A fresh perspective." },
  "bethlehem-interior-flooring-refresh": { title: "Warm floors, connected rooms." },
  "allentown-exterior-log-home-refresh": { title: "A new chapter for a log home." },
  "hamburg-laundry-bathroom-remodel": { title: "A hardworking laundry & half-bath." },
  "ryan-bathroom-remodel": { title: "A bathroom made for every day." },
  "bethlehem-bathroom-refresh": {
    title: "A fresh start for a Bethlehem bath.",
    image: {
      src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
      alt: "Finished tiled shower with dark fixtures in a Bethlehem bathroom.",
    },
  },
  "bethlehem-pool-patio-renovation": { title: "A place to spend the summer." },
  "lehigh-valley-fire-damage-documentation": { title: "Inside a fire-damage rebuild" },
  "beige-bathroom-before-after": { title: "Bathroom planning & finish boards" },
};

export function getProjectPresentation(study: CaseStudy) {
  return {
    title: presentation[study.slug]?.title ?? study.title,
    image: presentation[study.slug]?.image ?? study.images[0],
  };
}

export function getProjectCollection(study: CaseStudy) {
  if (commercialSlugs.has(study.slug)) return "commercial";
  if (processSlugs.has(study.slug)) return "process";
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
