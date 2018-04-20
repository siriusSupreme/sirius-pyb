<template>
  <aside class="dsw-left-menu pull-left">
    <nav class="dsw-left-menu-nav" ref="dsw-left-menu-nav">
        <dsw-menu :menuLists="menuLists" ></dsw-menu>
    </nav>
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
      betterScroll: null
    }
  },
  components: {
    DswMenu
  },
  mounted () {
    console.log(this.$toastr)
    console.log(this.$layer)
    console.log(this.$layui)
    this.$toastr.success('回复撒刚更多发挥双方')
    this.getMenuLists({vm: this}).then((result) => {
      this.$nextTick(() => {
        this.betterScroll = new BScroll(this.$refs['dsw-left-menu-nav'], {
          mouseWheel: true
        })
      })
    })
  },
  methods: {
    ...mapActions(['getMenuLists'])
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
    .dsw-left-menu-nav{
      width : 3.27rem;
      height : 100%;
      overflow : hidden;
      background : url("./images/left-menu-bg.png") no-repeat scroll 0 0/100% 100%;
    }
  }
</style>

<style lang="stylus" scoped>

</style>
