/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  async redirects() {
    return [
      {
        source: '/blog/the-yield-gap-in-uae-fintech',
        destination: '/blog/the-earnings-gap-in-uae-fintech',
        permanent: true,
      },
      {
        source: '/blog/high-yield-savings-going-mainstream',
        destination: '/blog/high-rate-savings-going-mainstream',
        permanent: true,
      },
      {
        source: '/blog/invesco-superstate-onchain-yield-uae',
        destination: '/blog/invesco-superstate-uae-savers',
        permanent: true,
      },
      {
        source: '/blog/us-stablecoin-regulation-uae-yield',
        destination: '/blog/us-digital-savings-regulation-uae',
        permanent: true,
      },
      {
        source: '/blog/what-is-a-stablecoin-savings-app',
        destination: '/blog/lending-market-savings-app-explained',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
