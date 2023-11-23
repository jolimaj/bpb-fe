/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, {}) {
      config.node = {
        fs: "empty",
      };
    },
  },
};

module.exports = nextConfig;
