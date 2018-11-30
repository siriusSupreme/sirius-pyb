import token from '@/service/token'
import { getCurrentUser } from '@/api/login'
const state = {
  token: token.get(),
  account: '',
  orgName: '',
  orgcode: '',
  realName: '',
  roleId: '',
  roleCode: '',
  id: -1,
  iconId: -1
}

const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setUserInfo (state, data) {
    state.account = data.account
    state.orgName = data.orgName
    state.orgcode = data.orgcode
    state.realName = data.realName
    state.roleId = data.roleId
    state.roleCode = data.roleCode
    state.id = data.id
    state.iconId = data.iconId
  }
}

const actions = {
  setToken ({ state, rootState, getters, rootGetters, commit, dispatch }, _token) {
    commit('setToken', _token)
    token.set(_token)
  },
  getCurrentUser ({ state, rootState, getters, rootGetters, commit, dispatch }) {
    return getCurrentUser().then(({data}) => {
      commit('setUserInfo', data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
