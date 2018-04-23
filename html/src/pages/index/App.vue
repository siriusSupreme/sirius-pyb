<template >
  <dsw-container class="dsw-index-container">
    <!--标题 start-->
    <h1 class="dsw-title">公安机关执法办案——案卷管理平台</h1>
    <!--标题 end-->

    <!--内容 start-->
    <div class="dsw-content-wrapper clearfix" ref="dsw-content-wrapper">
      <!--左侧菜单 start-->
      <left-menu ref="dsw-left-menu"></left-menu>
      <!--左侧菜单 end-->

      <!--右侧页面 start-->
      <right-page ref="dsw-right-page"></right-page>
      <!--右侧页面 end-->
    </div>
    <!--内容 end-->

  </dsw-container>
</template >

<script >

import DswContainer from 'components/common/container'
import LeftMenu from 'components/business/left-menu'
import RightPage from 'components/business/right-page'

export default {
  name: 'App',
  components: {
    DswContainer,
    LeftMenu,
    RightPage
  }
}
</script >

<style lang="stylus" >
.dsw-index-container{
  position : relative;
  background : url("./images/bg.png") no-repeat scroll 0 0/100% 100%;
  .dsw-title{
    position : absolute;
    top :-10px;
    left :50%;
    transform : translate(-50%, 0);
    font-size :0.36rem;
    color : #25CAD6;
    padding :0 0 0 60px;
    background : url("./images/police-badge.png") no-repeat scroll 0 6px/50px 54px;
    height :60px;
    line-height :60px;
  }
  .dsw-content-wrapper{
    padding: 78px 0.35rem 24px;
    height: 100%;
    overflow: hidden;
  }
}
</style >

<style lang="stylus" scoped >

</style >
