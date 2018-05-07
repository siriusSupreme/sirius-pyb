<template >
  <dialog-container :title="'浏览电子卷宗'">
    <div class="dsw-preview-container">
      <dsw-panel :is-show-heading="false" :is-show-footer="true">
        <turn-page :pages="pages"></turn-page>
      </dsw-panel>
    </div>
  </dialog-container>
</template >

<script >

import DialogContainer from 'components/common/dialog-container'
import DswPanel from 'components/common/panel'
import TurnPage from 'components/common/turn-page'

export default {
  name: 'Scan',
  data () {
    return {
      pages: []
    }
  },
  components: {
    DialogContainer,
    DswPanel,
    TurnPage
  },
  beforeMount () {
    const taskId = this.extraParams.taskId
    const taskBelong = this.extraParams.taskBelong

    this.$https.get(this.$api.getAttachmentLists, {params: {taskId, taskBelong}}).then((result) => {
      this.pages = result.data.lists
    }).catch((reason) => {
      this.$toastr.error('预览失败')
    })
  }
}
</script >

<style lang="stylus" scoped >
.dsw-preview-container{
  width :100%;
  height :100%;
  overflow : hidden;
}
</style >
