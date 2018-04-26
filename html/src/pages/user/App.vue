<template >
  <iframe-container>
    <div class="dsw-search-wrapper">
      <form class="form-inline row">
        <div class="form-group form-group-sm">
          <label class="control-label" >用户名</label >
          <input type="text" class="form-control" />
        </div>

        <div class="form-group form-group-sm">
          <label class="control-label" >状态</label >
          <select name="" class="form-control">
            <option value="0" >启用</option >
            <option value="1" >停用</option >
          </select >
        </div>
      </form >
    </div>
    <dsw-table style="width: 100%;" :tableData="tableData" :columns="columns" :paginateInfo="paginateInfo"></dsw-table>
  </iframe-container>
</template >

<script >
import IframeContainer from 'components/common/iframe-container'
import DswTable from 'components/function/table'

export default {
  name: 'App',
  data () {
    return {
      tableData: [],
      columns: [
        {field: 'account', title: '账号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'realName', title: '姓名', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true}
      ],
      paginateInfo: {}
    }
  },
  components: {
    IframeContainer,
    DswTable
  },
  mounted () {
    this.$https.get('User/queryPage').then((result) => {
      console.log(result)
      this.tableData = result.data.lists
      this.paginateInfo = result.data.pageDto
    }).catch((reason) => {
      this.$toastr.error('获取用户列表失败')
    })
  }
}
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
