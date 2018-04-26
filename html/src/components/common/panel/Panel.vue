<template>
  <div class="dsw-panel panel">
    <span class="dsw-panel-refresh" v-if="isShowRefresh"><i class="fa fa-refresh dsw-panel-refresh-icon"></i></span>

    <div class="panel-heading" v-if="isShowHeading">
      <slot name="panel-heading">
        <div class="panel-title">
          <span class="dsw-panel-title">黄石市公安局</span><cascade-select></cascade-select>
        </div>
      </slot>
    </div>

    <div class="panel-body">
      <slot></slot>
    </div>

    <div class="panel-footer" v-if="isShowFooter"><slot name="panel-footer"></slot></div>
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
  methods: {
    refreshHandler (e) {
      this.$emit('dswPanelRefresh', {e})
    }
  }
}
</script>

<style lang="stylus">
.dsw-panel{
  position : relative;
  width :100%;
  height : 100%;
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
