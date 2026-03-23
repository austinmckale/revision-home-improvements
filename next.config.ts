import type { NextConfig } from "next";

const supabaseHostname = process.env.PORTFOLIO_SUPABASE_URL
  ? new URL(process.env.PORTFOLIO_SUPABASE_URL).hostname
  : null;

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: supabaseHostname
      ? [{ protocol: "https", hostname: supabaseHostname, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
  async redirects() {
    const redirects = [
      { source: "/hvac-additions-repairs-remodels-lehigh-valley", destination: "/services", permanent: true },
      { source: "/request-an-estimate", destination: "/request-a-quote", permanent: true },
      { source: "/gallery", destination: "/projects", permanent: true },
      { source: "/lehigh-county-contractor-locations-served", destination: "/lehigh-valley-pa", permanent: true },
      { source: "/kitchen-remodeling", destination: "/services/kitchen-remodeling", permanent: true },
      { source: "/bathroom-renovations", destination: "/services/bathroom-remodeling", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/basement-renovations", destination: "/services/basement-finishing", permanent: true },
      { source: "/floor-renovations", destination: "/services/flooring-installation", permanent: true },
      { source: "/projects/reading-kitchen-layout-upgrade", destination: "/projects/allentown-kitchen-layout-upgrade", permanent: true },
      { source: "/projects/wyomissing-bathroom-refresh", destination: "/projects/bethlehem-bathroom-refresh", permanent: true },
      { source: "/projects/wyomissing-full-exterior-refresh", destination: "/projects/lehigh-valley-full-exterior-refresh", permanent: true },
      { source: "/projects/wyomissing-dormer-shutter-detail-refresh", destination: "/projects/lehigh-valley-dormer-shutter-detail-refresh", permanent: true },
      { source: "/projects/reading-interior-flooring-refresh", destination: "/projects/bethlehem-interior-flooring-refresh", permanent: true },
      { source: "/projects/berks-basement-finish-and-detail", destination: "/projects/lehigh-valley-basement-finish-and-detail", permanent: true },
      { source: "/projects/berks-fire-damage-interior-rebuild", destination: "/projects/allentown-fire-damage-interior-rebuild", permanent: true },
    ];

    return [
      ...redirects,
      ...redirects.map((item) => ({
        ...item,
        source: `${item.source}/`,
      })),
    ];
  },
};

export default nextConfig;
