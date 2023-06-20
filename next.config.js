/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents:true,
    },
    experimental: {
        serverActions: true,
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
      },
}

module.exports = nextConfig
