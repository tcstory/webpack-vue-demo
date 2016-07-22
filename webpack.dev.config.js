var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

process.argv.forEach(function (item) {
    if (item === 'auto') {
        process.env.AUTO = '1';
    } else if (item === 'https') {
        process.env.HTTPS = '1';
    }
});

module.exports = {
    entry: {
        app: ['./index.js'],
        'vue-libs': ['vue']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: "js/chunk/[name].js"
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vue-libs',
            filename: 'js/vue-libs.js',
            minChunks: Infinity
        }),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.DefinePlugin({
            __DEV__: true
        })
    ],
    postcss: function () {
        return [precss, autoprefixer];
    }
};

if (process.env.AUTO === '1') {
    module.exports.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}
