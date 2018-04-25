<template>
    <div class="container-fluid dsw-iframe-container" id="dsw-iframe-container">
      <dsw-panel>
        <template slot="panel-heading"><slot name="panel-heading"></slot></template>
        <template><slot></slot></template>
        <template slot="panel-footer"><slot name="panel-footer"></slot></template>
      </dsw-panel>
    </div>
</template>

<script>
import DswPanel from 'components/common/panel'

export default {
  name: 'IframeContainer',
  components: {
    DswPanel
  }
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
