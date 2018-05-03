<template>
  <div class="dsw-dialog-container" :class="{'no-title':!isShowTitle}">
    <span class="dsw-dialog-title" v-if="isShowTitle">{{title}}</span>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'DialogContainer',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '对话框'
    },
    isShowTitle: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>
.dsw-dialog-container{
  width :100%;
  height :100%;
  padding :40px 5px 5px;
  background : url("./images/dialog-bg.png") no-repeat scroll 0 0/100% 100%;
  position : relative;
  &.no-title{
    padding :5px;
  }
  .dsw-dialog-title{
    display : inline-block;
    height : 36px;
    line-height : 36px;
    padding : 0 50px;
    font-size : 0.24rem;
    color: #061635;
    position : absolute;
    top :-13px;
    left :50%;
    transform :translate(-50%,0)
    background : url("./images/title-bg.png") no-repeat scroll 0 0/100% 100%;
  }
}
</style>
