
import WebUploader from 'webuploader'
import swf from 'webuploader/dist/Uploader.swf'

import 'webuploader/dist/webuploader.css'
import './web-uploader.styl'

class Upload {
  constructor (el, options, vnode) {
    this.uploader = Upload.initialize(el, options)
    this.initializeEvents(vnode.context)
  }

  static initialize (el, options) {
    return new WebUploader.Uploader({
      auto: true,
      swf,
      server: options.value.server,
      pick: {
        id: el,
        multiple: true
      },
      accept: {
        title: '',
        extensions: '',
        mimeTypes: ''
      },
      prepareNextFile: true,
      chunked: true,
      duplicate: true,
      method: 'POST'
    })
  }

  initializeEvents (context) {
    const uploader = this.uploader

    uploader.on('fileQueued', (file) => {

    })

    uploader.on('uploadSuccess', (file, response) => {
      const _file = {
        id: response.data.id,
        fileName: response.data.fileName
      }

      context.addedLists.push(_file)
      context.attachmentLists.push(_file)
    })
  }
}

export default Upload
