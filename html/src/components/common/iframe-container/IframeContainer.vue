<template>
    <div class="container-fluid dsw-iframe-container" id="dsw-iframe-container">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'IframeContainer'
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>
  .dsw-iframe-container{
    height: 100%;
    max-height :100%;
    position: relative;
    overflow : hidden;
    background : url("./images/iframe-bg.png") no-repeat scroll 0 0/100% 100%;
  }
</style>
