const UE = window.UE
// const UEDITOR_CONFIG = window.UEDITOR_CONFIG

class Editor {
  constructor (elementOrId, options) {
    let id = typeof elementOrId === 'string' ? elementOrId : elementOrId.id
    this.editor = UE.getEditor(id, options)
  }
  setContent (html, isAppendTo = false) {
    this.editor.setContent(html, isAppendTo)
  }
  getContent () {
    return this.getContent()
  }
  getAllHtml () {
    return this.getAllHtml()
  }
  getPlainTxt () {
    return this.getPlainTxt()
  }
  getContentTxt () {
    return this.getContentTxt()
  }
  destroy () {
    this.editor.destroy()
  }
}

export default Editor
