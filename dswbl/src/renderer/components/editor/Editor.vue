<template>
  <div id="editor-wrapper">
    <div id="editor" ref="editor" @keyup.enter="editorEnterHandler" @keyup.delete="editorDeleteHandler" @click="editorClickHandler" @keyup="editorInputHandler($event)" :contenteditable="contenteditable"></div>
    <slot name="button" v-bind="{ data }"></slot>
  </div>
</template>

<script>
export default {
  props: {
    templateData: {
      type: Array,
      default: () => {
        return []
      }
    },
    isTemplateData: {
      type: Boolean,
      default: false
    },
    isReadOnly: {
      type: Boolean,
      default: false
    },
    ask: {
      type: String,
      default: 'W~'
    },
    answer: {
      type: String,
      default: 'D~'
    },
    contenteditable: {
      type: Boolean,
      default: true
    },
    askColor: {
      type: String,
      default: 'red'
    },
    answerColor: {
      type: String,
      default: 'green'
    }
  },
  data () {
    return {
      enterIndex: 0,
      timer: null,
      lastChild: null,
      data: []
    }
  },
  watch: {
    templateData: {
      deep: true,
      immediate: true,
      handler (cur, old) {
        this.$nextTick(() => {
          // document.execCommand('contentReadOnly', false, true)
          if (this.isTemplateData) {
            this.templateDataHandler(cur)
          } else {
            this.initEditor()
          }
        })
      }
    }
  },
  methods: {
    initEditor () {
      this.$refs.editor.style.color = this.askColor
      this.$refs.editor.innerHTML = `<p class="editor-item">${this.ask}</p>`
      this.$refs.editor.lastChild.focus()
      this.enterIndex++
    },
    initTeplateDataEditor (data) {
      this.$refs.editor.focus()
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      this.$refs.editor.style.color = this.askColor
      this.$refs.editor.innerHTML += `<p class="editor-item">${this.ask + data.question}</p>`
      data.answers.forEach((item, index) => {
        this.$refs.editor.innerHTML += `<p class="editor-item">${this.answer + item}</p>`
      })
      this.lastChild =  this.$refs.editor.lastChild
      this.enterIndex = this.searchData()
      range.setEnd(this.$refs.editor.lastChild, this.$refs.editor.lastChild.childNodes.length)
      range.collapse(false)
      this.$refs.editor.scrollTop = this.$refs.editor.scrollHeight
    },
    editorEnterHandler () {
      if (this.enterIndex % 2 === 0) {
        this.addChild(this.ask)
      } else {
        this.addChild(this.answer)
      }
      this.enterIndex++
    },
    editorDeleteHandler () {
      if (!this.children(this.$refs.editor).length) {
        let selection = window.getSelection()
        let range = selection.getRangeAt(0)
        this.enterIndex = 0
        this.$refs.editor.innerHTML = `<p class="editor-item">${this.ask}</p>`
        range.setEnd(this.$refs.editor.lastChild, this.$refs.editor.lastChild.childNodes.length)
        range.collapse(false)
        this.enterIndex++
      } else if (this.children(this.$refs.editor).length !== this.data.length) {
        this.timer && window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          let selection = window.getSelection()
          let range = selection.getRangeAt(0)
          if (range.startContainer.parentNode.tagName === 'P') {
            this.lastChild = range.startContainer.parentNode
          }
        }, 200)
      }
    },
    editorClickHandler () {
      if (!this.contenteditable) return false
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      this.lastChild = range.startContainer.parentNode
    },
    editorInputHandler (event) {
      if (event.keyCode === 13 || event.keyCode === 8) return
      let number = this.searchData()
      this.enterIndex = number
    },
    addChild (text) {
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      let editor = this.$refs.editor
      if (!this.lastChild || range.startContainer === editor.lastChild) {
        this.lastChild = editor.lastChild
        this.lastChild.innerText = text
      } else {
        this.lastChild = this.lastChild.nextSibling
        this.lastChild.innerText = this.answer
      }
      range.setEnd(this.lastChild, this.lastChild.childNodes.length)
      range.collapse(false)
      this.searchData()
    },
    searchData () {
      try {
        let Wreg = /^(W~)/
        let Dreg = /^(D~)/
        let arr = []
        let value = this.lastChild.childNodes[0].nodeValue || ''
        let W = value.match(Wreg)
        let D = value.match(Dreg)
        if (value.match(Wreg)) {
          this.lastChild.style.color = this.askColor
        } else if (value.match(Dreg)) {
          this.lastChild.style.color = this.answerColor
        } else {
          return false
        }
        for (let i = 0; i < editor.children.length; i++) {
          arr.push(editor.children[i].innerText)
        }
        this.data = arr
        return arr.length
      } catch (e) {
        console.log(e)
      }
    },
    templateDataHandler (templateData) {
      templateData.forEach((item, index) => {
        this.initTeplateDataEditor(item)
      })
    },
    children (parent) {
      if (parent.children) {
        return parent.children
      } else {
        let arr = []
        for (let i = 0; i < parent.childNodes.length; i++) {
          if (parent.childNodes[i].nodeType === 1) {
            arr.push(parent.childNodes[i])
          }
        }
        return arr
      }
    }
  }
}
</script>
