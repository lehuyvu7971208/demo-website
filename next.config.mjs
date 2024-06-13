/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        port: "",
        pathname: "**",
        protocol: "https",
        hostname: "dummyjson.com",
      },
    ],
  },

  redirects() {
    return [
      {
        source: "/",
        permanent: true,
        destination: "/posts",
      },

      {
        source: "/auth",
        permanent: true,
        destination: "/auth/sign-in",
      },
    ];
  },
};

export default nextConfig;
