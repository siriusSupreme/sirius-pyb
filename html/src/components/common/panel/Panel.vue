<template>
  <div class="dsw-panel panel" ref="dsw-panel">
    <span class="dsw-panel-refresh" v-if="isShowRefresh" @click.stop="refreshHandler" title="刷新当前页面"><i class="fa fa-refresh dsw-panel-refresh-icon"></i></span>

    <div class="dsw-panel-heading panel-heading" v-if="isShowHeading" ref="panel-heading">
      <slot name="panel-heading">
        <h1 class="panel-title">黄石市公安局</h1>
      </slot>
    </div>

    <div class="panel-body dsw-panel-body" ref="panel-body"><slot></slot></div>

    <div class="panel-footer dsw-panel-footer" v-if="isShowFooter" ref="panel-footer"><slot name="panel-footer"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    isShowRefresh: {
      type: Boolean,
      default: false
    },
    isShowHeading: {
      type: Boolean,
      default: true
    },
    isShowFooter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      height: '100%'
    }
  },
  created () {
    this.$nextTick(() => {
      this.adjustHeight()
      window.addEventListener('resize', this.adjustHeight)
    })
  },
  methods: {
    refreshHandler (e) {
      this.$emit('dsw-panel-refresh', {e})
    },
    adjustHeight () {
      const panel = this.$refs['dsw-panel']
      const panelHeading = this.$refs['panel-heading']
      const panelBody = this.$refs['panel-body']
      const panelFooter = this.$refs['panel-footer']

      const panelHeight = panel.clientHeight
      const panelHeadingHeight = panelHeading ? panelHeading.clientHeight : 0
      const panelFooterHeight = panelFooter ? panelFooter.clientHeight : 0

      // console.log(panelHeight + '===' + panelHeadingHeight + '===' + panelFooterHeight)

      panelBody.style.height = (panelHeight - panelHeadingHeight - panelFooterHeight) + 'px'

      this.height = (panelHeight - panelHeadingHeight - panelFooterHeight) + 'px'
    }
  }
}
</script>

<style lang="stylus">
.dsw-panel{
  position : relative;
  width : 100%;
  /*min-width : 100%;*/
  max-width : 100%;
  height :100%;
  min-height :100%;
  /*max-height : 100%;*/
  overflow : hidden;
  border : none;
  margin :0;
  /*background : url("./images/panel-bg.png") no-repeat scroll 0 0/100% 100%;*/
  .dsw-panel-refresh{
    position: absolute;
    top: 10px;
    right: 0.2rem;
    font-size: 16px;
    cursor: pointer;
  }
  .dsw-panel-heading{
    width :100%;
    overflow : hidden;
    background : url("./images/panel-heading-bg.png") no-repeat scroll 0 0/100% 100%;
  }
  .dsw-panel-body{
    width :100%;
    height : 100%;
    overflow : hidden;
  }
  .dsw-panel-footer{
    width :100%;
    overflow : hidden;
  }
}
</style>

<style lang="stylus" scoped>

</style>
