<template>
  <dialog-container :title="extraParams['title']">
    <dsw-panel :is-show-heading="false" :is-show-footer="true">
      <div class="dsw-edit-container" ref="dsw-edit-container">
        <ul class="dsw-edit-lists">
          <li class="dsw-edit-item" v-for="index in 23" :key="index">
            <figure>
              <i class="fa fa-close"></i>
              <img src="./images/default.png" />
            </figure>
            <span>{{index}}、接受刑事案件登记表</span>
          </li>
        </ul>
      </div>

      <div class="dsw-btn-wrapper" slot="panel-footer">
        <button class="dsw-btn">选择文件</button>
        <button class="dsw-btn">确认上传</button>
      </div>
    </dsw-panel>
  </dialog-container>
</template>

<script>
import BScroll from 'better-scroll'

import DialogContainer from 'components/common/dialog-container'
import DswPanel from 'components/common/panel'

export default {
  name: 'Edit',
  data () {
    return {
      betterScroll: null,
      attachmentLists: []
    }
  },
  components: {
    DialogContainer,
    DswPanel
  },
  beforeMount () {
    const taskId = this.extraParams.taskId
    const taskBelong = this.extraParams.taskBelong

    this.$https.jsonp(this.$api.getAttachmentLists, {params: {taskId, taskBelong}}).then((result) => {
      console.log(result)
      this.attachmentLists = result.data.lists
      this.$nextTick(() => {
        this.betterScroll = new BScroll(this.$refs['dsw-edit-container'], {
          mouseWheel: true,
          scrollbar: true
        })
      })
    }).catch((reason) => {
      this.$toastr.error('获取附件列表失败')
    })
  },
  updated () {

  }
}
</script>

<style lang="stylus" scoped>
.dsw-edit-container{
  position : relative;
  width : 100%;
  height : 100%;
  overflow : hidden;
  text-align : center;
  .dsw-edit-lists{
    display : inline-block;
    .dsw-edit-item{
      display : inline-block;
      /*float : left;*/
      width : 188px;
      height : 224px;
      padding : 12px;
      text-align : center;
      overflow : hidden;
      figure{
        position : relative;
        padding :36px 0;
        background : url("./images/edit-bg.png") no-repeat scroll 0 0/100% 100%;
        i{
          cursor : pointer;
          position : absolute;
          top : 0;
          right : 0;
          transform : translate(50%,-50%);
          width : 20px;
          height : 20px;
          line-height : 19px;
          border :1px solid #fff;
          border-radius :10px;
          box-shadow :0 0 1px 1px #fff;
          color : #fff;
          background-color : #285fc2;
        }
      }
    }
  }
}
.dsw-btn-wrapper{
  text-align : center;
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
