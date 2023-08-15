/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  httpAgentOptions: {
    keepAlive: false,
  },
};

module.exports = nextConfig;
