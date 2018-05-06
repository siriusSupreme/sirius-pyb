
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
      server: '',
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

  initializeEvents () {
    this.uploader.on('fileQueued', () => {

    })
  }
}

export default Upload
