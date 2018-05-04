<template >
  <dialog-container :is-show-title="false">
    <div class="dsw-scan-wrapper">
      <p class="dsw-scan-tooltip">请安图示将案卷倒置并正面朝下放置，点击下方按钮开始扫描</p>

      <p class="dsw-scan-pages">已扫描 <span>1</span> 页</p>

      <p class="dsw-scan-btn-wrapper">
        <button class="dsw-btn">开始扫描</button>
        <button class="dsw-btn">停止扫描</button>
        <button class="dsw-btn">预览</button>
      </p>
    </div>
  </dialog-container>
</template >

<script >

import DialogContainer from 'components/common/dialog-container'

export default {
  name: 'Scan',
  data () {
    return {}
  },
  components: {
    DialogContainer
  }
}
</script >

<style lang="stylus" scoped >
.dsw-scan-wrapper{
  width  : 100%;
  height : 100%;
  background : url("./images/print.png") no-repeat scroll 0 50%/100px 150px;
  padding : 0 0 0 120px;
  .dsw-scan-tooltip{
    padding :40px 0 0 0;
  }
  .dsw-scan-pages{
    margin :30px 0 50px 0;
    & > span{
      color : #ff9b00;
      margin :0 10px;
    }
  }
  .dsw-scan-btn-wrapper{
    text-align : center;
    .dsw-btn{
      height : 32px;
      line-height : 32px;
      padding : 0 15px;
      margin : 0 5px;
      background : url("./images/btn.png") no-repeat scroll 0 0/100% 100%;
      &:hover{
        background : url("./images/btn-hover.png") no-repeat scroll 0 0/100% 100%;
      }
    }
  }
}
</style >
