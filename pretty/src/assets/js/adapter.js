/* eslint-disable */
;(function webpackUniversalModuleDefinition(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory(global)
  } else if (typeof define === 'function' && define.amd) {
    define([global], factory)
  } else if (typeof exports === 'object') exports['flexable'] = factory(global)
  else global['flexable'] = factory(global)
})(window || this, function(global) {
  'use strict'

  const baseFontSize = 100
  const designWidth = 1920

  let doc = global.document
  let docEl = doc.documentElement
  let metaEl = doc.querySelector('meta[name="viewport"]')
  let resizeEvent =
    'onorientationchange' in global ? 'onorientationchange' : 'resize'

  function recalculate() {
    let clientWidth = docEl.clientWidth
    let dpr = global.devicePixelRatio || 1
    let scale = 1 / dpr

    if (clientWidth) {
      if (!metaEl) {
        metaEl = doc.createElement('meta')
        metaEl.setAttribute('name', 'viewport')
        doc.head.appendChild(metaEl)
      }
      metaEl.setAttribute(
        'content',
        `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`
      )

      if (clientWidth >= designWidth) {
        docEl.style.fontSize = baseFontSize + 'px'
      } else {
        docEl.style.fontSize = baseFontSize * (clientWidth / designWidth) + 'px'
      }
    }
  }

  if (doc.addEventListener) {
    recalculate()
    global.addEventListener(resizeEvent, recalculate, false)
    doc.addEventListener('DOMContentLoaded', recalculate, false)
  }

  return recalculate
})
