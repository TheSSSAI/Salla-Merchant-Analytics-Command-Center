/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@salla/ui", "@salla/db"],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;