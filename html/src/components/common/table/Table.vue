<template>
  <v-table
    style="width: 100%;"
    class="dsw-easy-table-wrapper"
    ref="dsw-easy-table-wrapper"
    :height="height"
    :is-horizontal-resize="true"
    :column-width-drag="columnWidthDrag"
    :is-loading="isLoadingForTable"
    :table-data="tableData"
    :columns="columns"
    :paging-index="pagingIndex"
    :show-horizontal-border="isShowHorizontalBorder"
    :show-vertical-border="isShowVerticalBorder"
    :table-bg-color="tableBgColor"
    v-bind="$attrs"
    @on-custom-comp="customComponentHandler"
    :filter-method="filterMethodHandler"
  ></v-table>
</template>

<script>
import Vue from 'vue'
import {VTable} from 'vue-easytable'
import BScroll from 'better-scroll'

import 'vue-easytable/libs/themes-base/index.css'

Vue.component(VTable.name, VTable)

export default {
  name: 'Table',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    pagingIndex: {
      type: Number,
      default: 0
    },
    columnWidthDrag: {
      type: Boolean,
      default: false
    },
    isLoadingForTable: {
      type: Boolean,
      default: false
    },
    isShowHorizontalBorder: {
      type: Boolean,
      default: true
    },
    isShowVerticalBorder: {
      type: Boolean,
      default: true
    },
    tableBgColor: {
      type: String,
      default: '#16173e'
    }
  },
  data () {
    return {
      height: 220,
      betterScroll: null
    }
  },
  created () {
    this.$nextTick(() => {
      this.height = this.$refs['dsw-easy-table-wrapper'].$el.parentNode.clientHeight
    })
  },
  mounted () {
    this.betterScroll = new BScroll(this.$refs['dsw-easy-table-wrapper'].$el.querySelector('.v-table-body-class'), {
      scrollX: false,
      scrollY: true,
      mouseWheel: true,
      scrollbar: true
    })
  },
  updated () {
    this.$refs['dsw-easy-table-wrapper'].resize()
    this.betterScroll.refresh()
  },
  methods: {
    customComponentHandler (payload) {
      this.$emit('dswCustomComponent', payload)
    },
    filterMethodHandler (filters) {
      this.$emit('dswFilterMethod', filters)
    }
  }
}
</script>

<style lang="stylus">
$fontColor = #23c7ed
$borderColor = #18445a

.dsw-easy-table-wrapper{
  width : 100%;
  height : 100%;
  color : $fontColor;
  font-size : 0.18rem;
  border : 1px solid $borderColor;
  &.v-table-class{
    .v-table-title-class{
      background : url("./images/title-bg.png") no-repeat scroll 0 0/100% 100%;
      background-color : transparent !important;
      .v-table-header-inner{
        width :auto;
        float : none;
        .v-table-htable{
          width :100%;
        }
      }
      .v-table-title-cell{
        .v-dropdown-dt{
          background-color : #5bc0de;
        }
      }
    }
    .v-table-body-class{
      overflow : hidden;
      .v-table-btable{
        width :100%;
      }
    }
    .v-scrollbar-wrap{

    }
    .v-table-footer-class{

    }
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
</style>

<style lang="stylus" scoped>

</style>
