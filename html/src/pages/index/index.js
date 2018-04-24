import Vue from 'vue'

import store from 'store/index'

import App from './App'
import DswLoading from 'plugins/loading'

import './index.styl'

Vue.config.productionTip = false

Vue.use(DswLoading)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})
