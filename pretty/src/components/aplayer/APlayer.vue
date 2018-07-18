<template>
  <div class='gs-aplayer-wrapper' ref='gsDplayerWrapper'></div>
</template>

<script>
import merge from 'lodash/merge'
import camelCase from 'lodash/camelCase'

import Player from './Player'

// 注册指令
import Vue from 'vue'
import VAPlayer from './APlayer.js'

Vue.directive('APlayer', VAPlayer)

export default {
  name: 'APlayer',
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
    this.aPlayer = null
  },
  mounted () {
    this.initializeFlvJs()
  },
  beforeDestroy () {
    this.aPlayer && this.aPlayer.destroy()
    this.aPlayer = null
  },
  methods: {
    initializeFlvJs () {
      this.$emit('before-initialize')

      let options = Object.create(null)

      Object.entries(this.$attrs || {}).forEach(entity => {
        options[camelCase(entity[0])] = entity[1]
      })

      options = merge({container: this.$refs.gsDplayerWrapper}, options, this.options)

      this.aPlayer = new Player(options)

      this.$emit('initialized', this.aPlayer)
    }
  }
}
</script>

<style lang="stylus" scoped>
.gs-aplayer-wrapper {
}
</style>
