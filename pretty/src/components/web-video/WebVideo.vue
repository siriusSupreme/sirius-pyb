<template>
  <div class='gs-web-video' ref="gsWebVideo" :id="id"></div>
</template>

<script>
import merge from 'lodash/merge'
import camelCase from 'lodash/camelCase'

import WebVideoController from './WebVideoController.js'

// 注册指令
import Vue from 'vue'
import VWebVideo from './WebVideo.js'

Vue.directive('WebVideo', VWebVideo)

export default {
  name: 'WebVideo',
  inheritAttrs: false,
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '100%'
    },
    autoInitialize: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  created () {
    this.webVideo = null
    this.id = `gs-web-video-${Date.now()}`
  },
  mounted () {
    this.initialize()
  },
  beforeDestroy () {
    this.webVideo && this.webVideo.destroy()
    this.webVideo = null
  },
  methods: {
    initialize () {
      this.$emit('beforeInitialize')
      let options = Object.create(null)

      Object.entries(this.$attrs || {}).forEach(entity => {
        options[camelCase(entity[0])] = entity[1]
      })

      options = merge({szContainerID: this.id}, options, this.options)

      this.webVideo = new WebVideoController(this.width, this.height, options, this.autoInitialize)

      console.log(this.webVideo)
      this.$emit('initialized', this.webVideo)
    }
  }
}
</script>

<style lang="stylus" scoped>
.gs-web-video {
}
</style>
