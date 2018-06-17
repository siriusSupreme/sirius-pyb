<template>
  <article>Dossier</article>
</template>

<script>
export default {
  name: 'Dossier',
  beforeCreate () {
    console.log('dossier-beforeCreate')
  },
  created () {
    console.log('dossier-created')
  },
  beforeMount () {
    console.log('dossier-beforeMount')
  },
  mounted () {
    console.log('dossier-mounted')
  },
  activated () {
    console.log('dossier-activated')
  },
  deactivated () {
    console.log('dossier-deactivated')
  },
  beforeUpdate () {
    console.log('dossier-beforeUpdate')
  },
  updated () {
    console.log('dossier-updated')
  },
  beforeDestroy () {
    console.log('dossier-beforeDestroy')
  },
  destroyed () {
    console.log('dossier-destroyed')
  },
  beforeRouteEnter (to, from, next) {
    console.log('dossier-beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('dossier-beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('dossier-beforeRouteLeave')
    next()
  }
}
</script>

<style lang="stylus" scoped >
</style >
