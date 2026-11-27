/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Cho phép truy cập từ điện thoại/thiết bị trong mạng nội bộ (Wi-Fi LAN) khi dev
  allowedDevOrigins: [
    '192.168.2.7',
    '192.168.2.*',
    'localhost',
    '127.0.0.1',
  ],
  // Cho phép gọi API backend NestJS khi phát triển
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
