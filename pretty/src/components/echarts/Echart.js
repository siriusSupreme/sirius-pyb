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

import {
  addResizeListener,
  removeResizeListener
} from '@/utils/resize-event'
import {
  throttle
} from 'throttle-debounce'

class Echart {
  constructor (element, options = {}) {
    this.echarts = echarts
    this.echartsInstance = echarts.init(element)

    this.setOptions(options)

    this.throttle = throttle(100, this.resize).bind(this)

    this.target = element
    this.handler = e => {
      this.throttle()
    }

    addResizeListener(this.target, this.handler)
  }
  setOptions (options) {
    this.echartsInstance.setOptions(options)
  }
  resize () {
    this.echartsInstance.resize()
  }
  dispose () {
    removeResizeListener(this.target, this.handler)
    this.echartsInstance.dispose()
  }
}

export default Echart
