'use strict'
const path = require('path')
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
    resolve: {
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                include: path.resolve(__dirname, 'src'),
                loaders: 'vue-loader'
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            { from: 'app/manifest.json', to: 'manifest.json' },
            { from: 'html/popup.html', to: 'popup/popup.html' },
            { from: 'assets/icons', to: 'icons' },
        ]),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
    ],
    watch: true
}

module.exports = config;