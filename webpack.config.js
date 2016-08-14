var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './public',
        filename: 'coucou.js'
    },
    module: {
        loaders: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
            }

        ]
    }
};