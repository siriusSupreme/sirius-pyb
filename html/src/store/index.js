import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'
import plugins from './plugins'

Vue.use(Vuex)

// eslint-disable-next-line
const glob = require('glob')
const logger = process.env === 'production' ? [] : [createLogger()]

const store = new Vuex.Store({
  strict: process.env !== 'production',
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: logger.concat(plugins)
})

// glob.sync('modules/*').forEach((file) => {
//   console.log(file)
// })
// console.log(glob.sync('./modules/**/index.js'))

export default store
