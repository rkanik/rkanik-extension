/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-path-concat */

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
   context: __dirname + '/src',
   mode: 'production',
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
         }, {
            test: /\.sass$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?indentedSyntax'],
         }
      ]
   },
   plugins: [
      new VueLoaderPlugin(),
      new CopyWebpackPlugin([
         { from: 'app/manifest.json', to: 'manifest.json' },
         { from: 'assets/css/style.css', to: 'assets/css/style.css' },
         { from: 'html/popup.html', to: 'popup/index.html' },
         { from: 'assets/icons', to: 'assets/icons' },
      ]),
      new MiniCssExtractPlugin({
         filename: 'assets/css/[name].css',
      }),
   ]
}
