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
