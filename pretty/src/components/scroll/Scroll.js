import camelCase from 'lodash/camelCase'
import merge from 'lodash/merge'

import BetterScroll from './BetterScroll'

const SCROLL = Symbol('scroll')
const CALLBACK = Symbol('callback')

export default {
  bind (el, binding, vnode) {
    let callback = camelCase(binding.arg ? binding.arg : '')
    let modifiers = Object.create(null)
    let value = binding.value || {}

    if (typeof value === 'string') {
      value = vnode.context[value]() || {}
    }

    Object.entries(binding.modifiers || {}).forEach(entity => {
      modifiers[camelCase(entity[0])] = entity[1]
    })

    let options = merge({}, modifiers, value)

    let scroll = new BetterScroll(el, options)

    el[SCROLL] = scroll
    el[CALLBACK] = callback

    el.className += ' gs-scroll-wrapper'

    if (callback) {
      vnode.context[callback](scroll, 'bind')
    }
  },
  inserted (el, binding, vnode) {
    let scroll = el[SCROLL]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](scroll, 'inserted')
    }
  },
  update (el, binding, vnode, oldVnode) {
    let scroll = el[SCROLL]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](scroll, 'update')
    }
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    let scroll = el[SCROLL]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](scroll, 'componentUpdated')
    }

    scroll && scroll.refresh()
  },
  unbind (el, binding, vnode) {
    let scroll = el[SCROLL]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](scroll, 'unbind')
    }

    scroll && (typeof scroll.destroy === 'function') && scroll.destroy()
  }
}
