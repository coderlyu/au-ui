# Rank-1 列表

## 基本使用

需设置 组件的高度

:::demo
```html
<template>
  <rank-1 :d-data="list" style="height: 500px" />
</template>
<script>
  export default {
    data() {
      return {
        list: [
          { name: '第一位', event: 10, danger: 12 },
          { name: '第二位', event: 8, danger: 10 },
          { name: '第三位', event: 6, danger: 6 },
          { name: '第四位', event: 7, danger: 1 },
          { name: '第五位', event: 1, danger: 1 },
        ]
      }
    }
  }
</script>
```
:::

## 设置事件

绑定 click 事件，点击柱子触发，回调参数 和 直接绑定 在 echarts 图标上的参数一致

:::demo 
```html
<template>
  <rank-1 :d-data="list" style="height: 500px" @click="handleClick" />
</template>
<script>
  export default {
    data() {
      return {
        list: [
          { name: '第一位', event: 10, danger: 12 },
          { name: '第二位', event: 8, danger: 10 },
          { name: '第三位', event: 6, danger: 6 },
          { name: '第四位', event: 7, danger: 1 },
          { name: '第五位', event: 1, danger: 1 },
        ]
      }
    },
    methods: {
      handleClick(params) {
        console.log(params)
      }
    }
  }
</script>
```
:::

## API

### 属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| d-data     | 传入需要渲染的数据 | Array | — | [] |

### 事件

| 事件名称      | 说明          |  回调参数                      |
|---------- |-------------- | --------------------------------  |
| click     | 绑定在柱子上的 click 事件 | 包含 name 和 value 的对象，参考 echarts click 事件回调参数 |
