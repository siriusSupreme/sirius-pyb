<template>
  <div :id="id" :dir="direction">
    <div class="hard"> Turnjs </div>
    <div class="hard"></div>
    <div> Page 1 </div>
    <div> Page 2 </div>
    <div> Page 3 </div>
    <div> Page 4 </div>
    <div class="hard"></div>
    <div class="hard"></div>
  </div>
</template>

<script>

import $ from 'jquery'

export default {
  name: 'TurnPage',
  props: {
    pages: {
      type: Array,
      default () {
        return []
      }
    },
    direction: {
      type: String,
      default: 'ltr'
    }
  },
  data () {
    return {
      id: 'flipbook-' + Date.now() + '-' + (Math.random()).toFixed(10) * 10 ** 10
    }
  },
  mounted () {
    this.$nextTick(() => {
      $(`#${this.id}`).turn({
        autoCenter: true
      })
    })
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>

</style>
