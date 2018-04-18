<template >
  <dsw-container class="dsw-index-container">
    <!--标题 start-->
    <h1 class="dsw-title">公安机关执法办案——案卷管理平台</h1>
    <!--标题 end-->

    <!--内容 start-->
    <div class="dsw-content-wrapper clearfix">
      <!--左侧菜单 start-->
      <aside class="dsw-left-menu pull-left">
        <nav class="dsw-left-menu-nav">
          <dsw-menu :menuLists="menuLists"></dsw-menu>
        </nav>
      </aside>
      <!--左侧菜单 end-->

      <!--右侧页面 start-->
      <div class="dsw-right-page">
        <!--页面辅助工具 start-->
        <div></div>
        <!--页面辅助工具 end-->
        <!--tab 容器 start-->
        <div class="dsw-tab-container">
          <!--tab 项 start-->
          <nav class="dsw-tab-lists-wrapper">
            <ul></ul>
          </nav>
          <!--tab 项 end-->
          <!--tab 页 start-->
          <div class="dsw-tab-page-wrapper">
            <ul></ul>
          </div>
          <!--tab 页 end-->
        </div>
        <!--tab 容器 end-->
      </div>
      <!--右侧页面 end-->
    </div>
    <!--内容 end-->

  </dsw-container>
</template >

<script >
import DswContainer from 'components/container'
import DswMenu from 'components/menu'
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      menuLists: []
    }
  },
  components: {
    DswContainer,
    DswMenu
  },
  mounted () {
    axios.get('http://rap2api.taobao.org/app/mock/data/60574').then((response) => {
      this.$set(this, 'menuLists', response.data.data.lists)
    })
  },
  methods: {

  }
}
</script >

<style lang="stylus" >
.dsw-index-container{
  position : relative;
  background : url("./images/bg.png") no-repeat scroll 0 0/100% 100%;
  .dsw-title{
    position : absolute;
    top :-0.12rem;
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
    padding: 78px 25px 24px;
    height: 100%;
    overflow: hidden;
    .dsw-left-menu{
      height :100%;
      padding :5px;
      .dsw-left-menu-nav{
        width : 327px;
        height : 100%;
        background : url("./images/left-menu-bg.png") no-repeat scroll 0 0/100% 100%;
      }
    }
  }
}
</style >

<style lang="stylus" scoped >

</style >
