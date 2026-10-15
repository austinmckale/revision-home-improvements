/**
 * Owner direction, October 14, 2026: every public gallery shows each view once.
 * Near-duplicate angles, mid-work clutter and phone screenshots stay in the project records
 * (photo lineage is preserved for evidence checks) but are never displayed.
 * Keep this module free of imports so content checks can load it directly.
 */
const p = (path: string) => `/images/projects/${path}`;

export const hiddenProjectPhotos: ReadonlySet<string> = new Set([
  // Blue cabinet kitchen: unfinished sink base, tools on the floor, a repeat angle and a CAD screenshot.
  p("blue-kitchen-cabinet-counters/after/01-blue-kitchen-2.jpg"),
  p("blue-kitchen-cabinet-counters/after/03-blue-kitchen-cabinets-1.jpg"),
  p("blue-kitchen-cabinet-counters/after/04-blue-kitchen-cabinets-done.jpg"),
  p("blue-kitchen-cabinet-counters/process/02-blue-kitchen-cabinets-process.jpg"),
  p("blue-kitchen-cabinet-counters/marketing/01-blue-kitchen-cabinet-layout-diagram.png"),
  // Bedroom: three repeat angles of the finished room and two mid-work shots.
  p("ryan-bedroom/after/02-interior-refresh-blue-1.jpg"),
  p("ryan-bedroom/after/03-interior-refresh-blue-3.jpg"),
  p("ryan-bedroom/after/04-interior-refresh-blue-4.jpg"),
  p("ryan-bedroom/process/01-interior-refresh-blue-2-process.jpg"),
  p("ryan-bedroom/process/02-interior-refresh-blue-in-progress.jpg"),
  // Pavilion: the framing shot with a ladder.
  p("frontier-patio-gable-roof/process/patio-construction.jpg"),
  // Basement: drop cloths, ladders and paint cans in two wide shots.
  p("lehigh-valley-basement-theater/after/wide-view-layout.jpg"),
  p("lehigh-valley-basement-theater/after/wide-angle-room-flow.jpg"),
  // Laundry and half-bath: a repeat angle and a window close-up.
  p("hamburg-laundry-bathroom/after/vanity-toilet-and-shelving.jpg"),
  p("hamburg-laundry-bathroom/after/window-trim-and-washer.jpg"),
  // Pool: a second view of the same curve.
  p("bethlehem-pool-patio/after/pool-patio-steps.jpg"),
  // Log-style exterior: crew, ladders and a lift mid-job.
  p("allentown-exterior-log-home/after/garage-elevation.jpg"),
  p("allentown-exterior-log-home/process/lift-access-work.jpg"),
  // Dormer exterior: a phone screenshot taken mid-job.
  p("lehigh-valley-exterior-refresh/process/exterior-in-progress.jpg"),
  // Light floors: a floor machine and baby gate in the foreground.
  p("allentown-flooring-replacement/after/fireplace-wall-renovation.jpg"),
  // Fireplace: unfinished hearth with tools and cords.
  p("fireplace-construction-project/after/bathroom-tile-in-progress.jpg"),
  // Black-framed shower: boxes and a bag in the doorway shot.
  p("bethlehem-bathroom-refresh/after/bathroom-door-open.jpg"),
  // Commercial restroom: an "After" label burned into the photo and boxes in the shot.
  p("allentown-commercial-bathroom/after/floor-after.png"),
]);

/** Photos to show: drops hidden photos, anything already shown elsewhere on the page, and repeats. */
export function curatePhotos<T extends { src: string }>(images: readonly T[], alreadyShown: Iterable<string> = []): T[] {
  const seen = new Set(alreadyShown);
  return images.filter((image) => {
    if (hiddenProjectPhotos.has(image.src) || seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
}

/**
 * Originals that carry a phone screenshot frame or a burned-in "Before"/"After" label. Originals stay
 * unchanged on disk (their hashes are checked); the cropped preview is shown at full size instead.
 */
export const croppedOriginals: Readonly<Record<string, string>> = Object.fromEntries(
  [
    "lehigh-valley-exterior-refresh/after/exterior-finished.jpg",
    "lehigh-valley-exterior-refresh/after/exterior-after.jpg",
    "lehigh-valley-exterior-refresh/before/exterior-before.jpg",
    "ryan-bathroom/before/ryans-bathroom-before.jpg",
    "allentown-commercial-bathroom/after/hallway-after.png",
    "allentown-commercial-bathroom/before/hallway-before.png",
    "allentown-commercial-bathroom/after/sink-area-after.png",
  ].map((path) => [p(path), p(path.replace(/\.(jpg|png)$/, "-preview.webp"))]),
);
