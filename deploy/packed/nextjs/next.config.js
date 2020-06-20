require('dotenv').config();

const withPlugins = require('next-compose-plugins');
const withBuildEnv = require('next-env');
const withImages = require('next-images');
const withSvgr = require('next-svgr');
const withMDXPlugin = require('@next/mdx')({
  extension: /\.mdx?$/,
});
const withNextJsWebpackOverride = require('nextjs-webpack-override');

const withPreconstruct = require('@preconstruct/next');
const withSourceMaps = require('@zeit/next-source-maps');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withProgressBarPlugin = require('next-progressbar');

const webpackOverrides = require('./webpackOverrides.js');

const baseConfig = {
  target: 'serverless',
  pageExtensions: ['md', 'mdx', 'jsx', 'js', 'ts', 'tsx'],
  compress: process.env.NODE_ENV === 'production',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new withNextJsWebpackOverride({
        // any standard webpack options that are usually inaccessible
        ...webpackOverrides,
      })
    );
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};

module.exports = withPreconstruct(
  withPlugins(
    [
      [withProgressBarPlugin, { profile: true }],
      [withSourceMaps],
      [withBundleAnalyzer],
      [
        withMDXPlugin,
        { pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'] },
      ],
      [withImages],
      [withSvgr],
      [withBuildEnv],
    ],
    baseConfig
  )
);

// module.exports = withPreconstruct(
//   withProgressBarPlugin(
//     { profile: true },
//     withSourceMaps(
//       withBundleAnalyzer(
//         withMDXPlugin(
//           { pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'] },
//           withBuildEnv(withRuntimeEnv(baseConfig))
//         )
//       )
//     )
//   )
// );
