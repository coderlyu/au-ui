
// 获取组件分类列表
function getCompCategories(req, res) {
  res.json({ message: '获取组件分类列表' })
}

// 更新组件分类列表
function putCompCategories(req, res) {
  res.json({ message: '更新组件分类列表' })
}

module.exports = function App(app, server, compiler) {
  console.log('合适的发生都覅是的')
  app.get('/local/comp/category', getCompCategories)
  app.put('/local/comp/category', putCompCategories)
}
