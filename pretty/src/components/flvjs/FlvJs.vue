<template>
  <video v-if="isVideo" class='gs-flvjs' ref="gsFlvjs" v-bind="$attrs">
    <slot></slot>
    <p class="fjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video!</p>
  </video>
  <audio v-else class='gs-flvjs' ref="gsFlvjs" v-bind="$attrs">
    <slot></slot>
    <p class="fjs-no-js">To view this audio please enable JavaScript, and consider upgrading to a web browser that supports HTML5 audio!</p>
  </audio>
</template>

<script>
import merge from 'lodash/merge'
import camelCase from 'lodash/camelCase'

import Flv from './Flv'

// 注册指令
import Vue from 'vue'
import VFlvJs from './FlvJs.js'

Vue.directive('FlvJs', VFlvJs)

export default {
  name: 'FlvJs',
  inheritAttrs: false,
  props: {
    options: {
      type: Object,
      default () {
        return {
          mediaDataSource: {},
          config: {}
        }
      }
    },
    isVideo: {
      type: Boolean,
      default: true
    },
    isBindToRoot: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.flvJs = null
  },
  mounted () {
    this.initializeFlvJs()
  },
  beforeDestroy () {
    this.flvJs && this.flvJs.destroy()
    this.flvJs = null
  },
  methods: {
    initializeFlvJs () {
      this.$emit('before-initialize')

      let config = Object.create(null)

      Object.entries(this.$attrs || {}).forEach(entity => {
        config[camelCase(entity[0])] = entity[1]
      })

      let options = merge({mediaDataSource: {}, config}, this.options)

      this.flvJs = new Flv(options.mediaDataSource, options.config)

      if (this.isBindToRoot) {
        this.flvJs.player.attachMediaElement(this.$refs.gsFlvjs)
      }

      this.$emit('initialized', this.flvJs)
    }
  }
}
</script>

<style lang="stylus" scoped>
.gs-flvjs {
}
</style>
