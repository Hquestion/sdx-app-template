{
  mode: 'development',
  context: 'C:\\hxl\\code\\intelligent\\src\\static',
  devtool: 'cheap-module-eval-source-map',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'C:\\hxl\\code\\intelligent\\src\\static\\dist',
    filename: '[name].js',
    publicPath: '/',
    globalObject: 'this'
  },
  resolve: {
    alias: {
      '@': 'C:\\hxl\\code\\intelligent\\src\\static\\src',
      vue$: 'vue/dist/vue.esm.js',
      src: 'C:\\hxl\\code\\intelligent\\src\\static\\src',
      assets: 'C:\\hxl\\code\\intelligent\\src\\static\\src\\assets',
      views: 'C:\\hxl\\code\\intelligent\\src\\static\\src\\views',
      components: 'C:\\hxl\\code\\intelligent\\src\\static\\src\\components',
      styles: 'C:\\hxl\\code\\intelligent\\src\\static\\src\\styles',
      api: 'C:\\hxl\\code\\intelligent\\src\\static\\src\\api',
      store: 'C:\\hxl\\code\\intelligent\\src\\static\\src\\store',
      router: 'C:\\hxl\\code\\intelligent\\src\\static\\src\\router',
      fonts: 'C:\\hxl\\code\\intelligent\\src\\static\\src\\fonts',
      utils: 'C:\\hxl\\code\\intelligent\\src\\static\\src\\utils'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'C:\\hxl\\code\\intelligent\\src\\static\\node_modules',
      'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\@vue\\cli-service\\node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\@vue\\cli-plugin-eslint\\node_modules',
      'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'C:\\hxl\\code\\intelligent\\src\\static\\node_modules',
      'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\@vue\\cli-service\\node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '263c060b'
            }
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
              cacheDirectory: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '263c060b'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'skydiscovery/static/dist/img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'skydiscovery/static/dist/img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'skydiscovery/static/dist/media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'skydiscovery/static/dist/fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-plain-loader'
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  data: '\n                    @import "styles/constants.scss";\n                    @import "styles/colors.scss";\n                    @import "styles/mixin.scss";\n                '
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  data: '\n                    @import "styles/constants.scss";\n                    @import "styles/colors.scss";\n                    @import "styles/mixin.scss";\n                '
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  data: '\n                    @import "styles/constants.scss";\n                    @import "styles/colors.scss";\n                    @import "styles/mixin.scss";\n                '
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  data: '\n                    @import "styles/constants.scss";\n                    @import "styles/colors.scss";\n                    @import "styles/mixin.scss";\n                '
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  indentedSyntax: true,
                  data: '\n                    @import "styles/constants.scss";\n                    @import "styles/colors.scss";\n                    @import "styles/mixin.scss";\n                '
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  indentedSyntax: true,
                  data: '\n                    @import "styles/constants.scss";\n                    @import "styles/colors.scss";\n                    @import "styles/mixin.scss";\n                '
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  indentedSyntax: true,
                  data: '\n                    @import "styles/constants.scss";\n                    @import "styles/colors.scss";\n                    @import "styles/mixin.scss";\n                '
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  indentedSyntax: true,
                  data: '\n                    @import "styles/constants.scss";\n                    @import "styles/colors.scss";\n                    @import "styles/mixin.scss";\n                '
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              {
                loader: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  publicPath: '../../../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '32499cfe'
            }
          },
          {
            loader: 'babel-loader'
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\@vue\\cli-service\\lib'
        ],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue'
              ],
              cache: true,
              cacheIdentifier: 'bdc6c73a',
              emitWarning: true,
              emitError: false,
              eslintPath: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\eslint\\lib\\api.js',
              formatter: function () { /* omitted long function */ }
            }
          }
        ]
      },
      /* config.module.rule('md') */
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler',
            options: {
              raw: true,
              use: {
                preprocess: function () { /* omitted long function */ },
                use: [
                  [
                    function () { /* omitted long function */ },
                    'demo',
                    {
                      validate: params => params.trim().match(/^demo\s*(.*)$/),
                      render: function () { /* omitted long function */ }
                    }
                  ],
                  [
                    function () { /* omitted long function */ },
                    'tip'
                  ],
                  [
                    function () { /* omitted long function */ },
                    'warning'
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          preprocess: function () { /* omitted long function */ },
          use: [
            [
              function () { /* omitted long function */ },
              'demo',
              {
                validate: params => params.trim().match(/^demo\s*(.*)$/),
                render: function () { /* omitted long function */ }
              }
            ],
            [
              function () { /* omitted long function */ },
              'tip'
            ],
            [
              function () { /* omitted long function */ },
              'warning'
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          VUE_APP_BASE_API: '""',
          VUE_APP_STATIC_PATH: '"/"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin(
      {
        filename: 'skydiscovery/static/dist/css/[name].[contenthash:8].css',
        chunkFilename: 'skydiscovery/static/dist/css/[name].[contenthash:8].css'
      }
    ),
    /* config.plugin('hmr') */
    new HotModuleReplacementPlugin(),
    /* config.plugin('progress') */
    new ProgressPlugin(),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        templateParameters: function () { /* omitted long function */ },
        template: 'C:\\hxl\\code\\intelligent\\src\\static\\public\\index.html'
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    /* config.plugin('copy') */
    new CopyWebpackPlugin(
      [
        {
          from: 'C:\\hxl\\code\\intelligent\\src\\static\\public',
          to: 'C:\\hxl\\code\\intelligent\\src\\static\\dist',
          toType: 'dir',
          ignore: [
            '.DS_Store'
          ]
        }
      ]
    ),
    {
      options: {
        failOnError: false,
        failOnErrorWatch: false,
        reportingSeverity: 'error',
        printFlowOutput: true,
        flowPath: 'C:\\hxl\\code\\intelligent\\src\\static\\node_modules\\flow-bin\\flow-win64-v0.90.0\\flow.exe',
        flowArgs: [
          'status'
        ],
        verbose: false,
        callback: (_) => {}
      }
    },
    {
      definitions: {
        $: 'jquery',
        jQuery: 'jquery',
        _: 'lodash'
      }
    }
  ],
  entry: [
    'babel-polyfill',
    './src/main.js'
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
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
  }
}
