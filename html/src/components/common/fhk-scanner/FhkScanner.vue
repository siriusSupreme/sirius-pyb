<template>
  <div class="dsw-fhk-scanner-container">
    <button type="button" class="dsw-btn" @click.stop="startScan">{{statusText}}</button>

    <!--<object :id="id" width="0" height="0" :classid="`clsid:07cf3b59-${classId}-4ee2-bcef-1320638005e7`"></object>-->
    <object :id="id" width="0" height="0" classid="clsid:07cf3b59-2cf2-4ee2-bcef-1320638005e7"></object>
  </div>
</template>

<script>
export default {
  name: 'scannerner',
  props: {
    fileName: {
      type: String,
      default: 'D:\\demo\\image#####'
    },
    fileType: {
      type: Number,
      default: 3
    },
    overwrite: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      id: 'fhk-scanner-' + Date.now(),
      classId: Math.random().toFixed(4) * 10 ** 4,
      statusText: '开始扫描'
    }
  },
  methods: {
    startScan (e) {
      let result = 0
      const scanner = window[this.id]

      this.initialize()

      result = scanner.OpenScanner(0)
      if (result === -1) {
        alert('Open scanner error, error code = ' + scanner.ErrorCode)
        return
      }

      result = scanner.StartScan(0)
      if (result === -1) {
        alert('Start scan error, error code = ' + scanner.ErrorCode)
      }

      scanner.CloseScanner(0)
    },
    initialize () {
      const scanner = window[this.id]

      scanner.FileName = this.fileName
      scanner.FileType = this.fileType
      scanner.Overwrite = this.overwrite
    }
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>
.dsw-fhk-scanner-container{
  display : inline-block;
  .dsw-btn{
    width : 100%;
    height : 32px;
    line-height : 32px;
    text-align : center;
    background : url("./images/btn.png") no-repeat scroll 0 0/100% 100%;
    white-space :nowrap;
    &:hover{
      background : url("./images/btn-hover.png") no-repeat scroll 0 0/100% 100%;
    }
  }
}
</style>
