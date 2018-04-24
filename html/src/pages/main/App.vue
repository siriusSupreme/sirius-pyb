<template >
  <dsw-container>

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
    this.$showLoading(2)
    setTimeout(() => {
      this.$hideLoading()
    }, 3000)
  }
}
</script >

<style lang="stylus" >

</style >

<style lang="stylus" scoped >

</style >
