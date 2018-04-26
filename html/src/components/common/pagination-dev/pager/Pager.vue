<template>
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
</template>

<script>
export default {
  name: 'Pager'
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>

</style>
