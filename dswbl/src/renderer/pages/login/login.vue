<template>
  <div id="login">
    <div class="login-top">
      <div class="login-top-menu-or-close-wrapper">
        <button class="login-top-menu login-top-btn">菜单</button>
        <button class="login-top-close login-top-btn" @click.stop="loginClose">X</button>
      </div>
      <div class="login-top-banner">
        <div class="login-top-banner-title">迪赛威法度笔录</div>
        <div class="login-top-banner-discription">
          <span class="login-top-banner-discription-common">
            <img src="./images/share.png" class="login-top-banner-icon">
            共享
          </span>
          <span class="login-top-banner-discription-common">
            <img src="./images/efficient.png" class="login-top-banner-icon">
            高效
          </span>
          <span class="login-top-banner-discription-common">
            <img src="./images/synergy.png" class="login-top-banner-icon">
            协同
          </span>
          <span class="login-top-banner-discription-common">
            <img src="./images/capacity.png" class="login-top-banner-icon">
            智能
          </span>
        </div>
      </div>
    </div>
    <div class="login-bottom">
      <div class="login-userlogin-wrapper">
        <div class="login-user-wrapper">
          <span class="login-user-frame login-input-common-frame">
            <img src="./images/user.png" class="login-input-icon-common">
            <input type="text" class="login-user login-input-common" placeholder="警号和用户账户" v-model="userName">
          </span>
        </div>
        <div class="login-password-wrapper">
          <span class="login-password-frame login-input-common-frame">
            <img src="./images/password.png" class="login-input-icon-common">
            <input type="password" class="login-password login-input-common" placeholder="密码" v-model="passWord" @keydown.enter="loginHanlder">
          </span>
        </div>
      </div>
      <div class="login-button-wrapper">
        <button class="login-btn login-btn-common" @click="loginHanlder">登录</button>
        <button class="login-certificate login-btn-common">证书登录</button>
        <button class="login-sign-in login-btn-common">注册</button>
      </div>
      <div class="login-copy-wrapper">
        <span class="login-copy">V0.0.1</span>
        <span class="login-copy-corporation login-copy">法度互联网演示 武汉市迪赛威科技有限公司</span>
        <a class="login-copy">设置服务IP</a>
      </div>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
import token from '@/service/token'
import { login } from '@/api/login'
import { createNamespacedHelpers } from 'vuex'
let { mapActions } = createNamespacedHelpers('login')
export default {
  data () {
    return {
      userName: '',
      passWord: ''
    }
  },
  created () {
    this.ipc = this.$electron.ipcRenderer
  },
  methods: {
    ...mapActions(['setToken']),
    login () {
      if (!this.userName) {
        this.$message.error('请输入用户名')
        return false
      }
      if (!this.passWord) {
        this.$message.error('请输入密码')
        return false
      }
      return login(this.userName, this.passWord).then(({data: {token}}) => {
        this.setToken(token)
        this.ipc.send('ready-main')
      })
    // this.ipc.send('ready-main')  
    },
    loginHanlder () {
      this.login()
    },
    loginClose () {
      this.ipc.send('window-all-closed')
    }
  }
}
</script>
