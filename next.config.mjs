/** @type {import('next').NextConfig} */

const nextConfig = {
  // any /auth/* pattern will be redirected to the backend
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: "http://localhost:5000/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
