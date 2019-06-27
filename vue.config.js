const path = require('path');
const webpack = require('webpack');
const FlowWebpackPlugin = require('flow-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const resolve = dir => path.join(__dirname, dir);

const alias = {
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
};

module.exports = {
    lintOnSave: !isProduction ? false : false,
    publicPath: isProduction ? '/' : '/',
    assetsDir: isProduction ? '' : '',
    productionSourceMap: false,

    transpileDependencies: isProduction ? [] :
        [
            './node_modules/@sdx/ui/components',
            './node_modules/@sdx/utils/src',
            './node_modules/@sdx/widget/components',
            './node_modules/@sdx/view/components'
        ],

    css: {
        extract: isProduction,
        sourceMap: false,
        // loaderOptions: {
        //     // 给 sass-loader 传递选项
        //     sass: {
        //         // styles/ 是 src/styles/ 的别名
        //         data: `
        //             @import "styles/base/constants.scss";
        //             @import "styles/base/colors.scss";
        //             @import "styles/base/mixin.scss";
        //         `
        //     }
        // }
    },

    configureWebpack: {
        entry: ['babel-polyfill', './src/main.js'],
        plugins: [
            // new FlowWebpackPlugin({
            //     failOnError: true,
            //     // flowPath: require.main.require('flow-bin'),
            //     flowArgs: ['--color=always']
            // }),
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
            alias
        }
    },

    chainWebpack: config => {
        ['scss', 'sass'].forEach(style => {
            ['vue', 'vue-modules', 'normal-modules', 'normal'].forEach(one => {
                config.module.rule(style)
                    .oneOf(one)
                    .use('sass-loader')
                    .loader('fast-sass-loader')
                    .end()
            })
        })
    },

    devServer: {
        port: 3100,
        proxy: {
            '^/user-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true,
            },
            '^/resource-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true,
            },
            '^/system-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true,
            },
            '^/image-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true,
            },
            '/fe-compose': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true,
            },
            '/project-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true
            },
            '/resource-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true
            },
            // '/mock': {
            //     target: 'https://easy-mock.com',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '/mock': '/mock/5cd04685adb0973be6a3d969/'
            //     }
            // },
            '^/file-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '/file-manager': '/file-manager'
                }
            },
            '^/model-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true
            },
            '^/skyflow-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true
            },
            '^/storage-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true
            },
            '^/api/v1/datasource': {
                target: 'http://10.201.0.29:5000',
                ws: true,
                changeOrigin: true
            },
            '^/api/v1/dataset': {
                target: 'http://10.201.0.29:5000',
                ws: true,
                changeOrigin: true
            },
            '^/api/v1': {
                target: 'https://easy-mock.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '/api/v1': '/mock/5cd04685adb0973be6a3d969/api/v1'
                }
            },
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
