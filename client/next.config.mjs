/** @type {import("next").NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'inventelevator.com', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      /* EC2 server — with and without port 5000 */
      { protocol: 'http', hostname: 'ec2-13-200-6-248.ap-south-1.compute.amazonaws.com' },
      { protocol: 'http', hostname: 'ec2-13-200-6-248.ap-south-1.compute.amazonaws.com', port: '5000' },
      /* localhost dev server */
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: 'localhost', port: '5000' },
    ],
  },
};

export default nextConfig;
