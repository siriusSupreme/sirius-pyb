<template >
  <iframe-container :isShowHeading="false" :isShowFooter="true">
    <dsw-panel class="dsw-right-content-wrapper" :isShowFooter="true">
      <dsw-table style="width: 100%;" :isLoadingForTable="isLoadingForTable" :tableData="tableData" :columns="columns" :columnWidthDrag="true" :pagingIndex="paginateInfo.pageSize*(paginateInfo.currentPage-1)"
                 @dsw-custom-component='customComponentHandler'></dsw-table>

      <dsw-pagination slot="panel-footer" :currentPage="paginateInfo.currentPage" :totalRecords="paginateInfo.total" :recordsPerPage="paginateInfo.pageSize" @dsw-pager-change="getRoleDataByPage"></dsw-pagination>
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

import DswAddRole from './Add'
import DswEdit from './Edit'
import DswHidden from './Hidden'

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
      dictionary: {},
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
    // 获取表格数据 并且 设置显示列
    Promise.all([]).then((result) => {
      this.getRoleDataByPage()
      this.setColumns()
    })
  },
  methods: {
    getRoleDataByPage ({pageIndex, recordsPerPage} = {pageIndex: this.paginateInfo.currentPage, recordsPerPage: this.paginateInfo.pageSize}) {
      const roleName = this.content

      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getRoleListByPage, {params: {page: pageIndex, limit: recordsPerPage, roleName}}).then((result) => {
        this.tableData = result.data.lists
        this.paginateInfo = result.data.pageDto
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('获取角色列表失败')
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
        {title: '角色名', field: 'roleName', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '描述备注', field: 'remark', width: 260, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
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
    addHandler (e) {
      this.$vLayer.openPage(DswAddRole, {}, {
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
            roleId: rowData.id
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
