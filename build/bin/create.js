const fs = require('fs')
const path = require('path')
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
      targetDir = name
      root = path.join(path.resolve(cwd, './packages'), targetDir)
      if (!fs.existsSync(root)) {
        existing = true
        fs.mkdirSync(root, { recursive: true })
      }
    }
  }
  console.log(`\n正在创建项目 ${root} ...`)
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

  /**
   * 模板字符串拼接
   */
  const jsTemplate = `
import Au${compieName(targetDir)} from './src/index.vue'

Au${compieName(targetDir)}.install = function (Vue) {
  Vue.component(Au${compieName(targetDir)}.name, Au${compieName(targetDir)})
}

export default Au${compieName(targetDir)}
`
  const vueTemplate = `
<template>
  <div>Au${compieName(targetDir)}组件</div>
</template>
<script>
export default {
  name: '${targetDir}'
}
</script>
`
  const mdTemplate = `
# ${targetDir}

## 基础用法
基础用法
`
  const compFile = fs.readFileSync(path.join(__dirname, '../../components.json'))
  const compJson = JSON.parse(compFile.toString())
  compJson[targetDir] = `./packages/${targetDir}/index.js`
  write(path.join(__dirname, '../../components.json'), JSON.stringify(compJson)) // 写入 components.json
  write(path.join(__dirname, '../../packages', targetDir, 'index.js'), jsTemplate) // 写入 index.js
  write(path.join(__dirname, '../../packages', targetDir, 'src/index.vue'), vueTemplate) // 写入 index.vue
  write(path.join(__dirname, '../../examples/docs', `${targetDir}.md`), mdTemplate) // 写入 markdown 文件
  write(path.join(__dirname, '../../examples/nav.config.json'), JSON.stringify(jsonFile)) // 写入 nav.config.json

  console.log(`\n${targetDir} 组件以及文档初始化成功\n`)
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
// 首字母大写
function firstUpper (name) {
  if (!name) return ''
  const c = name.charAt(0)
  if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) return c.toUpperCase() + name.slice(1)
  return name
}
// line-1 => line1
function compieName (name) {
  const arr = name.split('-')
  return arr.map((e) => firstUpper(e)).join('')
}

init().catch((e) => {
  console.error(e)
})
