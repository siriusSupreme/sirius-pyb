<template>
  <article
    class='gs-content-wrapper'
    ref="gsContentWrapper"
  >
    <slot></slot>
  </article>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Content',
  created () {
    this.betterScroll = null
  },
  mounted () {
    this.initialize()
  },
  updated () {
    this.betterScroll && this.betterScroll.refresh()
  },
  beforeDestroy () {
    this.betterScroll && this.betterScroll.destroy()

    this.betterScroll = null
  },
  methods: {
    initialize () {
      this.betterScroll && this.betterScroll.destroy()

      this.betterScroll = new BScroll(this.$refs.gsContentWrapper, {
        bounce: false,
        preventDefault: false,
        autoBulr: false,
        scrollbar: {
          fade: true,
          interactive: true
        },
        mouseWheel: true
      })
    }
  }
}
</script>
