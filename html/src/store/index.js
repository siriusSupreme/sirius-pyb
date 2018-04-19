import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import plugins from './plugins'

Vue.use(Vuex)

// eslint-disable-next-line
const fs = require('fs')
const glob = require('glob')

const store = new Vuex.Store({
  strict: true,
  state,
  getters,
  mutations,
  actions,
  plugins
})

// glob.sync('modules/*').forEach((file) => {
//   console.log(file)
// })
console.log(glob.sync('./modules/*'))

export default store
