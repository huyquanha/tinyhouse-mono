/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve } from 'path';
import { Configuration } from 'webpack';
import { baseConfig } from '../../webpack.config.base';

const config: Configuration = {
  ...baseConfig('profile'),
  entry: {
    app: resolve(__dirname, 'src/main.ts'),
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
};

export default config;
