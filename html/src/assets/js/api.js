import Vue from 'vue'

// 接口定义
Object.defineProperty(Vue.prototype, '$api', {
  configurable: false,
  enumerable: false,
  get () {
    return {
      login: 'LoginRpc/login.json',
      getLoginMenu: 'Menu/getMenuTreeForIndex.json',
      getUserInfo: 'User/getUserInfo.json'
    }
  }
})
