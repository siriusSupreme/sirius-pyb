<template>
  <div class="gs-slider-wrapper" ref="gsSliderWrapper" @mouseenter.stop='mouseenterHandler' @mouseleave.stop='mouseleaveHandler'>
    <div class="gs-slider-group" ref="gsSliderGroup">
      <slot></slot>
    </div>
    <slot name="controls" v-bind='{dotCount, currentPageIndex}'>
      <div class="gs-slider-indicate">
        <span class="gs-slider-dot" :class="{active: currentPageIndex === index }" v-for="index in dotCount" :key="index"></span>
      </div>
    </slot>
  </div>
</template>

<script>
import merge from 'lodash/merge'
import camelCase from 'lodash/camelCase'
import BScroll from 'better-scroll'
import {throttle} from 'throttle-debounce'
import {addResizeListener, removeResizeListener} from '@/utils/resize-event'

export default {
  name: 'Slider',
  inheritAttrs: false,
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 2500
    },
    duration: {
      type: Number,
      default: 500
    },
    itemDimension: {
      type: [String, Boolean],
      default: true,
      validator (val) {
        return val === true || (typeof val === 'string' && val.endsWith('px'))
      }
    }
  },
  data () {
    return {
      dotCount: 0,
      currentPageIndex: 1
    }
  },
  created () {
    this.timer = 0
    this.step = 0
    this.slider = null
    this.throttle = throttle(100, () => {
      this._setDimension(true)
    }).bind(this)
  },
  mounted () {
    this._setDimension()
    this._initSlider()

    if (this.autoPlay) this._startPlay()
  },
  activated () {
    if (this.autoPlay) this._startPlay()
  },
  deactivated () {
    this._stopPlay()
  },
  updated () {
    this.slider && this.slider.refresh()
  },
  beforeDestroy () {
    this._stopPlay()
    this.slider && this.slider.destroy()
  },
  methods: {
    _initSlider () {
      this.$emit('before-initialize')
      let target = this.$refs.gsSliderWrapper

      if (!target) return

      let handler = e => {
        this.throttle()
      }

      let options = Object.create(null)

      Object.entries(this.$attrs).forEach(attr => {
        options[camelCase(attr[0])] = attr[1]
      })

      let step = this.isVertical ? 'stepY' : 'stepX'

      options = merge({snap: {loop: this.loop, [step]: this.step}, threshold: 0.1, speed: this.duration}, options, this.options)

      this.slider = new BScroll(target, options)
      this.$emit('initialized', this.slider)

      addResizeListener(target, handler)

      this.$once('hook:beforeDestroy', () => {
        removeResizeListener(target, handler)
      })

      this.slider.on('scrollEnd', () => {
        let {pageX, pageY} = this.slider.getCurrentPage()

        let pageIndex = this.isVertical ? pageY : pageX

        if (this.loop) pageIndex -= 1

        this.currentPageIndex = pageIndex + 1

        if (this.autoPlay) this._startPlay()
      })

      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) this._stopPlay()
      })
    },
    _setDimension (isResize = false) {
      // let gsSliderWrapperWidth = this.$refs.gsSliderWrapper.clientWidth

      let gsSliderGroup = this.$refs.gsSliderGroup
      let gsSliderGroupChildren = gsSliderGroup.children

      this.dotCount = gsSliderGroupChildren.length || 0

      if (this.isVertical) {
        if (this.itemDimension === true && gsSliderGroupChildren.length) {
          this.step = Number.parseFloat(gsSliderGroupChildren[0].offsetHeight)
        } else if (typeof this.itemDimension === 'string') {
          this.step = Number.parseFloat(this.itemDimension)
        }
      } else {
        if (this.itemDimension === true && gsSliderGroupChildren.length) {
          this.step = Number.parseFloat(gsSliderGroupChildren[0].offsetWidth)
        } else if (typeof this.itemDimension === 'string') {
          this.step = Number.parseFloat(this.itemDimension)
        }

        let width = 0

        for (let index = 0; index < this.dotCount; index++) {
          width += Number.parseFloat(gsSliderGroupChildren[index].offsetWidth)
        }
        if (this.loop && !isResize) {
          width += 2 * this.step
        }

        gsSliderGroup.style.width = width + 'px'
      }

      // 强制刷新一次，确保显示、滚动正常
      this.slider && this.slider.refresh()
    },
    _startPlay () {
      let pageX = 0
      let pageY = 0
      let pageIndex = this.currentPageIndex

      if (this.loop) pageIndex += 1

      this.isVertical ? pageY = pageIndex : pageX = pageIndex

      this.timer = window.setTimeout(() => {
        this.slider.goToPage(pageX, pageY, this.duration)
      }, this.interval)
    },
    _stopPlay () {
      this.timer && (this.timer = window.clearTimeout(this.timer))
    },
    mouseenterHandler () {
      if (this.autoPlay) this._stopPlay()
    },
    mouseleaveHandler () {
      if (this.autoPlay) this._startPlay()
    },
    slider () {
      return this.slider ? Promise.resolve(this.slider) : Promise.reject(new Error('BScroll has not been initialized yet!'))
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.gs-slider-wrapper {
  position: relative;
  min-height: 1px;
  overflow: hidden;

  .gs-slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .gs-slider-item {
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
    }
  }

  .gs-slider-indicate, .gs-slider-dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .gs-slider-dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: red;
      font-size: normal;

      &.active {
        width: 20px;
        border-radius: 5px;
        background-color: green;
      }
    }
  }
}
</style>
