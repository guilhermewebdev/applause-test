/** @type {import('next').NextConfig} */
const {
  ALLOWED_ORIGINS = ''
} = process.env;

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ALLOWED_ORIGINS.split(",")
    }
  }
};

export default nextConfig;
