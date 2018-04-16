<template >
  <dsw-container>
    <h1>公安机关执法办案——案卷管理平台</h1>
    <aisde></aisde>

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
  .container{
    background-color: red
    span {
      cursor : pointer
    }
  }
</style >

<style lang="stylus" scoped >
  .container{
    background-color: red
  }
</style >
