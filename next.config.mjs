/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Behind nginx, the proxied Host doesn't match the browser Origin unless we
    // whitelist the public domain, or Server Actions get silently rejected.
    serverActions: {
      allowedOrigins: ["lex.nvxthai.dev", "localhost:3000"],
    },
  },
};

export default nextConfig;
