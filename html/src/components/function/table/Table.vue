<template>
  <v-table
    class="dsw-easy-table-wrapper"
    :is-horizontal-resize="true"
    :column-width-drag="columnWidthDrag"
    :is-loading="isLoadingForTable"
    :table-data="tableData"
    :columns="columns"
    :paging-index="pagingIndex"
    :show-horizontal-border="isShowHorizontalBorder"
    :show-vertical-border="isShowVerticalBorder"
    :table-bg-color="tableBgColor"
    @on-custom-comp="customComponentHandler"
    v-bind="$attrs"
  ></v-table>
</template>

<script>
import Vue from 'vue'
import {VTable} from 'vue-easytable'

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
  methods: {
    customComponentHandler (payload) {
      this.$emit('dswCustomComponent', payload)
    }
  }
}
</script>

<style lang="stylus">
$fontColor = #108ee9
$borderColor = #18445a

.dsw-easy-table-wrapper{
  width : 100%;
  height : 100%;
  color : $fontColor;
  border : 1px solid $borderColor;
  &.v-table-class{
    .v-table-title-class{
      background : url("./images/title-bg.png") no-repeat scroll 0 0/100% 100%;
      background-color : transparent !important;
    }
    .v-table-body-class{

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
