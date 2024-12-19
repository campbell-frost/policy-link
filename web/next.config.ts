import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  env: {
    POLICY_LINK_API: process.env.POLICY_LINK_API,
  },
};

export default nextConfig;
