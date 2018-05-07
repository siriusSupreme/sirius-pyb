<template>
  <dialog-container :title="extraParams['title']">
    <dsw-panel :is-show-heading="false" :is-show-footer="true">
      <div class="dsw-form-wrapper" ref="dsw-form-wrapper" v-better-scroll>
        <form class="form-horizontal" >
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >案卷编号：</label >
            <div class="col-sm-9">
              <input type="text" name="no" v-model="info.no" class="form-control" v-validate="'required'" data-vv-as="案卷编号" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >案卷名称：</label >
            <div class="col-sm-9">
              <input type="text" name="name" v-model="info.name" class="form-control" v-validate="'required'" data-vv-as="案卷名称" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >案卷类型：</label >
            <div class="col-sm-9">
              <input type="text" name="type" v-model="info.type" class="form-control" v-validate="'required'" data-vv-as="案卷类型" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >案卷状态：</label >
            <div class="col-sm-9">
              <input type="text" name="status" v-model="info.status" class="form-control" v-validate="'required'" data-vv-as="案卷状态" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >立案时间：</label >
            <div class="col-sm-9">
              <input type='text' name="regDate" ref="regDate" class="form-control" v-date-time-picker v-validate="'required'" data-vv-as="立案时间" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3 dsw-required" >简要案情：</label >
            <div class="col-sm-9">
              <textarea name="briefDesc" v-model="info.briefDesc" class="form-control" rows="4" v-validate="'required'" data-vv-as="简要案情" ></textarea >
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3" >主办民警：</label >
            <div class="col-sm-9">
              <input type="text" name="joinPNo" v-model="info.joinPNo" class="form-control" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3" >协办民警：</label >
            <div class="col-sm-9">
              <input type="text" name="joinPName" v-model="info.joinPName" class="form-control" />
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label col-sm-3" >备注：</label >
            <div class="col-sm-9">
              <textarea name="remark" v-model="info.remark" class="form-control" rows="4" ></textarea >
            </div>
          </div>
        </form >
      </div>

      <div class="dsw-btn-wrapper" slot="panel-footer">
        <button type="button" class="dsw-btn" @click.stop="submitHandler" disabled ref="dsw-submit-btn">保存</button>
      </div>
    </dsw-panel>
  </dialog-container>
</template>

<script>
import DialogContainer from 'components/common/dialog-container'
import DswPanel from 'components/common/panel'

import DateTimePicker from 'directives/date-time-picker'
import BetterScroll from 'directives/better-scroll'
import 'assets/js/vee-validate'

export default {
  name: 'DossierListsAdd',
  data () {
    return {
      info: {
        no: '',
        name: '',
        status: '',
        type: '',
        regDate: '',
        briefDesc: '',
        remark: '',
        joinPNo: '',
        joinPName: ''
      }
    }
  },
  watch: {
    errors: {
      deep: true,
      immediate: true,
      handler (val, oldVal) {
        this.$nextTick(() => {
          if (val.any()) {
            const error = Object.entries(val.collect()).pop()
            this.$toastr.error(error[1][0])
            // val.remove(error[0])
            this.$refs['dsw-submit-btn'].setAttribute('disabled', 'disabled')
          } else if (oldVal) {
            this.$refs['dsw-submit-btn'].removeAttribute('disabled')
          }
        })
      }
    }
  },
  components: {
    DialogContainer,
    DswPanel
  },
  directives: {
    DateTimePicker,
    BetterScroll
  },
  methods: {
    submitHandler (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let info = this.info
          info.regDate = this.$refs['regDate'].value
          this.$https.post(this.$api.saveDossier, info).then((result) => {
            if (!result.code) {
              this.$toastr.success('新增成功')
              this.$layer.close(this.extraParams.parent.addIndex)
            }
          })
        }
      })
    }
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
    &:not([disabled]):hover{
      background : url("./images/btn-hover.png") no-repeat scroll 0 0/100% 100%;
    }
  }
}
</style>
