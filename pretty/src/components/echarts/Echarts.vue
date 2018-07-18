<template>
  <article class='gs-echarts-container' ref="gsEcharts"></article>
</template>

<script>
import {addResizeListener, removeResizeListener} from '@/utils/resize-event'
import {throttle} from 'throttle-debounce'

// import echarts from 'echarts'
import * as echarts from 'echarts/src/echarts'
// import {init} from 'echarts/src/echarts'

import 'echarts/src/chart/pie'
import 'echarts/src/chart/bar'
import 'echarts/src/chart/line'

import 'echarts/src/component/title'
import 'echarts/src/component/tooltip'
import 'echarts/src/component/legend'
import 'echarts/src/component/dataZoom'

import 'echarts-gl'

// 同时以指令形式注册
import Vue from 'vue'
import VEcharts from './Echarts.js'

Vue.directive('Echarts', VEcharts)

export default{
  name: 'Echarts',
  props: {
    theme: {
      type: [String, Object],
      default: ''
    },
    domOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  created () {
    this.echarts = echarts
    this.echartsInstance = null
    this.throttle = throttle(100, this.resize).bind(this)
  },
  mounted () {
    this.initializeEcharts()
  },
  beforeDestroy () {
    this.echartsInstance && this.echartsInstance.dispose()
    this.echarts = null
    this.echartsInstance = null
  },
  methods: {
    async echarts () {
      return this.echarts
    },
    echartsInstance () {
      return this.echartsInstance ? Promise.resolve(this.echartsInstance) : Promise.reject(new Error('Echarts has not been instantiated yet!'))
    },
    initializeEcharts () {
      this.$emit('before-initialize')
      let target = this.$refs.gsEcharts

      let handler = e => {
        this.throttle()
      }

      this.echartsInstance = echarts.init(target, this.theme, this.domOptions)
      this.setOptions(this.options)
      this.$emit('initialized', this.echartsInstance)

      addResizeListener(target, handler)
      this.$once('hook:beforeDestroy', () => {
        removeResizeListener(target, handler)
      })
    },
    setOptions (options) {
      this.echartsInstance && this.echartsInstance.setOptions(options)
    },
    resize () {
      this.echartsInstance && this.echartsInstance.resize()
    }
  }
}
</script>

<style lang="stylus" scoped>
.gs-echarts-container {
}
</style>
