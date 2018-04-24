<template>
  <div class="dsw-right-page" ref="dsw-right-page" :data-is-expanded="isExpanded">
    <!--页面辅助工具 start-->
    <assist-nav ref="dsw-assist-container"></assist-nav>
    <!--页面辅助工具 end-->
    <!--tab 容器 start-->
    <div class="dsw-tab-container">
      <!--tab 项 start-->
      <nav class="dsw-tab-lists-wrapper" ref="dsw-tab-lists-wrapper">
        <i class="fa fa-backward dsw-tab-wizard dsw-tab-prev" @click.stop="prevHandler" ref="dsw-tab-prev"></i>
        <div class="dsw-tab-lists-box" ref="dsw-tab-lists-box">
          <ul class="dsw-tab-lists" ref="dsw-tab-lists" :style="{width: tabListsWidth+'px'}">
            <li class="dsw-tab-lists-item"  v-for="(tab,index) in navTabs" v-bind:key="index" :class="{'active':currentMenuID===tab.id}" :data-tab-id="tab.id" @click.stop="selectTabHandler($event,tab.id)" :ref="'dsw-tab-lists-item-'+tab.id">
              <a href="javascript:void(0);" class="dsw-tab-lists-item-a">
                <span class="dsw-tab-lists-item-a-title">{{tab.title}}</span>
                <i class="dsw-tab-lists-item-a-icon fa fa-close" @click.stop="closeHandler($event,tab.id)" v-if="tab.id!==0"></i>
              </a>
            </li>
          </ul>
        </div>
        <i class="fa fa-forward dsw-tab-wizard dsw-tab-next" @click.stop="nextHandler" ref="dsw-tab-next"></i>
        <div class="dsw-tab-more-wrapper" @mouseenter="mouseEnterHandler" @mouseleave="mouseLeaveHandler" ref="dsw-tab-more-wrapper">
          <i class="fa fa-caret-down dsw-tab-wizard dsw-tab-more"></i>
          <ul class="dsw-tab-more-lists" :class="{'hidden':!isShowMore}">
            <li class="dsw-tab-more-item" v-for="(tab,index) in navTabs" v-bind:key="index" :class="{'active':currentMenuID===tab.id}" @click.stop="selectTabHandler($event,tab.id)" :ref="'dsw-tab-more-item-'+tab.id">
              <a href="javascript:void(0);" class="dsw-tab-more-item-title">{{tab.title}}</a >
            </li>
          </ul>
        </div>
      </nav>
      <!--tab 项 end-->
      <!--tab 页 start-->
      <div class="dsw-tab-pages-wrapper" ref="dsw-tab-pages-wrapper">
        <ul class="dsw-tab-pages">
          <li class="dsw-tab-pages-item" v-for="(tab,index) in navTabs" :key="index" v-if="tab.href" v-show="tab.id===currentMenuID">
            <iframe :src="tab.href" frameborder="0" scrolling="no" width="100%" height="100%" :name="'dsw-iframe-'+tab.id" class="dsw-tab-pages-item-iframe"></iframe>
          </li>
        </ul>
      </div>
      <!--tab 页 end-->
    </div>
    <!--tab 容器 end-->
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import BScroll from 'better-scroll'

import AssistNav from 'components/business/assist-nav'

const {mapState, mapMutations} = createNamespacedHelpers('index')

export default {
  name: 'RightPage',
  data () {
    return {
      isShowMore: false,
      tabListsWidth: '100%',
      betterScroll: null
    }
  },
  computed: {
    ...mapState({
      currentMenuID: 'currentMenuID',
      previousMenuID: 'previousMenuID',
      navTabs (state) {
        const navTabs = state.navTabs
        const currentMenuID = state.currentMenuID

        // 在下一轮开始计算宽度，以确保新添加的元素已经渲染完毕
        this.$nextTick(() => {
          // 获取菜单宽度
          let width = 0
          Array.from(this.$refs['dsw-tab-lists'].children).forEach((element, index) => {
            width += element.clientWidth
          })

          // 修复只有两个 tab 时，显示错位
          if (navTabs.length === 2) {
            width <<= 1
          }

          // 获取当前元素，并且使其可见
          let currentTab = this.$refs['dsw-tab-lists-item-' + currentMenuID]
          if (currentTab && (currentTab = currentTab[0]) && this.betterScroll) {
            this.betterScroll.on('refresh', () => {
              this.betterScroll.scrollToElement(currentTab)
            })
          }

          this.tabListsWidth = width
        })

        return navTabs
      },
      isExpanded (state) {
        this.$nextTick(() => {
          this.mountedInit()
        })

        return state.isExpanded
      }
    })
  },
  components: {
    AssistNav
  },
  methods: {
    ...mapMutations(['navTabsHandler', 'setCurrentMenuID', 'setPreviousMenuID']),

    mouseEnterHandler (e) {
      this.isShowMore = true
    },
    mouseLeaveHandler (e) {
      this.isShowMore = false
    },
    setPageWrapperHeight () {
      const rightPageHeight = this.$refs['dsw-right-page'].clientHeight
      // const assistHeight = this.$refs['dsw-assist-container'].$el.clientHeight
      const tabListsHeight = this.$refs['dsw-tab-lists-wrapper'].clientHeight

      this.$refs['dsw-tab-pages-wrapper'].style.height = (rightPageHeight - 25 - tabListsHeight) + 'px'
    },
    setTabListsBoxWidth () {
      const tabListsWidth = this.$refs['dsw-tab-lists-wrapper'].clientWidth
      const tabPrevWidth = this.$refs['dsw-tab-prev'].clientWidth
      const tabNextWidth = this.$refs['dsw-tab-next'].clientWidth
      const tabMoreWrapperWidth = this.$refs['dsw-tab-more-wrapper'].clientWidth

      // 减一，是为了修复小数引起的错位
      this.$refs['dsw-tab-lists-box'].style.width = (tabListsWidth - tabPrevWidth - tabNextWidth - tabMoreWrapperWidth - 1) + 'px'
    },
    mountedInit () {
      this.setPageWrapperHeight()
      this.setTabListsBoxWidth()
      this.$nextTick(() => {
        this.betterScroll && this.betterScroll.destroy()

        this.betterScroll = new BScroll(this.$refs['dsw-tab-lists-box'], {
          scrollX: true,
          scrollY: false,
          mouseWheel: true
        })
      })
    },
    closeHandler (e, id) {
      const currentMenuID = this.currentMenuID

      if (currentMenuID === id) {
        let currentTab = this.$refs['dsw-tab-lists-item-' + currentMenuID]

        if (currentTab && (currentTab = currentTab[0])) {
          const previousTab = currentTab.previousElementSibling
          if (previousTab) {
            const tabId = Number.parseInt(previousTab.getAttribute('data-tab-id'), 10)
            this.betterScroll.scrollToElement(previousTab)
            this.setCurrentMenuID({id: tabId, isUpdatePrevious: true})
          }
        }
      }

      this.navTabsHandler({id, isAdd: false})
    },
    selectTabHandler (e, id) {
      this.setCurrentMenuID({id, isUpdatePrevious: true})
      this.betterScroll.scrollToElement(e.currentTarget)
    },
    prevHandler (e) {
      const currentMenuID = this.currentMenuID
      let currentTab = this.$refs['dsw-tab-lists-item-' + currentMenuID]

      if (currentTab && (currentTab = currentTab[0])) {
        const previousTab = currentTab.previousElementSibling
        if (previousTab) {
          const tabId = Number.parseInt(previousTab.getAttribute('data-tab-id'), 10)
          this.betterScroll.scrollToElement(previousTab)
          this.setCurrentMenuID({id: tabId, isUpdatePrevious: true})
        }
      }
    },
    nextHandler (e) {
      const currentMenuID = this.currentMenuID
      let currentTab = this.$refs['dsw-tab-lists-item-' + currentMenuID]

      if (currentTab && (currentTab = currentTab[0])) {
        const nextTab = currentTab.nextElementSibling
        if (nextTab) {
          const tabId = Number.parseInt(nextTab.getAttribute('data-tab-id'), 10)
          this.betterScroll.scrollToElement(nextTab)
          this.setCurrentMenuID({id: tabId, isUpdatePrevious: true})
        }
      }
    }
  },
  mounted () {
    this.mountedInit()

    window.addEventListener('resize', this.mountedInit)
  }
}
</script>

<style lang="stylus">
.dsw-right-page{
  height : 100%;
  overflow : hidden;
  padding :0 10px 0 0;
  .dsw-tab-container{
    .dsw-tab-lists-wrapper{
      position : relative;
      height :36px;
      line-height :36px;
      padding : 0 36px 0 0;
      margin : 25px 0 0 0;
      background-color :#191b52;
      .dsw-tab-wizard{
        width :24px;
        height :36px;
        line-height :36px;
        text-align : center;
        cursor:pointer;
        color : #337ab7;
      }
      .dsw-tab-prev{
        float :left;
      }
      .dsw-tab-next{
        float : right;
      }
      .dsw-tab-lists-box{
        float :left;
        height : 100%;
        overflow : hidden;
        .dsw-tab-lists{
          overflow : hidden;
          .dsw-tab-lists-item{
            float : left;
            background : url("./images/tab-bg.png") no-repeat scroll 0 0/100% 100%;
            padding :0 20px 0 10px;
            &:hover,&.active{
              background : url("./images/tab-hover-bg.png") no-repeat scroll 0 0/100% 100%;
            }
            .dsw-tab-lists-item-a{
              position : relative;
              .dsw-tab-lists-item-a-icon{
                position : absolute;
                top :50%;
                right :-16px;
                transform :translate(0,-50%);
              }
              .dsw-tab-lists-item-a-title{

              }
            }
          }
        }
      }
      .dsw-tab-more-wrapper{
        position: absolute;
        top: 0;
        right: 0;
        width: 36px;
        height: 36px;
        text-align: center;
        .dsw-tab-wizard{

        }
        .dsw-tab-more{
          width :100%;
        }
        .dsw-tab-more-lists{
          position : absolute;
          right :0;
          top :34px;
          min-width : 100px;
          background : url("./images/more-bg.jpg") no-repeat scroll 0 0/100% 100%;
          line-height :normal;
          padding :10px;
          text-align : left;
          .dsw-tab-more-item{
            padding: 3px 5px;
            border-radius: 5px;
            margin :5px 0;
            &.active{
              background-color: #191b52;
            }
            .dsw-tab-more-item-title{
              white-space :nowrap;
              display :block;
            }
          }
        }
      }
    }
    .dsw-tab-pages-wrapper{
      padding :0 0 6px 0;
      .dsw-tab-pages{
        height :100%
        .dsw-tab-pages-item{
          height :100%
          .dsw-tab-pages-item-iframe{

          }
        }
      }
    }
  }
}
</style>

<style lang="stylus" scoped>

</style>
