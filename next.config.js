/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // Sanity images
      },
      {
        protocol: "https",
        hostname: "your-image-url.com", // Example custom image domain
      },
    ],
  },
};

module.exports = nextConfig;
