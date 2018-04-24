<template>
    <ul class="dsw-menu-folder">
      <li class="dsw-menu-file" v-for="(menu,index) in menuLists" :key="menu.id">
        <a class="dsw-menu-file-wrapper" @click.stop.prevent="menuClickHandler($event,menu,index,path)" :href="menu.action" :ref="'dsw-menu-file-wrapper-'+menu.id" :data-path="path" :data-menu-index="index" :class="{'active':currentMenuID===menu.id}">
          <i class="fa fa-cogs dsw-menu-file-icon"></i>
          <span class="dsw-menu-file-title">{{ menu.text }}</span>
          <i class="fa dsw-menu-file-arrow" :class="[menu.isExpanded===true? 'fa-angle-double-down':'fa-angle-double-right']" v-if="menu.children && menu.children.length > 0"></i>
        </a>
        <dsw-menu v-if="menu.children && menu.children.length > 0" :menuLists="menu.children" :path="path+'-'+index" class="dsw-sub-menu-folder" :class="{'hidden':!menu.isExpanded}"></dsw-menu>
      </li>
    </ul>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const {mapState, mapMutations} = createNamespacedHelpers('index')

export default {
  name: 'DswMenu',
  props: {
    menuLists: {
      type: Array,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      currentMenuID (state) {
        const currentMenuID = state.currentMenuID

        let currentMenu = this.$refs['dsw-menu-file-wrapper-' + currentMenuID]

        if (currentMenu && (currentMenu = currentMenu[0])) {
          const ancestorMenu = currentMenu.parentNode.parentNode
          // 展开菜单
          if (ancestorMenu && ancestorMenu.className.includes('hidden')) {
            // console.log(currentMenu.dataset)
            let path = currentMenu.getAttribute('data-path')
            const menuIndex = currentMenu.getAttribute('data-menu-index')
            path = path + '-' + menuIndex
            const index = path.split('-')[1]
            this.clickMenuHandler(index)
          }
          // 滚动，使该菜单可见
          // this.betterScroll.scrollToElement(currentMenu)
        }

        return currentMenuID
      }
    })
  },
  methods: {
    ...mapMutations(['clickMenuHandler', 'navTabsHandler', 'setCurrentMenuID']),

    menuClickHandler (e, menu, index, path) {
      const nextSibling = e.currentTarget.nextElementSibling
      // 有子菜单，则打开
      if (nextSibling) {
        this.clickMenuHandler(index)
        this.$emit('dswMenuFolder')
      } else {
        //  否则触发事件
        const id = menu.id
        const tab = {
          id: menu.id,
          title: menu.text,
          href: menu.action
        }
        this.navTabsHandler({id, tab, isAdd: true})
        this.setCurrentMenuID({id, isUpdatePrevious: true})
      }
    }
  }
}
</script>

<style lang="stylus">
  $borderColor=#15657c;
  $color=#23c7ed;

  .dsw-menu-folder{
    .dsw-menu-file{
      &:not(:last-child){
        border-bottom :1px solid $borderColor;
      }
      .dsw-menu-file-wrapper{
        color : $color;
        cursor : pointer;
        height :0.55rem;
        line-height :0.55rem;
        display : block;
        padding :0 0 0 0.20rem;
        position : relative;
        &:not(:last-child){
          border-bottom :1px solid $borderColor;
        }
        &.active{
          background : url("./images/active.png") no-repeat scroll 0 0/100% 100%;
        }
        .dsw-menu-file-icon{
          font-size :0.3rem
        }
        .dsw-menu-file-title{
          font-size :0.24rem;
        }
        .dsw-menu-file-arrow{
          position : absolute;
          right :10px;
          top :50%;
          transform :translate(0,-50%);
        }
        ^[0].dsw-sub-menu-folder .dsw-menu-file{
          border-bottom : none;
          .dsw-menu-file-wrapper{
            border-bottom : none;
            padding :0 0 0 0.4rem;
            .dsw-menu-file-icon{
              font-size :0.24rem
            }
            .dsw-menu-file-title{
              font-size :0.2rem;
            }
          }
        }
      }
    }
  }
</style>

<style lang="stylus" scoped>

</style>
