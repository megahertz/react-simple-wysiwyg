/* eslint-disable strict,@typescript-eslint/no-var-requires,quote-props */

'use strict';

const path = require('path');

module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/dist/',
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    lazy: false,
    filename: 'bundle.js',
    public: 'http://localhost:8080',
    publicPath: '/dist/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    alias: {
      'react-simple-wysiwyg': path.resolve('../../src'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  stats: 'minimal',
};
