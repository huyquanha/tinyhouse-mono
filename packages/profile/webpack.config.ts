/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import { Configuration } from 'webpack';
import { baseConfig } from '../../webpack.config.base';

const config: Configuration = {
  ...baseConfig,
  entry: path.resolve(__dirname, 'src/main.ts'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
};

export default config;
