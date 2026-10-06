import Link from "next/link";

/**
 * Schematic service-area map. Places are positioned from real latitude/longitude
 * with a simple equirectangular projection; roads are simplified corridors.
 */
const bounds = { west: -76.1, north: 40.8 };
const kmPerDegLon = 84.5; // at ~40.5°N
const kmPerDegLat = 111;
const scale = 12.45; // SVG units per km

function project(lat: number, lon: number) {
  return {
    x: Math.round((lon - bounds.west) * kmPerDegLon * scale + 170),
    y: Math.round((bounds.north - lat) * kmPerDegLat * scale - 20),
  };
}

const hubs = [
  { name: "Reading", href: "/reading-pa", lat: 40.3356, lon: -75.9269, anchor: "start", dx: 18, dy: 8 },
  { name: "Wyomissing", href: "/wyomissing-pa", lat: 40.3295, lon: -75.9652, anchor: "end", dx: -10, dy: 44 },
  { name: "Allentown", href: "/allentown-pa", lat: 40.6023, lon: -75.4714, anchor: "end", dx: -18, dy: -12 },
  { name: "Bethlehem", href: "/bethlehem-pa", lat: 40.6259, lon: -75.3705, anchor: "start", dx: 18, dy: -10 },
] as const;

const communities = [
  { name: "Shillington", lat: 40.3018, lon: -75.9655, anchor: "start", dx: 12, dy: 20 },
  { name: "Sinking Spring", lat: 40.3276, lon: -76.0113, anchor: "end", dx: -12, dy: -12 },
  { name: "Emmaus", lat: 40.5395, lon: -75.4966, anchor: "start", dx: 12, dy: 16 },
  { name: "Macungie", lat: 40.5159, lon: -75.5552, anchor: "end", dx: -12, dy: 16 },
  { name: "Hellertown", lat: 40.5795, lon: -75.3407, anchor: "start", dx: 12, dy: 16 },
  { name: "Nazareth", lat: 40.7401, lon: -75.3096, anchor: "start", dx: 12, dy: 5 },
  { name: "Easton", lat: 40.6884, lon: -75.2207, anchor: "end", dx: -12, dy: 22 },
] as const;

const toPath = (points: Array<[number, number]>) =>
  points
    .map(([lat, lon], index) => {
      const { x, y } = project(lat, lon);
      return `${index === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");

// Simplified corridors: US 222 (Reading–Allentown) and I-78 (across the Lehigh Valley to Easton).
const us222 = toPath([
  [40.3356, -75.9269],
  [40.43, -75.86],
  [40.5173, -75.7774],
  [40.55, -75.6],
  [40.6023, -75.4714],
]);
const i78 = toPath([
  [40.585, -75.64],
  [40.565, -75.5],
  [40.585, -75.37],
  [40.66, -75.24],
]);

const reading = project(40.3356, -75.9269);
const lehigh = project(40.6, -75.43);
const routeLabel = project(40.47, -75.79);
const i78Label = project(40.56, -75.4);

export default function ServiceAreaMap({ className = "" }: { className?: string }) {
  return (
    <figure className={`relative ${className}`}>
      <svg
        viewBox="0 0 1200 760"
        className="h-auto w-full"
        role="group"
        aria-labelledby="service-area-map-title service-area-map-desc"
      >
        <title id="service-area-map-title">RHI Pros service area map</title>
        <desc id="service-area-map-desc">
          Schematic map of Berks County, around Reading and Wyomissing, and the Lehigh Valley, around Allentown and
          Bethlehem, linked by the US 222 corridor.
        </desc>
        <defs>
          <pattern id="map-grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0V44" fill="none" stroke="currentColor" strokeOpacity=".08" />
          </pattern>
        </defs>
        <rect width="1200" height="760" fill="url(#map-grid)" className="text-[var(--accent)]" />

        <Link href="/berks-county-pa" aria-label="Berks County, PA service area">
          <ellipse
            cx={reading.x}
            cy={reading.y - 10}
            rx="190"
            ry="130"
            className="fill-[var(--brand)]/[.07] stroke-[var(--brand)] transition-colors hover:fill-[var(--brand)]/[.13]"
            strokeDasharray="6 8"
          />
          <text x={reading.x} y={reading.y + 102} textAnchor="middle" className="annotation fill-[var(--brand)] text-[26px]">
            Berks County
          </text>
        </Link>
        <Link href="/lehigh-valley-pa" aria-label="Lehigh Valley, PA service area">
          <ellipse
            cx={lehigh.x}
            cy={lehigh.y}
            rx="255"
            ry="170"
            className="fill-[var(--accent)]/[.06] stroke-[var(--accent)] transition-colors hover:fill-[var(--accent)]/[.12]"
            strokeDasharray="6 8"
          />
          <text x={lehigh.x + 40} y={lehigh.y + 150} className="annotation fill-[var(--accent)] text-[26px]">
            Lehigh Valley
          </text>
        </Link>

        <path d={us222} fill="none" className="map-route stroke-[var(--accent)]" strokeWidth="5" strokeLinecap="round" />
        <path d={i78} fill="none" className="stroke-[var(--accent)]/45" strokeWidth="3" strokeLinecap="round" />
        <text
          x={routeLabel.x + 28}
          y={routeLabel.y + 4}
          className="annotation fill-[var(--accent)] text-[18px]"
          transform={`rotate(-54 ${routeLabel.x} ${routeLabel.y})`}
        >
          US 222
        </text>
        <text x={i78Label.x} y={i78Label.y + 34} className="annotation fill-[var(--accent)]/70 text-[16px]">
          I-78
        </text>

        {communities.map((place) => {
          const { x, y } = project(place.lat, place.lon);
          return (
            <g key={place.name} className="map-minor">
              <circle cx={x} cy={y} r="5" className="fill-[var(--surface)] stroke-[var(--accent)]" strokeWidth="2" />
              <text
                x={x + place.dx}
                y={y + place.dy}
                textAnchor={place.anchor}
                className="fill-[var(--muted)] text-[17px]"
              >
                {place.name}
              </text>
            </g>
          );
        })}

        {hubs.map((hub) => {
          const { x, y } = project(hub.lat, hub.lon);
          return (
            <Link key={hub.name} href={hub.href} aria-label={`${hub.name}, PA: local services`} className="group">
              <circle cx={x} cy={y} r="18" className="fill-[var(--brand)]/15 transition-all group-hover:fill-[var(--brand)]/30" />
              <circle cx={x} cy={y} r="8" className="fill-[var(--brand)] stroke-[var(--surface)]" strokeWidth="3" />
              <text
                x={x + hub.dx}
                y={y + hub.dy}
                textAnchor={hub.anchor}
                className="heading-serif fill-[var(--accent)] text-[34px] group-hover:underline"
              >
                {hub.name}
              </text>
            </Link>
          );
        })}

        <g transform="translate(1150 60)" className="text-[var(--accent)]" aria-hidden="true">
          <path d="M0 -26 L9 6 L0 0 L-9 6 Z" className="fill-current" />
          <text y="30" textAnchor="middle" className="annotation fill-current text-[16px]">
            N
          </text>
        </g>
      </svg>
      <figcaption className="annotation mt-3 flex flex-wrap justify-between gap-2 text-[0.62rem] text-[var(--muted)]">
        <span>Schematic map · Approximate positions</span>
        <span>Ask about your address</span>
      </figcaption>
    </figure>
  );
}
