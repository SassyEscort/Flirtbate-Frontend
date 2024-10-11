/** @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '**'
      }
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow'
          }
        ]
      },
      {
        source: '/public/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain'
          }
        ]
      }
    ];
  },

  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}'
    }
  },

  experimental: {
    scrollRestoration: true
  },

  env: {
    NEXT_APP_VERSION: 'v1.0.0',
    NEXTAUTH_SECRET: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=',
    NEXTAUTH_URL: 'http://localhost:3000/',
    REACT_APP_GOOGLE_MAPS_API_KEY: 'AIzaSyAXv4RQK39CskcIB8fvM1Q7XCofZcLxUXw',
    NEXT_APP_API_URL: 'https://mock-data-api-nextjs.vercel.app',
    NEXT_APP_JWT_SECRET: 'ikRgjkhi15HJiU78-OLKfjngiu',
    NEXT_APP_JWT_TIMEOUT: '86400',
    NEXTAUTH_SECRET_KEY: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg='
  }
};

module.exports = nextConfig;
