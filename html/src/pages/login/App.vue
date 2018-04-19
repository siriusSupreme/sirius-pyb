<template >
  <dsw-container>
    <!--登录框 start-->
    <div class="dsw-login-container">
      <img src="./images/logo.png" alt="" class="dsw-login-logo" />
      <div class="dsw-login-wrapper"></div>
      <span class="dsw-login-copyright">技术支持：武汉迪赛威智能科技有限公司</span>
    </div>
    <!--登录框 end-->

    <!--背景 start-->
    <dsw-video :src="src"></dsw-video>
    <!--背景 end-->
  </dsw-container>
</template >

<script >
import DswContainer from 'components/common/container'
import DswVideo from 'components/common/video'

export default {
  name: 'App',
  data () {
    return {
      src: './videos/bg.mp4'
    }
  },
  mounted () {

  },
  components: {
    DswContainer,
    DswVideo
  },
  methods: {

  }
}
</script >

<style lang="stylus" >
.dsw-login-container{
  position : relative;
  text-align : center;
  height :100%;
  overflow : hidden;
  .dsw-login-logo{
    width :8rem;
    margin :50px 0 0;
  }
  .dsw-login-wrapper{
    width : 423px;
    height: 281px;
    margin : 120px auto 0;
    background : url("./images/login-box.png") no-repeat scroll 0 0/100% 100%;
  }
  .dsw-login-copyright{
    position : absolute;
    bottom :50px;
    left :50%;
    transform :translate(-50%,0);
  }
}
</style >

<style lang="stylus" scoped >

</style >
