<template>
  <aside class="dsw-left-menu pull-left">
    <nav class="dsw-left-menu-nav">
      <dsw-menu :menuLists="menuLists"></dsw-menu>
    </nav>
  </aside>
</template>

<script>
import axios from 'axios'
import DswMenu from 'components/function/menu'

export default {
  name: 'LeftMenu',
  data () {
    return {
      menuLists: []
    }
  },
  components: {
    DswMenu
  },
  mounted () {
    axios.get('http://rap2api.taobao.org/app/mock/data/60574').then((response) => {
      this.$set(this, 'menuLists', response.data.data.lists)
    })
  },
  methods: {

  }
}
</script>

<style lang="stylus">
  .dsw-left-menu{
    height :100%;
    padding :5px;
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
