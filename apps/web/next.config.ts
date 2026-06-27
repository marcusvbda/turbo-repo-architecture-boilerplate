import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/types'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL!,
  },
}

export default nextConfig
