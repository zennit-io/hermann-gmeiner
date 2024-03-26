/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "static",
        port: "8080",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
