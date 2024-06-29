/** @type {import('next').NextConfig} */

const API_URL = "https://api.spellguru.ai";
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
