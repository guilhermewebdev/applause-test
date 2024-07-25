/** @type {import('next').NextConfig} */
import path from 'path'
const {
  ALLOWED_ORIGINS = ''
} = process.env;

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ALLOWED_ORIGINS.split(",")
    }
  },
  sassOptions: {
    includePaths: [path.resolve('./src/app/styles')],
  },
};

export default nextConfig;
