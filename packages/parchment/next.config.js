const withTM = require("next-transpile-modules")([
  "@polemic/binder",
  "@polemic/react",
  "@polemic/parser",
  "@polemic/types",
]); // pass the modules you would like to see transpiled

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withTM(nextConfig);
