import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true, // Enables SWC transform for styled-components
  },
  output: "standalone", // Required for Docker deployment
};

export default nextConfig;
