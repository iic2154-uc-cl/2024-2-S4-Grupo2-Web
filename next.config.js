/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["api.georent.cl", "localhost", "dev.georent.cl"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/georent_html/inicio.html",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
