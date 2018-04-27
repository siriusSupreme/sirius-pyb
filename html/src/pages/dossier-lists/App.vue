<template >
  <iframe-container :isShowFooter="true">
    <dsw-panel class="dsw-right-content-wrapper" :isShowFooter="true">
      <div slot="panel-heading" class="dsw-search-wrapper">
        <form class="form-inline" @keydown.stop.prevent.enter="searchHandler">
          <div class="form-group form-group-sm">
            <label class="control-label" >关键字：</label >
            <input type="text" name="searchCode" v-model="searchCode" style="width: 300px;" class="form-control" placeholder="通过案件编号/案件名称/主办民警" />
          </div>
          <div class="form-group" style="margin: 0 0 0 20px;">
            <search-btn @dswClickBtn="searchHandler"></search-btn>
          </div>
        </form >
      </div>

      <dsw-table style="width: 100%;" @dswFilterMethod="filterMethodHandler" :isLoadingForTable="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)"></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dswPagerChange="getDossierLists"></dsw-pagination>
    </dsw-panel>

    <div class="dsw-dossier-lists-btn-wrapper" slot="panel-footer">
      <button class="dsw-btn dsw-add-btn">新建</button>
      <button class="dsw-btn dsw-edit-btn">详情编辑</button>
      <button class="dsw-btn dsw-rectification-btn">整改信息列表</button>
      <button class="dsw-btn dsw-electronic-dossier-btn">电子卷宗</button>
      <button class="dsw-btn dsw-dossier-borrow-btn">案卷借阅</button>
      <button class="dsw-btn dsw-transform-btn">一交易送</button>
      <button class="dsw-btn dsw-qrcode-btn">打印二维码</button>
      <button class="dsw-btn dsw-dossier-burning-btn">卷宗刻录</button>
      <button class="dsw-btn dsw-dossier-locus-btn">案卷轨迹</button>
    </div>
  </iframe-container>
</template >

<script >
import IframeContainer from 'components/common/iframe-container'
import DswPanel from 'components/common/panel'
import DswPagination from 'components/common/pagination'
import DswTable from 'components/function/table'
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
        'LOG_OPT_MODULE': {}
      },
      caseStatusFilters: [
        {label: '在办', value: '01'},
        {label: '未破', value: '02'},
        {label: '已结', value: '03'}
      ],
      subStatusFilters: [
        {label: '在柜', value: '01'},
        {label: '借阅审核', value: '02'},
        {label: '已外借', value: '03'},
        {label: '移交审批中', value: '04'},
        {label: '已移交', value: '05'},
        {label: '移送审批中', value: '06'},
        {label: '已移送', value: '07'}
      ],
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
    // 获取表格数据
    this.getDossierLists()
    // 设置显示列
    this.setColumns()
  },
  methods: {
    getDossierLists ({pageIndex, recordsPerPage} = {pageIndex: this.paginateInfo.currentPage, recordsPerPage: this.paginateInfo.pageSize}) {
      const caseStatus = this.caseStatus
      const subStatus = this.subStatus
      const searchCode = this.searchCode

      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getDossierLists, {params: {page: pageIndex, limit: recordsPerPage, caseStatus, subStatus, searchCode}}).then((result) => {
        console.log(result)
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
          field: 'module',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        },
        {title: '案件编号', field: 'ip', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '接警编号', field: 'ip', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案件名称', field: 'ip', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案件类型', field: 'ip', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '案件状态',
          field: 'type',
          filters: this.caseStatus,
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        },
        {
          title: '外借/移交状态',
          field: 'module',
          filters: this.subStatus,
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        },
        {
          title: '立案时间',
          field: 'module',
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
</style >
