<template>
  <div id="templateManage">
    <div class="templateManage-top">
      <div class="templateManage-top-title-wrapper">
        <div class="templateManage-top-back" @click="backHandler">
          <img src="./images/template-manage-back.png" class="templateManage-top-back-pic">
        </div>
        <span class="templateMnage-top-title">&nbsp;模板管理</span>
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
          <span class="templateMnage-top-operation-close" @click.stop="backHandler">X</span>
        </div>
      </div>
    </div>
    <div class="templateManage-center">
      <div class="templateManage-center-aside">
        <ul class="templateManage-center-aside-frame">
          <li class="templateManage-center-aside-item" v-for="(item, index) in asideData" :key="index" :class="{'aside-active': index === asideIndex}" @click="asideStyleHandler(index, item.name, item.type)">
            <div class="templateManage-center-aside-item-title" :class="{'aside-item-title-active': index === asideIndex}">
              <img :src="item.pic" class="templateManage-center-aside-item-title-img">
              <span v-text="item.title"></span>
            </div>
          </li>
        </ul>
      </div>
      <div class="templateManage-center-article">
        <template-content :asideName="asideName" :templateType="templateType"></template-content>
      </div>
    </div>
    <div class="templateManage-bottom">
      <span class="templateManage-bottom-copy-corporation-text">法度互联网演示 武汉市迪赛威科技有限公司</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'welcome to templateManage',
      asideData: [
        { title: '公共模板', name: 'COMMONTEMPLATE', type: 0, pic: require('./images/common-template.png') },
        { title: '他人分享', name: 'SHARE', type: 1, pic: require('./images/share.png') },
        { title: '收藏模板', name: 'COLLENTIONTEMPLATE', type: 2, pic: require('./images/collention-template.png') },
        { title: '个人模板', name: 'PERSONALTEMPLATE', type: 3, pic: require('./images/personal-template.png') }
      ],
      asideIndex: 0,
      asideName: 'COMMONTEMPLATE',
      templateType: 0
    }
  },
  created () {
    this.ipc = this.$electron.ipcRenderer
  },
  components: {
    TemplateContent: () => import('@/pages/common/template-content/TemplateContent.vue')
  },
  methods: {
    asideStyleHandler (index, name, type) {
      this.asideIndex = index
      this.asideName = name
      this.templateType = type
    },
    minimizeHandler () {
      this.ipc.send('minimize-main-window')
    },
    backHandler () {
      this.ipc.send('back-main-window')
    }
  }
}
</script>
