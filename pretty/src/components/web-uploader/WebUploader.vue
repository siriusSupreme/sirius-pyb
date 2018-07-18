<template>
  <div class='gs-web-uploader' ref="gsWebUploader">
    <slot></slot>
  </div>
</template>

<script>
import camelCase from 'lodash/camelCase.js'
import merge from 'lodash/merge.js'

import Upload from './Upload'

// 同时以指令形式注册
import Vue from 'vue'
import VWebUploader from './WebUploader.js'

Vue.directive('WebUploader', VWebUploader)

export default {
  name: 'WebUploader',
  inheritAttrs: false,
  created () {
    this.uploader = null
    this.initializeUploader()
  },
  beforeDestroy () {
    this.uploader && this.uploader.destroy()
    this.uploader = null
  },
  methods: {
    uploader () {
      return this.uploader ? Promise.resolve(this.uploader) : Promise.reject(new Error('Upload has not been instantiated yet!'))
    },
    initializeUploader () {
      this.$nextTick(() => {
        this.$emit('before-initialize')

        let options = Object.create(null)

        Object.entries(this.$attrs).forEach(entity => {
          options[camelCase(entity[0])] = entity[1]
        })

        options = merge({}, {
          pick: {
            id: this.$refs.gsWebUploader
          }
        }, options)

        this.uploader = new Upload(options)

        this.$emit('initialized', this.uploader)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.gs-web-uploader {
}
</style>
