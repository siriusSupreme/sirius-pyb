import merge from 'lodash/merge'

import MultipleColumn from './MultipleColumn'

const COLUMN = Symbol('column')

export default {
  bind (el, binding, vnode) {
    let value = binding.value || {}

    if (typeof value === 'string') {
      value = vnode.context[value]() || {}
    }

    let options = merge({}, value)

    el.className += ' gs-column-container'

    let leftElement = el.querySelector(options.left || 'gs-column-left')
    let mainElement = el.querySelector(options.main || 'gs-column-main')
    let rightElement = el.querySelector(options.right || 'gs-column-right')

    let column = new MultipleColumn(el, leftElement, mainElement, rightElement)

    el[COLUMN] = column
  },
  inserted (el, binding, vnode) {},
  update (el, binding, vnode, oldVnode) {},
  componentUpdated (el, binding, vnode, oldVnode) {
    let column = el[COLUMN]

    column && column.throttle()
  },
  unbind (el, binding, vnode) {
    let column = el[COLUMN]

    column && (typeof column.destroy === 'function') && column.destroy()
  }
}
