<template>
  <span class="dsw-pagination-select-wrapper">
    每页显示
    <select class="dsw-pagination-select" @change="pageSizeChangeHandler">
      <option :value="option" v-for="(option,index) in pageSizeOption" :key="index">{{option}}</option >
    </select >
    条
  </span>
</template>

<script>
export default {
  name: 'Sizer'
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>

</style>
