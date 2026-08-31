/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholder — replace with the real S3/CDN host once Backend.md's
    // media storage is provisioned. Wildcarding is fine for now since no
    // real media host is confirmed yet.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

module.exports = nextConfig;
