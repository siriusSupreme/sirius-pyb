import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import plugins from './plugins'

Vue.use(Vuex);

const store = new Vuex.Store( {
                          strict   : true,
                          state,
                          getters,
                          mutations,
                          actions,
                          modules : {},
                          plugins
                        } );

export default store
