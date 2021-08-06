# 说明

大屏可视化组件库

## 使用

### 按需加载

借助`npm install babel-plugin-import -D`
```js
// babel.config.js
module.exports = {
  "plugins": [
    [
      "import",
      {
        libraryName: "au-ui",
        style: () => false,
        customName: (name) => {
          function transformName(n) {
            return n.split('').reduce((p, c, i) => {
              if (i === 0) return c.toLocaleLowerCase()
              else if (/^[A-Z]$/.test(c)) return p + '-' + c.toLocaleLowerCase()
              else if (/^\d$/.test(c)) return /^\d$/.test(p.charAt(p.length - 1)) ? (p + c) : (p + '-' + c)
              return p + c
            }, '')
          }
          return `au-ui/packages/${transformName(name)}`
        }
      },
      "au-ui-name" // 第三个参数是针对 babel-plugin-import 使用了多次，必须给它一个唯一的名称
    ]
  ]
}
```

## 开发

### 新增组件

1. `packages` 下新建文件夹，名字为你组件的名字
2. `components.json` 文件中新增指向你新建的组件的入口文件，同时，`key` 值是你组件的小写名字
3. `examples/docs` 新增 `.md` 说明文件，文件名 是上述 `components.json` 中新增 的 `key` 名字
4. `examples/nav.config.json` 添加导航链接

### 文档书写

1. 需要放入展示的代码块，必须使用 `:::demo` 开头，并且以 `:::`结尾。
2. 添加表格 以 `|` 分隔，如下

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| html     | 显示的文字，绑定html属性，可与message连用 | string | — | — |
| propStyle | 内容文字的样式 | string/Object | — | — |
| message | 显示的文字，普通内容，可与html连用 | string | — | — |
| speed | 单次滚动用时，单位为秒 | number | — | 4 |
| timingFunction | 动画的速度曲线，默认匀速 | string | — | linear |
| interval | 是否滚动结束时停留一段时间 | boolean | true/false | true |


**插入展示效果的代码块**

例如：Roll 组件

:::demo Roll 组件提供。
```html
<template>
  <roll message="这是很长的一段文字" />
</template>
```
:::


## 代码提交规范

- `feat`: 新功能、新特性
- `fix`:  修复缺陷
- `docs`: 文档改变
- `style`: 代码风格改变
- `refactor`: 除新特性和缺陷修复的其它代码变动
- `perf`: 性能优化
- `test`: 测试变更
- `build`: 构建工具或外部依赖
- `chore`: 其它文件变更
- `revert`: 撤销上一次的 commit