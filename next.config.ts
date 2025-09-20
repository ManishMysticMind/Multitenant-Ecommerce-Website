import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eloops.devloopssoftware.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'eloops.devloopssoftware.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'loopscart.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'loopscart.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
