import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;


module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}
