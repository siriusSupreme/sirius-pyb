<template>
  <div class="dsw-pagination-wrapper">
    <v-pagination :layout="layout" size="small" :total="totalRecords" :pageIndex="pageIndex" :showPagingCount="pagerCount" :pageSize="pageSize" :pageSizeOption="pageSizeOption" @page-change="pageChangeHandler" @page-size-change="pageSizeChangeHandler"></v-pagination>
  </div>
</template>

<script>
import Vue from 'vue'
import {VPagination} from 'vue-easytable'

import 'vue-easytable/libs/themes-base/index.css'

Vue.component(VPagination.name, VPagination)

export default {
  name: 'EasyTable',
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
        return [10, 20, 30, 50]
      }
    },
    pagerCount: {
      type: Number,
      default: 5
    },
    layout: {
      type: Array,
      default () {
        return ['total', 'prev', 'pager', 'next', 'sizer', 'jumper']
      }
    }
  },
  data () {
    return {
      pageIndex: this.currentPage,
      pageSize: this.recordsPerPage
    }
  },
  methods: {
    pageChangeHandler (pageIndex, recordsPerPage = this.pageSize) {
      this.pageIndex = pageIndex
      this.$emit('dswPagerChange', {pageIndex, recordsPerPage})
    },
    pageSizeChangeHandler (newPageSize) {
      if (this.pageIndex * newPageSize > this.totalRecords) {
        this.pageIndex = Math.ceil(this.totalRecords / newPageSize)
      }
      this.pageSize = newPageSize
      this.pageChangeHandler(this.pageIndex, newPageSize)
    }
  }
}
</script>

<style lang="stylus">
$fontColor = #108ee9
$borderColor = #18445a

.dsw-pagination-wrapper{
  text-align : right;
  .v-page-ul{
    .v-page-li{
      border: none;
      background : none;
      a{
        color : $fontColor
      }
    }
    .v-page-li-active{
      background-color: #293663;
    }
    .v-page-prev{
      i{
        color : $fontColor
      }
    }
    .v-page-next{
      i{
        color : $fontColor
      }
    }
    .v-page-pager{

    }
    .v-dropdown{
      a{
        color : $fontColor
      }
      .v-dropdown-dt{
        background-color : #16173e
        .v-dropdown-selected {
          color: #0092dd;
          border-color: #0092dd;
        }
      }
      .v-dropdown-dd{
        background-color : #16173e
        .v-dropdown-items{
          background-color: #16173e;
          border :none;
          .v-dropdown-items-li{
            &.active{
              background-color :#12205f;
            }
            &.active a{
              color : $fontColor;
            }
            &:hover{
              background-color: #16173e;
              a{
                color : #65d2af;
              }
            }
          }
        }
      }
    }
    .v-page-goto{
      .v-page-goto-input{
        border :1px solid #0092dd;
        background-color : #16173e;
      }
    }
  }
}
</style>

<style lang="stylus" scoped>

</style>
