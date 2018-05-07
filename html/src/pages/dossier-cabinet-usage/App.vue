<template >
  <iframe-container :isShowHeading="false">
    <dsw-panel class="dsw-right-content-wrapper" :isShowFooter="true">
      <div slot="panel-heading" class="dsw-search-wrapper">
        <form class="form-inline" @keydown.stop.prevent.enter="searchHandler">
          <div class="form-group">
            <label class="control-label" >关键字</label >
            <input type="text" name="searchCode" v-model="searchCode" class="form-control" />
          </div>
          <div class="form-group">
            <search-btn @dsw-click-btn="searchHandler"></search-btn>
          </div>
        </form >
      </div>

      <dsw-table style="width: 100%;" @dsw-filter-method="filterMethodHandler" :isLoadingForTable="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)"></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dsw-pager-change="getDossierCabinetUsage"></dsw-pagination>
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
        'CELL_OPERATE_TYPE': {
          '01': '存卷',
          '02': '取卷'
        }
      },
      typeFilters: [],
      operaType: '',
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
    this.setFilters('typeFilters', 'CELL_OPERATE_TYPE')
    // 获取表格数据 并且 设置显示列
    Promise.all([]).then((result) => {
      this.getDossierCabinetUsage()
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
    getDossierCabinetUsage ({pageIndex, recordsPerPage} = {pageIndex: this.paginateInfo.currentPage, recordsPerPage: this.paginateInfo.pageSize}) {
      const operaType = this.operaType
      const searchCode = this.searchCode

      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getDossierCabinetUsage, {params: {page: pageIndex, limit: recordsPerPage, operaType, searchCode}}).then((result) => {
        this.tableData = result.data.lists
        this.paginateInfo = result.data.pageDto
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('获取动态列表失败')
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
        {title: '房间名称', field: 'roomName', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案卷柜名称', field: 'cupboardName', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '单元柜编号', field: 'cellCode', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案件编号', field: 'caseNo', width: 200, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案件名称', field: 'caseName', width: 200, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '操作人', field: 'createUserName', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '操作类型',
          field: 'operaType',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return this.dictionary['CELL_OPERATE_TYPE'][rowData[field]]
          },
          filters: this.typeFilters,
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {
          title: '操作时间',
          field: 'createTime',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return (new Date(rowData[field])).format()
          },
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        }
      ]
    },
    searchHandler (e) {
      this.getDossierCabinetUsage()
    },
    filterMethodHandler (filters) {
      if (filters['operaType'] && this.operaType !== filters['operaType'][0]) {
        this.operaType = filters['operaType'][0]
        this.getDossierCabinetUsage()
      }
    }
  }
}
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
