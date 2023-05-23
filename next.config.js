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
  },
};
