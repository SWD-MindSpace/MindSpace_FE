/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable SSR globally
  experimental: {
    appDir: true,
    serverActions: true,
  },
  // Force client-side rendering
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
