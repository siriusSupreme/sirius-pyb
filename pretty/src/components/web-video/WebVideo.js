import camelCase from 'lodash/camelCase'
import merge from 'lodash/merge'

import WebVideoController from './WebVideoController'

const WEB_VIDEO = Symbol('web-video')
const CALLBACK = Symbol('callback')

export default {
  bind (el, binding, vnode) {
    let callback = camelCase(binding.arg ? binding.arg : '')
    let autoInitialize = (binding.modifiers || {}).auto || false
    let value = binding.value || {}

    if (typeof value === 'string') {
      value = vnode.context[value]() || {}
    }

    let options = merge({
      config: {
        szContainerID: el.id
      }
    }, value)

    el.className += ' gs-web-video'

    let webVideo = new WebVideoController(options.width, options.height, options.config, autoInitialize)

    el[WEB_VIDEO] = webVideo
    el[CALLBACK] = callback

    if (callback) {
      vnode.context[callback](webVideo, 'bind')
    }
  },
  inserted (el, binding, vnode) {
    let webVideo = el[WEB_VIDEO]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](webVideo, 'inserted')
    }
  },
  update (el, binding, vnode, oldVnode) {
    let webVideo = el[WEB_VIDEO]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](webVideo, 'update')
    }
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    let webVideo = el[WEB_VIDEO]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](webVideo, 'componentUpdated')
    }
  },
  unbind (el, binding, vnode) {
    let webVideo = el[WEB_VIDEO]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](webVideo, 'unbind')
    }

    webVideo && webVideo.destroy()
  }
}
