<template>
  <dialog-container :title="案件基本信息">
    <form class="form-horizontal" >
      <div class="form-group form-group-sm">
        <label class="control-label col-sm-4" >案卷编号：</label >
        <div class="col-sm-8">
          <input type="text" class="form-control" name="caseNo" />
        </div>
      </div>
    </form >
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

</style>
