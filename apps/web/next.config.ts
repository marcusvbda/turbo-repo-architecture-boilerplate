import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/types'],
  env: {
    //
  },
}

export default nextConfig
