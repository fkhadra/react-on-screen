/* eslint-disable */
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  devServer: {
    hot: true,
    inline: true,
    port: 7700,
    historyApiFallback: true,
  },
  output: {
    filename: 'dist/ReactOnScreen.js',
    libraryTarget: 'umd',
    library: 'ReactOnScreen'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
    {
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
