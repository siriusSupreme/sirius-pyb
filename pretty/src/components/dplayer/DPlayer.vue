<template>
  <div class='gs-dplayer-wrapper' ref='gsDplayerWrapper'></div>
</template>

<script>
import merge from 'lodash/merge'
import camelCase from 'lodash/camelCase'

import Player from './Player'

// 注册指令
import Vue from 'vue'
import VDPlayer from './DPlayer.js'

Vue.directive('DPlayer', VDPlayer)

export default {
  name: 'DPlayer',
  inheritAttrs: false,
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {
    this.dPlayer = null
  },
  mounted () {
    this.initializeFlvJs()
  },
  beforeDestroy () {
    this.dPlayer && this.dPlayer.destroy()
    this.dPlayer = null
  },
  methods: {
    initializeFlvJs () {
      this.$emit('before-initialize')

      let options = Object.create(null)

      Object.entries(this.$attrs || {}).forEach(entity => {
        options[camelCase(entity[0])] = entity[1]
      })

      options = merge({container: this.$refs.gsDplayerWrapper}, options, this.options)

      this.dPlayer = new Player(options)

      this.$emit('initialized', this.dPlayer)
    }
  }
}
</script>

<style lang="stylus" scoped>
.gs-dplayer-wrapper {
}
</style>
