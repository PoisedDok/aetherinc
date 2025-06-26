// import type { NextConfig } from "next";
// Bundle analyzer setup
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  /* config options here */
  
  output: 'standalone', // Enable standalone output for Docker deployment
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'seeklogo.com',
        pathname: '/**',
      },
    ],
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  transpilePackages: ['motion'],
  
  // Enable request timeouts for improved reliability
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  
  // Optimize for production
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Configure server-side compression
  compress: true,
};

// Export wrapped config
export default withBundleAnalyzer(nextConfig);
