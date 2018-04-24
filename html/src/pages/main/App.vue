<template >
  <dsw-container>
    <dsw-loading></dsw-loading>
  </dsw-container>
</template >

<script >
import DswContainer from 'components/common/container'

export default {
  name: 'App',
  components: {
    DswContainer
  },
  mounted () {
    this.$showLoading(1)
  }
}
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
