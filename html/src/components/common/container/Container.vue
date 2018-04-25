<template>
    <div class="dsw-container" id="dsw-container">
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
    height: 100%;
    max-height :100%;
    position: relative;
    overflow : hidden;
  }
</style>
