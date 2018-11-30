import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import 'font-awesome/css/font-awesome.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

// global stylus
import './assets/themes/default'

// global components
import './components'

// global mixins
import './mixins'

if ( !process.env.IS_WEB ) Vue.use( require( 'vue-electron' ) )
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use( ElementUI, {
  size: 'small',
  zIndex: 3000
} )

/* eslint-disable no-new */
new Vue( {
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
} ).$mount( '#app' )
