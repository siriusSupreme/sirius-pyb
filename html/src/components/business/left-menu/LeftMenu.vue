<template>
  <aside class="dsw-left-menu pull-left" :class="{'dsw-left-menu-collapsed':!isExpanded}">
    <nav class="dsw-left-menu-nav" ref="dsw-left-menu-nav">
      <dsw-menu :menuLists="menuLists" path="0" @dswMenuFolder="menuFolderHandler"></dsw-menu>
    </nav>
    <span class="dsw-menu-toggle-btn" :class="{'dsw-menu-toggle-expanded':isExpanded}" @click="toggleExpandedHandler"></span>
  </aside>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import BScroll from 'better-scroll'

import DswMenu from 'components/function/menu'

const {mapState, mapMutations, mapActions} = createNamespacedHelpers('index')

export default {
  name: 'LeftMenu',
  data () {
    return {
      betterScroll: null
    }
  },
  computed: {
    ...mapState(['menuLists', 'isExpanded'])
  },
  components: {
    DswMenu
  },
  created () {
    this.$showLoading(3)
    this.getMenuLists({vm: this}).then((result) => {
      this.$hideLoading()
      this.$nextTick(() => {
        this.betterScroll = new BScroll(this.$refs['dsw-left-menu-nav'], {
          mouseWheel: true,
          scrollbar: true
        })
      })
    })
  },
  methods: {
    ...mapActions(['getMenuLists']),
    ...mapMutations(['toggleExpandedHandler']),

    menuFolderHandler () {
      this.betterScroll.refresh()
    }
  }
}
</script>

<style lang="stylus">
  .dsw-left-menu{
    position : relative;
    width : 2.4rem;
    height :100%;
    padding :5px 0 5px 10px;
    margin : 0 10px 0 0;
    &.dsw-left-menu-collapsed{
      width :0;
      margin :0;
    }
    .dsw-left-menu-nav{
      height : 100%;
      overflow : hidden;
      background : url("./images/left-menu-bg.png") no-repeat scroll 0 0/100% 100%;
    }
    .dsw-menu-toggle-btn{
      width : 30px;
      height : 30px;
      cursor : pointer;
      position : absolute;
      top :50%;
      left :-20px;
      transform :translate(0,-50%);
      background : url("./images/arrow-right.png") no-repeat scroll 0 0/100% 100%;
      &.dsw-menu-toggle-expanded{
        background : url("./images/arrow-left.png") no-repeat scroll 0 0/100% 100%;
      }
    }
  }
</style>

<style lang="stylus" scoped>

</style>
