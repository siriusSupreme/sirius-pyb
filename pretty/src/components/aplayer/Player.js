import APlayer from 'aplayer'

import 'aplayer/dist/APlayer.min.css'
import './aplayer.styl'

// https://aplayer.js.org/#/zh-Hans/

class Player {
  constructor (options = {}) {
    this.dPlayer = APlayer
    this.player = new APlayer(options)
  }
  destroy () {
    this.player.destroy()
  }
}

export default Player
