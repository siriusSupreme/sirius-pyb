<template>
  <div class="dsw-dialog-container" v-if="isShow">
    <div class="dsw-dialog-wrapper" :style="style">
      <component :is="component"></component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  data () {
    return {
      component: null,
      isShow: false,
      style: {
        width : '80%',
        height: '80%'
      }
    }
  }
}
</script>

<style lang="stylus">
.dsw-dialog-container{
  position : relative;
  width :100%;
  height :100%;
  background-color : #ccc;
  opacity :0.3;
  .dsw-dialog-wrapper{
    position : absolute;
    top :50%;
    left :50%;
    transform : translate(-50%,-50%);
  }
}
</style>

<style lang="stylus" scoped>

</style>
