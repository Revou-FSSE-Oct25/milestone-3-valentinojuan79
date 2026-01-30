/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.escuelajs.co',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com', // API ini sering pakai hosting Imgur untuk fotonya
      },
    ],
  },
};

export default nextConfig;