<template>
  <dialog-container :title="extraParams['title']">
    <dsw-panel :is-show-heading="false" :is-show-footer="true">
      <div class="dsw-form-wrapper" ref="dsw-form-wrapper">
        <form class="form-horizontal" >
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >案卷编号：</label >
            <div class="col-sm-9">
              <input type="text" name="caseNo" class="form-control" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >案卷名称：</label >
            <div class="col-sm-9">
              <input type="text" name="caseNo" class="form-control" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >案卷类型：</label >
            <div class="col-sm-9">
              <input type="text" name="caseNo" class="form-control" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >案卷状态：</label >
            <div class="col-sm-9">
              <input type="text" name="caseNo" class="form-control" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >立案时间：</label >
            <div class="col-sm-9">
              <input type='text' class="form-control" v-date-time-picker />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >简要案情：</label >
            <div class="col-sm-9">
              <textarea name="briefDesc" class="form-control" rows="4" ></textarea >
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >主办民警：</label >
            <div class="col-sm-9">
              <input type="text" name="caseNo" class="form-control" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >协办民警：</label >
            <div class="col-sm-9">
              <input type="text" name="joinPName" class="form-control" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >备注：</label >
            <div class="col-sm-9">
              <textarea name="" class="form-control" rows="4" ></textarea >
            </div>
          </div>
        </form >
      </div>

      <div class="dsw-btn-wrapper" slot="panel-footer">
        <button type="button" class="dsw-btn">保存</button>
      </div>
    </dsw-panel>
  </dialog-container>
</template>

<script>
import DialogContainer from 'components/common/dialog-container'
import DswPanel from 'components/common/panel'
import BScroll from 'better-scroll'

import DateTimePicker from 'directives/date-time-picker'

export default {
  name: 'DossierListsAdd',
  data () {
    return {
      betterScroll: null,
      info: {}
    }
  },
  components: {
    DialogContainer,
    DswPanel
  },
  directives: {
    DateTimePicker
  },
  created () {
    this.$nextTick(() => {
      this.betterScroll = new BScroll(this.$refs['dsw-form-wrapper'], {
        mouseWheel: true,
        scrollbar: true
      })
    })
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>
.dsw-form-wrapper{
  width :80%;
  height : 100%;
  margin :0 auto;
}
.dsw-btn-wrapper{
  text-align : center;
  .dsw-btn{
    display : inline-block;
    height : 32px;
    line-height : 32px;
    background : url("./images/btn.png") no-repeat scroll 0 0/100% 100%;
    padding :0 30px;
    margin :0 10px;
    white-space :nowrap;
    &:hover{
      background : url("./images/btn-hover.png") no-repeat scroll 0 0/100% 100%;
    }
  }
}
</style>
