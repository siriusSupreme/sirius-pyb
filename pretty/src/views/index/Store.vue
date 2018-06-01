<template >
  <div class="store-container" ref="store-container" v-loading="confirm">
    <span class="store-title">存卷</span>
    <p class="store-position-wrapper">
      已选择存放位置：<span class="store-position">{{cupboardName}} / {{cellCode}}号柜</span>
    </p>
    <img class="store-flow" src="./images/store-flow.png" alt="存卷流程" />

    <input class="store-qrcode" ref="store-qrcode" type="text" placeholder="请扫描案件二维码" autofocus v-model="caseNo" />

    <dl class="store-info-wrapper">
      <dt class="store-info-title">案卷名称：</dt>
      <dd class="store-info-content">{{caseName}}</dd>
      <dt class="store-info-title">主办民警：</dt>
      <dd class="store-info-content">{{hostPName}}</dd>
    </dl>

    <div class="ss-btn-wrapper">
      <button type="button" class="ss-btn" @click.stop="confirmHandler">确定</button>
      <button type="button" class="ss-btn" @click.stop="cancelHandler">取消</button>
    </div>
  </div>
</template >

<script >
import {storeDossierByCellId, getDossierInfoByCaseNo} from '@/api/index'

export default {
  name: 'Cabinet',
  data () {
    return {
      caseNo: '',
      caseId: 0,
      hostPName: '',
      caseName: '',
      timer: 0,
      confirm: false
    }
  },
  watch: {
    caseNo (val, oldVal) {
      if (val.length >= 23) {
        this.timer && (this.timer = window.clearTimeout(this.timer))

        this.timer = window.setTimeout(() => {
          this.getDossierInfo(val)
        }, 300)
      }
    }
  },
  mounted () {
    this.autoFocus()
  },
  methods: {
    getDossierInfo (caseNo) {
      this.confirm = true
      getDossierInfoByCaseNo(caseNo).then(result => {
        if (result.code) {
          this.$message.error(result.msg)
        } else {
          let {id: caseId, hostPName, name: caseName} = result.data
          this.caseId = caseId
          this.hostPName = hostPName
          this.caseName = caseName
        }
      }, error => {
        this.$message.error(error.msg)
      }).then(() => {
        this.confirm = false
      })
    },
    autoFocus () {
      let handler = (e) => {
        this.$refs['store-qrcode'].focus()
      }
      handler()
      this.$refs['store-container'].addEventListener('click', handler)
      this.$once('hook:beforeDestroy', () => {
        this.$refs['store-container'].removeEventListener('click', handler)
      })
    },
    confirmHandler () {
      this.confirm = true
      storeDossierByCellId(this.cellId, this.caseId).then(result => {
        if (result.code) {
          this.$message.error(result.msg)
        } else {
          this.parent.dialogIndex = this.$layer.close(this.parent.dialogIndex)
          this.$message.success(result.msg)
        }
      }, error => {
        this.$message.error(error.msg)
      }).then(() => {
        this.confirm = false
      })
    },
    cancelHandler () {
      this.$layer.close(this.parent.dialogIndex)
    }
  }
}
</script >

<style lang="stylus" scoped >
.store-container{
  position relative;
  width 100%;
  height 100%;
  text-align center;
  background url("./images/dialog-bg.png") no-repeat scroll 0 0/100% 100%;
  .store-title{
    position absolute;
    top -18px;
    left 50%;
    transform translate(-50%, 0);
    min-width 180px;
    height 50px;
    line-height 50px;
    text-align center;
    color #fff;
    font-size 18px;
    background url("./images/dialog-title.png") no-repeat scroll 0 0/100% 100%;
  }
  .store-position-wrapper{
    margin-bottom: 20px;
    height: 80px;
    line-height: 110px;
    background url("./images/light.png") no-repeat scroll center bottom/100% 10px;
    .store-position{
      color #ffb822;
    }
  }
  .store-flow{
    margin-bottom 30px;
  }
  .store-qrcode{
    width 318px;
    height :32px;
    line-height 32px;
    text-align center;
    color #23c7ed;
    padding 0 5px;
    margin-bottom 20px;
    border-radius 4px;
    border 1px solid #76d7ff;
    background-color #041328;
    &::-webkit-input-placeholder{
      color #3c5b29;
    }
    &::-moz-placeholder{
      color #3c5b29;
    }
    &:-moz-placeholder{
      color #3c5b29;
    }
    &::-ms-input-placeholder{
      color #3c5b29;
    }
  }
  .store-info-wrapper{
    margin-bottom 32px;
    .store-info-title,
    .store-info-content{
      display inline-block;
      margin-bottom 0;
    }
    .store-info-content{
      color #ffb822;
      & + .store-info-title{
        margin-left 20px;
      }
    }
  }
}
</style >
