import WebUploader from 'webuploader'
import swf from 'webuploader/dist/Uploader.swf'

import merge from 'lodash/merge.js'

import 'webuploader/dist/webuploader.css'
import './webuploader.styl'

class Upload {
  static webUploader = WebUploader
  static swf = swf

  constructor (options = {}) {
    this.webUploader = WebUploader
    this.swf = swf
    this.uploader = new WebUploader.Uploader(merge({
      swf
    }, options))
  }

  destroy () {
    this.uploader.destroy()
  }
}

export default Upload
