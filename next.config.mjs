// import type { NextConfig } from "next";
// Bundle analyzer setup
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * Next.js configuration optimized for Docker deployment
 */
const nextConfig = {
  // Enable standalone output for optimal Docker build
  output: 'standalone', 
  
  // Configure remote image domains
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
      // Added for news content images
      {
        protocol: 'https',
        hostname: 'eu-images.contentstack.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.contentstack.com',
        pathname: '/**',
      },
    ],
    // Optimize image sizes for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable ESLint during builds
  eslint: {
    ignoreDuringBuilds: false, // Run ESLint during builds
    dirs: ['src'], // Only run ESLint on the src directory
  },
  
  transpilePackages: ['motion'],
  
  // Enable server-side optimizations
  experimental: {
    // External packages that should be bundled separately
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
    // Disabling CSS optimization to fix build errors
    optimizeCss: false,
  },
  
  // Security and performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression
  reactStrictMode: true, // Enable React strict mode for better code quality
  
  // Cache optimization
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
  
  // Enable TypeScript checking during build
  typescript: {
    // Enable TypeScript type checking during builds
    ignoreBuildErrors: false,
  },

  // Custom webpack adjustments to fix CSS processing in Docker
  webpack: (config) => {
    // Always disable CSS minimization to avoid CSS parsing issues
    if (config.optimization && Array.isArray(config.optimization.minimizer)) {
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (plugin) => plugin.constructor?.name !== 'CssMinimizerPlugin'
      );
    }
    
    // Add special handling for globals.css to treat it as raw CSS
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((r) => {
          if (r.test && r.test.toString().includes('css') && !r.test.toString().includes('module')) {
            if (r.issuer && r.issuer.and && r.issuer.and.length > 0) {
              r.issuer.and = r.issuer.and.filter(
                (issuer) => !(issuer.toString().includes('src/app/globals.css'))
              );
            }
          }
        });
      }
    });
    
    return config;
  },
};

// Export wrapped config
export default withBundleAnalyzer(nextConfig);
