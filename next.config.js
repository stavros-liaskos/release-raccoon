/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'ts'],
  images: {
    domains: ['www.placecage.com'],
  },
  env: {
    BE_BASE_URL: process.env.BE_BASE_URL,
  },
};
