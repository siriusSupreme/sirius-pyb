<template>
  <div class='gs-editor-standby-wrapper'>
    <div
      class='gs-editor-standby-toolbar'
      ref="gsEditorStandbyToolbar"
    ></div>

    <div
      class='gs-editor-standby-content'
      ref="gsEditorStandbyContent"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Weditor from 'wangeditor'

export default {
  name: 'EditorStandby',
  created () {
    this.editor = null
  },
  mounted () {
    this.initializeEditor()
  },
  methods: {
    initializeEditor () {
      let toolbar = this.$refs.gsEditorStandbyToolbar
      let content = this.$refs.gsEditorStandbyContent

      this.editor = new Weditor(toolbar, content)

      this.editor.create()
    }
  }
}
</script>
