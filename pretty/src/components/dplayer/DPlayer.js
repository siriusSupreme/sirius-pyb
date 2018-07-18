import camelCase from 'lodash/camelCase'
import merge from 'lodash/merge'

import Player from './Player'

const D_PLAYER = Symbol('d-player')
const CALLBACK = Symbol('callback')

export default {
  bind (el, binding, vnode) {
    let callback = camelCase(binding.arg ? binding.arg : '')
    let value = binding.value || {}

    if (typeof value === 'string') {
      value = vnode.context[value]() || {}
    }

    let options = merge({
      container: el
    }, value)

    el.className += ' gs-dplayer-wrapper'

    let dPlayer = new Player(options)

    el[D_PLAYER] = dPlayer
    el[CALLBACK] = callback

    if (callback) {
      vnode.context[callback](dPlayer, 'bind')
    }
  },
  inserted (el, binding, vnode) {
    let dPlayer = el[D_PLAYER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](dPlayer, 'inserted')
    }
  },
  update (el, binding, vnode, oldVnode) {
    let dPlayer = el[D_PLAYER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](dPlayer, 'update')
    }
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    let dPlayer = el[D_PLAYER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](dPlayer, 'componentUpdated')
    }
  },
  unbind (el, binding, vnode) {
    let dPlayer = el[D_PLAYER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](dPlayer, 'unbind')
    }

    dPlayer && dPlayer.destroy()
  }
}
