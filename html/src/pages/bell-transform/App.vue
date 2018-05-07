<template >
  <iframe-container :isShowHeading="false">
    <dsw-panel class="dsw-right-content-wrapper" :isShowFooter="true">
      <div slot="panel-heading" class="dsw-search-wrapper">
        <form class="form-inline" @keydown.stop.prevent.enter="searchTransform">
          <div class="form-group">
            <label class="control-label" >关键字</label >
            <input type="text" name="searchCode" v-model="searchCode" class="form-control" placeholder="通过案件编号/案件名称搜索"/>
          </div>
          <div class="form-group">
            <search-btn @dsw-click-btn="searchTransform"></search-btn>
          </div>
        </form >
      </div>

      <dsw-table style="width: 100%;" @dsw-filter-method="filterMethodHandler" :isLoadingForTable="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)"></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dsw-pager-change="getBellTransform"></dsw-pagination>
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
      dictionary: {
        'CASE_TRANSFER_TYPE': {
          '01': '内部移交',
          '02': '外部移交',
          '03': '移送'
        },
        'CASE_TRANSFER_STATUS': {
          '01': '待审核',
          '02': '已转移',
          '03': '已退回',
          '04': '已拒绝'
        }
      },
      typeFilters: [],
      type: '',
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
    // 获取字典 并且 设置过滤器
    this.setFilters('typeFilters', 'CASE_TRANSFER_TYPE')

    // 获取表格数据 并且 设置显示列
    Promise.all([]).then((result) => {
      this.getBellTransform()
      this.setColumns()
    })
  },
  methods: {
    getDictionary (type, code) {
      return this.$https.jsonp(this.$api.getDictionary, {params: {type, code}}).then((result) => {
        result.data.lists.forEach((val) => {
          this.dictionary[type][val.code] = val.name
        })
      })
    },
    setFilters (filterName, filterType) {
      const _filterType = this.dictionary[filterType]

      for (let k in _filterType) {
        let filter = {label: _filterType[k], value: k}
        this[filterName].push(filter)
      }
    },
    getBellTransform ({pageIndex, recordsPerPage} = {pageIndex: this.paginateInfo.currentPage, recordsPerPage: this.paginateInfo.pageSize}) {
      const type = this.type
      const searchCode = this.searchCode

      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getBellTransform, {params: {page: pageIndex, limit: recordsPerPage, type, searchCode}}).then((result) => {
        this.tableData = result.data.lists
        this.paginateInfo = result.data.pageDto
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('获取移送移交列表失败')
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
        {title: '案件编号', field: 'caseNo', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案件名称', field: 'caseName', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '案卷操作',
          field: 'type',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return this.dictionary['CASE_TRANSFER_TYPE'][rowData[field]]
          },
          filters: this.typeFilters,
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {title: '接收对象', field: 'orgName', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '移送原因', field: 'reason', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '承办人', field: 'createUserName', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '承办单位', field: 'createOrgName', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '提交时间',
          field: 'createTime',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return (new Date(rowData[field])).format()
          },
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {
          title: '审核人',
          field: 'auditUserName',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {
          title: '操作',
          field: 'status',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return '<a href="javascript:void(0);" class="dsw-dossier-transform-operation">详情</a>'
          },
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        }
      ]
    },
    searchTransform (e) {
      this.getBellTransform()
    },
    filterMethodHandler (filters) {
      if (filters['type'] && this.type !== filters['type'][0]) {
        this.type = filters['type'][0]
        this.getBellTransform()
      }
    }
  }
}
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
