# Roll 滚动

## 概述
在文字超出列宽度的时候，文字自动滚动，可以配合 List 列表 实现列表行文字自动滚动

## 代码示例

### 基础使用

需要滚动的文字直接绑定到 message 属性上

:::demo Roll 组件仅配置 message 属性
```html
<template>
  <roll :message="message" />
</template>
<script>
  export default {
    data() {
      return {
        message: "很长很长很长的文字，不信你看后面 - > - > - > 就如同人会腐朽一样, 国家总有一天也会走向毁灭，就连千年繁荣的帝都，也不过只是个腐败的人间地狱，披着人皮的魑魅魍魉，嚣张跋扈的四处横行！天若无能制裁邪恶，我等将会于黑暗之中给予消逝！我等全员，职业杀手团！"
      }
    }
  }
</script>
```
:::

### 修改背景和颜色

propStyle 属性直接绑定在 message 文字的 style 样式上，跟行内样式一个效果。

:::demo Roll 组件配置 message 属性和 propStyle 属性
```html
<template>
  <roll :message="message" :propStyle="propStyle1" />
  <roll :message="message" :propStyle="propStyle2" />
  <roll :message="message" :propStyle="propStyle3" />
  <roll :message="message" :propStyle="propStyle4" />
</template>
<script>
  export default {
    data() {
      return {
        message: "很长很长很长的文字，不信你看后面 - > - > - > 就如同人会腐朽一样, 国家总有一天也会走向毁灭，就连千年繁荣的帝都，也不过只是个腐败的人间地狱，披着人皮的魑魅魍魉，嚣张跋扈的四处横行！天若无能制裁邪恶，我等将会于黑暗之中给予消逝！我等全员，职业杀手团！",
        propStyle1: "background-color: rgba(3, 39, 95, .1);color: #FF7256;",
        propStyle2: "color: #05c2f4;",
        propStyle3: "background-color: rgba(14, 48, 55, .6);color: rgb(255, 243, 126); line-height: 40px;font-size:18px;display: inline-block;margin: 8px 0;",
        propStyle4: {
          lineHeight: '40px',
          display: 'inline-block',
          color: '#909399',
          fontSize: '14px'
        }
      }
    }
  }
</script>
```
:::

### 绑定 html 属性

直接绑定 html 属性 存在安全问题，*请谨慎使用*

:::demo Roll 组件仅配置 html 属性
```html
<template>
  <roll :html="message" />
</template>
<script>
  export default {
    data() {
      return {
        message: "<h1>很长很长很长的文字，不信你看后面</h1> 就如同人会腐朽一样, 国家总有一天也会走向毁灭，就连千年繁荣的帝都，也不过只是个腐败的人间地狱，披着人皮的魑魅魍魉，嚣张跋扈的四处横行！天若无能制裁邪恶，我等将会于黑暗之中给予消逝！我等全员，<strong>职业杀手团！</strong>"
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
| html     | 显示的文字，绑定html属性，可与message连用 | string | — | — |
| propStyle | 内容文字的样式 | string/Object | — | — |
| message | 显示的文字，普通内容，可与html连用 | string | — | — |
| speed | 单次滚动用时，单位为秒 | number | — | 4 |
| timingFunction | 动画的速度曲线，默认匀速 | string | — | linear |
| interval | 是否滚动结束时停留一段时间 | boolean | true/false | true |

### 事件

| 事件名称      | 说明          |  回调参数                      |
|---------- |-------------- | --------------------------------  |
| click     | 绑定在文字上的 click 事件 | —— |
