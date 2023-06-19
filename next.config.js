/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = false;
    }
    return config;
  },
  experimental: {
    optimizeCss: true,
    appDir: true
  },
  env: {
    API_URL: 'http://127.0.0.1:7000'
  },
};