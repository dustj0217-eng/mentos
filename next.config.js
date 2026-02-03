// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  turbopack: false, // ⭐ 핵심
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
