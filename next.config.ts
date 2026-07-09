import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.100.78', '192.168.56.1', '10.238.128.65'],
};

export default nextConfig;
