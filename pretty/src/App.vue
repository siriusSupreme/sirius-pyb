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
@import './assets/stylus/variable.styl';

.app {
  position: relative;
  height: 100%;
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
