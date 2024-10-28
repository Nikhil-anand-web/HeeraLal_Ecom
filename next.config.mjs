/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com','localhost'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'metadataBase', // Example header (not necessary for metadataBase)
            value: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
          },
        ],
      },
    ];
  },


  async rewrites() {
    return [
      
      {
        source: '/asset/:path*/:file', // the URL pattern you want to match
        destination: '/api/v1/asset/:path*/:file', // actual path on the file system
      },
    ];
  },
};

export default nextConfig;
