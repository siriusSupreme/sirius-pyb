import camelCase from 'lodash/camelCase'
import merge from 'lodash/merge'

import Upload from './Upload'

const UPLOADER = Symbol('uploader')
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

    let defaultOptions = {
      disableGlobalDnd: modifiers.disableGlobalDnd || false,
      pick: {
        id: el,
        multiple: modifiers.multiple || false
      },
      thumb: {
        allowMagnify: modifiers.thumbAllowMagnify || false,
        crop: modifiers.thumbCrop || false,
        preserveHeaders: modifiers.thumbPreserveHeaders || true
      },
      compress: {
        allowMagnify: modifiers.compressAllowMagnify || false,
        crop: modifiers.compressCrop || false,
        preserveHeaders: modifiers.preserveHeaders || true,
        noCompressIfLarger: modifiers.noCompressIfLarger || false
      },
      resize: modifiers.resize || false,
      auto: modifiers.auto || false,
      prepareNextFile: modifiers.prepareNextFile || false,
      chunked: modifiers.chunked || false,
      sendAsBinary: modifiers.sendAsBinary || false,
      duplicate: modifiers.duplicate || false
    }

    let options = merge({}, defaultOptions, value)

    let uploader = new Upload(options)

    el[UPLOADER] = uploader
    el[CALLBACK] = callback

    el.className += ' gs-web-uploader'

    if (callback) {
      vnode.context[callback](uploader, 'bind')
    }
  },
  inserted (el, binding, vnode) {
    let uploader = el[UPLOADER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](uploader, 'inserted')
    }
  },
  update (el, binding, vnode, oldVnode) {
    let uploader = el[UPLOADER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](uploader, 'update')
    }
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    let uploader = el[UPLOADER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](uploader, 'componentUpdated')
    }
  },
  unbind (el, binding, vnode) {
    let uploader = el[UPLOADER]
    let callback = el[CALLBACK]

    if (callback) {
      vnode.context[callback](uploader, 'unbind')
    }

    uploader && (typeof uploader.destroy === 'function') && uploader.destroy()
  }
}
