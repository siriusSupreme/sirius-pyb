<template>
  <section class="gs-column-container" ref='gsColumnContainer'>
    <slot name="left"></slot>
    <slot name="right"></slot>
    <slot name="main"></slot>
    <div class="gs-column-default-slot">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import {throttle} from 'throttle-debounce'
import {getStyle, addClass} from '@/utils/dom'
import {addResizeListener, removeResizeListener} from '@/utils/resize-event'

// 同时以指令形式注册
import Vue from 'vue'
import VColumn from './Column.js'

Vue.directive('Column', VColumn)

export default {
  name: 'Column',
  created () {
    this.throttle = throttle(100, this.calculate).bind(this)
    this.throttle = this.calculate.bind(this)
    this.calculate()
    this.monitorResize()
  },
  methods: {
    monitorResize () {
      this.$nextTick().then(() => {
        let target = this.$refs.gsColumnContainer

        if (!target) return

        let left = this.$slots.left
        let main = this.$slots.main
        let right = this.$slots.right

        let handler = null

        let createHandler = slot => e => {
          this.throttle()
          this.$emit(`${slot}-resize`)
        }

        handler = createHandler('column')
        addResizeListener(target, handler)
        this.$once('hook:beforeDestroy', () => {
          removeResizeListener(target, handler)
        })

        if (left) {
          target = left[0].elm
          handler = createHandler('left')
          addResizeListener(target, handler)
          this.$once('hook:beforeDestroy', () => {
            removeResizeListener(target, handler)
          })
        }

        if (main) {
          target = main[0].elm
          handler = createHandler('main')
          addResizeListener(target, handler)
          this.$once('hook:beforeDestroy', () => {
            removeResizeListener(target, handler)
          })
        }

        if (right) {
          target = right[0].elm
          handler = createHandler('right')
          addResizeListener(target, handler)
          this.$once('hook:beforeDestroy', () => {
            removeResizeListener(target, handler)
          })
        }
      })
    },
    calculate () {
      this.$nextTick(() => {
        let columnContainer = this.$refs.gsColumnContainer

        if (!columnContainer) return

        let left = this.$slots.left
        let main = this.$slots.main
        let right = this.$slots.right

        let columnContainerWidth = columnContainer.clientWidth
        let columnPaddingWidth = parseFloat(getStyle(columnContainer, 'paddingLeft')) + parseFloat(getStyle(columnContainer, 'paddingRight'))
        let leftWidth = 0
        let leftMargin = 0
        // let mainWidth = 0
        let mainMargin = 0
        let rightWidth = 0
        let rightMargin = 0

        if (left) {
          left = left[0].elm
          addClass(left, 'gs-column-left')
          leftWidth = left.offsetWidth
          leftMargin += parseFloat(getStyle(left, 'marginLeft'))
          leftMargin += parseFloat(getStyle(left, 'marginRight'))
          left.style.float = 'left'
        }

        if (main) {
          main = main[0].elm
          addClass(main, 'gs-column-main')
          // mainWidth = main.offsetWidth
          mainMargin += parseFloat(getStyle(main, 'marginLeft'))
          mainMargin += parseFloat(getStyle(main, 'marginRight'))
        }

        if (right) {
          right = right[0].elm
          addClass(right, 'gs-column-right')
          rightWidth = right.offsetWidth
          rightMargin += parseFloat(getStyle(right, 'marginLeft'))
          rightMargin += parseFloat(getStyle(right, 'marginRight'))
          right.style.float = 'right'
        }

        main && (main.style.width = (columnContainerWidth - columnPaddingWidth - leftWidth - leftMargin - mainMargin - rightWidth - rightMargin - 1) + 'px')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.gs-column-container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  & > *, .gs-column-left, .gs-column-main, .gs-column-right {
    width: auto;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  .gs-column-default-slot {
    position: relative;
    // display: none !important;
    width: 0 !important;
    height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden !important;
  }
}
</style>
