export type ImagePlacement = "hero" | "card";

/** Reviewed crops for the actual photos; prepared previews share their original's focal point. */
const imageFocalPoints: Record<string, Record<ImagePlacement, string>> = {
  "/images/projects/frontier-patio-gable-roof/after/finished-overview": {
    hero: "object-[52%_0%] md:object-[50%_0%]",
    card: "object-[54%_42%] md:object-[50%_36%]",
  },
  "/images/projects/frontier-patio-gable-roof/after/angle-1": {
    hero: "object-[52%_0%] md:object-[50%_0%]",
    card: "object-[52%_38%] md:object-[50%_30%]",
  },
  "/images/projects/frontier-patio-gable-roof/after/angle-2": {
    hero: "object-[52%_35%] md:object-[50%_35%]",
    card: "object-[52%_35%] md:object-[50%_35%]",
  },
  "/images/projects/frontier-patio-gable-roof/after/finished-alt": {
    hero: "object-[55%_55%] md:object-[50%_55%]",
    card: "object-[55%_60%] md:object-[50%_60%]",
  },
  "/images/projects/frontier-patio-gable-roof/after/patio-finished": {
    hero: "object-[50%_40%] md:object-[50%_40%]",
    card: "object-[50%_40%] md:object-[50%_42%]",
  },
  "/images/projects/lehigh-valley-basement-theater/after/media-room-big-screen": {
    hero: "object-[50%_44%] md:object-[50%_44%]",
    card: "object-[50%_50%] md:object-[50%_50%]",
  },
  "/images/projects/blue-kitchen-cabinet-counters/after/05-blue-kitchen-cabinets-finished-2": {
    hero: "object-[48%_36%] md:object-[50%_36%]",
    card: "object-[48%_40%] md:object-[50%_40%]",
  },
  "/images/projects/blue-kitchen-cabinet-counters/after/02-blue-kitchen-after_": {
    hero: "object-[50%_50%] md:object-[50%_50%]",
    card: "object-[50%_50%] md:object-[50%_50%]",
  },
  "/images/projects/blue-kitchen-cabinet-counters/process/01-blue-kitchen-cabinets-counter-top-install": {
    hero: "object-[50%_56%] md:object-[50%_56%]",
    card: "object-[50%_56%] md:object-[50%_56%]",
  },
  "/images/projects/lehigh-valley-basement-theater/after/epoxy-floor-big-screen": {
    hero: "object-[50%_72%] md:object-[50%_72%]",
    card: "object-[50%_72%] md:object-[50%_72%]",
  },
  "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower": {
    hero: "object-[50%_28%] md:object-[50%_28%]",
    card: "object-[48%_35%] md:object-[50%_32%]",
  },
  "/images/projects/bethlehem-bathroom-refresh/after/bathroom-door-open": {
    hero: "object-[60%_40%] md:object-[60%_40%]",
    card: "object-[60%_40%] md:object-[60%_40%]",
  },
  "/images/projects/ryan-bedroom/after/01-interior-refresh-blue-completed": {
    hero: "object-[50%_44%] md:object-[50%_42%]",
    card: "object-[50%_46%] md:object-[50%_44%]",
  },
  "/images/projects/allentown-flooring-replacement/after/living-room-finished": {
    hero: "object-[50%_56%] md:object-[50%_54%]",
    card: "object-[50%_56%] md:object-[50%_54%]",
  },
  "/images/projects/allentown-exterior-log-home/after/front-finished": {
    hero: "object-[50%_40%] md:object-[50%_38%]",
    card: "object-[50%_42%] md:object-[50%_38%]",
  },
  "/images/projects/fire-damage-documentation/after/37-img_8934": {
    hero: "object-[50%_35%] md:object-[50%_35%]",
    card: "object-[50%_38%] md:object-[50%_35%]",
  },
  "/images/projects/bethlehem-pool-patio/after/pool-patio-overview": {
    hero: "object-[50%_58%] md:object-[50%_58%]",
    card: "object-[50%_58%] md:object-[50%_58%]",
  },
  "/images/projects/bethlehem-pool-patio/before/pool-patio-before": {
    hero: "object-[50%_58%] md:object-[50%_58%]",
    card: "object-[50%_58%] md:object-[50%_58%]",
  },
};

export function getImageFocalClass(src: string, placement: ImagePlacement = "card") {
  const stem = src
    .split("?")[0]
    .replace(/\.(?:jpe?g|png|webp)$/i, "")
    .replace(/-preview$/, "");
  return imageFocalPoints[stem]?.[placement] ?? "object-center";
}
