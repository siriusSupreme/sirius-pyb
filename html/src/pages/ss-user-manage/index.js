import Vue from 'vue'

import checkToken from 'mixins/check-token'

import App from './App'

import './index.styl'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  mixins: [checkToken],
  render: (h) => h(App)
})
