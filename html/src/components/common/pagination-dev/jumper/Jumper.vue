<template>
  <span class="dsw-pagination-jump-wrapper">
    跳转到第 <input type="text" class="dsw-pagination-jump-input" @keyup.enter="jumpHandler"/> 页 <button type="button" @click="jumpHandler">跳转</button>
  </span>
</template>

<script>
export default {
  name: 'Jumper'
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>

</style>
