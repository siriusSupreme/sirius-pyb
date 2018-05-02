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

      <dsw-table style="width: 100%;" @dswFilterMethod="filterMethodHandler" :isl-loading-for-table="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)"></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dswPagerChange="getDossierLists"></dsw-pagination>
    </dsw-panel>

    <div class="dsw-dossier-lists-btn-wrapper" slot="panel-footer">
      <button class="dsw-btn dsw-add-btn" @click.stop="addHandler">新建</button>
      <button class="dsw-btn dsw-edit-btn" @click.stop="editHandler">详情编辑</button>
      <button class="dsw-btn dsw-rectification-btn" @click.stop="listsHandler">整改信息列表</button>
      <button class="dsw-btn dsw-electronic-dossier-btn" @click.stop="electronicHandler">电子卷宗</button>
      <button class="dsw-btn dsw-dossier-borrow-btn" @click.stop="borrowHandler">案卷借阅</button>
      <button class="dsw-btn dsw-transform-btn" @click.stop="transformHandler">移交移送</button>
      <button class="dsw-btn dsw-qrcode-btn" @click.stop="qrcodeHandler">打印二维码</button>
      <button class="dsw-btn dsw-dossier-burning-btn" @click.stop="recordHandler">卷宗刻录</button>
      <button class="dsw-btn dsw-dossier-locus-btn" @click.stop="trackHandler">案卷轨迹</button>
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
        'CASE_TYPE': {
          '01': '在办',
          '02': '未破',
          '03': '已结'
        },
        'CASE_STATUS': {
          '01': '在办',
          '02': '未破',
          '03': '已结'
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
          title: '选择',
          type: 'selection',
          width: 50,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        },
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
              case '01': {
                return `<a href="javascript:void(0);" class="dsw-dossier-lists-operation">转破案</a>`
              }
              case '02':
              case '03': {
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
          filters: this.caseTypeFilters,
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
              case '01': {
                return `<img src="./images/case-ing.png" /><span>${this.dictionary['CASE_STATUS'][rowData[field]]}</span>`
              }
              case '02': {
                return `<img src="./images/case-over.png" /><span>${this.dictionary['CASE_STATUS'][rowData[field]]}</span>`
              }
              case '03': {
                return `<img src="./images/case-no-crack.png" /><span>${this.dictionary['CASE_STATUS'][rowData[field]]}</span>`
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
          filters: this.subStatusFilters,
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
      if (filters['caseStatus'] && this.caseStatus !== filters['caseStatus'][0]) {
        this.caseStatus = filters['caseStatus'][0]
        this.getDossierLists()
      }
      if (filters['subStatus'] && this.subStatus !== filters['subStatus'][0]) {
        this.subStatus = filters['subStatus'][0]
        this.getDossierLists()
      }
    },
    addHandler (e) {
      this.$vLayer.openPage(DossierListsAdd, {}, {
        parent: this,
        title: '新增'
      })
    },
    editHandler (e) {
      this.$vLayer.openPage(DossierListsEdit, {}, {
        parent: this,
        title: '详情编辑'
      })
    },
    listsHandler (e) {
      this.$vLayer.openPage(DossierListsLists, {}, {
        parent: this,
        title: '案件整改信息列表'
      })
    },
    electronicHandler (e) {
      this.$vLayer.openPage(DossierListsElectronic, {}, {
        parent: this,
        title: '案件整改信息列表'
      })
    },
    borrowHandler (e) {
      this.$vLayer.openPage(DossierListsBorrow, {}, {
        parent: this,
        title: '案件整改信息列表'
      })
    },
    transformHandler (e) {
      this.$vLayer.openPage(DossierListsTransform, {}, {
        parent: this,
        title: '案件整改信息列表'
      })
    },
    qrcodeHandler (e) {
      this.$vLayer.openPage(DossierListsQrcode, {}, {
        parent: this,
        title: '案件整改信息列表'
      })
    },
    recordHandler (e) {
      this.$vLayer.openPage(DossierListsRecord, {}, {
        parent: this,
        title: '案件整改信息列表'
      })
    },
    trackHandler (e) {
      this.$vLayer.openPage(DossierListsTrack, {}, {
        parent: this,
        title: '案件整改信息列表'
      })
    }
  }
}
</script >

<style lang="stylus" >

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
.dsw-dossier-lists-operation{
  color : #FF9700;
  text-decoration : underline;
}
</style >
