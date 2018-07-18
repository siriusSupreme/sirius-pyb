import camelCase from 'lodash/camelCase'

import Editor from './Editor'

const EDITOR = Symbol('editor')
const READY_CALLBACK = Symbol('ready-callback')

export default {
  bind (el, binding, vnode) {
    let readyCallback = camelCase(binding.arg ? binding.arg : '')

    el[READY_CALLBACK] = readyCallback

    el.className += ' gs-ueditor'

    if (readyCallback) {
      vnode.context[readyCallback](el, 'bind')
    }
  },
  inserted (el, binding, vnode) {
    let value = binding.value || {}

    if (typeof value === 'string') {
      value = vnode.context[value]() || {}
    }

    let editor = new Editor(el, value)

    editor.ueditor.addListener('ready', e => {
      let readyCallback = el[READY_CALLBACK]
      el[EDITOR] = editor

      // editor.setContent(el.innerHTML)

      if (readyCallback) {
        vnode.context[readyCallback](editor, 'inserted')
        editor.ueditor.addListener('contentChange', eventType => {
          vnode.context[readyCallback](editor, 'content-change')
        })
      }
    })
  },
  update (el, binding, vnode, oldVnode) {
    let editor = el[EDITOR]
    let readyCallback = el[READY_CALLBACK]

    if (readyCallback) {
      vnode.context[readyCallback](editor, 'update')
    }
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    let editor = el[EDITOR]
    let readyCallback = el[READY_CALLBACK]

    if (readyCallback) {
      vnode.context[readyCallback](editor, 'componentUpdated')
    }
  },
  unbind (el, binding, vnode) {
    let editor = el[EDITOR]
    let readyCallback = el[READY_CALLBACK]

    if (readyCallback) {
      vnode.context[readyCallback](editor, 'unbind')
    }

    editor && editor.destroy()
  }
}
