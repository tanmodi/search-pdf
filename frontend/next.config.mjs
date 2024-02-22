// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/search",
                destination: "http://localhost:3500/api/search",
            },
            {
                source: "/upload",
                destination: "http://localhost:3500/api/upload",
            },
        ];
    },
};

export default nextConfig;
