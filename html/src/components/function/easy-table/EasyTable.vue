<template>
  <div class="dsw-table-container">
    <div class="dsw-easy-table-wrapper">
      <v-table
        style="width: 100%;"
        :is-horizontal-resize="true"
        :vertical-resize-offset="60"
        :table-data="tableData"
        :columns="columns"
        :show-horizontal-border="true"
        :show-vertical-border="true"
        :table-bg-color="'#16173e'"
      ></v-table>
    </div>
    <div v-if="isShowPagination" class="dsw-pagination-wrapper">
      <v-pagination :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']" size="small" :total="paginateInfo.total" :pageIndex="paginateInfo.currentPage" :showPagingCount="5" :pageSize="10" :pageSizeOption="[10,20,30,50,100]" @page-change="pageChangeHandler" @page-size-change="pageSizeChangeHandler"></v-pagination>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {VTable, VPagination} from 'vue-easytable'

import 'vue-easytable/libs/themes-base/index.css'

Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

export default {
  name: 'EasyTable',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    paginateInfo: {
      type: Object
    },
    isShowSearch: {
      type: Boolean,
      default: true
    },
    isShowPagination: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    pageChangeHandler (pageIndex) {

    },
    pageSizeChangeHandler (newPageSize) {

    }
  }
}
</script>

<style lang="stylus">
$fontColor = #108ee9
$borderColor = #18445a

.dsw-table-container{
  color : $fontColor;
  .dsw-easy-table-wrapper{
    .v-table-views{
      border : 1px solid $borderColor;
    }
    .v-table-title-class{
      background : url("./images/title-bg.png") no-repeat scroll 0 0/100% 100%;
      background-color : transparent !important;
    }
    .v-table-title-cell,
    .v-table-body-cell{
      border-color : $borderColor;
      .v-checkbox-inner {
        border: 1px solid #3264a0;
        background-color: #23277b;
      }
    }
  }
  // 分页样式
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
}
</style>

<style lang="stylus" scoped>

</style>
