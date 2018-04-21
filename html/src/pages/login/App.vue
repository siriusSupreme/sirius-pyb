<template >
  <dsw-container>
    <!--登录框 start-->
    <div class="dsw-login-container">
      <img src="./images/logo.png" alt="" class="dsw-login-logo" />
      <div class="dsw-login-wrapper">
        <ul class="dsw-login-lists">
          <li class="dsw-login-item">
            <input class="dsw-login-item-input" v-validate="required|numeric" type="text" name="username" v-model="username" placeholder="请输入用户名" />
          </li>
          <li class="dsw-login-item">
            <input class="dsw-login-item-input" type="password" name="password" v-model="password" placeholder="请输入密码" />
          </li>
        </ul>

        <a href="javascript:void(0);" class="dsw-login-btn" @click="loginHandler" >登录</a >
      </div>
      <span class="dsw-login-copyright">技术支持：武汉迪赛威智能科技有限公司</span>
    </div>
    <!--登录框 end-->

    <!--背景 start-->
    <!--<dsw-video src="./images/bg.mp4"></dsw-video>-->
    <video class="dsw-login-bg" src="./videos/bg.mp4" loop autoplay ></video >
    <!--背景 end-->
  </dsw-container>
</template >

<script >

import DswContainer from 'components/common/container'
import DswVideo from 'components/common/video'

import 'assets/js/vee-validate'

export default {
  name: 'App',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    DswContainer,
    DswVideo
  },
  methods: {
    loginHandler (e) {
      this.$validator.validateAll().then(function (result) {
        console.log(result)
      })
    }
  }
}
</script >

<style lang="stylus" >
.dsw-login-container{
  position : absolute;
  top : 0;
  left : 0;
  z-index : 2;
  width : 100%;
  height : 100%;
  text-align : center;
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
    .dsw-login-lists{
      padding :36px 0 0 50px;
      .dsw-login-item{
        margin: 16px 0 0 50px;
        text-align: left;
        .dsw-login-item-input{
          display: inline-block;
          width: 280px;
          height: 36px;
          line-height: 36px;
          padding: 2px 5px;
          color: #f0f0f0;
          border: none;
          background: none;
          outline :none;
        }
      }
    }
    .dsw-login-btn{
      font-size: 0.32rem;
      letter-spacing: 0.20rem;
      background-color: #091852;
      padding: 0 96px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      margin: 40px 0 0;
      border-radius: 20px;
    }
  }
  .dsw-login-copyright{
    position : absolute;
    bottom :50px;
    left :50%;
    transform :translate(-50%,0);
    color : #FFF;
    font-size :0.16rem;
  }
}
.dsw-login-bg{
  position : absolute;
  top :0;
  left :0;
  z-index : 1;
}
</style >

<style lang="stylus" scoped >

</style >
