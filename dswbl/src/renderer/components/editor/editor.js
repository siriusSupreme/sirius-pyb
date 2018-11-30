import Vue from 'vue'
import Weditor from 'wangeditor'

class Editor {
  constructor (DOMONE, DOMTWO = '') {
    this.domone = DOMONE
    this.domtwo = DOMTWO
    this.editor = new Weditor(DOMONE, DOMTWO)
  }

  create () {
    this.editor.create()
  }

  setHtml () {
    this.editor
  }

  undisable () {
    this.editor.$textElem.attr('contenteditable', true)
  }

  disable () {
    this.editor.$textElem.attr('contenteditable', false)
  }
}
