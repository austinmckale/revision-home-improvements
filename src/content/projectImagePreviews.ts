// Prepared from the matching original project photos; originals remain available in galleries.
export const projectImagePreviews: Record<string, string> = {
  "/images/projects/bethlehem-bathroom-refresh/after/bathroom-finished-shower-detail.jpg": "/images/projects/bethlehem-bathroom-refresh/after/bathroom-finished-shower-detail-preview.webp",
  "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-vanity.jpg": "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-vanity-preview.webp",
  "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg": "/images/projects/frontier-patio-gable-roof/after/angle-1-preview.webp",
  "/images/projects/fire-damage-documentation/after/14-img_8459.jpg": "/images/projects/fire-damage-documentation/after/14-img_8459-preview.webp",
  "/images/projects/allentown-kitchen-upgrade/hero/kitchen-high-end-hero.jpg": "/images/projects/allentown-kitchen-upgrade/hero/kitchen-high-end-hero-preview.webp",
  "/images/projects/bethlehem-bathroom-refresh/after/bathroom-door-open.jpg": "/images/projects/bethlehem-bathroom-refresh/after/bathroom-door-open-preview.webp",
  "/images/projects/allentown-commercial-bathroom/after/sink-area-after.png": "/images/projects/allentown-commercial-bathroom/after/sink-area-after-preview.webp",
  "/images/projects/allentown-exterior-log-home/after/front-finished.jpg": "/images/projects/allentown-exterior-log-home/after/front-finished-preview.webp",
  "/images/projects/bethlehem-exterior-staircase/after/staircase-finished.jpg": "/images/projects/bethlehem-exterior-staircase/after/staircase-finished-preview.webp",
  "/images/projects/reading-commercial-bar-window/after/window-upgrade.jpg": "/images/projects/reading-commercial-bar-window/after/window-upgrade-preview.webp",
  "/images/projects/lehigh-valley-exterior-refresh/after/exterior-finished.jpg": "/images/projects/lehigh-valley-exterior-refresh/after/exterior-finished-preview.webp",
  "/images/projects/lehigh-valley-exterior-refresh/after/exterior-after.jpg": "/images/projects/lehigh-valley-exterior-refresh/after/exterior-after-preview.webp",
  "/images/projects/bethlehem-interior-flooring-refresh/after/flooring-refresh.jpg": "/images/projects/bethlehem-interior-flooring-refresh/after/flooring-refresh-preview.webp",
  "/images/projects/berks-county-ranch-exterior/after/exterior-refresh.jpg": "/images/projects/berks-county-ranch-exterior/after/exterior-refresh-preview.webp",
  "/images/projects/lehigh-valley-basement-theater/after/media-room-big-screen.jpg": "/images/projects/lehigh-valley-basement-theater/after/media-room-big-screen-preview.webp",
  "/images/projects/allentown-flooring-replacement/after/living-room-finished.jpg": "/images/projects/allentown-flooring-replacement/after/living-room-finished-preview.webp",
  "/images/projects/bethlehem-drywall-finish-repair/after/finished-room.jpg": "/images/projects/bethlehem-drywall-finish-repair/after/finished-room-preview.webp",
  "/images/projects/frontier-patio-gable-roof/after/finished-overview.jpg": "/images/projects/frontier-patio-gable-roof/after/finished-overview-preview.webp",
  "/images/projects/bethlehem-pool-patio/after/pool-patio-overview.jpg": "/images/projects/bethlehem-pool-patio/after/pool-patio-overview-preview.webp",
  "/images/projects/fireplace-construction-project/after/fireplace-hearth-finished.jpg": "/images/projects/fireplace-construction-project/after/fireplace-hearth-finished-preview.webp",
  "/images/projects/ryan-bedroom/after/01-interior-refresh-blue-completed.jpg": "/images/projects/ryan-bedroom/after/01-interior-refresh-blue-completed-preview.webp",
  "/images/projects/blue-kitchen-cabinet-counters/after/05-blue-kitchen-cabinets-finished-2.jpg": "/images/projects/blue-kitchen-cabinet-counters/after/05-blue-kitchen-cabinets-finished-2-preview.webp",
  "/images/projects/ryan-kitchen/after/01-ryans-kitchen-after-done.jpg": "/images/projects/ryan-kitchen/after/01-ryans-kitchen-after-done-preview.webp",
  "/images/projects/ryan-bathroom/after/ryans-bathroom-finished.jpg": "/images/projects/ryan-bathroom/after/ryans-bathroom-finished-preview.webp",
  "/images/projects/hamburg-laundry-bathroom/after/laundry-bathroom-doorway-view.jpg": "/images/projects/hamburg-laundry-bathroom/after/laundry-bathroom-doorway-view-preview.webp",
  "/images/projects/fire-damage-documentation/after/01-img_7761.jpg": "/images/projects/fire-damage-documentation/after/01-img_7761-preview.webp",
  "/images/projects/beige-bathroom-before-after/beige-bathroom-layout-board-1.png": "/images/projects/beige-bathroom-before-after/beige-bathroom-layout-board-1-preview.webp",
  "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg": "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower-preview.webp",
  "/images/projects/bethlehem-pool-patio/before/pool-patio-before.jpg": "/images/projects/bethlehem-pool-patio/before/pool-patio-before-preview.webp"
};

/**
 * Previews still pass through next/image so phones receive a responsive width
 * instead of the full 1600px preview file.
 */
export function getProjectImageProps(image: { src: string; alt: string }) {
  return { src: projectImagePreviews[image.src] ?? image.src };
}
