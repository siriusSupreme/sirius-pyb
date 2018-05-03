<template>
  <nav class="dsw-pagination-wrapper"></nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalRecords: {
      type: Number,
      default: 0
    },
    recordsPerPage: {
      type: Number,
      default: 10
    },
    pageSizeOption: {
      type: Array,
      default () {
        return [10, 20, 30, 50, 'ALL']
      }
    },
    pagerCount: {
      type: Number,
      default: 5
    },
    layout: {
      type: Array,
      default () {
        return ['info', 'first', 'prev', 'pager', 'next', 'last', 'sizer', 'jumper']
      }
    }
  },
  data () {
    return {
      pageIndex: 1
    }
  },
  computed: {
    totalPage () {
      const totalPage = Math.ceil(this.totalRecords / this.recordsPerPage)

      return totalPage
    },
    pagers: {
      get () {
        const pagers = []
        const pagerCount = this.pagerCount
        const totalPage = this.totalPage
        const currentPage = this.currentPage

        const isShowJumpPrev = this.isShowJumpPrev
        const isShowJumpNext = this.isShowJumpNext

        const offset = Math.floor(this.pagerCount / 2)

        let start = 0
        let end = 0

        if (isShowJumpPrev && !isShowJumpNext) {
          start = this.totalPage - pagerCount
          end = this.totalPage
        } else if (!isShowJumpPrev && isShowJumpNext) {
          start = 2
          end = pagerCount + 2
        } else if (isShowJumpPrev && isShowJumpNext) {
          start = currentPage - offset
          end = currentPage + offset + 1
        } else {
          start = 2
          end = totalPage
        }

        while (start < end) {
          pagers.push(start)
          start++
        }

        return pagers
      }
    },
    isShowJumpPrev () {
      if ((this.totalPage > this.pagerCount + 2) && (this.currentPage > this.pagerCount)) {
        return true
      }
      return false
    },

    isShowJumpNext () {
      if ((this.totalPage > this.pagerCount + 2) && (this.currentPage <= this.totalPage - this.pagerCount)) {
        return true
      }
      return false
    }
  },
  watch: {
    currentPage: {
      deep: false,
      immediate: true,
      handler (val, oldVal) {
        // this.$emit('dsw-pager-change', val)
      }
    }
  },
  mounted () {

  },
  methods: {
    pageSizeChangeHandler (e, newPageSize) {
      if (this.currentPage * newPageSize > this.totalRecords) {
        this.currentPage = Math.ceil(this.totalRecords / newPageSize)
      }
      this.recordsPerPage = newPageSize
      this.jumpHandler(e, this.currentPage)
    },
    setCurrentPage (e, currentPage) {
      if (currentPage < 1) {
        this.currentPage = 1
      } else if (currentPage > this.totalPage) {
        this.currentPage = this.totalPage
      } else {
        this.currentPage = currentPage
      }
    },
    jumpHandler (e, pageIndex) {
      this.$emit('dsw-pager-change', pageIndex)
    }
  }
}
</script>

<style lang="stylus">
.dsw-pagination-wrapper{
  .dsw-pagination-first{

  }
  .dsw-pagination-prev{

  }
  .dsw-pagination-pagers{
    display : inline-block;
    vertical-align :middle;
    overflow : hidden;
    .dsw-pagination-pager{
      float : left;
      .dsw-pagination-pager-a{

      }
    }
  }
  .dsw-pagination-next{

  }
  .dsw-pagination-last{

  }
  .dsw-pagination-select-wrapper{
    .dsw-pagination-select{

    }
  }
  .dsw-pagination-jump-wrapper{
    .dsw-pagination-jump-input{

    }
  }
}
</style>

<style lang="stylus" scoped>

</style>
