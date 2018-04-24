<template>
  <div class="dsw-panel-wrapper">
    <div class="dsw-panel-header">
      <div class="dsw-panel-title"></div>

      <slot name="dsw-panel-assist">
        <div class="dsw-panel-assist"></div>
      </slot>
    </div>
    <div class="dsw-panel-body">
      <slot name="dsw-panel-body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel'
}
</script>

<style lang="stylus">
.dsw-panel-wrapper{
  .dsw-panel-header{
    overflow :hidden;
    .dsw-panel-title{
      float : left;
    }
    .dsw-panel-assist{
      float : right;
    }
  }
  .dsw-panel-body{

  }
}
</style>

<style lang="stylus" scoped>

</style>
