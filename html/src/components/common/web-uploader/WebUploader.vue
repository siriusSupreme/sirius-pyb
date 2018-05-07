<template>

</template>

<script>
import WebUploader from 'assets/js/web-uploader'

export default {
  name: 'WebUploader',
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    accept: {
      type: Object,
      default () {
        return {
          title: '',
          extensions: '',
          mimeTypes: ''
        }
      }
    },
    thumb: {
      type: Object,
      default () {
        return {
          width: 110,
          height: 110,
          quality: 70,
          allowMagnify: true,
          crop: true,
          type: ''
        }
      }
    },
    auto: {
      type: Boolean,
      default: false
    },
    prepareNextFile: {
      type: Boolean,
      default: true
    },
    chunked: {
      type: Boolean,
      default: true
    },
    duplicate: {
      type: Boolean,
      default: true
    },
    method: {
      type: String,
      default: 'POST'
    }
  },
  data () {
    return {
      id: 'web-uploader-' + Date.now() + '-' + Math.random(),
      uploader: null
    }
  },
  mounted () {
    this.uploader = new WebUploader.Uploader({
      pick: {
        id: this.id,
        multiple: this.multiple
      }
    })
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>

</style>
