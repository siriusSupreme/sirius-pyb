<template >
  <dialog-container :is-show-title="false">
    <div class="dsw-scan-wrapper">
      <p class="dsw-scan-tooltip">请安图示将案卷倒置并正面朝下放置，点击下方按钮开始扫描</p>

      <p class="dsw-scan-pages">已扫描 <span id="dsw-scanned-count">1</span> 页</p>

      <p class="dsw-scan-btn-wrapper">
        <button type="button" class="dsw-btn" @click.stop="startScan" ref="dsw-start-scan">开始扫描</button>
        <button type="button" class="dsw-btn" v-if="isScanFinished" @click.stop="previewHandler">预览</button>
      </p>
    </div>
  </dialog-container>
</template >

<script >

import DialogContainer from 'components/common/dialog-container'

import DswEdit from './Edit'

export default {
  name: 'Scan',
  data () {
    return {
      scanner: window['fhkScan'],
      isScanFinished: false
    }
  },
  components: {
    DialogContainer
  },
  beforeDestroy () {
    this.clearGlobalResource()
  },
  methods: {
    startScan (e) {
      let result = 0
      const scanner = this.scanner

      this.initialize()

      result = scanner.OpenScanner(0)
      if (result === -1) {
        alert('Open scanner error, error code = ' + scanner.ErrorCode)
        return
      }

      this.$refs['dsw-start-scan'].innerText = '扫描中……'
      this.$refs['dsw-start-scan'].setAttribute('disabled', 'disabled')

      result = scanner.StartScan(0)
      if (result === -1) {
        this.$refs['dsw-start-scan'].innerText = '重新扫描'
        alert('Start scan error, error code = ' + scanner.ErrorCode)
      } else {
        this.$refs['dsw-start-scan'].innerText = '开始扫描'
        this.isScanFinished = true
      }

      this.$refs['dsw-start-scan'].removeAttribute('disabled')

      scanner.CloseScanner(0)
    },
    initialize () {
      const scanner = this.scanner

      scanner.DetectPageSize = 4
      scanner.FileName = 'D:\\demo\\image#####'
      scanner.FileType = 3
      scanner.Overwrite = 2
      scanner.PagerSupply = 1
      scanner.PixelType = 3
      scanner.ScanCount = -1
      scanner.ScanTo = 0
      scanner.ShowSourceUI = false
    },
    previewHandler (e) {
      console.log(this)
      this.$vLayer.openPage(DswEdit, {}, {
        parent: this,
        title: '预览编辑',
        scannedFiles: window.scannedFiles,
        taskId: this.extraParams.taskId,
        taskBelong: this.extraParams.taskBelong
      })
      this.clearGlobalResource()
      this.$layer.close(this.extraParams.parent.scanIndex)
    },
    clearGlobalResource () {
      window.scannedFiles = []
      window.scannedCount = 0
    }
  }
}
</script >

<style lang="stylus" scoped >
.dsw-scan-wrapper{
  width  : 100%;
  height : 100%;
  background : url("./images/print.png") no-repeat scroll 0 50%/100px 150px;
  padding : 0 0 0 120px;
  .dsw-scan-tooltip{
    padding :40px 0 0 0;
  }
  .dsw-scan-pages{
    margin :30px 0 50px 0;
    & > span{
      color : #ff9b00;
      margin :0 10px;
    }
  }
  .dsw-scan-btn-wrapper{
    text-align : center;
    .dsw-btn{
      height : 32px;
      line-height : 32px;
      padding : 0 15px;
      margin : 0 5px;
      background : url("./images/btn.png") no-repeat scroll 0 0/100% 100%;
      &:not([disabled]):hover{
        background : url("./images/btn-hover.png") no-repeat scroll 0 0/100% 100%;
      }
    }
  }
}
</style >
