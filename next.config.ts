import type { NextConfig } from "next";

export default {
  experimental: {
    dynamicIO: true,
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ictawards.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8090",
        pathname: "/api/files/**",
      },
      {
        protocol: "https",
        hostname: "hermanngmeiner.fly.dev",
        port: "",
        pathname: "/api/files/**",
      },
    ],
  },
} satisfies NextConfig;
