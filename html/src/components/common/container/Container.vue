<template>
    <div class="container-fluid dsw-container" id="dsw-container">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Container'
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>
  .dsw-container{
    width : 100%;
    min-width : 100%;
    max-width : 100%;
    height :100vh;
    min-height :100vh;
    max-height : 100vh;
    position: relative;
    overflow : hidden;
  }
</style>
