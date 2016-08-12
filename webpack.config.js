var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
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
   }],
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin()
          ]
};
