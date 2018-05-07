
import WebUploader from 'webuploader'
import swf from 'webuploader/dist/Uploader.swf'

import 'webuploader/dist/webuploader.css'
import './web-uploader.styl'

class Upload {
  constructor (el, options, vnode) {
    this.uploader = Upload.initialize(el, options)
    this.initializeEvents(vnode)
  }

  static initialize (el, options) {
    return new WebUploader.Uploader({
      auto: true,
      swf,
      server: options.server,
      pick: {
        id: el,
        multiple: true
      },
      accept: {
        title: '',
        extensions: '',
        mimeTypes: 'image/*'
      },
      prepareNextFile: true,
      chunked: true,
      duplicate: true,
      method: 'POST'
    })
  }

  initializeEvents (vnode) {
    const uploader = this.uploader

    uploader.on('fileQueued', (file) => {

    })

    uploader.on('uploadSuccess', (file, response) => {
      const _file = {
        id: response.data.id,
        fileName: response.data.fileName
      }

      vnode.context.attachmentLists.push(_file)
    })
  }
}

export default Upload
