<template >
  <div class="fetch-container" v-loading="confirm">
    <h3 class="fetch-title">确认取出该卷？</h3>
    <div class="ss-btn-wrapper">
      <button type="button" class="ss-btn" @click.stop="confirmHandler">确定</button>
      <button type="button" class="ss-btn" @click.stop="cancelHandler">取消</button>
    </div>
  </div>
</template >

<script >
import {fetchDossierByDossierId} from '@/api/index'

export default {
  name: 'Fetch',
  data () {
    return {
      confirm: false
    }
  },
  methods: {
    confirmHandler () {
      this.confirm = true
      fetchDossierByDossierId(this.cellId, this.caseId).then(result => {
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
.fetch-container{
  width 100%;
  height 100%;
  overflow hidden;
  background url("./images/dialog-bg.png") no-repeat scroll 0 0/100% 100%;
  .fetch-title{
    margin-top 80px;
    text-align center;
    font-size 22px;
    color #ffb822;
    letter-spacing 3px;
  }
}
</style >
