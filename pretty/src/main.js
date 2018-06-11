// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'

import Element from 'element-ui'
import App from './App'

import Layer from '@/plugins/layer'
import Toastr from '@/plugins/toastr'

import 'bootstrap/scss/bootstrap.scss'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/stylus/common.styl'

import * as filters from './filters'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'small'
})

Vue.use(Layer)
Vue.use(Toastr)

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
