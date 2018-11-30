<template>
  <article
    class='gs-table-wrapper'
    :class='{"not-ie": this.isNotIE}'
  >
    <el-table
      ref="gsTable"
      v-bind="$attrs"
      v-on='$listeners'
      :border='border'
      :max-height='height'
      @header-dragend='headerDragendHandler'
      highlight-current-row
    >
      <slot></slot>
    </el-table>
  </article>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Table',
  inheritAttrs: false,
  props: {
    border: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: [Number, String],
      default: 220
    }
  },
  data () {
    return {
      height: this.maxHeight
    }
  },
  created () {
    try {
      this.isNotIE = !(/Trident/gi.test(window.navigator.userAgent) || /MSIE/gi.test(window.navigator.userAgent))
    } catch (e) {
      this.isNotIE = true
    }

    this.initialize()
  },
  beforeUpdate () {
    this.refreshTable()
  },
  methods: {
    async getTable () {
      return this.$refs.gsTable
    },
    headerDragendHandler (newWidth, oldWidth, column, event) {
      this.refreshTable()
    },
    initialize () {
      this.$nextTick(() => {
        let target = this.$el
        let handler = e => {
          this.height = target.clientHeight
          this.refreshTable()
        }
        handler()

        this.$once('hook:beforeDestroy', () => {
          this.headScroll.destroy()
          this.bodyScroll.destroy()
        })

        this.initScroll()
      })
    },
    initScroll () {
      let headTarget = this.$el.querySelector('.el-table__header-wrapper')
      let bodyTarget = this.$el.querySelector('.el-table__body-wrapper')

      this.headScroll = new BScroll(headTarget, {
        scrollX: true,
        scrollY: false,
        bounce: false,
        probeType: 3,
        mouseWheel: true,
        preventDefault: false
      })

      this.bodyScroll = new BScroll(bodyTarget, {
        scrollX: true,
        scrollY: true,
        bounce: false,
        freeScroll: true,
        probeType: 3,
        // eventPassthrough: 'horizontal',
        mouseWheel: true,
        scrollbar: {
          interactive: true
        },
        preventDefault: false
      })

      this.scrollX = 0
      this.scrollY = 0

      this.headScroll.on('scroll', ({ x, y }) => {
        if (this.scrollX !== x) {
          this.scrollX = x
          this.bodyScroll.scrollTo(x, this.scrollY)
        }
      })

      this.bodyScroll.on('scroll', ({ x, y }) => {
        if (this.scrollX !== x) {
          this.scrollX = x
          this.scrollY = y
          this.headScroll.scrollTo(x, 0)
        }
      })
    },
    refreshTable () {
      if (this.headScroll) {
        this.$nextTick(() => {
          this.headScroll.refresh()
          this.bodyScroll.refresh()
          this.$refs.gsTable.doLayout()
        })
      }
    }
  }
}
</script>
