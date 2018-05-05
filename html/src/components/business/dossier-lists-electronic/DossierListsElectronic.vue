<template>
  <dialog-container :title="extraParams['title']">
    <div class="dsw-electronic-container">
      <div class="dsw-electronic-wrapper">
        <ul class="dsw-electronic-lists">
          <li class="dsw-electronic-item" :class="{active: currentIndex===dossier.type}" v-for="(dossier, index) in listsData" :key="index">
            <div class="dsw-electronic-item-left" @click.stop="currentIndex=dossier.type">
              <img class="dsw-electronic-item-top" src="./images/star.png" alt="star" />
              <div class="dsw-electronic-item-middle" v-if="index===0">
                <span class="dsw-electronic-item-name">诉讼文书及技术鉴定材料部分</span>
                <span class="dsw-electronic-item-type">刑事侦查卷             正卷</span>
              </div>
              <div class="dsw-electronic-item-middle" v-else-if="index===1">
                <span class="dsw-electronic-item-name">证据部分</span>
                <span class="dsw-electronic-item-type">刑事侦查卷             正卷</span>
              </div>
              <div class="dsw-electronic-item-middle" v-else-if="index === 3">
                <span class="dsw-electronic-item-type">刑事侦查卷             副卷</span>
              </div>
              <div class="dsw-electronic-item-middle" v-else>
                <span class="dsw-electronic-item-type">行政处罚卷</span>
              </div>
              <div class="dsw-electronic-item-bottom">({{dossier.count}}页)</div>
            </div>
            <div class="dsw-electronic-item-right">
              <dsw-panel :is-show-footer="true">
                <span slot="panel-heading" style="white-space: nowrap;">材料部分</span>

                <dsw-table style="width: 100%;" :isl-loading-for-table="isLoadingForTable" :tableData="tableData[dossier.type]" :columns="columns" :columnWidthDrag="true" :pagingIndex="0" :row-click="rowClickHandler" @dsw-custom-component='customComponentHandler' :row-hover-color="'rgb(25, 45, 84)'"></dsw-table>

                <button class="dsw-btn" slot="panel-footer" @click.stop="previewHandler($event,dossier.type)">预览该卷</button>
              </dsw-panel>
            </div>
          </li>
        </ul>
      </div>

      <div class="dsw-btn-wrapper">
        <button class="dsw-btn">完整卷宗预览</button>
        <button class="dsw-btn">PDF卷宗下载</button>
      </div>
    </div>
  </dialog-container>
</template>

<script>
import DialogContainer from 'components/common/dialog-container'
import DswPanel from 'components/common/panel'
import DswTable from 'components/common/table'
import DswPagination from 'components/common/pagination'

import DswEdit from './Edit'
import DswScan from './Scan'
import DswPreview from './Preview'

import Vue from 'vue'
import DswOperation from './Operation'
Vue.component('dsw-operation', DswOperation)

export default {
  name: 'DossierListsElectronic',
  data () {
    return {
      currentIndex: 0,
      currentRow: null,
      isLoadingForTable: false,
      listsData: [],
      tableData: {},
      columns: [],
      scanIndex: 0
    }
  },
  watch: {
    currentIndex (val, oldVal) {
      this.currentRow = null
      this.getDossierGrandsonLists(val)
    }
  },
  components: {
    DialogContainer,
    DswPanel,
    DswTable,
    DswPagination
  },
  beforeMount () {
    // 获取表格数据
    this.getDossierSubLists()
    // 设置显示列
    this.setColumns()
  },
  methods: {
    getDossierSubLists () {
      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getDossierSubLists, {params: {caseHeaderId: this.extraParams.id}}).then((result) => {
        console.log(result)
        this.listsData = result.data.lists
        this.listsData.forEach((v) => {
          this.tableData[v.type] = []
        })
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('获取电子卷宗列表失败')
        this.isLoadingForTable = false
      })
    },
    getDossierGrandsonLists (firstType) {
      this.isLoadingForTable = true

      this.$https.jsonp(this.$api.getDossierGrandsonLists, {params: {caseHeaderId: this.extraParams.id, firstType}}).then((result) => {
        console.log(result)
        this.tableData[firstType] = result.data.lists
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('获取电子卷宗列表失败')
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
          title: '文件类型',
          field: 'name',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: false
        },
        {title: '页数', field: 'count', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {
          title: '操作',
          field: 'custome-adv',
          componentName: 'dsw-operation',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        }
      ]
    },
    rowClickHandler (rowIndex, rowData, columnOptions) {
      this.currentRow = rowData
    },
    customComponentHandler ({type, index, rowData}) {
      if (rowData) {
        if (type === 'edit') {
          this.$vLayer.openPage(DswEdit, {}, {
            parent: this,
            title: '预览编辑',
            taskId: this.extraParams.id,
            taskBelong: rowData.type
          })
        } else {
          this.scanIndex = this.$vLayer.openPage(DswScan, {}, {
            parent: this,
            taskId: this.extraParams.id,
            taskBelong: rowData.type
          }, {
            area: ['450px', '240px'],
            end () {
              window.scannedFiles = []
              window.scannedCount = 0
            }
          })
        }
      } else {
        this.$toastr.warning('请选择卷宗类目')
      }
    },
    previewHandler (e, type) {
      this.$vLayer.openPage(DswPreview)
    }
  }
}
</script>

<style lang="stylus">
.dsw-electronic-container{
  width : 100%;
  height : 100%;
  overflow : hidden;
  text-align : center;
  .dsw-electronic-wrapper{
    height : 85%;
    display : inline-block;
    .dsw-electronic-lists{
      height :100%;
      overflow : hidden;
      .dsw-electronic-item{
        float : left;
        width : 120px;
        height :100%;
        margin : 0 15px;
        overflow : hidden;
        &.active{
          width :630px;
        }
        .dsw-electronic-item-left{
          position : relative;
          float : left;
          width : 120px;
          height :100%;
          border : 20px solid #0e244a;
          background-color : #5095ff;
          padding : 24px 0 0 0;
          cursor : pointer;
          .dsw-electronic-item-top{
            width :30px;
          }
          .dsw-electronic-item-middle{
            margin :24px 0 0 0;
            & > span{
              writing-mode :tb-rl;
              vertical-align :top;
            }
            .dsw-electronic-item-name {
              color : #443939;
              font-size :0.2rem;
            }
            .dsw-electronic-item-type {
              color : #0c0c0c;
              font-size :0.24rem;
              white-space :pre-wrap;
            }
          }
          .dsw-electronic-item-bottom{
            position : absolute;
            bottom : 32px;
            left : 50%;
            transform :translate(-50%,0);
            width : 100%;
            color : #443939;
          }
        }
        .dsw-electronic-item-right{
          height : 100%;
          overflow : hidden;
          background : url("./images/table-bg.png") no-repeat scroll 0 0/100% 100%;
        }
      }
    }
  }
  .dsw-btn-wrapper{
    margin: 32px 0 0 0;
  }
  .dsw-btn{
    height : 32px;
    line-height : 32px;
    background : url("./images/btn.png") no-repeat scroll 0 0/100% 100%;
    padding :0 30px;
    margin :0 10px;
    white-space :nowrap;
    &:hover{
      background : url("./images/btn-hover.png") no-repeat scroll 0 0/100% 100%;
    }
  }
}
</style>

<style lang="stylus" scoped>

</style>
