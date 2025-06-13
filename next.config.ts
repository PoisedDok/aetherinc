import type { NextConfig } from "next";
// Bundle analyzer setup
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  
  images: {
    domains: [
      "avatar.vercel.sh",
      "avatars.githubusercontent.com",
      "raw.githubusercontent.com",
      "seeklogo.com"
    ],
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
};

// Export wrapped config
export default withBundleAnalyzer(nextConfig);
