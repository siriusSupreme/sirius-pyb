<template >
  <dsw-container>
    <h1>公安机关执法办案——案卷管理平台</h1>
    <aside>
      <nav>
        <dsw-menu :menuLists="menuLists"></dsw-menu>
      </nav>
    </aside>
    <article>
      <nav></nav>
    </article>
  </dsw-container>
</template >

<script >
import DswContainer from 'components/container'
import DswMenu from 'components/menu'
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      menuLists: []
    }
  },
  components: {
    DswContainer,
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
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
