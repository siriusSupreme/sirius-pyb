<template>
  <article>ShowComponent</article>
</template>

<script>
export default {
  name: 'ShowComponent',
  beforeCreate () {
    console.log('ShowComponent-beforeCreate')
  },
  created () {
    console.log('ShowComponent-created')
  },
  beforeMount () {
    console.log('ShowComponent-beforeMount')
  },
  mounted () {
    console.log('ShowComponent-mounted')
  },
  activated () {
    console.log('ShowComponent-activated')
  },
  deactivated () {
    console.log('ShowComponent-deactivated')
  },
  beforeUpdate () {
    console.log('ShowComponent-beforeUpdate')
  },
  updated () {
    console.log('ShowComponent-updated')
  },
  beforeDestroy () {
    console.log('ShowComponent-beforeDestroy')
  },
  destroyed () {
    console.log('ShowComponent-destroyed')
  },
  beforeRouteEnter (to, from, next) {
    console.log('ShowComponent-beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('ShowComponent-beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('ShowComponent-beforeRouteLeave')
    next()
  }
}
</script>

<style lang="stylus" scoped >
</style >
