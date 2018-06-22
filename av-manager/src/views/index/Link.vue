<template>
  <article>Link——{{id}}</article>
</template>

<script>
export default {
  name: 'Link',
  props: ['id'],
  beforeCreate () {
    console.log('Link-beforeCreate')
  },
  created () {
    console.log('Link-created')
  },
  beforeMount () {
    console.log('Link-beforeMount')
  },
  mounted () {
    console.log('Link-mounted')
  },
  activated () {
    console.log('Link-activated')
  },
  deactivated () {
    console.log('Link-deactivated')
  },
  beforeUpdate () {
    console.log('Link-beforeUpdate')
  },
  updated () {
    console.log('Link-updated')
  },
  beforeDestroy () {
    console.log('Link-beforeDestroy')
  },
  destroyed () {
    console.log('Link-destroyed')
  },
  beforeRouteEnter (to, from, next) {
    console.log('Link-beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('Link-beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('Link-beforeRouteLeave')
    next()
  }
}
</script>

<style lang="stylus" scoped >
</style >
