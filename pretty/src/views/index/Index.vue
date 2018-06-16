<template>
  <article>
    <ul>
      <li>
        <router-link :class="{active: currentIndex === 0}" @click.native='currentIndex = 0' to='/cabinet'>cabinet</router-link>
      </li>
      <li>
        <router-link :class="{active: currentIndex === 1}" @click.native='currentIndex = 1' to='/dossier'>dossier</router-link>
      </li>
      <li>
        <router-link :class="{active: currentIndex === 2}" @click.native='currentIndex = 2' to='/login'>login</router-link>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      currentIndex: -1
    }
  },
  beforeCreate () {
    console.log('index-beforeCreate')
  },
  created () {
    console.log('index-created')
  },
  beforeMount () {
    console.log('index-beforeMount')
  },
  mounted () {
    console.log('index-mounted')
  },
  activated () {
    console.log('index-activated')
  },
  deactivated () {
    console.log('index-deactivated')
  },
  beforeUpdate () {
    console.log('index-beforeUpdate')
  },
  updated () {
    console.log('index-updated')
  },
  beforeDestroy () {
    console.log('index-beforeDestroy')
  },
  destroyed () {
    console.log('index-destroyed')
  },
  beforeRouteEnter (to, from, next) {
    console.log('index-beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('index-beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('index-beforeRouteLeave')
    next()
  }
}
</script>

<style lang="stylus" scoped>
.active {
  color: red;
}
</style>
