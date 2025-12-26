/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Next 16 replaces experimental.serverComponentsExternalPackages with a top-level option.
  serverExternalPackages: ["sequelize", "pg", "pg-hstore", "bcryptjs"],
};

export default nextConfig;
