
// js
function jsTemplate(name) {
  return `
import Ts${combieName(name)} from './src/index.vue'

Ts${combieName(name)}.install = function (Vue) {
  Vue.component(Ts${combieName(name)}.name, Ts${combieName(name)})
}

export default Ts${combieName(name)}
`
}

function packageJsonTemplate(name) {
  return `
{
  "name": "${name}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
`
}

// vue
function vueTemplate(name) {
  return `
<template>
  <div>${combieName(name)}组件</div>
</template>
<script>
export default {
  name: '${name}'
}
</script>
`
}

// .md
function mdTemplate(name) {
  return `
# ${name}

**单个引入**
\`\`\`js
import ${combieName(name)} from 'au-ui/packages/${name}'
export default {
  components: {
    ${combieName(name)}
  }
}
\`\`\`

## 基础用法
基础用法

:::demo
\`\`\`html
<template>
  <${name} />
</template>
\`\`\`
:::

## API

### 属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|   ——    |   ——   |   ——   |   ——    |    ——    |

### 事件

| 事件名称      | 说明          |  回调参数                      |
|---------- |-------------- | --------------------------------  |
|   ——     |   ——   |   ——   |
`
}

// 首字母大写
function firstUpper (name) {
  if (!name) return ''
  const c = name.charAt(0)
  if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) return c.toUpperCase() + name.slice(1)
  return name
}

// line-1 -> line1
function combieName(name) {
  const arr = name.split('-')
  return arr.map(e => firstUpper(e)).join('')
}

// 获取 post/put 请求体的数据

function getBody(req) {
  return new Promise((resolve) => {
    let str = ''
    req.on('data', data => (str += data))
    req.on('end', () => {
      const _d = str.toString()
      const data = {}
      _d.split('&').forEach(e => {
        const [name, value] = e.split('=')
        data[name] = global.decodeURI(value)
      })
      resolve(data)
    })
  })
}

// line1 -> line-1
function transformName(n) {
  return n.split('').reduce((p, c, i) => {
    if (i === 0) return c.toLocaleLowerCase()
    else if (/^[A-Z]$/.test(c)) return p + '-' + c.toLocaleLowerCase()
    else if (/^\d$/.test(c)) return /^\d$/.test(p.charAt(p.length - 1)) ? (p + c) : (p + '-' + c)
    return p + c
  }, '')
}

module.exports = {
  packageJsonTemplate,
  transformName,
  vueTemplate,
  mdTemplate,
  jsTemplate,
  firstUpper,
  combieName,
  getBody
}
