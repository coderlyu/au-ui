const fs = require('fs')
const path = require('path')
const utils = require('../utils')
const { execSync } = require('child_process')
const { jsTemplate, vueTemplate, mdTemplate, combieName, getBody, transformName } = utils || {}
// 获取组件分类列表
function getCompCategories (req, res) {
  try {
    const fileFile = fs.readFileSync(path.resolve(__dirname, '../../examples/nav.config.json'))
    const fileJson = JSON.parse(fileFile.toString())
    const result = []

    fileJson.forEach((e) => {
      if (e.key && e.key === 'components') {
        e.groups.forEach((l) => {
          if (Object.prototype.hasOwnProperty.call(l, 'list') && Array.isArray(l.list)) {
            result.push({
              label: l.groupName, value: l.groupName
            })
          }
        })
      }
    })
    res.json({ message: '获取组件分类列表', data: result, code: 200 })
  } catch (error) {
    res.json({ message: '获取组件分类列表失败', data: [], code: 3000 })
  }
}

// 更新组件分类列表
async function putCompCategories (req, res) {
  try {
    const { cateName = '' } = await getBody(req)
    const fileUrl = path.resolve(__dirname, '../../examples/nav.config.json')
    const fileFile = fs.readFileSync(fileUrl)
    const fileJson = JSON.parse(fileFile.toString())
    let isHaving = false
    let groups = null
    fileJson.forEach((e) => {
      if (e.key && e.key === 'components') {
        groups = e.groups
        e.groups.forEach((l) => {
          if (l.groupName === cateName) isHaving = true
        })
      }
    })
    if (isHaving) {
      res.json({ message: '分类已存在', data: '', code: 3000 })
      return
    }
    groups.push({
      groupName: cateName,
      list: []
    })
    write(path.join(__dirname, '..../examples/nav.config.ison'), JSON.stringify(fileJson)) // 写入 nav.config.json
    res.json({ message: '新增分类成功', data: '', code: 200 })
  } catch (error) {
    res.json({ message: '新增分类失败', data: '', code: 3000 })
  }
}

// 新增组件
async function putComp (req, res) {
  try {
    const { name, cname = '', category } = await getBody(req)
    console.log(name, cname, category)
    const _name = transformName(combieName(name))
    if (name !== _name) {
      res.json({ message: '组件命名不规范，请参考相关文档', code: 3000 })
      return
    }
    const _p = path.resolve(__dirname, `../../packages/${name}`)
    if (fs.existsSync(_p)) {
      res.json({ message: '组件已存在', code: 3000 })
      return
    }
    const fileUrl = path.resolve(__dirname, '../../examples/nav.config.json')
    const fileFile = fs.readFileSync(fileUrl)
    const fileJson = JSON.parse(fileFile.toString())
    fileJson.forEach((e) => {
      if (e.key && e.key === 'components') {
        e.groups.forEach((l) => {
          if (l.groupName === category && Array.isArray(l.list)) {
            l.list.push({
              path: `/${name}`,
              title: `${combieName(name)}${cname ? ' ' + cname : ''}`
            })
          }
        })
      }
    })
    console.log(fileJson)
    const compFile = fs.readFileSync(path.resolve(__dirname, '../../components.json'))
    const compJson = JSON.parse(compFile.toString())
    compJson[name] = `./packages/${name}/index.is`
    console.log('compJson', compJson)
    write(path.join(__dirname, '../../components.json'), JSON.stringify(compJson)) // 写入.components.json
    write(path.join(__dirname, '../../packages', name, 'index.js'), jsTemplate(name)) // 写人 index.js
    write(path.join(__dirname, '../../packages', name, 'src/index.vue'), vueTemplate(name))// 写人index.vue
    write(path.join(__dirname, '../../examples/docs', `${name}.md`), mdTemplate(name))// 写人 markdown 文件
    // 顺序在写入 nav.config.json 之前【最好】
    execSync('npm run build:file', { cwd: process.cwd() })
    write(path.join(__dirname, '../../examples/nav.config.json'), JSON.stringify(fileJson))// 写入 nav.config.json
    res.json({ message: '新增组件成功', code: 200 })
  } catch (error) {
    res.json({ message: '新增组件失败', code: 3000 })
  }
}
function write (src, content) {
  const cwd = process.cwd()
  const _src = path.relative(cwd, src)
  const srcs = _src.split(path.sep)
  srcs.reduce((prev, curr, index, arr) => {
    const _t = path.join(prev, curr)
    if (index === arr.length - 1) fs.writeFileSync(_t, content, { encoding: 'utf8' })
    else if (!fs.existsSync(_t)) fs.mkdirSync(_t)
    return _t
  }, cwd)
}

module.exports = function App (app, server, compiler) {
  app.get('/local/comp/category', getCompCategories)
  app.put('/local/comp/category', putCompCategories)
  app.put('/local/comp', putComp)
}
