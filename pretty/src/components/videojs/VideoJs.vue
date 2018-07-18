<template>
  <video v-if="isVideo" class='gs-videojs video-js vjs-default-skin' :class="{'vjs-big-play-centered': isCenter}" ref="gsVideojs">
    <slot></slot>
    <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video!</p>
  </video>
  <audio v-else class='gs-videojs video-js vjs-default-skin' :class="{'vjs-big-play-centered': isCenter}" ref="gsVideojs">
    <slot></slot>
    <p class="vjs-no-js">To view this audio please enable JavaScript, and consider upgrading to a web browser that supports HTML5 audio!</p>
  </audio>
</template>

<script>
import merge from 'lodash/merge'
import camelCase from 'lodash/camelCase'

import Video from './Video'

// 注册指令
import Vue from 'vue'
import VVideoJs from './VideoJs.js'

Vue.directive('VideoJs', VVideoJs)

export default {
  name: 'VideoJs',
  inheritAttrs: true,
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    isVideo: {
      type: Boolean,
      default: true
    },
    isCenter: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.videoJs = null
  },
  mounted () {
    this.initializeVideoJs()
  },
  beforeDestroy () {
    this.videoJs && this.videoJs.dispose()
    this.videoJs = null
  },
  methods: {
    initializeVideoJs () {
      this.$emit('before-initialize')

      let options = Object.create(null)

      Object.entries(this.$attrs || {}).forEach(entity => {
        if (entity[1] !== '') {
          options[camelCase(entity[0])] = entity[1]
        }
      })

      options = merge({}, options, this.options)

      this.videoJs = new Video(this.$refs.gsVideojs, options, () => {
        this.$emit('initialized', this.videoJs)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.gs-videojs {
}
</style>
