/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'kharchoufa.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.kharchoufa.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // Enable static exports if needed
  // output: 'export',
}

module.exports = nextConfig 