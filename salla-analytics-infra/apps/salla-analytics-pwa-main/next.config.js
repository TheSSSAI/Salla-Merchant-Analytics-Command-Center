/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@salla-analytics/ui-components", "@salla-analytics/core-library"],
  images: {
    domains: ['cdn.salla.sa'],
  },
  experimental: {
    serverActions: true,
  },
  output: 'standalone',
};

module.exports = nextConfig;