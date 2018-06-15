// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'

import Element from 'element-ui'
import App from './App'

import 'bootstrap/scss/bootstrap.scss'
import 'font-awesome/scss/font-awesome.scss'
import '@/assets/scss/element-ui.scss'
import '@/assets/stylus/common.styl'

import '@/components'
import './components'
import '@/directives'
import '@/plugins'
import '@/filters'
import '@/mixins'

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'small'
})

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render (h) {
    return <App />
  }
})
