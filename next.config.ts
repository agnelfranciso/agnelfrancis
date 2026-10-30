import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.37"],
  env: {
    NEXT_PUBLIC_WEB3FORMS_KEY:
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      process.env.WEB3FORMS_KEY ||
      "",
  },
};

export default nextConfig;
