<template >
  <iframe-container :isShowHeading="false">
    <dsw-panel class="dsw-right-content-wrapper" :isShowFooter="true">
      <div slot="panel-heading" class="dsw-search-wrapper">
        <form class="form-inline" @keydown.stop.prevent.enter="searchHandler">
          <div class="form-group">
            <label class="control-label" >内容</label >
            <input type="text" name="content" v-model="content" class="form-control" />
          </div>
          <div class="form-group">
            <search-btn @dsw-click-btn="searchHandler"></search-btn>
          </div>
        </form >
      </div>

      <dsw-table style="width: 100%;" @dsw-filter-method="filterMethodHandler" :isLoadingForTable="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)"></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dsw-pager-change="getWarnDataByPage"></dsw-pagination>
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
        'WARN_TYPE_STATUS': {
          '01': '预警',
          '02': '报警'
        },
        'WT_TYPE_STATUS': {
          '01': '其他',
          '02': '案件处理'
        },
        'BIZ_TYPE_STATUS': {
          '20': '借阅预警处理',
          '21': '整改预警处理'
        },
        'CASE_STATUS': {
          '01': '在办',
          '02': '未破',
          '03': '已结'
        }
      },
      warnTypeStatusFilters: [],
      wtTypeStatusFilters: [],
      bizTypeStatusFilters: [],
      caseStatusFilters: [],
      warnTypeStatus: '',
      wtTypeStatus: '',
      bizTypeStatus: '',
      content: ''
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
    //  设置过滤器
    this.setFilters('warnTypeStatusFilters', 'WARN_TYPE_STATUS')
    this.setFilters('wtTypeStatusFilters', 'WT_TYPE_STATUS')
    this.setFilters('bizTypeStatusFilters', 'BIZ_TYPE_STATUS')
    this.setFilters('caseStatusFilters', 'CASE_STATUS')
    // 获取表格数据 并且 设置显示列
    Promise.all([]).then((result) => {
      this.getWarnDataByPage()
      this.setColumns()
    })
  },
  methods: {
    setFilters (filterName, filterType) {
      const _filterType = this.dictionary[filterType]

      for (let k in _filterType) {
        let filter = {label: _filterType[k], value: k}
        this[filterName].push(filter)
      }
    },
    getWarnDataByPage ({pageIndex, recordsPerPage} = {pageIndex: this.paginateInfo.currentPage, recordsPerPage: this.paginateInfo.pageSize}) {
      const warnType = this.warnTypeStatus
      const wtType = this.wtTypeStatus
      const bizType = this.bizTypeStatus
      const caseName = this.content

      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getWarnListByPage, {params: {page: pageIndex, limit: recordsPerPage, warnType, wtType, bizType, caseName}}).then((result) => {
        this.tableData = result.data.lists
        this.paginateInfo = result.data.pageDto
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('获取预警消息处理列表失败')
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
          title: '警报状态',
          field: 'warnType',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            // 箭头函数 this 指向 vm；普通函数 this 指向 该列的选项
            return this.dictionary['WARN_TYPE_STATUS'][rowData[field]]
          },
          filters: this.warnTypeStatusFilters,
          width: 40,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {title: '案件编号', field: 'caseNo', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案件编号', field: 'caseName', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '案件状态',
          field: 'caseStatus',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return this.dictionary['CASE_STATUS'][rowData[field]]
          },
          filters: this.caseStatusFilters,
          width: 40,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true},
        {
          title: '业务分类',
          field: 'bizType',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return this.dictionary['BIZ_TYPE_STATUS'][rowData[field]]
          },
          filters: this.bizTypeStatusFilters,
          width: 40,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {title: '主办单位', field: 'hostUnitName', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '主办民警', field: 'hostPName', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '截止时间',
          field: 'endDate',
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
        {
          title: '预警时间',
          field: 'warnDate',
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
      this.getWarnDataByPage()
    },
    filterMethodHandler (filters) {
      if ((filters['warnType'] && this.warnTypeStatus !== filters['warnType'][0]) || (filters['warnType'] === null && this.warnTypeStatus)) {
        this.warnTypeStatus = filters['warnType'] ? filters['warnType'][0] : ''
        this.getWarnDataByPage()
      }
      if ((filters['wtType'] && this.wtTypeStatus !== filters['wtType'][0]) || (filters['wtType'] === null && this.wtTypeStatus)) {
        this.wtTypeStatus = filters['wtType'] ? filters['wtType'][0] : ''
        this.getWarnDataByPage()
      }
      if ((filters['bizType'] && this.bizTypeStatus !== filters['bizType'][0]) || (filters['bizType'] === null && this.bizTypeStatus)) {
        this.bizTypeStatus = filters['bizType'] ? filters['bizType'][0] : ''
        this.getWarnDataByPage()
      }
    }
  }
}
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
