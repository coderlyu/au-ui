# 说明

## 使用

## 开发

### 新增组件

1. `packages` 下新建文件夹，名字为你组件的名字
2. `components.json` 文件中新增指向你新建的组件的入口文件，同时，`key` 值是你组件的小写名字
3. `examples/docs` 新增 `.md` 说明文件，文件名 是上述 `components.json` 中新增 的 `key` 名字
4. `examples/nav.config.json` 添加导航链接

### 文档书写

例如：demo 组件

:::demo Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。
```html
<template>
  <demo>
    你好啊
  </demo>
  <demo>
    我是xxx
  </demo>
</template>
```
:::