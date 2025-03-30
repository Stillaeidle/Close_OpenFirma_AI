/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable static export for better Netlify compatibility
  output: "export",

  // Make sure images are handled correctly
  images: {
    unoptimized: true,
  },

  // Ensure all assets are included in the export
  trailingSlash: true,

  // Include the public directory in the export
  distDir: "out",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
