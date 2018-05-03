<template>
  <dialog-container :title="extraParams['title']">
    <div class="dsw-lists-wrapper">
      <div class="left-lists">
        <dsw-panel :isShowFooter="true">
          <div slot="panel-heading" class="dsw-search-wrapper">
            <form class="form-inline" @keydown.stop.prevent.enter="searchHandler">
              <div class="form-group form-group-sm">
                <label class="control-label" >关键字：</label >
                <input type="text" name="searchCode" v-model="searchCode" class="form-control" placeholder="通过案件编号/案件名称" />
              </div>
              <div class="form-group" style="margin: 0 0 0 6px;">
                <search-btn @dsw-click-btn="searchHandler"></search-btn>
              </div>
            </form >
          </div>

          <dsw-table style="width: 100%;" @dsw-filter-method="filterMethodHandler" :isl-loading-for-table="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)"></dsw-table>

          <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dsw-pager-change="getDossierLists"></dsw-pagination>
        </dsw-panel>
      </div>

      <div class="right-info">
        <div class="right-info-left">
          <span class="right-info-left-title right-info-title">基本信息</span>
          <ul class="right-info-left-lists">
            <li class="right-info-left-item">
              <div class="right-info-left-item-key">优先级别：</div>
              <div class="right-info-left-item-val">紧急</div>
            </li>
            <li class="right-info-left-item">
              <div class="right-info-left-item-key">案件编号：</div>
              <div class="right-info-left-item-val">A4202035400002018030008</div>
            </li>
            <li class="right-info-left-item">
              <div class="right-info-left-item-key">整改内容：</div>
              <div class="right-info-left-item-val">充分收集相关涉案人员的笔录数据，深入研究其真实性</div>
            </li>
          </ul>
        </div>

        <div class="right-info-right">
          <span class="right-info-right-title right-info-title">整改状态</span>
          <ul class="right-info-right-lists">
            <li class="right-info-right-item">
              <div class="rectification-left">
                <div class="rectification-left-info rectification-left-start">
                  <div class="rectification-left-info-username">李盼</div>
                </div>
              </div>
            </li>
            <li class="right-info-right-item">
              <div class="rectification-left">
                <img class="rectification-left-flow" src="./images/flow.png" alt="arrow" >
                <div class="rectification-left-info">
                  <div class="rectification-left-info-username">李盼</div>
                  <div class="rectification-left-info-operation">发起整改</div>
                </div>
              </div>
              <div class="rectification-right">
                <div class="rectification-right-time">2018.04.16 09:00:00</div>
                <div class="rectification-right-reason">已根据要求严格执行整改</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </dialog-container>
</template>

<script>
import DialogContainer from 'components/common/dialog-container'
import DswPanel from 'components/common/panel'
import DswPagination from 'components/common/pagination'
import DswTable from 'components/common/table'
import SearchBtn from 'components/common/search-btn'

export default {
  name: 'DossierListsLists',
  data () {
    return {
      isLoadingForTable: false,
      tableData: [],
      columns: [],
      paginateInfo: {
        currentPage: 1,
        pageSize: 10
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
    DialogContainer,
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
          title: '优先级',
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
        {
          title: '整改状态',
          field: 'status',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            switch (rowData[field]) {
              case '01': {
                return `<img src="./images/case-ing.png" /><span>${this.dictionary[ 'CASE_STATUS' ][ rowData[ field ] ]}</span>`
              }
              case '02': {
                return `<img src="./images/case-over.png" /><span>${this.dictionary[ 'CASE_STATUS' ][ rowData[ field ] ]}</span>`
              }
              case '03': {
                return `<img src="./images/case-no-crack.png" /><span>${this.dictionary[ 'CASE_STATUS' ][ rowData[ field ] ]}</span>`
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
          title: '整改截止时间',
          field: 'regDate',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return (new Date(rowData[field])).format()
          },
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        },
        {title: '提出人', field: 'name', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true}
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
    }
  }
}
</script>

<style lang="stylus">
.dsw-lists-wrapper{
  width :100%;
  height :100%;
  overflow : hidden;
  .left-lists{
    float : left;
    width :45%;
    height : 100%;
    margin :0 10px 0 0;
    background : url("./images/side-bg.png") no-repeat scroll 0 0/100% 100%;
  }
  .right-info{
    height : 100%;
    overflow : hidden;
    background : url("./images/side-bg.png") no-repeat scroll 0 0/100% 100%;
    .right-info-left,
    .right-info-right{
      width :50%;
      height : 100%;
      padding :10px 20px;
    }
    .right-info-title{
      display : inline-block;
      font-size :0.24rem;
      margin :15px 0 15px 10px;
    }
    .right-info-left{
      float : left;
      border-right :1px solid #033244;
      .right-info-left-item:not(:last-child){
        border-bottom :1px dashed #033244;
        margin :0 0 10px 0;
        padding :0 0 5px 0;
      }
      .right-info-left-item-key{
        float : left;
        width :80px;
        text-align : right;
      }
      .right-info-left-item-val{
        overflow : hidden;
      }
    }
    .right-info-right{
      overflow : hidden;
      .right-info-right-item{
        overflow : hidden;
        .rectification-left{
          float : left;
          width :80px;
          text-align : center;
          .rectification-left-flow{

          }
          .rectification-left-info{
            padding : 10px 5px;
            background : url("./images/process.png") no-repeat scroll 0 0/100% 100%;
            &.rectification-left-start{
              height : 80px;
              line-height : 80px;
              padding : 0;
              background : url("./images/start.png") no-repeat scroll 0 0/100% 100%;
            }
          }
        }
        .rectification-right{
          overflow : hidden;
          margin :48px 0 0;
          padding :0 0 0 10px;
          .rectification-right-time{
            color : #ff9b00
          }
          .rectification-right-reason{
            color : #23c7ed
          }
        }
      }
    }
  }
}
</style>

<style lang="stylus" scoped>

</style>
