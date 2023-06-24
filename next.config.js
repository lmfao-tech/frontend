/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
const HoneybadgerSourceMapPlugin = require("@honeybadger-io/webpack");
const { execSync } = require("child_process");

const {
  HONEYBADGER_API_KEY,
  NODE_ENV,
} = process.env;

const nextConfig = withPWA({
  experimental: { images: { allowFutureImage: true } },
  env: {
    HONEYBADGER_API_KEY
  },
  webpack: (config, options) => {
    // When all the Honeybadger configuration env variables are
    // available/configured The Honeybadger webpack plugin gets pushed to the
    // webpack plugins to build and upload the source maps to Honeybadger.
    // This is an alternative to manually uploading the source maps.
    // See https://docs.honeybadger.io/lib/javascript/guides/using-source-maps.html
    // Note: This is disabled in development mode.
    if (HONEYBADGER_API_KEY && NODE_ENV != "development") {
      // `config.devtool` must be 'hidden-source-map' or 'source-map' to properly pass sourcemaps.
      // Next.js uses regular `source-map` which doesnt pass its sourcemaps to Webpack.
      // https://github.com/vercel/next.js/blob/89ec21ed686dd79a5770b5c669abaff8f55d8fef/packages/next/build/webpack/config/blocks/base.ts#L40
      config.devtool = "hidden-source-map";

      config.plugins.push(
        new HoneybadgerSourceMapPlugin({
          apiKey: HONEYBADGER_API_KEY,
          assetsUrl:
            process.env.NODE_ENV == "development"
              ? "http://localhost:3000"
              : "https://lmfao.tech/_next",
        })
      );
    }

    return config;
  },
});

module.exports = nextConfig;
