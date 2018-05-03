<template>
  <dialog-container :title="extraParams.title">
    <div class="dsw-form-wrapper">
      <form class="form-horizontal" >
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >案卷编号：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="caseNo" v-model="info.caseNo" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >案卷名称：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="name" v-model="info.name" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >案卷类型：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="type" v-model="info.type" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >案卷状态：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="status" v-model="info.status" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >立案时间：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="regDate" v-model="info.regDate" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >简要案情：</label>
          <div class="col-sm-9">
            <textarea name="briefDesc" class="form-control" rows="3" v-model="info.briefDesc"></textarea >
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >主办民警：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="hostPName" v-model="info.hostPName" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >协办民警：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="caseNo" v-model="info.caseNo" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >备注：</label>
          <div class="col-sm-9">
            <textarea name="remark" class="form-control" rows="3" v-model="info.remark" ></textarea >
          </div>
        </div>
      </form >
    </div>
  </dialog-container>
</template>

<script>
import DialogContainer from 'components/common/dialog-container'

export default {
  name: 'DossierListsEdit',
  data () {
    return {
      info: {}
    }
  },
  components: {
    DialogContainer
  },
  beforeMount () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      const id = this.extraParams.id
      this.$https.jsonp(this.$api.getDossierInfo, {params: {caseHeaderId: id}}).then((result) => {
        this.info = result.data
      }).catch((reason) => {
        this.$toastr.error('获取用户信息失败')
      })
    }
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>
.dsw-form-wrapper{
  width :60%;
  margin :0 auto;
}
</style>
