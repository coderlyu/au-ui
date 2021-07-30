const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const argv = require('minimist')(process.argv.slice(2))
const { prompt } = require('enquirer')
const {
  yellow,
  green,
  cyan,
  magenta,
  lightRed,
  stripColors
} = require('kolorist')
const utils = require('../utils')
const { transformName, vueTemplate, mdTemplate, jsTemplate, firstUpper, combieName } = utils || {}

const colors = [yellow, green, cyan, magenta, lightRed]

const cwd = process.cwd()

async function init () {
  let targetDir = argv._[0]
  if (!targetDir) {
    const { name } = await prompt({
      type: 'input',
      name: 'name',
      message: '请输入你需要新增的组件名称：',
      initial: ''
    })
    targetDir = name
  }

  let root = path.join(path.resolve(cwd, './packages'), targetDir)

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  } else {
    let existing = false
    while (!existing) {
      const { name } = await prompt({
        type: 'input',
        name: 'name',
        initial: '',
        message: '组件已存在，请输入：'
      })
      targetDir = transformName(combieName(name))
      if (targetDir !== name) {
        continue
      }
      root = path.join(path.resolve(cwd, './packages'), targetDir)
      if (!fs.existsSync(root)) {
        existing = true
        fs.mkdirSync(root, { recursive: true })
      }
    }
  }
  console.log(`\n正在创建项目 ${chalk.red(root)} ...`)
  const nav = fs.readFileSync(path.resolve(__dirname, '../../examples/nav.config.json'))
  const jsonFile = JSON.parse(nav.toString())
  const result = []
  jsonFile.forEach((e) => {
    if (e.key && e.key === 'components') {
      e.groups.forEach((g) => {
        if (Object.prototype.hasOwnProperty.call(g, 'groupName')) {
          result.push(g)
        }
      })
    }
  })
  const categories = result.map((e, i) => {
    const color = colors[i % colors.length]
    return color(e.groupName)
  })
  const { c } = await prompt({
    type: 'select',
    name: 'c',
    message: '请选择组件的类别：',
    choices: categories
  })
  const clas = stripColors(c) // 获取到的类别名
  result.forEach((e) => {
    if (e.groupName === clas) {
      e.list.push({
        path: `/${targetDir}`,
        title: firstUpper(targetDir)
      })
    }
  })

  const compFile = fs.readFileSync(path.join(__dirname, '../../components.json'))
  const compJson = JSON.parse(compFile.toString())
  compJson[targetDir] = `./packages/${targetDir}/index.js`
  write(path.join(__dirname, '../../components.json'), JSON.stringify(compJson)) // 写入 components.json
  write(path.join(__dirname, '../../packages', targetDir, 'index.js'), jsTemplate(targetDir)) // 写入 index.js
  write(path.join(__dirname, '../../packages', targetDir, 'src/index.vue'), vueTemplate(targetDir)) // 写入 index.vue
  write(path.join(__dirname, '../../examples/docs', `${targetDir}.md`), mdTemplate(targetDir)) // 写入 markdown 文件
  write(path.join(__dirname, '../../examples/nav.config.json'), JSON.stringify(jsonFile)) // 写入 nav.config.json

  console.log(`\n${chalk.bgMagenta(`${chalk.underline(targetDir)} 组件以及文档初始化成功)`)}\n`)
}

function write (src, content) {
  const _src = path.relative(cwd, src)
  const srcs = _src.split(path.sep)
  srcs.reduce((prev, curr, index, arr) => {
    const _t = path.join(prev, curr)
    if (index === arr.length - 1) {
      fs.writeFileSync(_t, content, { encoding: 'utf8' })
    } else {
      if (!fs.existsSync(_t)) fs.mkdirSync(_t)
    }
    return _t
  }, cwd)
}

init().catch((e) => {
  console.error(e)
})
