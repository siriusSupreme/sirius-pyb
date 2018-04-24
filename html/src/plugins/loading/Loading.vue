<template>
  <div class="dsw-loading-wrapper" v-show="isShow">
    <img class="dsw-loading-icon" src="./images/loading-001.gif" alt="数据加载中……" v-if="type === 1"/>

    <span class="dsw-loading-icon" v-else-if="type === 2">
      {{title}}
      <img src="./images/loading-002.gif" style="display: block;margin-top: 10px;" alt="数据加载中……" />
    </span>

    <img class="dsw-loading-icon" src="./images/loading-003.gif" alt="数据加载中……" v-else />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      type: 1,
      title: '数据加载中……',
      isShow: false
    }
  }
}
</script>

<style lang="stylus">
.dsw-loading-wrapper{
  width :100%;
  height :100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.3;
  background-color : #ccc;
  text-align : center;
  .dsw-loading-icon{
    position : absolute;
    top :50%;
    left :50%;
    transform :translate(-50%,-50%);
  }
  .dsw-loading-title{

  }
}
</style>

<style lang="stylus" scoped>

</style>
