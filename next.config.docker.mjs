/**
 * Simplified Next.js configuration for Docker deployment
 * This config disables potentially problematic optimizations
 */
const nextConfig = {
  // Don't use standalone output for this build
  output: undefined, 
  
  // Skip type checking and linting during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configure minimal image optimization
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Security and performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Disable experimental features
  experimental: {
    // Disable CSS optimization
    optimizeCss: false,
    // External packages that should be bundled separately
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  
  // Disable swcMinify (can sometimes cause issues)
  swcMinify: false,
};

export default nextConfig; 