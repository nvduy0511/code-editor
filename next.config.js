/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['static.fullstack.edu.vn', 'themoviedb.org'],
    },
    env: {
        BASE_URL_API: process.env.BASE_URL_API,
    },
};

module.exports = nextConfig;
