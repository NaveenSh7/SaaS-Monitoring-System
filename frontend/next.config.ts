import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true, // Enables SWC transform for styled-components
  },
};

export default nextConfig;
