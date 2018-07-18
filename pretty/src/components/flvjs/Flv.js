import flvJs from 'flv.js'

import './flvjs.styl'

// https://github.com/Bilibili/flv.js/blob/master/docs/api.md

class Flv {
  constructor (mediaDataSource, config = {}) {
    this.flvJs = flvJs
    this.player = flvJs.createPlayer(mediaDataSource, config)
  }
  destroy () {
    this.player.destroy()
  }
}

export default Flv
