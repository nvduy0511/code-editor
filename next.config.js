/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['static.fullstack.edu.vn', 'themoviedb.org'],
    },
};

module.exports = nextConfig;
