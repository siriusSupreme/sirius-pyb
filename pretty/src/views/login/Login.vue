<template >
  <article>Login</article>
</template >

<script >
export default {
  name: 'Login',
  beforeCreate () {
    console.log('login-beforeCreate')
  },
  created () {
    console.log('login-created')
  },
  beforeMount () {
    console.log('login-beforeMount')
  },
  mounted () {
    console.log('login-mounted')
  },
  activated () {
    console.log('login-activated')
  },
  deactivated () {
    console.log('login-deactivated')
  },
  beforeUpdate () {
    console.log('login-beforeUpdate')
  },
  updated () {
    console.log('login-updated')
  },
  beforeDestroy () {
    console.log('login-beforeDestroy')
  },
  destroyed () {
    console.log('login-destroyed')
  },
  beforeRouteEnter (to, from, next) {
    console.log('login-beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('login-beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('login-beforeRouteLeave')
    next()
  }
}
</script >

<style lang="stylus" scoped >
</style >
