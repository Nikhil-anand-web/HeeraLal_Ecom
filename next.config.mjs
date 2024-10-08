/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com'],
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
