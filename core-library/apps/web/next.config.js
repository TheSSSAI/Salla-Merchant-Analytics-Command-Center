/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker optimization
  // This drastically reduces the size of the final image by including only necessary dependencies
  output: "standalone",

  // Enable React Strict Mode for better development practices
  reactStrictMode: true,

  // Disable the 'X-Powered-By: Next.js' header for security obscuration
  poweredByHeader: false,

  // Compiler options
  swcMinify: true,

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.salla.sa",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Limit supported formats for security and performance
    formats: ["image/avif", "image/webp"],
  },

  // Transpile shared internal packages if necessary
  // Since this is part of the core-library repo structure, we ensure local packages are compiled
  transpilePackages: ["@salla/analytics-core"],

  // Security headers configuration
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Eslint should be handled in the CI pipeline, not during production build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript errors should be handled in CI, allowing builds to proceed if types are checked separately
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;