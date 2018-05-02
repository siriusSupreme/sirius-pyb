<template>
  <dialog-container :title="案件基本信息">
    <div class="dsw-form-wrapper">
      <form class="form-horizontal" >
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >案卷编号：</label >
          <div class="col-sm-9">
            <input type="text" class="form-control" name="caseNo" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >案卷名称：</label >
          <div class="col-sm-9">
            <input type="text" class="form-control" name="caseNo" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >案卷类型：</label >
          <div class="col-sm-9">
            <input type="text" class="form-control" name="caseNo" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >案卷状态：</label >
          <div class="col-sm-9">
            <input type="text" class="form-control" name="caseNo" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >立案时间：</label >
          <div class="col-sm-9">
            <input type="text" class="form-control" name="caseNo" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >简要案情：</label >
          <div class="col-sm-9">
            <textarea name="" class="form-control" rows="3" ></textarea >
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >主办民警：</label >
          <div class="col-sm-9">
            <input type="text" class="form-control" name="caseNo" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >协办民警：</label >
          <div class="col-sm-9">
            <input type="text" class="form-control" name="caseNo" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >备注：</label >
          <div class="col-sm-9">
            <textarea name="" class="form-control" rows="3" ></textarea >
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
  components: {
    DialogContainer
  },
  mounted () {
    console.log(this)
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
