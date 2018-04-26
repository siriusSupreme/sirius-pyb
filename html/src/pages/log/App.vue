<template >
  <iframe-container :isShowHeading="false">
    <dsw-panel class="dsw-right-content-wrapper" :isShowFooter="true">
      <div slot="panel-heading" class="dsw-search-wrapper">
        <form class="form-inline" >
          <div class="form-group">
            <label class="control-label" >模块</label >
            <input type="text" name="modile" />
          </div>
          <div class="form-group">
            <label class="control-label" >类型</label >
            <input type="type" name="type" />
          </div>
          <div class="form-group">
            <label class="control-label" >内容</label >
            <input type="text" name="content" />
          </div>
          <div class="form-group">
            <button type="button">搜索</button>
          </div>
        </form >
      </div>

      <dsw-table style="width: 100%;" :tableData="tableData" :columns="columns"></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dswPagerChange="getLogs"></dsw-pagination>
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
        {field: 'custome', title: '序号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'module', title: '操作模块', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'type', title: '操作类型', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'ip', title: 'IP', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'content', title: '操作内容', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'updateTime', title: '操作时间', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true}
      ],
      paginateInfo: {
        currentPage: 1,
        pageSize: 20
      }
    }
  },
  components: {
    IframeContainer,
    DswPanel,
    DswPagination,
    DswTable
  },
  mounted () {
    this.getLogs({pageIndex: this.paginateInfo.currentPage, recordsPerPage: this.paginateInfo.pageSize})
  },
  methods: {
    getLogs ({pageIndex, recordsPerPage}) {
      this.$https.jsonp(this.$api.getLog, {params: {page: pageIndex, limit: recordsPerPage}}).then((result) => {
        this.tableData = result.data.lists
        this.paginateInfo = result.data.pageDto
      }).catch((reason) => {
        this.$toastr.error('获取日志列表')
      })
    }
  }
}
</script >

<style lang="stylus" >
.dsw-cabinet-container{

}
</style >

<style lang="stylus" scoped >

</style >
