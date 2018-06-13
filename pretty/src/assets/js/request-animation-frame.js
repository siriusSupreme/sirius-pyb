/* eslint-disable */
;(function webpackUniversalModuleDefinition(global, factory) {
  factory(global)
})(window || this, function(global) {
  'use strict'

  let vendors = ['webkit', 'moz', 'ms', 'o']

  global.cancelAnimationFrame =
    global.cancelAnimationFrame || global.cancelRequestAnimationFrame

  for (let i = 0; !global.requestAnimationFrame && i < vendors.length; i++) {
    global.requestAnimationFrame = global[vendors[i] + 'RequestAnimationFrame']
    global.cancelAnimationFrame =
      global[vendors[i] + 'CancelAnimationFrame'] ||
      global[vendors[i] + 'CancelRequestAnimationFrame']
  }

  if (!global.requestAnimationFrame) {
    let lastTime = 0

    global.requestAnimationFrame = function(callback, refreshRate) {
      let currentTime = new Date().getTime()

      let deltaTime = Math.max(0, 16.67 - (currentTime - lastTime))

      lastTime = currentTime + deltaTime

      return setTimeout(function() {
        callback && callback(lastTime)
      }, deltaTime)
    }

    global.cancelAnimationFrame = function(id) {
      clearTimeout(id)
    }
  }
})
