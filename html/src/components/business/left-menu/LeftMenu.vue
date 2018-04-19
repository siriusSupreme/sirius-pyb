<template>
  <aside class="dsw-left-menu pull-left">
    <nav class="dsw-left-menu-nav" ref="dsw-left-menu-nav">
        <dsw-menu :menuLists="menuLists" @dsw-open-tab="openTab"></dsw-menu>
    </nav>{{currentMenuIndex}}
  </aside>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import BScroll from 'better-scroll'

import DswMenu from 'components/function/menu'

const {mapState} = createNamespacedHelpers('index')

export default {
  name: 'LeftMenu',
  data () {
    return {
      menuLists: [],
      betterScroll: null
    }
  },
  components: {
    DswMenu
  },
  mounted () {
    this.$axiosInstance.get('http://rap2api.taobao.org/app/mock/data/60574').then((response) => {
      this.$set(this, 'menuLists', response.data.data.lists)
      this.$nextTick(() => {
        this.betterScroll = new BScroll(this.$refs['dsw-left-menu-nav'], {
          mouseWheel: true
        })
      })
    })
  },
  methods: {
    openTab (e) {
      console.log(e)
    }
  },
  computed: {
    ...mapState(['currentMenuIndex'])
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
