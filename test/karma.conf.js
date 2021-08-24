const webpackConfig = require('../build/webpack.test');

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'], // 测试文件
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'] // 为选定脚本指定前处理器，这里配置所有的测试脚本需要经过webpack处理
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    client: {
      mocha: {
        timeout: 4000
      }
    }
  })
}
