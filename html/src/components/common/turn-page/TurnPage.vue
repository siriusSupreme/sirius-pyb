<template>
  <div class="dsw-turn-page-container">
    <span class="dsw-turn-page-btn dsw-turn-page-prev"></span>
    <span class="dsw-turn-page-btn dsw-turn-page-next"></span>
    <div class="dsw-turn-page-wrapper" :id="id" :dir="direction">

      <div v-for="index in 32" :key="index">
        <img src="./images/cover-page.png" :alt="'Page ' + index" >
      </div>

    </div>
  </div>
</template>

<script>

import $ from 'jquery'

export default {
  name: 'TurnPage',
  inheritAttrs: false,
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
  created () {
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
.dsw-turn-page-container{
  width :100%;
  height :100%;
  overflow : hidden;
  .dsw-turn-page-btn{
    &.dsw-turn-page-prev{

    }
    &.dsw-turn-page-next{

    }
  }
  .dsw-turn-page-wrapper{
    width : 100%;
    height : 100%;
    .page{
      background-color : blue;
      & > img{
        width :100%;
        height :100%;
      }
    }
  }
}
</style>
