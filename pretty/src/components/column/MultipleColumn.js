import {
  throttle
} from 'throttle-debounce'
import {
  getStyle,
  addClass
} from '@/utils/dom'
import {
  addResizeListener,
  removeResizeListener
} from '@/utils/resize-event'

import './column.styl'

class MultipleColumn {
  constructor (element, leftElement, mainElement, rightElement) {
    this.element = element
    this.leftElement = leftElement
    this.mainElement = mainElement
    this.rightElement = rightElement
    this.handlers = []

    this.throttle = throttle(100, this.initialize).bind(this)
    this.throttle = this.initialize.bind(this)
    this.initialize()
    this.monitorResize()
  }
  initialize () {
    let columnContainer = this.element

    if (!columnContainer) return

    addClass(columnContainer, 'gs-column-container')

    let left = this.leftElement
    let main = this.mainElement
    let right = this.rightElement

    let columnContainerWidth = columnContainer.clientWidth
    let columnPaddingWidth = parseFloat(getStyle(columnContainer, 'paddingLeft')) + parseFloat(getStyle(columnContainer, 'paddingRight'))
    let leftWidth = 0
    let leftMargin = 0
    // let mainWidth = 0
    let mainMargin = 0
    let rightWidth = 0
    let rightMargin = 0

    if (left) {
      // left = left[0].elm
      addClass(left, 'gs-column-left')
      leftWidth = left.offsetWidth
      leftMargin += parseFloat(getStyle(left, 'marginLeft'))
      leftMargin += parseFloat(getStyle(left, 'marginRight'))
      left.style.float = 'left'
    }

    if (main) {
      // main = main[0].elm
      addClass(main, 'gs-column-main')
      // mainWidth = main.offsetWidth
      mainMargin += parseFloat(getStyle(main, 'marginLeft'))
      mainMargin += parseFloat(getStyle(main, 'marginRight'))
    }

    if (right) {
      // right = right[0].elm
      addClass(right, 'gs-column-right')
      rightWidth = right.offsetWidth
      rightMargin += parseFloat(getStyle(right, 'marginLeft'))
      rightMargin += parseFloat(getStyle(right, 'marginRight'))
      right.style.float = 'right'
    }

    main && (main.style.width = (columnContainerWidth - columnPaddingWidth - leftWidth - leftMargin - mainMargin - rightWidth - rightMargin - 1) + 'px')
  }
  monitorResize () {
    let target = this.element

    if (!target) return

    let left = this.leftElement
    let main = this.mainElement
    let right = this.rightElement

    let handler = null

    let createHandler = slot => e => {
      this.throttle()
      // this.$emit(`${slot}-resize`)
    }

    handler = createHandler('column')
    addResizeListener(target, handler)
    this.handlers.push({
      target,
      handler
    })

    if (left) {
      target = left
      // target = left[0].elm
      handler = createHandler('left')
      addResizeListener(target, handler)
      this.handlers.push({
        target,
        handler
      })
    }

    if (main) {
      target = main
      // target = main[0].elm
      handler = createHandler('main')
      addResizeListener(target, handler)
      this.handlers.push({
        target,
        handler
      })
    }

    if (right) {
      target = right
      // target = right[0].elm
      handler = createHandler('right')
      addResizeListener(target, handler)
      this.handlers.push({
        target,
        handler
      })
    }
  }
  destroy () {
    this.handlers.forEach(({
      target,
      handler
    }) => {
      removeResizeListener(target, handler)
    })
  }
}

export default MultipleColumn
