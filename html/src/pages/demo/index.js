import Vue from 'vue'

import router from 'router/index'
import store from 'store/index'

import checkToken from 'mixins/check-token'

import App from './App'

import './index.styl'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  mixins: [checkToken],
  render: (h) => h(App)
})
