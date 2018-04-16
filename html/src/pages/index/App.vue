<template >
  <dsw-container>
    <h1>公安机关执法办案——案卷管理平台</h1>
    <aside>
      <nav></nav>
    </aside>
    <article></article>
  </dsw-container>
</template >

<script >
import DswContainer from 'components/container'

export default {
  name: 'App',
  data () {
    return {
      msg: 'hello sirius ' + process.env.NODE_ENV
    }
  },
  components: {
    DswContainer
  },
  mounted () {

  },
  methods: {

  }
}
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
