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

import './panel.styl'

class MultipleRow {
  constructor (element, headerElement, mainElement, footerElement) {
    this.element = element
    this.headerElement = headerElement
    this.mainElement = mainElement
    this.footerElement = footerElement
    this.handlers = []

    this.throttle = throttle(300, this.initialize).bind(this)
    // this.throttle = this.initialize.bind(this)
    this.initialize()
    this.monitorResize()
  }
  initialize () {
    let panelContainer = this.element

    if (!panelContainer) return

    let header = this.headerElement
    let main = this.mainElement
    let footer = this.footerElement

    let panelContainerHeight = panelContainer.clientHeight
    let panelPaddingHeight = parseFloat(getStyle(panelContainer, 'paddingTop')) + parseFloat(getStyle(panelContainer, 'paddingBottom'))
    let headerHeight = 0
    let headerMargin = 0
    // let mainHeight = 0
    let mainMargin = 0
    let footerHeight = 0
    let footerMargin = 0

    if (header) {
      header = header[0].elm
      addClass(header, 'gs-panel-header')
      headerHeight = header.offsetHeight
      headerMargin += parseFloat(getStyle(header, 'marginTop'))
      headerMargin += parseFloat(getStyle(header, 'marginBottom'))
    }

    if (main) {
      main = main[0].elm
      addClass(main, 'gs-panel-main')
      // mainHeight = main.offsetHeight
      mainMargin += parseFloat(getStyle(main, 'marginTop'))
      mainMargin += parseFloat(getStyle(main, 'marginBottom'))
    }

    if (footer) {
      footer = footer[0].elm
      addClass(footer, 'gs-panel-footer')
      footerHeight = footer.offsetHeight
      footerMargin += parseFloat(getStyle(footer, 'marginTop'))
      footerMargin += parseFloat(getStyle(footer, 'marginBottom'))
    }

    main && (main.style.height = (panelContainerHeight - panelPaddingHeight - headerHeight - headerMargin - mainMargin - footerHeight - footerMargin - 1) + 'px')
  }
  monitorResize () {
    let target = this.element

    if (!target) return

    let header = this.headerElement
    let main = this.mainElement
    let footer = this.footerElement

    let handler = null

    let createHandler = slot => e => {
      this.throttle()
      // this.$emit(`${slot}-resize`)
    }

    handler = createHandler('panel')
    addResizeListener(target, handler)
    this.handlers.push({
      target,
      handler
    })

    if (header) {
      target = header
      // target = header[0].elm
      handler = createHandler('header')
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

    if (footer) {
      target = footer
      // target = footer[0].elm
      handler = createHandler('footer')
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

export default MultipleRow
