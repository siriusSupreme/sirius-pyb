<template>
  <aside class="dsw-left-menu pull-left">
    <nav class="dsw-left-menu-nav" ref="dsw-left-menu-nav">
        <dsw-menu :menuLists="menuLists" @dswRefreshBScroll="refreshBScroll"></dsw-menu>
    </nav>
    <img class="dsw-menu-toggle-btn" @click.stop="toggleHandler" v-show="opened" src="./images/arrow-left.png" />
    <img class="dsw-menu-toggle-btn" @click.stop="toggleHandler" v-show="!opened" src="./images/arrow-right.png" />
  </aside>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import BScroll from 'better-scroll'

import DswMenu from 'components/function/menu'

const {mapState, mapActions} = createNamespacedHelpers('index')

export default {
  name: 'LeftMenu',
  data () {
    return {
      betterScroll: null,
      opened: true
    }
  },
  components: {
    DswMenu
  },
  mounted () {
    this.getMenuLists({vm: this}).then((result) => {
      this.$nextTick(() => {
        this.betterScroll = new BScroll(this.$refs['dsw-left-menu-nav'], {
          mouseWheel: true
        })
      })
    })
  },
  methods: {
    ...mapActions(['getMenuLists']),
    refreshBScroll (payload) {
      this.betterScroll.refresh()
    },
    toggleHandler (e) {
      this.opened = !this.opened
    }
  },
  computed: {
    ...mapState(['menuLists'])
  }
}
</script>

<style lang="stylus">
  .dsw-left-menu{
    height :100%;
    padding :5px 10px;
    position : relative;
    .dsw-left-menu-nav{
      width : 3.27rem;
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
    }
  }
</style>

<style lang="stylus" scoped>

</style>
