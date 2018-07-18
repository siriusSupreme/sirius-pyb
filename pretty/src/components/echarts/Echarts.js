import camelCase from 'lodash/camelCase'

import Echart from './Echart'

const ECHART = Symbol('echart')
const CALLBACK = Symbol('callback')

export default {
  bind (el, binding, vnode) {
    let callback = camelCase(binding.arg ? binding.arg : '')
    let value = binding.value || {}

    if (typeof value === 'string') {
      value = vnode.context[value]() || {}
    }

    el.className += ' gs-echarts-container'

    let echart = new Echart(el, value)

    el[ECHART] = echart
    el[CALLBACK] = callback

    if (callback) {
      vnode.context[callback](echart, 'bind')
    }
  },
  inserted (el, binding, vnode) {
    let echart = el[ECHART]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](echart, 'inserted')
    }
  },
  update (el, binding, vnode, oldVnode) {
    let echart = el[ECHART]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](echart, 'update')
    }
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    let echart = el[ECHART]
    let callback = el[CALLBACK]
    let value = binding.value || {}

    if (typeof value === 'string') {
      value = vnode.context[value]() || {}
    }

    echart.setOptions(value)

    if (callback) {
      vnode.context[callback](echart, 'componentUpdated')
    }
  },
  unbind (el, binding, vnode) {
    let echart = el[ECHART]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](echart, 'unbind')
    }

    echart && (typeof echart.dispose === 'function') && echart.dispose()
  }
}
