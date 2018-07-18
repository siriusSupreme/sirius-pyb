<template>
  <script type="text/plain" ref="gsUEditor" class='gs-ueditor' :id='id' :name='name'>
    {{content}}
  </script>
</template>

<script>
import camelCase from 'lodash/camelCase'
import merge from 'lodash/merge'
// import uConfig from '@/assets/vendors/ueditor/ueditor.config.js'
// import Ueditor from '@/assets/vendors/ueditor/ueditor.all.min.js'
// import UeditorParse from '@/assets/vendors/ueditor/ueditor.parse.min.js'

const UE = window.UE
// const UEDITOR_CONFIG = window.UEDITOR_CONFIG

export default {
  name: 'Ueditor',
  inheritAttrs: false,
  model: {
    prop: 'content',
    event: 'content-change'
  },
  props: {
    ueditorPath: {
      type: String,
      default: '/static/vendors/ueditor/'
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    content: {
      type: String,
      default: ''
    },
    contentType: {
      type: String,
      default: 'getContent',
      validator (val) {
        return ['getContent', 'getAllHtml', 'getPlainTxt', 'getContentTxt'].includes(val)
      }
    },
    isAppendTo: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'ueditor'
    }
  },
  watch: {
    content (val, oldVal) {
      if (oldVal === '') this.setContent(val, this.isAppendTo)
      // this.ueditor && this.ueditor.setContent(val)
    }
  },
  created () {
    this.id = `gs-ueditor-${Date.now()}`
    this.ueditor = null
  },
  mounted () {
    this.initializeUeditor()
  },
  beforeDestroy () {
    this.ueditor && this.ueditor.destroy()
    this.ueditor = null
  },
  methods: {
    ueditor () {
      return this.ueditor ? Promise.resolve(this.ueditor) : Promise.reject(new Error('Ueditor has not been instantiated yet!'))
    },
    initializeUeditor () {
      this.$emit('before-initialize')
      let options = Object.create(null)

      Object.entries(this.$attrs).forEach(entity => {
        options[camelCase(entity[0])] = entity[1]
      })
      options.UEDITOR_HOME_URL = this.ueditorPath

      options = merge({}, options, this.options)

      this.ueditor = UE.getEditor(this.id, options)
      this.$emit('initialized', this.ueditor)

      this.ueditor.addListener('contentChange', eventType => {
        let content = ''

        try {
          content = this.ueditor[this.contentType]()
        } catch (e) {}

        if (content !== this.content) this.$emit('content-change', content)
      })
    },
    setContent (html, isAppendTo = false) {
      this.ueditor && this.ueditor.setContent(html, isAppendTo)
    }
  }
}
</script>

<style lang="stylus">
.gs-ueditor {
  .edui-default {
    .edui-box {
      line-height: normal;
    }
  }
}
</style>
