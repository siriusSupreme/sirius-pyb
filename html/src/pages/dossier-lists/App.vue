<template >
  <iframe-container :isShowFooter="true">
    <dsw-panel :isShowFooter="true">
      <div slot="panel-heading" class="dsw-search-wrapper">
        <form class="form-inline" @keydown.stop.prevent.enter="searchHandler">
          <div class="form-group form-group-sm">
            <label class="control-label" >关键字：</label >
            <input type="text" name="searchCode" v-model="searchCode" style="width: 300px;" class="form-control" placeholder="通过案件编号/案件名称/主办民警" />
          </div>
          <div class="form-group" style="margin: 0 0 0 20px;">
            <search-btn @dsw-click-btn="searchHandler"></search-btn>
          </div>
        </form >
      </div>

      <dsw-table style="width: 100%;" @dsw-filter-method="filterMethodHandler" :isl-loading-for-table="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)" :column-cell-class-name="addColumnCellClass" :row-click="rowClickHandler" :row-click-color="'rgb(36, 28, 88)'" :row-hover-color="'#231675'"></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dsw-pager-change="getDossierLists"></dsw-pagination>
    </dsw-panel>

    <div class="dsw-dossier-lists-btn-wrapper" slot="panel-footer">
      <button type="button" class="dsw-btn dsw-add-btn" @click.stop="addHandler">新建</button>
      <button type="button" class="dsw-btn" @click.stop="editHandler">详情编辑</button>
      <button type="button" class="dsw-btn" @click.stop="listsHandler">整改信息列表</button>
      <button type="button" class="dsw-btn" @click.stop="electronicHandler">电子卷宗</button>
      <button type="button" class="dsw-btn" @click.stop="borrowHandler">案卷借阅</button>
      <button type="button" class="dsw-btn" @click.stop="transformHandler">移交移送</button>
      <button type="button" class="dsw-btn" @click.stop="qrcodeHandler">打印二维码</button>
      <button type="button" class="dsw-btn" @click.stop="recordHandler">卷宗刻录</button>
      <button type="button" class="dsw-btn" @click.stop="trackHandler">案卷轨迹</button>
    </div>
  </iframe-container>
</template >

<script >
import IframeContainer from 'components/common/iframe-container'
import DswPanel from 'components/common/panel'
import DswPagination from 'components/common/pagination'
import DswTable from 'components/common/table'
import SearchBtn from 'components/common/search-btn'

import DossierListsAdd from 'components/business/dossier-lists-add'
import DossierListsEdit from 'components/business/dossier-lists-edit'
import DossierListsLists from 'components/business/dossier-lists-lists'
import DossierListsElectronic from 'components/business/dossier-lists-electronic'
import DossierListsBorrow from 'components/business/dossier-lists-borrow'
import DossierListsTransform from 'components/business/dossier-lists-transform'
import DossierListsQrcode from 'components/business/dossier-lists-qrcode'
import DossierListsRecord from 'components/business/dossier-lists-record'
import DossierListsTrack from 'components/business/dossier-lists-track'

import caseIng from './images/case-ing.png'
import caseOver from './images/case-over.png'
import caseNoTrack from './images/case-no-crack.png'

const CASE_ING = '104'
const CASE_OVER = '206'
const CASE_NO_TRACK = '205'

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
        'CASE_TYPE': {},
        'CASE_STATUS': {
          [CASE_ING]: '在办',
          [CASE_OVER]: '未破',
          [CASE_NO_TRACK]: '已结'
        },
        'SUB_STATUS': {
          '01': '在柜',
          '02': '借阅审核',
          '03': '已外借',
          '04': '移交审批中',
          '05': '已移交',
          '06': '移送审批中',
          '07': '已移送'
        }

      },
      caseTypeFilters: [],
      caseStatusFilters: [],
      subStatusFilters: [],
      caseStatus: '',
      subStatus: '',
      type: '',
      searchCode: '',
      currentRow: null
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
    this.setFilters('caseStatusFilters', 'CASE_STATUS')
    this.setFilters('subStatusFilters', 'SUB_STATUS')
    // 获取字典 并且 设置过滤器
    const caseTypePromise = this.getDictionary('CASE_TYPE', 'CASE_TYPE').then((result) => {
      this.setFilters('caseTypeFilters', 'CASE_TYPE')
    })

    // 获取表格数据 并且 设置显示列
    Promise.all([caseTypePromise]).then((result) => {
      // 获取表格数据
      this.getDossierLists()
      // 设置显示列
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
    getDossierLists ({pageIndex, recordsPerPage} = {pageIndex: this.paginateInfo.currentPage, recordsPerPage: this.paginateInfo.pageSize}) {
      this.currentRow = null

      const caseStatus = this.caseStatus
      const subStatus = this.subStatus
      const searchCode = this.searchCode

      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getDossierLists, {params: {page: pageIndex, limit: recordsPerPage, caseStatus, subStatus, searchCode}}).then((result) => {
        this.tableData = result.data.lists
        this.paginateInfo = result.data.pageDto
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('获取案卷列表失败')
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
          overflowTitle: false
        },
        {
          title: '操作',
          field: 'status',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            switch (rowData[field]) {
              case CASE_OVER: {
                return `<a href="javascript:void(0);" class="dsw-dossier-lists-operation">转破案</a>`
              }
              case CASE_ING:
              case CASE_NO_TRACK: {
                return `<a href="javascript:void(0);" class="dsw-dossier-lists-operation">结案</a>`
              }
              default: {
                return ''
              }
            }
          },
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        },
        {title: '案件编号', field: 'caseNo', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '接警编号', field: 'jjbh', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案件名称', field: 'name', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '案件类型',
          field: 'type',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return this.dictionary['CASE_TYPE'][rowData[field]]
          },
          // filters: this.caseTypeFilters,
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {
          title: '案件状态',
          field: 'status',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            switch (rowData[field]) {
              case '104': {
                return `<img src="${caseIng}" class="dsw-dossier-lists-icon" /><span>${this.dictionary['CASE_STATUS'][rowData[field]]}</span>`
              }
              case '205': {
                return `<img src="${caseOver}" class="dsw-dossier-lists-icon" /><span>${this.dictionary['CASE_STATUS'][rowData[field]]}</span>`
              }
              case '206': {
                return `<img src="${caseNoTrack}" class="dsw-dossier-lists-icon" /><span>${this.dictionary['CASE_STATUS'][rowData[field]]}</span>`
              }
              default: {
                return ''
              }
            }
          },
          filters: this.caseStatusFilters,
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        },
        {
          title: '外借/移交状态',
          field: 'subStatus',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return this.dictionary['SUB_STATUS'][rowData[field]]
          },
          // filters: this.subStatusFilters,
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        },
        {
          title: '立案时间',
          field: 'regDate',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return (new Date(rowData[field])).format()
          },
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        }
      ]
    },
    searchHandler (e) {
      this.getDossierLists()
    },
    filterMethodHandler (filters) {
      if ((filters['status'] && this.caseStatus !== filters['status'][0]) || (filters['status'] === null && this.caseStatus)) {
        this.caseStatus = filters['status'] ? filters['status'][0] : ''
        this.getDossierLists()
      } else if ((filters['subStatus'] && this.subStatus !== filters['subStatus'][0]) || (filters['subStatus'] === null && this.subStatus)) {
        this.subStatus = filters['subStatus'] ? filters['subStatus'][0] : ''
        this.getDossierLists()
      } else if ((filters['type'] && this.type !== filters['type'][0]) || (filters['type'] === null && this.type)) {
        this.type = filters['type'] ? filters['type'][0] : ''
        this.getDossierLists()
      }
    },
    addColumnCellClass (rowIndex, field, rowData) {
      if (field === 'status') {
        return 'dsw-status'
      }
    },
    rowClickHandler (rowIndex, rowData, columnOptions) {
      this.currentRow = rowData
    },
    addHandler (e) {
      this.$vLayer.openPage(DossierListsAdd, {}, {
        parent: this,
        title: '新增'
      })
    },
    editHandler (e) {
      if (this.currentRow) {
        this.$vLayer.openPage(DossierListsEdit, {}, {
          parent: this,
          title: '详情编辑',
          id: this.currentRow.id
        })
      } else {
        this.$toastr.warning('请先选择一个案卷')
      }
    },
    listsHandler (e) {
      this.$vLayer.openPage(DossierListsLists, {}, {
        parent: this,
        title: '整改信息列表'
      })
    },
    electronicHandler (e) {
      if (this.currentRow) {
        this.$vLayer.openPage(DossierListsElectronic, {}, {
          parent: this,
          title: '电子卷宗',
          id: this.currentRow.id
        })
      } else {
        this.$toastr.warning('请先选择一个案卷')
      }
    },
    borrowHandler (e) {
      this.$vLayer.openPage(DossierListsBorrow, {}, {
        parent: this,
        title: '案卷借阅'
      })
    },
    transformHandler (e) {
      this.$vLayer.openPage(DossierListsTransform, {}, {
        parent: this,
        title: '移交移送'
      })
    },
    qrcodeHandler (e) {
      this.$vLayer.openPage(DossierListsQrcode, {}, {
        parent: this,
        title: '打印二维码'
      })
    },
    recordHandler (e) {
      this.$vLayer.openPage(DossierListsRecord, {}, {
        parent: this,
        title: '卷宗刻录'
      })
    },
    trackHandler (e) {
      this.$vLayer.openPage(DossierListsTrack, {}, {
        parent: this,
        title: '案卷轨迹'
      })
    }
  }
}
</script >

<style lang="stylus" >
.dsw-status{
  .dsw-dossier-lists-operation{
    color : #FF9700;
    text-decoration : underline;
  }
  .dsw-dossier-lists-icon{
    width :20px;
    margin :0 5px 0 0;
  }
}
</style >

<style lang="stylus" scoped >
.dsw-dossier-lists-btn-wrapper{
  .dsw-btn{
    height : 38px;
    text-align : center;
    padding : 0 0.24rem;
    margin : 0 10px 0 0;
    font-size : 0.18rem;
    color : #999
    background : url("./images/btn-bg.png") no-repeat scroll 0 0/100% 100%;
    &.dsw-add-btn{
      background : url("./images/add-btn-bg.png") no-repeat scroll 0 0/100% 100%;
    }
  }
}
</style >
