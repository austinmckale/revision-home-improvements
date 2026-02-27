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
};

export default nextConfig;
