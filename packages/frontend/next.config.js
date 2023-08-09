/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URI: process.env.SERVER_URI,
  },
};

module.exports = nextConfig;
