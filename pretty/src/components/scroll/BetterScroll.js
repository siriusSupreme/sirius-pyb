import BScroll from 'better-scroll'

import './bscroll.styl'

import {
  debounce
} from 'throttle-debounce'
import {
  addResizeListener,
  removeResizeListener
} from '@/utils/resize-event'

class BetterScroll {
  constructor (element, options) {
    this.BScroll = BScroll
    this.scroll = new BScroll(element, options)

    this.debounce = debounce(100, this.refresh).bind(this)

    this.target = element
    this.handler = e => {
      this.debounce()
    }

    addResizeListener(this.target, this.handler)
  }
  refresh () {
    this.scroll.refresh()
  }
  destroy () {
    removeResizeListener(this.target, this.handler)
    this.scroll.destroy()
  }
}

export default BetterScroll
