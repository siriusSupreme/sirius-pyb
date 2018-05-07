<template >
  <iframe-container :isShowHeading="false">
    <dsw-panel class="dsw-right-content-wrapper" :isShowFooter="true">
      <div slot="panel-heading" class="dsw-search-wrapper">
        <form class="form-inline" @keydown.stop.prevent.enter="searchHandler">
          <div class="form-group">
            <label class="control-label" >内容</label >
            <input type="text" name="content" v-model="searchCode" class="form-control" />
          </div>
          <div class="form-group">
            <search-btn @dsw-click-btn="searchHandler"></search-btn>
          </div>
        </form >
      </div>

      <dsw-table style="width: 100%;" @dsw-filter-method="filterMethodHandler" :isLoadingForTable="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)"></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dsw-pager-change="getBorrowAuditDataByPage"></dsw-pagination>
    </dsw-panel>
  </iframe-container>
</template >

<script >
import IframeContainer from 'components/common/iframe-container'
import DswPanel from 'components/common/panel'
import DswPagination from 'components/common/pagination'
import DswTable from 'components/common/table'
import SearchBtn from 'components/common/search-btn'

export default {
  name: 'App',
  data () {
    return {
      isLoadingForTable: false,
      tableData: [],
      columns: [],
      paginateInfo: {
        currentPage: 1,
        pageSize: 20
      },
      hostUnitNo: '605',
      status: '',
      searchCode: ''
    }
  },
  components: {
    IframeContainer,
    DswPanel,
    DswPagination,
    DswTable,
    SearchBtn
  },
  created () {
    // 获取表格数据 并且 设置显示列
    Promise.all([]).then((result) => {
      this.getBorrowAuditDataByPage()
      this.setColumns()
    })
  },
  methods: {
    getBorrowAuditDataByPage ({pageIndex, recordsPerPage} = {pageIndex: this.paginateInfo.currentPage, recordsPerPage: this.paginateInfo.pageSize}) {
      const hostUnitNo = this.hostUnitNo
      const status = this.status
      const searchCode = this.searchCode

      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getBorrowAuditListByPage, {params: {page: pageIndex, limit: recordsPerPage, hostUnitNo, status, searchCode}}).then((result) => {
        this.tableData = result.data.lists
        this.paginateInfo = result.data.pageDto
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('获取借阅审核列表失败')
        this.isLoadingForTable = false
      })
    },
    setColumns () {
      this.columns = [
        {
          title: '序号',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return pagingIndex + rowIndex + 1
          },
          width: 50,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {title: '案件编号', field: 'caseNo', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案件编号', field: 'caseName', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案件主办民警', field: 'hostPName', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '借阅单位', field: 'createOrgName', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '借阅人', field: 'borrowUserName', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '预计归还时间',
          field: 'backDate',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            if (rowData[field]) {
              return (new Date(rowData[field])).format()
            }
          },
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {title: '借阅事由', field: 'reason', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '操作',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return 1
          },
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        }
      ]
    },
    searchHandler (e) {
      this.getBorrowAuditDataByPage()
    },
    filterMethodHandler (filters) {
      this.getBorrowAuditDataByPage()
    }
  }
}
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
