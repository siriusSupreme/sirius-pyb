<template >
  <dsw-container class="dsw-login-container">
    <!--登录框 start-->
    <img src="./images/logo.png" alt="" class="dsw-login-logo" />

    <div class="dsw-login-wrapper">
      <ul class="dsw-login-lists" @keyup.stop.enter="loginHandler">
        <li class="dsw-login-item">
          <input class="dsw-login-item-input" v-validate="'required'" type="text" name="username" ref="username" data-vv-as="用户名" v-model="username" placeholder="请输入用户名" />
        </li>
        <li class="dsw-login-item">
          <input class="dsw-login-item-input" v-validate="'required'" type="password" name="password" ref="password" data-vv-as="密码" v-model="password" placeholder="请输入密码" />
        </li>
      </ul>

      <button type="button" class="dsw-login-btn" @click="loginHandler" ref="dsw-login-btn">登录</button >
      <!--<button type="button" class="dsw-login-demo-btn" style="display: inline-block;" @click="demoHandler" >Demo</button >-->
    </div>
    <!--登录框 end-->

    <!--背景 start-->
    <!--<dsw-video src="./images/bg.mp4"></dsw-video>-->
    <video class="dsw-login-bg" src="./videos/login-bg.mp4" loop autoplay ></video >
    <!--背景 end-->
  </dsw-container>
</template >

<script >
import config from 'assets/js/config'
import 'assets/js/vee-validate'

import DswContainer from 'components/common/container'
import DswVideo from 'components/common/video'

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
  watch: {
    errors: {
      deep: true,
      immediate: true,
      handler (val, oldVal) {
        this.$nextTick(() => {
          if (val.any()) {
            this.$refs['dsw-login-btn'].setAttribute('disabled', 'disabled')
          } else {
            this.$refs['dsw-login-btn'].removeAttribute('disabled')
          }
        })
      }
    },
    username (val, oldVal) {
      this.$validator.validate('username', val).then((result) => {
        if (!result) {
          this.$toastr.warning('请输入用户名')
        }
      })
    },
    password (val, oldVal) {
      this.$validator.validate('password', val).then((result) => {
        if (!result) {
          this.$toastr.error('请输入密码')
        }
      })
    }
  },
  mounted () {
    this.$validator.validateAll().then((result) => {
      if (result) {
        this.$refs['dsw-login-btn'].removeAttribute('disabled')
      } else {
        this.$refs['dsw-login-btn'].setAttribute('disabled', 'disabled')
      }
    })
  },
  methods: {
    loginHandler (e) {
      console.log(this.$https)
      this.$validator.validateAll().then((result) => {
        if (result) {
          const userName = this.username
          const passWord = this.password
          this.$https.jsonp(this.$api.login, {params: {userName, passWord}}).then((result) => {
            localStorage.setItem(config.tokenKey, result.data.token)
            location.href = '/index.html'
          })
        }
      })
    },
    demoHandler (e) {
      this.$vLayer.open({
        type: 3
      })
    }
  }
}
</script >

<style lang="stylus" >
.dsw-login-container{
  .dsw-login-logo{
    display : none;
    width :8rem;
    position : absolute;
    top : 1rem;
    left : 50%;
    z-index : 2;
    transform : translate(-50%,0);
  }
  .dsw-login-wrapper{
    position : absolute;
    top : 20vh;
    right : 1rem;
    z-index : 2;
    width : 634px;
    height: 319px;
    margin : 120px auto 0;
    text-align : center;
    background : url("./images/login-box.png") no-repeat scroll 0 0/100% 100%;
    .dsw-login-lists{
      padding :26px 0 0 96px;
      .dsw-login-item{
        margin: 44px 0 0 50px;
        text-align: left;
        .dsw-login-item-input{
          display: inline-block;
          width: 320px;
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
      background: url("./images/login-btn.png") no-repeat scroll 0 0/100% 100%;
      padding: 0 96px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      margin: 50px 0 0;
      border-radius: 20px;
      &:not([disabled]):hover{
        background: url("./images/login-btn-hover.png") no-repeat scroll 0 0/100% 100%;
      }
    }
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
