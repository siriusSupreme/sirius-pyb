<template>
  <section class="app" id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </section>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
.app {
  position: relative;
  height: 100%;
  min-height: 1024px;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .ss-container {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
}
</style>
