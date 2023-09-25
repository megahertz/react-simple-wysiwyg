'use strict';

const path = require('path');

module.exports = {
  entry: ['./src/index.tsx'],
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/dist/',
  },
  devServer: {
    hot: true,
    static: {
      directory: __dirname,
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    alias: {
      'react-simple-wysiwyg': path.resolve('../..'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  stats: 'minimal',
};
