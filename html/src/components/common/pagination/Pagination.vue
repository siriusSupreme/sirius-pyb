<template>
  <nav class="dsw-pagination-wrapper">
    <a href="javascript:void(0);" class="dsw-pagination-first" @click="setCurrentPage($event,1)">首页</a >
    <a href="javascript:void(0);" class="dsw-pagination-prev" @click="setCurrentPage($event,currentPage-1)">上一页</a >
    <ul class="dsw-pagination-pagers">
      <li class="dsw-pagination-pager" @click="setCurrentPage($event,1)">
        <a class="dsw-pagination-pager-a" href="javascript:void(0);" >1</a >
      </li>
      <li class="dsw-pagination-pager active" v-show="isShowJumpPrev" @click="setCurrentPage($event,currentPage-5)">
        <a class="dsw-pagination-pager-a" href="javascript:void(0);" >...</a >
      </li>
      <li class="dsw-pagination-pager" v-for="pager in pagers" :key="pager" @click="setCurrentPage($event,pager)">
        <a class="dsw-pagination-pager-a" href="javascript:void(0);" >{{pager}}</a >
      </li>
      <li class="dsw-pagination-pager" v-show="isShowJumpNext" @click="setCurrentPage($event,currentPage+5)">
        <a class="dsw-pagination-pager-a" href="javascript:void(0);" >...</a >
      </li>
      <li class="dsw-pagination-pager" @click="setCurrentPage($event,totalPage)" v-if="totalPage > 0">
        <a class="dsw-pagination-pager-a" href="javascript:void(0);" >{{totalPage}}</a >
      </li>
    </ul>
    <a href="javascript:void(0);" class="dsw-pagination-next" @click="setCurrentPage($event,currentPage+1)">下一页</a >
    <a href="javascript:void(0);" class="dsw-pagination-last" @click="setCurrentPage($event,totalPage)">最后一页</a >
    <span class="dsw-pagination-select-wrapper">
      每页显示
      <select class="dsw-pagination-select" @change="pageSizeChangeHandler">
        <option :value="option" v-for="(option,index) in pageSizeOption" :key="index">{{option}}</option >
      </select >
      条
    </span>
    <span class="dsw-pagination-jump-wrapper">
      跳转到第 <input type="text" class="dsw-pagination-jump-input" @keyup.enter="jumpHandler"/> 页 <button type="button" @click="jumpHandler">跳转</button>
    </span>
  </nav>
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
        return ['first', 'prev', 'pager', 'next', 'last', 'sizer', 'jumper']
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
        this.$emit('dswPagerChange', val)
      }
    }
  },
  methods: {
    pageSizeChangeHandler (e) {
      this.$emit('dswPageSizeChange')
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
    jumpHandler (e) {

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
