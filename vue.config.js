const path = require('path');
const webpack = require('webpack');
const FlowWebpackPlugin = require('flow-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const componentDevEnv = !!require('./package.json').componentDevEnv;

const envMap = {
    'development': process.env.VUE_APP_DEV_ENV,
    'test': process.env.VUE_APP_TEST_ENV
};

const PROXY_HREF = envMap[process.env.NODE_ENV];

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

/**
 * 开发环境下，为开发方便，将sdx组件库中的lib改为从src中引
 * 配置说明：
 * 将引用import '@sdx/ui' 改为从@sdx/ui/index.js中引入
 * 将引用import '@sdx/widget' 改为从@sdx/ui/index.js中引入
 * 将引用import '@sdx/ui/lib/**\/*','@sdx/widget/lib/**\/*','@sdx/view/lib/**\/*'改为从各自的components中引入,
 * 将引用import '@sdx/utils/lib/**\/*'改为从@sdx/utils/src/**\/*中引入
 * 这样做的目的：考虑开发场景：
 * 1. 开发组件时，需在应用中使用/联调，需要先打包才能使用
 * 2. 如果不打包，需要在应用中从源码中引，待开发完成组件库发布后再修改为从lib中引
 * 以上两种场景给开发带来很大的障碍，通过alias及transpileDependencies来规避这中场景带来的开发/维护难度
*/
if (!isProduction && componentDevEnv) {
    /**
     * 一般使用如import SdxUI from '@sdx/ui'，已经将@sdx/ui$作为alias的key，
     * 但由于项目中使用了babel-plugin-component-customize插件，该插件会默认将@sdx/ui改为从@sdx/ui/lib中引入，
     * 因此这里需要改成@sdx/ui/lib。
     * @type {string}
     */
    alias['@sdx/ui/lib$'] = '@sdx/ui/index.js';
    alias['@sdx/widget/lib$'] = '@sdx/widget/index.js';
    alias['@sdx/ui/lib'] = '@sdx/ui/components';
    alias['@sdx/widget/lib'] = '@sdx/widget/components';
    alias['@sdx/view/lib'] = '@sdx/view/components';
    alias['@sdx/utils/lib'] = '@sdx/utils/src';
}

module.exports = {
    lintOnSave: !isProduction ? false : false,
    publicPath: isProduction ? '/' : '/',
    assetsDir: isProduction ? '' : '',
    productionSourceMap: false,

    transpileDependencies: isProduction ? [] :
        componentDevEnv ?
        [
            './node_modules/@sdx/ui/components',
            './node_modules/@sdx/utils/src',
            './node_modules/@sdx/widget/components',
            './node_modules/@sdx/view/components'
        ] : [],

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
            }),
            new CopyWebpackPlugin([
                {
                    from: './node_modules/@sdx/utils/gateway',
                    to: 'gateway'
                }
            ]),
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
            '^/.*-manager': {
                target: PROXY_HREF,
                ws: true,
                changeOrigin: true,
            },
            '/fe-compose': {
                target: PROXY_HREF,
                ws: true,
                changeOrigin: true,
            },
            // '/mock': {
            //     target: 'https://easy-mock.com',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '/mock': '/mock/5cd04685adb0973be6a3d969/'
            //     }
            // },
            '^/api/': {
                target: 'http://localhost:8888',
                ws: true,
                changeOrigin: true
            },
            '^/terminals': {
                target: 'http://localhost:8888',
                ws: true,
                changeOrigin: true
            },
            '/help': {
                target: 'http://10.115.1.130',
                ws: true,
                changeOrigin: true
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
