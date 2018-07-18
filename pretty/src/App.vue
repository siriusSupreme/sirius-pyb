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
@import './assets/stylus/variables.styl';

.app {
  position: relative;
  height: 100%;
  min-height: $clientHeight;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
