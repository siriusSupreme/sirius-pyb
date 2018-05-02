<template>
    <div class="container-fluid dsw-iframe-container" id="dsw-iframe-container">
      <dsw-panel :is-show-refresh="isShowRefresh" @dsw-panel-refresh="dswPanelRefreshHandler" v-bind="$attrs">
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
  props: {
    isShowRefresh: {
      type: Boolean,
      default: true
    }
  },
  components: {
    DswPanel
  },
  methods: {
    dswPanelRefreshHandler ({e}) {
      window.location.reload()
    }
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>
.dsw-iframe-container{
  width : 100%;
  min-width : 100%;
  max-width : 100%;
  height :100vh;
  min-height :100vh;
  max-height : 100vh;
  position: relative;
  overflow : hidden;
  background : url("./images/iframe-bg.png") no-repeat scroll 0 0/100% 100%;
}
</style>
