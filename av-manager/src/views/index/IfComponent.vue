<template>
  <article>ifComponent</article>
</template>

<script>
export default {
  name: 'IfComponent',
  beforeCreate () {
    console.log('IfComponent-beforeCreate')
  },
  created () {
    console.log('IfComponent-created')
  },
  beforeMount () {
    console.log('IfComponent-beforeMount')
  },
  mounted () {
    console.log('IfComponent-mounted')
  },
  activated () {
    console.log('IfComponent-activated')
  },
  deactivated () {
    console.log('IfComponent-deactivated')
  },
  beforeUpdate () {
    console.log('IfComponent-beforeUpdate')
  },
  updated () {
    console.log('IfComponent-updated')
  },
  beforeDestroy () {
    console.log('IfComponent-beforeDestroy')
  },
  destroyed () {
    console.log('IfComponent-destroyed')
  },
  beforeRouteEnter (to, from, next) {
    console.log('IfComponent-beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('IfComponent-beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('IfComponent-beforeRouteLeave')
    next()
  }
}
</script>

<style lang="stylus" scoped >
</style >
