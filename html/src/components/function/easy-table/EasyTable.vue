<template>
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
</template>

<script>
import Vue from 'vue'
import {VTable} from 'vue-easytable'

import 'vue-easytable/libs/themes-base/index.css'

Vue.component(VTable.name, VTable)

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

.dsw-easy-table-wrapper{
  color : $fontColor;
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
</style>

<style lang="stylus" scoped>

</style>
