import DPlayer from 'dplayer'

import 'dplayer/dist/DPlayer.min.css'
import './dplayer.styl'

// https://dplayer.js.org/#/zh-Hans/

class Player {
  constructor (options = {}) {
    this.dPlayer = DPlayer
    this.player = new DPlayer(options)
  }
  destroy () {
    this.player.destroy()
  }
}

export default Player
