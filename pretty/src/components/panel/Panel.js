import merge from 'lodash/merge'

import MultipleRow from './MultipleRow'

const PANEL = Symbol('panel')

export default {
  bind (el, binding, vnode) {
    let value = binding.value || {}

    if (typeof value === 'string') {
      value = vnode.context[value]() || {}
    }

    let options = merge({}, value)

    el.className += ' gs-panel-container'

    let headerElement = el.querySelector(options.header || '.gs-panel-header')
    let mainElement = el.querySelector(options.main || '.gs-panel-main')
    let footerElement = el.querySelector(options.footer || '.gs-panel-footer')

    let panel = new MultipleRow(el, headerElement, mainElement, footerElement)

    el[PANEL] = panel
  },
  inserted (el, binding, vnode) {},
  update (el, binding, vnode, oldVnode) {},
  componentUpdated (el, binding, vnode, oldVnode) {
    let panel = el[PANEL]

    panel.throttle()
  },
  unbind (el, binding, vnode) {
    let panel = el[PANEL]

    panel && (typeof panel.destroy === 'function') && panel.destroy()
  }
}
