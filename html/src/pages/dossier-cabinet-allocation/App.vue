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
            <search-btn @dswClickBtn="searchHandler"></search-btn>
          </div>
        </form >
      </div>

      <dsw-table style="width: 100%;" @dswFilterMethod="filterMethodHandler" :isLoadingForTable="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)"></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dswPagerChange="getLogs"></dsw-pagination>
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
        'LOG_OPT_MODULE': {},
        'LOG_OPT_TYPE': {}
      },
      moduleFilters: [],
      typeFilters: [],
      module: '',
      type: '',
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
    // 获取字典 并且 设置过滤器
    const modulePromise = this.getDictionary('LOG_OPT_MODULE', 4).then((result) => {
      this.setFilters('moduleFilters', 'LOG_OPT_MODULE')
    })
    const typePromise = this.getDictionary('LOG_OPT_TYPE', 1).then((result) => {
      this.setFilters('typeFilters', 'LOG_OPT_TYPE')
    })
    // 获取表格数据 并且 设置显示列
    Promise.all([modulePromise, typePromise]).then((result) => {
      this.getLogs()
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
    getLogs ({pageIndex, recordsPerPage} = {pageIndex: this.paginateInfo.currentPage, recordsPerPage: this.paginateInfo.pageSize}) {
      const module = this.module
      const type = this.type
      const content = this.content

      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getLog, {params: {page: pageIndex, limit: recordsPerPage, module, type, content}}).then((result) => {
        this.tableData = result.data.lists
        this.paginateInfo = result.data.pageDto
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('获取日志列表失败')
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
          title: '操作模块',
          field: 'module',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            // 箭头函数 this 指向 vm；普通函数 this 指向 该列的选项
            return this.dictionary['LOG_OPT_MODULE'][rowData[field]]
          },
          filters: this.moduleFilters,
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {
          title: '操作类型',
          field: 'type',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return this.dictionary['LOG_OPT_TYPE'][rowData[field]]
          },
          filters: this.typeFilters,
          width: 260,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {title: 'IP', field: 'ip', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '操作内容', field: 'content', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '操作时间', field: 'updateTime', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true}
      ]
    },
    searchHandler (e) {
      this.getLogs()
    },
    filterMethodHandler (filters) {
      if (filters['module'] && this.module !== filters['module'][0]) {
        this.module = filters['module'][0]
        this.getLogs()
      }
      if (filters['type'] && this.type !== filters['type'][0]) {
        this.type = filters['type'][0]
        this.getLogs()
      }
    }
  }
}
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
