<template>
    <ul class="dsw-menu-folder">
      <slot v-for="(item,index) in menuLists" :item="item" :index="index">
        <li class="dsw-menu-file" :key="index">
          <a class="dsw-menu-file-wrapper" @click.stop.prevent="clickHandler($event,item,index)" :href="item.url" >
            <i class="fa fa-cogs dsw-menu-file-icon"></i>
            <span class="dsw-menu-file-title">{{ item.title }}</span>
            <i class="fa dsw-menu-file-arrow" :class="[item.dswOpened===true? 'fa-angle-double-down':'fa-angle-double-right']" v-if="item.children && item.children.length > 0"></i>
          </a>
          <dsw-menu v-if="item.children && item.children.length > 0" :menuLists="item.children" class="dsw-sub-menu hidden"></dsw-menu>
        </li>
      </slot>
    </ul>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const {mapMutations} = createNamespacedHelpers('index')

export default {
  name: 'DswMenu',
  props: {
    menuLists: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapMutations(['clickMenu']),
    clickHandler (e, item, index) {
      const nextSibling = e.currentTarget.nextElementSibling
      // 有子菜单，则打开
      if (nextSibling) {
        const className = nextSibling.className
        if (className.includes('hidden')) {
          nextSibling.className = className.replace(/\s+hidden\s*/, '')
          this.clickMenu({index, status: true})
        } else {
          nextSibling.className += ' hidden'
          this.clickMenu({index, status: false})
        }
        this.$emit('dswRefreshBScroll', {e, item, index})
      } else {
        //  否则触发事件
        this.$emit('dswOpenTab', {e, item, index})
      }
    }
  }
}
</script>

<style lang="stylus">
  $borderColor=#15657c;
  $color=#23c7ed;

  .dsw-menu-folder{
    padding :0;
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
        ^[0].dsw-sub-menu .dsw-menu-file{
          border-bottom : none;
          .dsw-menu-file-wrapper{
            border-bottom : none;
            padding :0 0 0 0.4rem;
          }
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
</style>

<style lang="stylus" scoped>

</style>
