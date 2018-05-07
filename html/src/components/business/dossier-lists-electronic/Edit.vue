<template>
  <dialog-container :title="extraParams['title']">
    <dsw-panel :is-show-heading="false" :is-show-footer="true">
      <div class="dsw-edit-container" ref="dsw-edit-container">
        <ul class="dsw-edit-lists">
          <li class="dsw-edit-item" v-for="(attachment, index) in attachmentLists" :key="index" @click.stop="previewHandler($event, index)">
            <figure>
              <i class="fa fa-close" @click.stop="deleteFile($event,index)"></i>
              <img :src="$api.getAttachment + '?id=' + attachment.id" />
            </figure>
            <span :title="attachment.fileName">{{index}}、{{attachment.fileName}}</span>
          </li>
        </ul>
      </div>

      <div class="dsw-btn-wrapper" slot="panel-footer">
        <span class="dsw-btn" v-web-uploader="{server:$api.uploadAttachment}">选择文件</span>
        <button type="button" class="dsw-btn" @click.stop="updateHandler">保存上传</button>
      </div>
    </dsw-panel>
  </dialog-container>
</template>

<script>
import BScroll from 'better-scroll'

import DialogContainer from 'components/common/dialog-container'
import DswPanel from 'components/common/panel'

import WebUploader from 'directives/web-uploader'

export default {
  name: 'Edit',
  data () {
    return {
      betterScroll: null,
      attachmentLists: []
    }
  },
  watch: {
    addedLists (val, oldVal) {
      console.log(val + '===' + oldVal)
    }
  },
  components: {
    DialogContainer,
    DswPanel
  },
  directives: {
    WebUploader
  },
  beforeMount () {
    // 如果不是扫描页面进来的，则查询已有图片，否则仅仅预览当前扫描过来的图片
    if (this.extraParams.scannedFiles) {
      this.attachmentLists = this.extraParams.scannedFiles
    } else {
      const taskId = this.extraParams.taskId
      const taskBelong = this.extraParams.taskBelong

      this.$https.jsonp(this.$api.getAttachmentLists, {params: {taskId, taskBelong}}).then((result) => {
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
    }
  },
  updated () {
    this.betterScroll && this.betterScroll.refresh()
  },
  methods: {
    updateHandler (e) {
      const ids = this.attachmentLists.map((val) => {
        return val.id
      }).join(',')
      const taskId = this.extraParams.taskId
      const taskBelong = this.extraParams.taskBelong
      const remark = this.extraParams.name

      this.$https.post(this.$api.updateAttachment, {ids, taskId, taskBelong, remark}).then((result) => {
        if (result.code === 0) {
          this.$toastr.success('保存上传成功')
          this.$layer.close(this.extraParams.parent.editIndex)
        }
      }).catch((reason) => {
        this.$toastr.error('保存上传失败')
      })
    },
    deleteFile (e, index) {
      this.attachmentLists.splice(index, 1)
    },
    previewHandler (e, index) {
      const data = this.attachmentLists.map((val) => {
        return {
          alt: val.fileName,
          src: `${this.$api.getAttachment}?id=${val.id}`
        }
      })

      this.$layer.photos({
        photos: {
          title: this.extraParams.name,
          start: index,
          data
        }
      })
    }
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
        width : 100%;
        height : 90%;
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
        img {
          width :90%;
          height :100%;
        }
      }
      span {
        display : inline-block;
        width : 100%;
        overflow : hidden;
        text-overflow ellipsis;
        white-space :nowrap;
      }
    }
  }
}
.dsw-btn-wrapper{
  text-align : center;
  margin :24px 0 0;
  .dsw-btn{
    display : inline-block;
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
