import Vue from 'vue'

import App from './App'
import DswLoading from 'plugins/loading'

import './index.styl'

Vue.config.productionTip = false

Vue.use(DswLoading)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App)
})
