/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI: process.env.DB_URI,
  },
};

module.exports = nextConfig;
