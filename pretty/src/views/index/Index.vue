<template >
  <article class="ss-container index-container">
    <!--头部 start-->
    <header class="index-header">
      <div class="index-tools-wrapper clearfix">
        <span class="index-datetime pull-left">{{datetime | parseTime('{y}-{m}-{d} {h}:{i}:{s} 星期{a}')}}</span>
        <span class="index-logout pull-right" @click.stop="logoutHandler"><i class="fa fa-power-off"></i></span>
      </div>
      <div class="index-user-wrapper">
        <span class="index-my-cabinet">( {{cabinetLists.length}} )</span>
        <span class="index-user-info">当前用户      {{'李盼'}}</span>
      </div>
    </header>
    <!--头部 end-->

    <!--搜索 start-->
    <div class="index-search-wrapper">
      <input class="index-search-input" v-model="keywords" type="text" placeholder="请输入案件编号" />
      <button type="button" class="index-search-button" @click.stop="searchHandler"></button>
    </div>
    <!--搜索 end-->

    <!--案卷柜列表 start-->
    <div class="index-cabinet-wrapper">
      <div class="index-cabinet-lists-wrapper" ref="index-cabinet-lists-wrapper">
        <ul class="index-cabinet-lists" ref="index-cabinet-lists">
          <li class="index-cabinet-item" v-for="(cabinet, index) in cabinetLists" :key="cabinet.cellId">
            <div class="cabinet-wrapper" :class="{active: currentCellId === cabinet.cellId}" @click.stop="cabinetClickHandler(cabinet)">
              <span class="cabinet-index">{{String(index+1).padStart(2, '0')}}</span>
              <span class="cabinet-bottom">{{`案管柜 ${cabinet.cellCode}`}}</span>
              <span class="cabinet-store">存卷 <span class="cabinet-store-count">{{cabinet.caseCount}}</span> 份</span>
            </div>
          </li>
        </ul>
      </div>
      <span class="index-cabinet-prev" @click.stop="cabinetPrevHandler"></span>
      <span class="index-cabinet-next" @click.stop="cabinetNextHandler"></span>
    </div>
    <!--案卷柜列表 end-->

    <!--卷宗列表 start-->
    <div class="index-dossier-wrapper">
      <div class="index-dossier-header">
        <p class="index-dossier-title">案管柜    {{currentCell.cellCode}}</p>
        <p class="index-dossier-count">( {{dossierTotalCount}} )</p>
      </div>
      <div class="index-dossier-lists-wrapper" ref="index-dossier-lists-wrapper">
        <ul class="index-dossier-lists" ref="index-dossier-lists">
          <li class="index-dossier-item" v-for="(dossier, index) in dossierLists" :key="index">
            <div class="dossier-wrapper" v-for="(item, i) in dossier" :key="i">
              <p class="dossier-name">{{item.name}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="index-indicate-wrapper">
        <ul class="indicate-dots">
          <li class="indicate-dot" :class="{active: currentPageIndex === index}"  v-for="(dossier, index) in dossierLists" :key="index" @click.stop="indicateDotHandler(index)">{{index + 1}}</li>
        </ul>
      </div>
      <div class="index-btn-wrapper">
        <button type="button" class="index-btn index-store">存   卷</button>
        <button type="button" class="index-btn index-fetch">取   卷</button>
      </div>
    </div>
    <!--卷宗列表 end-->
  </article>
</template >

<script >
import BScroll from 'better-scroll'
import {createNamespacedHelpers} from 'vuex'
import {getCabinetLists, getDossierLists} from '@/api/index'

const {mapActions, mapState} = createNamespacedHelpers('user')

export default {
  name: 'Index',
  data () {
    return {
      datetime: Date.now(),
      keywords: '',
      cabinetSlider: null,
      dossierSlider: null,
      currentPageIndex: 0,
      cabinetLists: [],
      dossierLists: [],
      dossierTotalCount: 0,
      currentCellId: 0,
      currentCell: {}
    }
  },
  computed: {
    ...mapState({
      userId: 'id'
    })
  },
  created () {
    this.getUserInfoByToken().then(() => {
      this.getCabinetLists()
      // this.getDossierLists()
    })

    this.updateDatetime()
  },
  methods: {
    ...mapActions(['getUserInfoByToken', 'logout']),
    logoutHandler () {
      this.logout().then(() => {
        this.$router.push('/login')
      })
    },
    getCabinetLists () {
      getCabinetLists(this.userId).then(result => {
        if (result.code) {
          this.$message.error(result.msg)
        } else {
          this.cabinetLists = result.data.lists

          if (this.cabinetLists.length) {
            this.currentCell = this.cabinetLists[0]
            this.currentCellId = this.cabinetLists[0]['cellId']
            this.cabinetClickHandler(this.currentCell)
            this.$nextTick(() => {
              this.initCabinetSlider()
              this.initCabinetWidth()
            })
          }
        }
      }, error => {
        this.$message.error(error.msg)
      })
    },
    getDossierLists () {
      let sliceCount = 10
      let dossierLists = Array.from({length: Math.round(Math.random() * 200)}, (v, i) => i)

      this.dossierLists = []

      for (let i = 0, len = dossierLists.length; i < len; i += sliceCount) {
        this.dossierLists.push(dossierLists.slice(i, i + sliceCount))
      }
    },
    updateDatetime () {
      let timer = window.setInterval(() => {
        this.datetime = Date.now()
      }, 1000)

      this.$once('hook:beforeDestroy', () => {
        window.clearInterval(timer)
      })
    },
    initCabinetWidth () {
      let listsElement = this.$refs['index-cabinet-lists']
      let children = Array.from(listsElement.children)
      let width = 0

      children.forEach((el) => {
        width += el.clientWidth
      })

      listsElement.style.width = width + 'px'
    },
    initCabinetSlider () {
      this.cabinetSlider = new BScroll(this.$refs['index-cabinet-lists-wrapper'], {
        scrollX: true,
        scrollY: false,
        bindToWrapper: false,
        stopPropagation: true,
        snap: {
          loop: false,
          threshold: 0.1
        }
      })

      this.cabinetSlider.on('scrollEnd', ({x, y}) => {
        let {pageX, pageY} = this.cabinetSlider.getCurrentPage()
        console.log(pageX)
        console.log(pageY)
      })
    },
    cabinetClickHandler (cell) {
      let sliceCount = 10
      let dossierLists = []
      this.dossierLists = []
      this.dossierTotalCount = 0
      this.currentCell = cell
      this.currentCellId = cell.cellId

      getDossierLists(cell.cellId).then(result => {
        if (result.code) {
          this.$message.error(result.msg)
        } else {
          dossierLists = result.data.lists
          this.dossierTotalCount = dossierLists.length

          if (this.dossierTotalCount) {
            for (let i = 0, len = dossierLists.length; i < len; i += sliceCount) {
              this.dossierLists.push(dossierLists.slice(i, i + sliceCount))
            }
            this.$nextTick(() => {
              this.initDossierSlider()
              this.initDossierWidth()
            })
          }
        }
      }, error => {
        this.$message.error(error.msg)
      })
    },
    cabinetPrevHandler (e) {
      this.cabinetSlider.prev()
    },
    cabinetNextHandler (e) {
      this.cabinetSlider.next()
    },
    initDossierWidth () {
      let listsElement = this.$refs['index-dossier-lists']
      let children = Array.from(listsElement.children)
      let width = 0

      children.forEach((el) => {
        width += el.clientWidth
      })

      listsElement.style.width = width + 'px'
    },
    initDossierSlider () {
      this.dossierSlider && this.dossierSlider.destroy()

      this.dossierSlider = new BScroll(this.$refs['index-dossier-lists-wrapper'], {
        scrollX: true,
        scrollY: false,
        bindToWrapper: false,
        stopPropagation: true,
        snap: {
          loop: true,
          threshold: 0.1
        }
      })

      this.dossierSlider.on('scrollEnd', ({x, y}) => {
        let {pageX} = this.dossierSlider.getCurrentPage()
        this.currentPageIndex = pageX
      })
    },
    dossierClickHandler (e) {

    },
    indicateDotHandler (pageX) {
      this.currentPageIndex = pageX
      this.dossierSlider.goToPage(pageX)
    },
    searchHandler (e) {

    }
  }
}
</script >

<style lang="stylus" scoped >
.index-container{
  background url("./images/bg.png") no-repeat scroll 0 0/100% 100%;
  .index-header{
    position relative;
    height 150px;
    background url("./images/header-bg.png") no-repeat  scroll 0 0/100% 100%;
    .index-tools-wrapper{
      padding :10px 20px 0;
      .index-datetime{
        width 150px;
        color #fafc09;
        font-size 14px;
        line-height 24px;
        font-weight 800;
      }
      .index-logout{
        width 38px;
        height 38px;
        border-radius 4px;
        line-height 38px;
        text-align center;
        color #fff;
        font-size 24px;
        background-color #ef0c0cc2;
        cursor pointer;
      }
    }
    .index-user-wrapper{
      position absolute;
      left 50%;
      bottom 24px;
      transform translate(-50%, 0);
      text-align center;
      .index-my-cabinet{
        display block;
        width 220px;
        height 32px;
        line-height 32px;
        padding-left 180px;
        font-size 20px;
        font-weight 800;
        margin-bottom 20px;
        background url("./images/my-cabinet.png") no-repeat scroll 0 0/177px 32px;
        color red;
      }
      .index-user-info{
        font-size 16px;
        color #7bfdff;
        white-space pre-line;
      }
    }
  }
  .index-search-wrapper{
    text-align center;
    margin-top 40px;
    font-size 0;
    .index-search-input,
    .index-search-button{
      height 36px;
      line-height 36px;
      vertical-align middle;
      outline none;
      border 1px solid #23c7ed;
      font-size 14px;
    }
    .index-search-input{
      width 400px;
      padding 0 5px;
      color #23c7ed;
      background-color transparent;
      border-radius 4px 0 0 4px;
      &::-webkit-input-placeholder{
        color #a3a3a3;
      }
    }
    .index-search-button{
      width 60px;
      cursor pointer;
      margin-left -1px;
      border-radius 0 4px 4px 0;
      background url("./images/search-icon.png") no-repeat scroll center center/36px 36px #1e4f72;
    }
  }
  .index-cabinet-wrapper{
    position relative;
    margin-top 35px;
    .index-cabinet-lists-wrapper{
      width 696px;
      height 196px;
      margin 0 auto;
      overflow hidden;
      .index-cabinet-lists{
        list-style none;
        overflow hidden;
        padding 0;
        margin 0 auto;
        .index-cabinet-item{
          float left;
          padding 0 10px;
          .cabinet-wrapper{
            position relative;
            width 154px;
            height 196px;
            font-size 14px;
            cursor pointer;
            background url("./images/cabinet-bg.png") no-repeat scroll 0 0/100% 100%;
            .cabinet-index{
              position absolute;
              top 10px;
              left 5px;
              color #ff2626;
            }
            .cabinet-bottom{
              position absolute;
              bottom 0;
              left 0;
              width 100%;
              height 46px;
              text-align center;
              padding-top 3px;
              color #53e9ef;
              font-weight 600;
              background url("./images/cabinet-bottom.png") no-repeat scroll 0 0/100% 100%;
            }
            .cabinet-store{
              position absolute;
              bottom 0;
              left 50%;
              transform translate(-50%, 0);
              width 134px;
              height 24px;
              line-height 24px;
              text-align center;
              color #045877;
              background url("./images/cabinet-store.png") no-repeat scroll 0 0/100% 100%;
            }
            &.active .cabinet-store-count{
              color #ff541f;
            }
          }
        }
      }
    }
    .index-cabinet-prev,
    .index-cabinet-next{
      position absolute;
      top 50%;
      transform translate(0, -50%);
      width 30px;
      height :50px;
      line-height 50px;
      cursor pointer;
    }
    .index-cabinet-prev{
      left 3px;
      background url("./images/prev.png") no-repeat scroll 0 0/100% 100%;
    }
    .index-cabinet-next{
      right 3px;
      background url("./images/next.png") no-repeat scroll 0 0/100% 100%;
    }
  }
  .index-dossier-wrapper{
    margin-top 30px;
    text-align center;
    .index-dossier-header{
      height 60px;
      font-size 20px;
      background url("./images/dossier-header.png") no-repeat  scroll 0 0/100% 100%;
      .index-dossier-title{
        color #ffb822;
        letter-spacing 3px;
        white-space pre-line;
        margin-bottom 0;
      }
      .index-dossier-count{
        color red;
        font-weight 800;
        margin-bottom 0;
      }
    }
    .index-dossier-lists-wrapper{
      width 700px;
      height 348px;
      margin 10px auto 15px;
      overflow hidden;
      .index-dossier-lists{
        list-style none;
        padding 0;
        margin 0;
        overflow hidden;
        .index-dossier-item{
          width 700px;
          height 348px;
          float left;
          .dossier-wrapper{
            display inline-block;
            width 120px;
            height 154px;
            margin 10px;
            cursor pointer;
            background url("./images/dossier-bg.png") no-repeat scroll 0 0/100% 100%;
            .dossier-name{
              writing-mode tb-rl;
              text-align left;
              margin 0 auto;
              padding 25px 0;
              color #045877;
              font-size 14px;
              line-height 24px;
            }
          }
        }
      }
    }
    .index-indicate-wrapper{
      position relative;
      text-align center;
      margin-bottom 15px;
      .indicate-dots{
        display inline-block;
        overflow hidden;
        list-style none;
        padding 0;
        margin 0;
        .indicate-dot{
          display inline-block;
          width 24px;
          height 24px;
          line-height 24px;
          border-radius 50%;
          background-color #045879;
          margin 0 3px;
          cursor pointer;
          &.active{
            background-color #0c1bad;
          }
        }
      }
    }
    .index-btn-wrapper{
      .index-btn{
        width 150px;
        height 50px;
        line-height 50px;
        text-align center;
        color #fff;
        white-space pre-line;
        font-size 22px;
        border none;
        outline none;
        cursor pointer;
        margin 0 20px;
      }
      .index-store{
        background url("./images/dossier-store.png") no-repeat scroll 0 0/100% 100%;
      }
      .index-fetch{
        background url("./images/dossier-fetch.png") no-repeat scroll 0 0/100% 100%;
      }
    }
  }
}
</style >
