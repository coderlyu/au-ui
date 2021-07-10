<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <main-header></main-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
    <main-footer v-if="!isComponent"></main-footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    isComponent () {
      return /^component-/.test(this.$route.name || '')
    }
  }
}
</script>
