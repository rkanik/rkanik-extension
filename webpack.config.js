'use strict'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

const config = {
   performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
   },
   mode: 'production',
   context: __dirname + '/src',
   entry: {
      'app': './app/app.js',
      'background': './app/background.js',
      'popup/popup': './app/popup.js'
   },
   output: {
      path: __dirname + '/extension',
      filename: '[name].js'
   },
   module: {
      rules: [
         {
            test: /\.vue$/,
            loaders: 'vue-loader'
         }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
         }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
         }, {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
         }
      ]
   },
   plugins: [
      new VueLoaderPlugin(),
      new CopyWebpackPlugin([
         { from: 'app/manifest.json', to: 'manifest.json' },
         { from: 'html/popup.html', to: 'popup/popup.html' },
         { from: 'assets/icons', to: 'icons' },
         { from: 'libs', to: 'libs' },
         { from: 'assets/css', to: 'css' },
         { from: 'assets/fonts', to: 'fonts' },
      ]),
      new MiniCssExtractPlugin({ filename: '[name].css' }),
   ]
}
module.exports = config;