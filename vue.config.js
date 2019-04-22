const path = require('path');
const webpack = require('webpack');
const FlowWebpackPlugin = require('flow-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const resolve = dir => path.join(__dirname, dir);

module.exports = {
    lintOnSave: !isProduction ? 'default' : false,
    publicPath: isProduction ? '/' : '/',
    assetsDir: isProduction ? '' : '',
    productionSourceMap: false,

    css: {
        extract: isProduction,
        sourceMap: !isProduction,
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // styles/ 是 src/styles/ 的别名
                data: `
                    @import "styles/base/constants.scss";
                    @import "styles/base/colors.scss";
                    @import "styles/base/mixin.scss";
                `
            }
        }
    },

    configureWebpack: {
        entry: ['babel-polyfill', './src/main.js'],
        plugins: [
            new FlowWebpackPlugin({
                flowArgs: ['status']
            }),
            new webpack.ProvidePlugin({
                _: 'lodash'
            }),
            new webpack.LoaderOptionsPlugin({
                vue: {}
            })
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: 'chunk-vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        chunks: 'initial'
                    },
                    common: {
                        name: 'chunk-common',
                        minChunks: 2,
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true
                    }
                }
            }
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                'src': resolve('src'),
                'assets': resolve('src/assets'),
                'views': resolve('src/views'),
                'components': resolve('src/components'),
                'styles': resolve('src/assets/styles'),
                'api': resolve('src/api'),
                'store': resolve('src/store'),
                'router': resolve('src/router'),
                'utils': resolve('src/utils')
            }
        }
    },

    devServer: {
        port: 3100,
        proxy: {
            '/v2': {
                target: 'http://10.115.1.130',
                ws: true,
                changeOrigin: true
            },
            '/mock': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true
            }
        },
        overlay: true
    },

    pluginOptions: {
      i18n: {
        locale: 'zh-CN',
        fallbackLocale: 'zh-CN',
        localeDir: 'assets/i18n',
        enableInSFC: false
      }
    }
};
