import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['static.wixstatic.com', 'images.unsplash.com', 'res.cloudinary.com', 'a.storyblok.com', 'storyblok-cdn.mindvalley.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
