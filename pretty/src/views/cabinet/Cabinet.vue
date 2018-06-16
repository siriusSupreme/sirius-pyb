<template>
  <article>
    Cabinet
  </article>
</template>

<script>
export default {
  name: 'Cabinet',
  beforeCreate () {
    console.log('cabinet-beforeCreate')
  },
  created () {
    console.log('cabinet-created')
  },
  beforeMount () {
    console.log('cabinet-beforeMount')
  },
  mounted () {
    console.log('cabinet-mounted')
  },
  activated () {
    console.log('cabinet-activated')
  },
  deactivated () {
    console.log('cabinet-deactivated')
  },
  beforeUpdate () {
    console.log('cabinet-beforeUpdate')
  },
  updated () {
    console.log('cabinet-updated')
  },
  beforeDestroy () {
    console.log('cabinet-beforeDestroy')
  },
  destroyed () {
    console.log('cabinet-destroyed')
  },
  beforeRouteEnter (to, from, next) {
    console.log('cabinet-beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('cabinet-beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('cabinet-beforeRouteLeave')
    next()
  }
}
</script>

<style lang="stylus" scoped>
</style>
