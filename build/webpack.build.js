const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const components = require('../components.json')
const isFull = process.env.LIBMODE === 'full'
const compEntry = {}
Object.keys(components).forEach(e => {
  compEntry[e] = path.resolve(__dirname, '../', components[e])
})

const entry = isFull ? path.resolve(__dirname, '../src/index.js') : compEntry

const webpackConfig = {
  mode: 'production',
  entry,
  output: {
    path: path.resolve(process.cwd(), 'lib'),
    publicPath: '',
    filename: isFull ? 'main.min.js' : '[name]/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      main: path.resolve(__dirname, '../src'),
      packages: path.resolve(__dirname, '../packages'),
      examples: path.resolve(__dirname, '../examples')
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
        use: [
          {
            loader: 'vue-loader',
            options: {
              // compilerOptions: {
              //   preserveWhitespace: false
              // }
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          isFull ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(less)$/,
        use: [
          isFull ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new CssMinimizerWebpackPlugin()
    ]
  },
  devtool: 'eval-cheap-source-map'
}

module.exports = webpackConfig
