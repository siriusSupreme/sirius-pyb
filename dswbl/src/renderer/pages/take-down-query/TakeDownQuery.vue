<template>
  <article id='bl-take-down-query-wrapper'>
    <!-- <bl-title-bar class='bl-take-down-query-titlebar'></bl-title-bar> -->
    <div class="templateManage-top">
      <div class="templateManage-top-title-wrapper">
        <div class="templateManage-top-back" @click="backHandler">
          <img src="./images/template-manage-back.png" class="templateManage-top-back-pic">
        </div>
        <span class="templateMnage-top-title">&nbsp;笔录查询</span>
      </div>
      <div class="templateManage-top-operation-wrapper">
        <div class="templateMnage-top-unit">
          <span>办案单位: </span>
          <span>体验单位 </span>
          <span>体验</span>
        </div>
        <div class="templateMnage-top-operation">
          <span class="templateMnage-top-operation-btn-common"><img src="./images/broadcast-message.png" alt="广播消息"></span>
          <span class="templateMnage-top-operation-btn-common"><img src="./images/message.png" alt="交流反馈"></span>
          <span class="templateMnage-top-operation-btn-common" style="width: 12px; height: 12px; margin-right: 25px"><img src="./images/menu.png" alt="更多"></span>
          <span class="templateMnage-top-operation-minimize" @click.stop="minimizeHandler">
            <img src="./images/minimize.png" alt="最小化">
          </span>
          <span class="templateMnage-top-operation-minimize" @click.stop="maximizeHandler">
            {{isMax? '最大化' : '最小化'}}
          </span>
          <span class="templateMnage-top-operation-close" @click.stop="backHandler">X</span>
        </div>
      </div>
    </div>
    <bl-content class='bl-take-down-query-content'>
      <div class="bl-take-down-query-content-left">
        <el-tree :data="threeData" :props="defaultProps" highlight-current @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="bl-take-down-query-content-right">
        <div class="bl-take-down-query-content-right-search">
          <el-input v-model="searchName" placeholder="请输入内容" class="bl-take-down-query-content-right-search-input"></el-input>
          <button type="button" class="bl-take-down-query-content-right-search-btn" @click="searchHanlder">查询</button>
        </div>
        <div class="bl-take-down-query-content-right-content">
          <bl-table :data="tableData" class="bl-take-down-query-content-table">
            <el-table-column
              type="index"
              :index="(index) => (pageSize * (currentPage - 1) + index + 1)"
              label="序号"
              width="80"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="80"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="caseName"
              label="案件名称"
              width="280"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="问话开始时间"
              width="200"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="问话结束时间"
              width="200"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="hostPName"
              label="民警一"
              width="100"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="joinPName"
              label="民警二"
              width="100"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="hostUnitNo"
              label="单位"
              width="80"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="typeId"
              label="笔录类型"
              width="120"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="alarmNo"
              label="警情编号"
              width="120"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="caseCode"
              label="案件编号"
              width="120"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="count"
              label="次数"
              width="80"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop=""
              label="批注"
              width="80"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="isAuthorize"
              label="授权"
              width="80"
              align='center'
              header-align='center'
              show-overflow-tooltip>
            </el-table-column>
          </bl-table>
          <div class="bl-take-down-query-content-table-pagination-wrapper">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 30, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </bl-content>
  </article>
</template>

<script>
import { listBlheaderByPage, listAllSysType } from '@/api/take-down-make-query'
export default {
  name: 'TakeDownQuery',
  data () {
    return {
      threeData: [],
      tableData: [],
      defaultProps: {
        label: 'name',
        children: 'sysTypeTwoVos'
      },

      pageSize: 20,
      currentPage: 1,
      total: 0,
      searchName: "",
      typeId: '',
      isMax: true
    }
  },
  created () {
    this.ipc = this.$electron.ipcRenderer
    this.listAllSysType()
    this.listBlheaderByPage()
  },
  methods: {
    listAllSysType () {
      return listAllSysType().then(({code, data, msg}) => {
        let arr = data.lists
        arr.unshift({
          id: "",
          name: '所有笔录'
        })
        this.threeData = arr
      })
    },
    listBlheaderByPage () {
      return listBlheaderByPage({ pageSize: this.pageSize, currentPage: this.currentPage, searchName: this.searchName, typeId: this.typeId }).then(({code, data, msg}) => {
        this.tableData = data.lists
        this.total = data.pageDto.total
      })
    },
    backHandler () {
      this.ipc.send('back-take-down-query-window')
    },
    minimizeHandler () {
      this.ipc.send('minimize-take-down-query-window')
    },
    maximizeHandler () {
      
      if (this.isMax) {
        this.ipc.send('maximize-take-down-query-window')
      } else {
        this.ipc.send('unmaximize-take-down-query-window')
      }
      this.isMax = !this.isMax
    },
    handleNodeClick (data) {
      this.typeId = data.id
      this.listBlheaderByPage()
    },
    handleSizeChange (size) {
      this.currentPage = 1
      this.pageSize = size
      this.listBlheaderByPage()
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.listBlheaderByPage()
    },
    searchHanlder () {
      this.listBlheaderByPage()
    }
  }
}
</script>
