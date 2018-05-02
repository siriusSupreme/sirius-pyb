<template>
  <div class="dsw-dialog-container">
    <span class="dsw-dialog-title">{{title}}</span>
    <div class="dsw-dialog-wrapper"><slot></slot></div>
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
  /*overflow : hidden;*/
  /*background : url("./images/dialog-bg.png") no-repeat scroll 0 13px/100% 100%;*/
  background : url("./images/dialog-bg.png") no-repeat scroll 0 0/100% 100%;
  position : relative;
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
  .dsw-dialog-wrapper{
    width : 100%
    height : 100%;
    overflow : hidden;
    padding :40px 5px 5px;
  }
}
</style>
