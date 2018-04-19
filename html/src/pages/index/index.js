import Vue from 'vue'

import store from 'store/index'

import App from './App'

import './index.styl'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})
