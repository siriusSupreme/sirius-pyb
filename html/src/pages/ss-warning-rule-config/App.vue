<template >
  <iframe-container :isShowHeading="false" :isShowFooter="true">
    <dsw-panel class="dsw-right-content-wrapper" :isShowFooter="true">
      <dsw-table style="width: 100%;" @dsw-filter-method="filterMethodHandler" :isLoadingForTable="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)" @dsw-custom-component='customComponentHandler'></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dsw-pager-change="getRuleCfgDataByPage"></dsw-pagination>
    </dsw-panel>
    <div class="dsw-dossier-lists-btn-wrapper" slot="panel-footer">
      <button class="dsw-btn dsw-add-btn" @click.stop="addHandler">新建</button>
    </div>
  </iframe-container>
</template >

<script >
import IframeContainer from 'components/common/iframe-container'
import DswPanel from 'components/common/panel'
import DswPagination from 'components/common/pagination'
import DswTable from 'components/common/table'
import SearchBtn from 'components/common/search-btn'

import DswEdit from './Edit'
import DswHidden from './Hidden'
import DswAdd from './Add'

import Vue from 'vue'
import DswOperation from './Operation'
Vue.component('dsw-operation', DswOperation)

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
        'RULE_TYPE_STATUS': {
          '01': '通用规则',
          '02': '机构规则'
        },
        'WT_TYPE_STATUS': {
          '01': '其他',
          '02': '案件处理'
        },
        'BIZ_TYPE_STATUS': {
          '20': '借阅预警处理',
          '21': '整改预警处理'
        },
        'YES_NO': {}
      },
      ruleTypeStatusFilters: [],
      wtTypeStatusFilters: [],
      bizTypeStatusFilters: [],
      isShowStatusFilters: [],
      wtTypeStatus: '',
      bizTypeStatus: ''
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
    this.setFilters('ruleTypeStatusFilters', 'RULE_TYPE_STATUS')
    this.setFilters('wtTypeStatusFilters', 'WT_TYPE_STATUS')
    this.setFilters('bizTypeStatusFilters', 'BIZ_TYPE_STATUS')
    // 获取字典 并且 设置过滤器
    const isShowPromise = this.getDictionary('YES_NO', 'YES_NO').then((result) => {
      this.setFilters('isShowStatusFilters', 'YES_NO')
    })
    // 获取表格数据 并且 设置显示列
    Promise.all([isShowPromise]).then((result) => {
      this.getRuleCfgDataByPage()
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
    getRuleCfgDataByPage ({pageIndex, recordsPerPage} = {pageIndex: this.paginateInfo.currentPage, recordsPerPage: this.paginateInfo.pageSize}) {
      const wtType = this.wtTypeStatus
      const bizType = this.bizTypeStatus

      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getCaseRuleCfgListByPage, {params: {page: pageIndex, limit: recordsPerPage, wtType, bizType}}).then((result) => {
        this.tableData = result.data.lists
        this.paginateInfo = result.data.pageDto
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('获取预警规则配置列表失败')
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
          title: '规则类型',
          field: 'type',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            // 箭头函数 this 指向 vm；普通函数 this 指向 该列的选项
            return this.dictionary['RULE_TYPE_STATUS'][rowData[field]]
          },
          filters: this.moduleFilters,
          width: 60,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {
          title: '预警分类',
          field: 'wtType',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return this.dictionary['WT_TYPE_STATUS'][rowData[field]]
          },
          filters: this.wtTypeStatusFilters,
          width: 60,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {
          title: '业务分类',
          field: 'bizType',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return this.dictionary['BIZ_TYPE_STATUS'][rowData[field]]
          },
          filters: this.bizTypeStatusFilters,
          width: 60,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {title: '预警时限', field: 'warnTlimit', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '警报时限', field: 'alarmTlimit', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '投屏是否显示',
          field: 'isShow',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return this.dictionary['YES_NO'][rowData[field]]
          },
          width: 60,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {title: '投屏描述', field: 'showDesc', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '操作',
          componentName: 'dsw-operation',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        }
      ]
    },
    filterMethodHandler (filters) {
      if ((filters['wtType'] && this.wtTypeStatus !== filters['wtType'][0]) || (filters['wtType'] === null && this.wtTypeStatus)) {
        this.wtTypeStatus = filters['wtType'] ? filters['wtType'][0] : ''
        this.getRuleCfgDataByPage()
      }
      if ((filters['bizType'] && this.bizTypeStatus !== filters['bizType'][0]) || (filters['bizType'] === null && this.bizTypeStatus)) {
        this.bizTypeStatus = filters['bizType'] ? filters['bizType'][0] : ''
        this.getRuleCfgDataByPage()
      }
    },
    addHandler (e) {
      this.$vLayer.openPage(DswAdd, {}, {
        parent: this,
        title: '新增'
      })
    },
    customComponentHandler ({type, index, rowData}) {
      if (rowData) {
        if (type === 'edit') {
          this.$vLayer.openPage(DswEdit, {}, {
            parent: this,
            title: '预览编辑',
            ruleId: rowData.id
          })
        } else {
          this.$vLayer.openPage(DswHidden, {}, {
            parent: this
          }, {
            area: ['400px', '240px']
          })
        }
      } else {
        this.$toastr.warning('请选择操作栏选择相对应的按钮！')
      }
    }
  }
}
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
