import camelCase from 'lodash/camelCase'
import merge from 'lodash/merge'

import Flv from './Flv'

const FLV_JS = Symbol('flv-js')
const CALLBACK = Symbol('callback')

export default {
  bind (el, binding, vnode) {
    let callback = camelCase(binding.arg ? binding.arg : '')
    let isBindToRoot = (binding.modifiers || {}).mount || false
    let value = binding.value || {}

    if (typeof value === 'string') {
      value = vnode.context[value]() || {}
    }

    let options = merge({
      mediaDataSource: {},
      config: {}
    }, value)

    el.className += ' gs-flvjs'

    let flvJs = new Flv(options.mediaDataSource, options.config)

    if (isBindToRoot) {
      flvJs.player.attachMediaElement(el)
    }

    el[FLV_JS] = flvJs
    el[CALLBACK] = callback

    if (callback) {
      vnode.context[callback](flvJs, 'bind')
    }
  },
  inserted (el, binding, vnode) {
    let flvJs = el[FLV_JS]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](flvJs, 'inserted')
    }
  },
  update (el, binding, vnode, oldVnode) {
    let flvJs = el[FLV_JS]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](flvJs, 'update')
    }
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    let flvJs = el[FLV_JS]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](flvJs, 'componentUpdated')
    }
  },
  unbind (el, binding, vnode) {
    let flvJs = el[FLV_JS]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](flvJs, 'unbind')
    }

    flvJs && flvJs.destroy()
  }
}
