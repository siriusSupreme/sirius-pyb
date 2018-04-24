<template>
  <div class="dsw-easy-table-wrapper">
    <v-table
      is-vertical-resize
      :vertical-resize-offset='60'
      is-horizontal-resize
      style="width:100%"
      :multiple-sort="false"
      :min-height="350"
      even-bg-color="#f2f2f2"
      :title-rows="tableConfig.titleRows"
      :columns="tableConfig.columns"
      :table-data="tableConfig.tableData"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      @sort-change="sortChange"
      :paging-index="(pageIndex-1)*pageSize"
    ></v-table>

    <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="50" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
  </div>
</template>

<script>
    export default {
        name: "EasyTable"
    }
</script>

<style lang="stylus">
.dsw-easy-table-wrapper{

}
</style>

<style lang="stylus" scoped>

</style>

