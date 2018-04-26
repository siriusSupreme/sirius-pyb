import Vue from 'vue'

// 接口定义
Object.defineProperty(Vue.prototype, '$api', {
  login: 'LoginRpc/login.json'
})
