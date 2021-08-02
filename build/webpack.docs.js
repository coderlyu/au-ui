const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: isProd ? { docs: './examples/entry.js' } : './examples/entry.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '',
    filename: 'static/js/[name].[fullhash:7].js',
    chunkFilename: isProd ? '[name].[fullhash:7].js' : '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      main: path.resolve(__dirname, '../src'),
      packages: path.resolve(__dirname, '../packages'),
      examples: path.resolve(__dirname, '../examples')
      // process: 'process/browser'
    },
    modules: ['node_modules']
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|jsx?)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: [/node_modules/, /.husky/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(less)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
      {
        test: /\.(svg|gif|png|jpe?g)$/,
        loader: 'url-loader',
        options: {
          limit: 8024,
          esModule: false,
          name: path.posix.join('static', 'images', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(otf|ttf|woff2?|eot)$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: path.posix.join('static', 'fonts', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './examples/index.tpl',
      filename: './index.html'
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BASE_PORT': JSON.stringify(process.env.BASE_PORT)
    }),
    // new webpack.EnvironmentPlugin(['NODE_ENV', 'BASE_PORT']),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ],
  optimization: {
    minimizer: []
  },
  devtool: 'source-map'
}

if (isProd) {
  // webpackConfig.externals = {
  //   vue: 'Vue',
  //   'vue-router': 'VueRouter',
  //   'highlight.js': 'hljs'
  // }
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: path.posix.join('static', 'css', '[name].[fullhash:7].css')
    })
  )
  webpackConfig.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new CssMinimizerWebpackPlugin()
  )
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/packages\//,
        name: 'au-ui',
        chunks: 'all'
      }
    }
  }
  webpackConfig.devtool = 'eval-cheap-module-source-map'
}

module.exports = webpackConfig
