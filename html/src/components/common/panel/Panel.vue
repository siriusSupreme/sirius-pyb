<template>
  <div class="dsw-panel panel" ref="dsw-panel">
    <span class="dsw-panel-refresh" v-if="isShowRefresh" @click.stop="refreshHandler" title="刷新当前页面"><i class="fa fa-refresh dsw-panel-refresh-icon"></i></span>

    <div class="panel-heading" v-if="isShowHeading" ref="panel-heading">
      <slot name="panel-heading">
        <div class="panel-title">
          <span class="dsw-panel-title">黄石市公安局</span><cascade-select></cascade-select>
        </div>
      </slot>
    </div>

    <div class="panel-body" ref="panel-body" style="height: 100%;">
      <slot></slot>
    </div>

    <div class="panel-footer" v-if="isShowFooter" ref="panel-footer"><slot name="panel-footer"></slot></div>
  </div>
</template>

<script>

import CascadeSelect from 'components/common/cascade-select'

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
  components: {
    CascadeSelect
  },
  beforeMount () {
    this.$nextTick(() => {
      this.adjustHeight()
      window.addEventListener('resize', this.adjustHeight)
    })
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.adjustHeight()
    //   window.addEventListener('resize', this.adjustHeight)
    // })
  },
  methods: {
    refreshHandler (e) {
      this.$emit('dswPanelRefresh', {e})
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
    }
  }
}
</script>

<style lang="stylus">
.dsw-panel{
  position : relative;
  width :100%;
  height : 100%;
  overflow : hidden;
  border : none;
  /*background : url("./images/panel-bg.png") no-repeat scroll 0 0/100% 100%;*/
  .dsw-panel-refresh{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>

<style lang="stylus" scoped>

</style>
