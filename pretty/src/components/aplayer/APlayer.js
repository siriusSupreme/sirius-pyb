import camelCase from 'lodash/camelCase'
import merge from 'lodash/merge'

import Player from './Player'

const A_PLAYER = Symbol('a-player')
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

    el.className += ' gs-aplayer-wrapper'

    let aPlayer = new Player(options)

    el[A_PLAYER] = aPlayer
    el[CALLBACK] = callback

    if (callback) {
      vnode.context[callback](aPlayer, 'bind')
    }
  },
  inserted (el, binding, vnode) {
    let aPlayer = el[A_PLAYER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](aPlayer, 'inserted')
    }
  },
  update (el, binding, vnode, oldVnode) {
    let aPlayer = el[A_PLAYER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](aPlayer, 'update')
    }
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    let aPlayer = el[A_PLAYER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](aPlayer, 'componentUpdated')
    }
  },
  unbind (el, binding, vnode) {
    let aPlayer = el[A_PLAYER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](aPlayer, 'unbind')
    }

    aPlayer && aPlayer.destroy()
  }
}
