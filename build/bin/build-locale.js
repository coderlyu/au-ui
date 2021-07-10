const fs = require('fs')
const save = require('file-save')
const resolve = require('path').resolve
const basename = require('path').basename
const localePath = resolve(__dirname, '../../src/locale/lang')
const fileList = fs.readdirSync(localePath)

const transform = function (filename, name, cb) {
  require('babel-core').transformFile(resolve(localePath, filename), {
    plugins: [
      'add-module-exports',
      ['transform-es2015-modules-umd', { loose: true }]
    ],
    moduleId: name
  }, cb)
}

fileList
  .filter(function (file) {
    return /\.js$/.test(file)
  })
  .forEach(function (file) {
    const name = basename(file, '.js')

    transform(file, name, function (err, result) {
      if (err) {
        console.error(err)
      } else {
        let code = result.code

        code = code
          .replace('define(\'', 'define(\'element/locale/')
          .replace('global.', 'global.ELEMENT.lang = global.ELEMENT.lang || {}; \n    global.ELEMENT.lang.')
        save(resolve(__dirname, '../../lib/umd/locale', file)).write(code)

        console.log(file)
      }
    })
  })
