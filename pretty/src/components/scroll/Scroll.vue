<template>
  <div class='gs-scroll-wrapper' ref="gsScrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import merge from 'lodash/merge'
import camelCase from 'lodash/camelCase'
import BScroll from 'better-scroll'
import {debounce} from 'throttle-debounce'
import {addResizeListener, removeResizeListener} from '@/utils/resize-event'

// 同时以指令形式注册
import Vue from 'vue'
import VScroll from './Scroll.js'

Vue.directive('Scroll', VScroll)

export default {
  name: 'Scroll',
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
    this.scroll = null
    this.debounce = debounce(100, this.refresh).bind(this)
    this._initScroll()
  },
  beforeUpdate () {
    this.$nextTick(() => {
      this.refresh()
    })
  },
  beforeDestroy () {
    this.scroll && this.scroll.destroy()
    this.scroll = null
  },
  methods: {
    _initScroll () {
      this.$nextTick(() => {
        this.$emit('before-initialize')
        let target = this.$refs.gsScrollWrapper

        if (!target) return

        let options = Object.create(null)
        let handler = e => {
          this.debounce()
        }

        Object.entries(this.$attrs).forEach(attr => {
          options[camelCase(attr[0])] = attr[1]
        })

        options = merge({}, options, this.options)

        this.scroll = new BScroll(target, options)
        this.$emit('initialized', this.scroll)

        addResizeListener(target, handler)

        this.$once('hook:beforeDestroy', () => {
          removeResizeListener(target, handler)
        })
      })
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    stop () {
      this.scroll && this.scroll.stop()
    },
    destroy () {
      this.scroll && this.scroll.destroy()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollBy () {
      this.scroll && this.scroll.scrollBy.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    scroll () {
      return this.scroll ? Promise.resolve(this.scroll) : Promise.reject(new Error('BScroll has not been initialized yet!'))
    }
  }
}
</script>

<style lang="stylus" scoped>
.gs-scroll-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
