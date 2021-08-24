// require('babel-regenerator-runtime')

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec.js$/)
testsContext.keys().forEach(testsContext)

const srcContext = require.context('../src', true, /\.js$/)
srcContext.keys().forEach(srcContext)
