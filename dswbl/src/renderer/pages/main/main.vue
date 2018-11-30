<template>
  <div id="main">
    <div class="main-top">
      <div class="main-top-operation-wrapper">
        <span class="main-top-title">迪赛威智能笔录</span>
        <div class="main-top-operation">
          <span class="main-btn-common">广播消息</span>
          <span class="main-btn-common">交流反馈</span>
          <span class="main-btn-common">更多</span>
          <span class="main-btn-common">系统管理</span>
          <span
            class="main-minimize main-btn-common"
            @click.stop="minimizeHandler"
          >一</span>
          <span
            class="main-close main-btn-common"
            @click.stop="closeHanlder"
          >X</span>
        </div>
      </div>
      <div class="main-top-info-wrapper">
        <div class="main-user-info">
          <div class="main-user-info-common">
            <img
              src="./images/user-info.png"
              class="main-user-info-icon"
            />
            <span class="main-user-info-text-common">用户信息 </span>
            <span class="main-user-info-text-common">【切换用户】</span>
          </div>
          <div class="main-user-info-common">
            <img
              src="./images/user-icon.png"
              class="main-user-info-icon"
            />
            <span class="main-user-info-text-common">用户:</span>
            <span
              class="main-user-info-text-common"
              v-text="account"
            ></span>
          </div>
          <div class="main-user-info-common">
            <img
              src="./images/unit.png"
              class="main-user-info-icon"
            />
            <span class="main-user-info-text-common">单位:</span>
            <span
              class="main-user-info-text-common"
              v-text="orgName"
            ></span>
          </div>
          <div class="main-user-info-common">
            <img
              src="./images/datatimer.png"
              class="main-user-info-icon"
            />
            <span class="main-user-info-text-common">日期:</span>
            <span class="main-user-info-text-common">{{Date.now() | formatDate}}</span>
          </div>
        </div>
        <ul class="main-news-info">
          <li class="main-news-info-annunciate main-news-content-common">
            <span class="main-news-info-inform"> <img
                src="./images/inform.png"
                class="main-news-info-inform-icon"
              ><span class="main-news-info-inform-text">通知公告</span></span>
            <span class="main-news-info-more">更多</span>
          </li>
          <li
            class="main-news-content main-news-content-common"
            v-for="(item, index) in newsData"
            :key="index"
          >
            <span
              class="main-news-time"
              v-text="item.time"
            ></span>
            <span
              class="main-news-discription"
              v-text="item.discription"
            ></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-bottom">
      <div class="search-wrapper">
        <div class="search-radio">
          <div
            class="search-radio-frame"
            v-for="(item, index) in radioData"
            :key="index"
          >
            <label
              :for="item.for"
              class="radio-label"
              @click.stop="inputHanlder(item)"
            >
              <input
                type="radio"
                :id="item.for"
                name="search-radio"
                class="radio-input"
                :value="item.for"
              >
              {{item.text}}
            </label>
          </div>
        </div>
        <input
          type="text"
          :placeholder="searchPlaceholder"
          class="text-input"
        >
        <button class="search-button">查询</button>
      </div>
      <div class="main-function-wrapper">
        <ul class="function-frame">
          <li
            class="function-item"
            v-for="(item, index) in functionData"
            :key="index"
            @click.stop="activeMainFunctionHanlder(item.flag)"
          >
            <div class="function-item-icon">
              <img
                :src="item.icon"
                class="function-item-icon-img"
              >
            </div>
            <span
              class="function-item-text"
              v-text="item.text"
            ></span>
          </li>
        </ul>
      </div>
      <div class="rests-function-wrapper">
        <div class="left-function-wrapper">
          <ul class="function-frame">
            <li
              class="function-item"
              v-for="(item, index) in leftFunctionData"
              :key="index"
            >
              <div class="function-item-icon">
                <img
                  :src="item.icon"
                  class="function-item-icon-img"
                >
              </div>
              <span
                class="function-item-text"
                v-html="item.text"
              ></span>
            </li>
          </ul>
        </div>
        <div class="right-function-wrapper">
          <ul class="function-frame">
            <li
              class="function-item"
              v-for="(item, index) in rightFunctionData"
              :key="index"
            >
              <div class="function-item-icon">
                <img
                  :src="item.icon"
                  class="function-item-icon-img"
                >
              </div>
              <span
                class="function-item-text"
                v-html="item.text"
              ></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-copy-corporation-wrapper">
        <span class="main-copy-corporation-text">法度互联网演示 武汉市迪赛威科技有限公司</span>
      </div>
      <div class="main-version">V0.0.1</div>
    </div>

    <!-- 笔录制作弹窗 -->
    <take-down-dialog :visible.sync='takeDownDialogVisible'></take-down-dialog>
  </div>
</template>

<script>
import formatDate from '@/utils/formatDate'

import { createNamespacedHelpers } from 'vuex'
let { mapState, mapActions } = createNamespacedHelpers('login')
export default {
  data () {
    return {
      msg: 'welcome to main',
      newsData: [
        { time: '2016年04月09日', discription: '经济日报: 为了给群众更多获得感不拉不拉不拉不拉不拉' },
        { time: '2016年04月09日', discription: '经济日报: 为了给群众更多获得感不拉不拉不拉不拉不拉' },
        { time: '2016年04月09日', discription: '经济日报: 为了给群众更多获得感不拉不拉不拉不拉不拉' },
        { time: '2016年04月09日', discription: '经济日报: 为了给群众更多获得感不拉不拉不拉不拉不拉' },
        { time: '2016年04月09日', discription: '经济日报: 为了给群众更多获得感不拉不拉不拉不拉不拉' }
      ],
      radioData: [
        { text: '笔录', for: 'take-down', placeholder: '可输入案件名称丶姓名等关键字' },
        { text: '法规', for: 'regulation', placeholder: '可输入法规关键字' },
        { text: '指引', for: 'guide', placeholder: '可输入标题进行查询' },
      ],
      functionData: [
        { icon: '', text: '笔录制作', flag: 'RECORDMAKE',icon: require('./images/record-make.png') },
        { icon: '', text: '笔录查询', flag: 'RECORDQUERY',icon: require('./images/record-query.png') },
        { icon: '', text: '模板管理', flag: 'TEMPLETEMANAGE',icon: require('./images/template-manage.png') },
        { icon: '', text: '数据采集', flag: 'DATAGATHER',icon: require('./images/data-gather.png') },
        { icon: '', text: '笔录联盟', flag: 'RECORDALLIANCE',icon: require('./images/record-alliance.png') },
        { icon: '', text: '全文检索', flag: 'FULLSEARCH',icon: require('./images/full-search.png') },
      ],
      leftFunctionData: [
        { icon: '', text: '快捷制作<br />笔录文书',icon: require('./images/quick-production.png') },
        { icon: '', text: '一键检测<br />笔录质量',icon: require('./images/a-key-test.png') },
        { icon: '', text: '统一管理<br />案件信息',icon: require('./images/unified-management.png') },
        { icon: '', text: '群体案件<br />笔录协同',icon: require('./images/group-case.png') }
      ],
      rightFunctionData: [
        {icon: '', text: '文书质量', icon: require('./images/quality-documents.png') },
        {icon: '', text: '邮件解密', icon: require('./images/mail-to-decrypt.png') },
        {icon: '', text: '侦查指引', icon: require('./images/reconnaissance-guide.png') },
        {icon: '', text: '用户设置', icon: require('./images/user-settings.png') },
        {icon: '', text: '法律法规', icon: require('./images/laws-and-regulations.png') },
        {icon: '', text: '我的业绩', icon: require('./images/my-performance.png') },
        {icon: '', text: '空白笔录', icon: require('./images/blank-record.png') }
      ],
      searchPlaceholder: '',
      searchChecked: false,
      // 弹层控制
      takeDownDialogVisible: false
    }
  },
  computed: {
    ...mapState(['account', 'orgName'])
  },
  components: {
    TakeDownDialog: () => import('@/pages/take-down-make/TakeDownDialog.vue')
  },
  filters: {
    formatDate (time) {
      return formatDate(new Date(time), 'yyyy/MM/dd')
    }
  },
  created () {
    this.ipc = this.$electron.ipcRenderer
    this.getCurrentUser()
  },
  methods: {
    ...mapActions(['getCurrentUser']),
    minimizeHandler () {
      this.ipc.send('main-minimize')
    },
    closeHanlder () {
      this.ipc.send('window-all-closed')
    },
    inputHanlder (item) {
      this.searchPlaceholder = item.placeholder
    },
    templateManageHandler () {
      this.ipc.send('ready-template-manage')
    },
    takeDownQueryHandler () {
      this.ipc.send('take-down-query')
    },
    activeMainFunctionHanlder (flag) {
      switch (flag) {
        case 'TEMPLETEMANAGE':
          this.templateManageHandler()
          break
        case 'RECORDMAKE': {
          // this.$router.push('/take-down-make')
          this.takeDownDialogVisible = true
          break;
        }
        case 'RECORDQUERY': {
          this.takeDownQueryHandler()
          // this.$router.push('/take-down-query')
          break;
        }
      }
    }
  }
}
</script>
