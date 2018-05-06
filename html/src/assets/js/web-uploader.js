
import WebUploader from 'webuploader'

import 'webuploader/dist/webuploader.css'
// import '../stylus/web-uploader.styl'

import swf from 'webuploader/dist/Uploader.swf'

WebUploader.swf = swf

window.WebUploader = WebUploader
// console.log(WebUploader)

export default WebUploader
