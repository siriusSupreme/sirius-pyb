<template >
  <iframe-container>
    <dsw-panel class="dsw-cabinet-container">
      <div slot="panel-heading" class="dsw-cabinet-container-title"></div>
      <div class="dsw-content-wrapper">
        <div class="dsw-left-cabinet">
          <dsw-panel class="dsw-left-cabinet-wrapper">
            <div slot="panel-heading" class="dsw-left-cabinet-wrapper-title">物证柜一</div>
            <div class="dsw-cabinet-wrapper">
              <ul class="dsw-cabinet-lists">
                <li class="dsw-cabinet-item"></li>
              </ul>
            </div>
          </dsw-panel>
        </div>
        <div class="dsw-right-content">
          <dsw-panel class="dsw-right-content-wrapper">
            <div slot="panel-heading" class="dsw-right-content-wrapper-title">
              黄石市公安局西塞山分局刑侦大队
            </div>

            <dsw-table style="width: 100%;" :tableData="tableData" :columns="columns"></dsw-table>

            <dsw-pagination slot="panel-footer">
              <button type="button">新增</button>
            </dsw-pagination>

          </dsw-panel>
        </div>
      </div>
    </dsw-panel>

  </iframe-container>
</template >

<script >
import IframeContainer from 'components/common/iframe-container'
import DswPanel from 'components/common/panel'
import DswPagination from 'components/common/pagination'
import DswTable from 'components/function/table'

export default {
  name: 'App',
  data () {
    return {
      tableData: [],
      columns: [
        {type: 'selection', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'account', title: '账号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'realName', title: '姓名', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'org', title: '组织机构', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true}
      ],
      paginateInfo: {}
    }
  },
  components: {
    IframeContainer,
    DswPanel,
    DswPagination,
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
.dsw-cabinet-container{

}
</style >

<style lang="stylus" scoped >

</style >
