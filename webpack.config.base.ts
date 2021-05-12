/* eslint-disable @typescript-eslint/no-var-requires */
import nodeExternals from 'webpack-node-externals';
const { WebpackPnpExternals } = require('webpack-pnp-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
import { Configuration } from 'webpack';

const isProductionBuild = process.env.NODE_ENV === 'production';

export const baseConfig: Configuration = {
  target: 'async-node',
  cache: !isProductionBuild,
  ...(!isProductionBuild
    ? {
        devtool: 'source-map',
      }
    : {}),
  mode: isProductionBuild ? 'production' : 'development',
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals(), WebpackPnpExternals()], // in order to ignore node_modules or pnp zipped modules in yarn cache.
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          // Currently cannot be used because of this error : Cannot read property "options" of undefined.
          // I suspect this may have to do with thread-loader failing to serailize some functions in ts-loader
          // options object when passing the options to the workers, even though we don't provide any such options.
          // {
          //   loader: 'thread-loader', // Throw ts-loader into multi-threading to speed things up.
          //   options: {
          //     workers: cpus().length - 1,
          //     poolTimeout: Infinity,
          //   },
          // },
          {
            // CRAZY!! require.resolve() allows us to not need to install ts-loader in each workspace. AWESOME
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
              // happyPackMode: true,
              projectReferences: true,
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: require.resolve('source-map-loader'),
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      // Only report issues after webpack's compilation is done => doesn't block the compilation.
      // This is only used in watch mode, and should only be turned on for development.
      async: !isProductionBuild,
      typescript: {
        build: true,
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-tsbuildinfo',
        // Don't slow down production by profiling, only in development do we need this information.
        profile: !isProductionBuild,
      },
      eslint: {
        files: '**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
};
