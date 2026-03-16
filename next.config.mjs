/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['simple-git', 'chokidar', 'js-yaml'],
  },
}

export default nextConfig
