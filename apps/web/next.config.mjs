/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Cho phép gọi API backend NestJS khi phát triển
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/:path*`,
      },
    ];
  },
  webpack: (config, { dev }) => {
    // Khắc phục triệt để lỗi Windows file locking khi rename cache 0.pack.gz
    // Sử dụng bộ nhớ trong (in-memory cache) cho dev server giúp Hot-Reload tức thì và không bị mất CSS khi F5
    if (dev) {
      config.cache = {
        type: 'memory',
      };
    }
    return config;
  },
};

export default nextConfig;
