/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/019924bf-250a-db35-10ed-d7656361ee8a',
        permanent: false, // This creates a 307 redirect
      },
    ]
  },
}

module.exports = nextConfig