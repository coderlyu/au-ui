const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpackConfig = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), './dist'),
    publicPath: '/dist',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      main: path.resolve(__dirname, '../src'),
      packages: path.resolve(__dirname, '../packages'),
      examples: path.resolve(__dirname, '../examples'),
      vue$: 'vue/dist/vue.common.js'
    },
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: [/node_modules/, /.husky/],
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

if (!process.env.CI_ENV) {
  webpackConfig.plugins.push(
    new ProgressBarPlugin()
  );
}

module.exports = webpackConfig;
