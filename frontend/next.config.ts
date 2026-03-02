import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  swcMinify: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
