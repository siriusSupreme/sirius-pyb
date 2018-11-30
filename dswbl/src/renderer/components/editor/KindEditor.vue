<template>
  <article class="gs-kind-editor-wrapper">
    <textarea
      class="gs-kind-editor-textarea"
      ref="gsKindEditorTextarea"
    ></textarea>
  </article>
</template>

<script>
import 'kindeditor'
import 'kindeditor/themes/default/default.css'

import kindEditorConfig from './kind-editor-config.js'

let KindEditor = window.KindEditor

export default {
  name: 'KindEditor',
  created () {
    this.editor = null
  },
  mounted () {
    this.initializeEditor()
  },
  beforeDestroy () {
    this.destroyEditor()
  },
  methods: {
    initializeEditor () {
      this.destroyEditor()

      this.editor = KindEditor.create(this.$refs.gsKindEditorTextarea, kindEditorConfig)

      window.editor = this.editor
    },
    destroyEditor () {
      this.editor && this.editor.remove()
    }
  }
}
</script>
