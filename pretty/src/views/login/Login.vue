<template >
  <article class="ss-container login-container" ref="login-container">
    <header class="login-logo-wrapper">
      <img class="login-logo" src="./images/login-logo.png" alt="欢迎使用智能安管平台" />
      <span class="login-datetime">{{datetime | parseTime('{y}-{m}-{d} {h}:{i}:{s} 星期{a}')}}</span>
    </header>

    <div class="login-card-wrapper">
      <img class="login-card-area" src="./images/login-card.png" alt="刷卡区" />
      <img class="login-tip" src="./images/login-tip.png" alt="请刷卡登陆" />
      <input class="login-input" ref="login-input" v-model="cardNo" autofocus type="text" />
    </div>
  </article>
</template >

<script >
import {getToken} from '@/utils/auth-token'
import {createNamespacedHelpers} from 'vuex'

const {mapActions} = createNamespacedHelpers('user')

export default {
  name: 'Login',
  data () {
    return {
      datetime: Date.now(),
      cardNo: ''
    }
  },
  watch: {
    cardNo (val, oldVal) {
      if (val.length === 10) {
        this.loginByCardNo(val).then(() => {
          this.$router.push('/index')
        })
        this.cardNo = ''
      }
    }
  },
  mounted () {
    this.updateDatetime()
    this.autoFocus()
  },
  beforeRouteEnter (to, from, next) {
    // TODO 只在 第一次 进入 该路由时 触发
    getToken() ? next('/index') : next()
  },
  beforeRouteUpdate (to, from, next) {
    // TODO 只在 params query hash 发生变化时 触发
    next()
  },
  beforeRouteLeave (to, from, next) {
    // TODO 只在 退出（切换到下一个新路由） 该路由时 触发
    next()
  },
  methods: {
    ...mapActions(['loginByCardNo']),
    updateDatetime () {
      let timer = window.setInterval(() => {
        this.datetime = Date.now()
      }, 1000)

      this.$once('hook:beforeDestroy', () => {
        window.clearInterval(timer)
      })
    },
    autoFocus () {
      let handler = (e) => {
        this.$refs['login-input'].focus()
      }
      handler()
      this.$refs['login-container'].addEventListener('click', handler)
      this.$once('hook:beforeDestroy', () => {
        this.$refs['login-container'].removeEventListener('click', handler)
      })
    }
  }
}
</script >

<style lang="stylus" scoped >
.login-container{
  background url("./images/login-bg.png") no-repeat scroll 0 0/100% 100%;
  .login-logo-wrapper{
    position absolute;
    top 220px;
    left 50%;
    transform translate(-50%, 0)
    text-align center;
    .login-logo{

    }
    .login-datetime{
      display block;
      font-size 24px;
      color #facf09;
      margin-top 20px;
    }
  }
  .login-card-wrapper{
    position absolute;
    top 400px;
    left 50%;
    width 380px;
    height 220px;
    transform translate(-50%, 0)
    background url("./images/login-box.png") no-repeat scroll 0 0/100% 100%;
    & > img{
      display block;
      margin 32px auto;
    }
    .login-card-area{

    }
    .login-tip{

    }
    .login-input{
      position absolute;
      top 50%;
      left 50%;
      transform translate(-50%, -50%);
      opacity 0;
      cursor default;
    }
  }
}
</style >
