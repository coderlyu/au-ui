const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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
    libraryTarget: 'umd',
    filename: isFull ? 'main.min.js' : '[name]/index.js'
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)$/,
        loader: 'url-loader',
        options: {
          limit: 8024,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: isFull ? 'main.css' : '[name]/[name].css'
    }),
    new CssMinimizerWebpackPlugin()
  ]
}

module.exports = webpackConfig
