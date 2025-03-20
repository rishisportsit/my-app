const nextConfig = {
    reactStrictMode: false,
    async redirects() {
      return [
        {
          source: "/",
          destination: "/",
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  