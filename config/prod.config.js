const merge = require('webpack-merge')
const baseConfig = require('./base.config.js')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const Dotenv = require('dotenv-webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')


module.exports = merge(baseConfig, {
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].[chunkhash].js'
    },

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new TerserPlugin({
              test: /\.js(\?.*)?$/i,
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'../src','index.html'),
            filename: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true
        }),
        new WorkboxPlugin.InjectManifest({
            globPatterns: ['**\/*.{html,js,css}'],
            swDest: path.join(__dirname,'../dist','service-worker.js'),
            swSrc: path.join(__dirname,'../src','service-worker.js')
        }),
        new WebpackPwaManifest({
            name: 'Zolve Assignment',
            short_name: 'zolve-assignment',
            description: 'Zolve Assignment!',
            background_color: '#ffffff',
            orientation: "portrait",
            display: "standalone",
            theme_color: "#556cd6", 
            start_url: "/",
            fingerprints: false,
            icons: [
                {
                    src: path.join(__dirname,'../src/assets','icon.png'),
                    destination: path.join('assets/icons'),
                    sizes: [96, 128, 144, 256, 512] 
                }
            ]
        }),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.7
            }),
        new BrotliPlugin({
            filename: '[path].br[query',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.7
            })
      
    ]
});