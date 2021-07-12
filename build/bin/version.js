const fs = require('fs')
const path = require('path')
const version = process.env.VERSION || require('../../package.json').version
const content = { '0.0.1': '0.0.1' }
if (!content[version]) content[version] = '2.15'
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content))
