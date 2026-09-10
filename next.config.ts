import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/pages/Services", destination: "/services", permanent: true },
      { source: "/pages/About", destination: "/about", permanent: true },
      { source: "/pages/Careers", destination: "/careers", permanent: true },
      { source: "/pages/Home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
