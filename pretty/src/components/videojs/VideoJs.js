import camelCase from 'lodash/camelCase'
import merge from 'lodash/merge'

import Video from './Video'

const VIDEO_JS = Symbol('video-js')
const READY_CALLBACK = Symbol('ready-callback')
const CLASS_NAME = ' gs-videojs video-js vjs-default-skin '

export default {
  bind (el, binding, vnode) {
    let readyCallback = camelCase(binding.arg ? binding.arg : '')
    let isCenter = (binding.modifiers || {}).center || false
    let className = isCenter ? CLASS_NAME + 'vjs-big-play-centered' : CLASS_NAME

    el[READY_CALLBACK] = readyCallback

    el.className += className

    if (readyCallback) {
      vnode.context[readyCallback](el, 'bind')
    }
  },
  inserted (el, binding, vnode) {
    let value = binding.value || {}

    if (typeof value === 'string') {
      value = vnode.context[value]() || {}
    }

    let options = merge({}, value)

    let videoJs = new Video(el, options, () => {
      el[VIDEO_JS] = videoJs
      let readyCallback = el[READY_CALLBACK]

      if (readyCallback) {
        vnode.context[readyCallback](videoJs, 'inserted')
      }
    })
  },
  update (el, binding, vnode, oldVnode) {
    let videoJs = el[VIDEO_JS]
    let readyCallback = el[READY_CALLBACK]

    if (readyCallback) {
      vnode.context[readyCallback](videoJs, 'update')
    }
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    let videoJs = el[VIDEO_JS]
    let readyCallback = el[READY_CALLBACK]

    if (readyCallback) {
      vnode.context[readyCallback](videoJs, 'componentUpdated')
    }
  },
  unbind (el, binding, vnode) {
    let videoJs = el[VIDEO_JS]
    let readyCallback = el[READY_CALLBACK]

    if (readyCallback) {
      vnode.context[readyCallback](videoJs, 'unbind')
    }

    videoJs && videoJs.dispose()
  }
}
