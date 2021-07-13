const path = require('path')
const templates = path.resolve(process.cwd(), './examples/pages/template')

const chokidar = require('chokidar')
const watcher = chokidar.watch([templates])

watcher.on('ready', function () {
})

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}