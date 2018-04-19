<template>
  <div class="dsw-better-scroll-wrapper" ref="dsw-better-scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'BetterScroll',
  data () {
    return {
      betterScroll: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.betterScroll = new BScroll(this.$refs['dsw-better-scroll-wrapper'], {})
    })
  }
}
</script>

<style lang="stylus">
  .dsw-better-scroll-wrapper{

  }
</style>

<style lang="stylus" scoped>

</style>
