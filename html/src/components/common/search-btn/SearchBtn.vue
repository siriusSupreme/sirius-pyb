<template>
  <button type="button" class="dsw-btn dsw-search-btn" @click="clickBtnHandler">{{btnText}}</button>
</template>

<script>
export default {
  name: 'SearchBtn',
  props: {
    btnText: {
      type: String,
      default: '查询'
    }
  },
  methods: {
    clickBtnHandler (e) {
      this.$emit('dsw-click-btn', e)
    }
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>
.dsw-btn{
  height: 32px;
  line-height: 32px;
  text-align: center;
  padding : 0 0.24rem;
  cursor : pointer;
  &.dsw-search-btn{
    background : url("./images/search-btn-bg.png") no-repeat scroll 0 0/100% 100%;
    color: #765421;
    font-size: 0.18rem;
    font-weight: 500;
    letter-spacing: 5px;
  }
}
</style>
