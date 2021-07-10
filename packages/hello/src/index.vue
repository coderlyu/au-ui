<template>
  <div>
    <h3>{{ title }}</h3>
    <div>hello world</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
