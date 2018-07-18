import videoJs from 'video.js'

// import 'video.js/dist/video-js.min.css'
import 'video.js/src/css/vjs.scss'
import './videojs.styl'

videoJs.options.autoSetup = false

// http://docs.videojs.com/tutorial-options.html

class Video {
  constructor (elementOrId, options, readyCallback) {
    this.videoJs = videoJs
    // this.videoJs = new videoJs(elementOrId, options, readyCallback)
    this.player = videoJs(elementOrId, options, readyCallback)
  }
  dispose () {
    this.player.dispose()
  }
}

export default Video
