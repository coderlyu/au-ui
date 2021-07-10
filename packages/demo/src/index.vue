<template>
  <div>
    <h3 class="title">{{ title }}</h3>
    <div>hello world</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Demo',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
h3.title {
  color: red;
}
</style>
