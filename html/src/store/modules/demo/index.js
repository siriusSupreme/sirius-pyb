import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'
import plugins from './plugins'

export default {
  strict: process.env !== 'production',
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins
}
