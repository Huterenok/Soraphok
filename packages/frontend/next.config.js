/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URI: process.env.SERVER_URI,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
