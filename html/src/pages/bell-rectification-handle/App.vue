<template >
  <iframe-container :isShowHeading="false">
    <dsw-panel class="dsw-right-content-wrapper" :isShowFooter="true">
      <div slot="panel-heading" class="dsw-search-wrapper">
        <form class="form-inline" @keydown.stop.prevent.enter="searchHandler">
          <div class="form-group">
            <label class="control-label" >关键字</label >
            <input type="text" name="searchCode" v-model="searchCode" class="form-control" placeholder="通过案件编号/案件名称搜索"/>
          </div>
          <div class="form-group">
            <search-btn @dsw-click-btn="searchHandler"></search-btn>
          </div>
        </form >
      </div>

      <dsw-table style="width: 100%;" @dsw-filter-method="filterMethodHandler" :isLoadingForTable="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)"></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dsw-pager-change="getRectificationHandle"></dsw-pagination>
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
        'CASE_CORRECT_QUESTION_LEVEL': {
          '01': '紧急',
          '02': '重要',
          '03': '一般'
        }
      },
      levelFilters: [],
      level: '',
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
    this.setFilters('levelFilters', 'CASE_CORRECT_QUESTION_LEVEL')

    // 获取表格数据 并且 设置显示列
    Promise.all([]).then((result) => {
      this.getRectificationHandle()
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
    getRectificationHandle ({pageIndex, recordsPerPage} = {pageIndex: this.paginateInfo.currentPage, recordsPerPage: this.paginateInfo.pageSize}) {
      const level = this.level
      const searchCode = this.searchCode

      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getRectificationHandle, {params: {page: pageIndex, limit: recordsPerPage, level, searchCode}}).then((result) => {
        this.tableData = result.data.lists
        this.paginateInfo = result.data.pageDto
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('获取整改处理列表失败')
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
        {
          title: '优先级',
          field: 'level',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return this.dictionary['CASE_CORRECT_QUESTION_LEVEL'][rowData[field]]
          },
          filters: this.levelFilters,
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {title: '案件编号', field: 'caseNo', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案件名称', field: 'caseName', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '整改内容', field: 'content', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '提出单位', field: 'createOrgName', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '提出人', field: 'brectifiedUserName', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '提出时间',
          field: 'startDate',
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
          title: '整改截止时间',
          field: 'endTime',
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
          title: '操作',
          field: 'status',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return '<a href="javascript:void(0);" class="dsw-rectification-handle-operation">详情</a>'
          },
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        }
      ]
    },
    searchHandler (e) {
      this.getRectificationHandle()
    },
    filterMethodHandler (filters) {
      if ((filters['level'] && this.level !== filters['level'][0]) || (filters['level'] === null && this.level)) {
        this.level = filters['level'] ? filters['level'][0] : ''
        this.getRectificationHandle()
      }
    }
  }
}
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
