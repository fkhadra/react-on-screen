/* eslint-disable */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseDir = `${__dirname}/src/__playground__`;

module.exports = {
  mode: 'development',
  entry: `${baseDir}/index.js`,
  output: {
    path: baseDir,
    filename: 'ReactOnScreen.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${baseDir}/index.html`,
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: process.env.PORT || 8888,
    historyApiFallback: true,
    open: true,
    host: '0.0.0.0',
  }
};