import {getToken, setToken, removeToken} from '@/utils/auth-token'
import {loginByCardNo, getUserInfoByToken} from '@/api/user'
import {Message} from 'element-ui'

const user = {
  namespaced: true,
  state () {
    return {
      id: 0,
      roleId: '',
      realName: '',
      account: '',
      orgCode: '',
      orgName: '',
      token: getToken()
    }
  },
  getters: {},
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUserInfo (state, userInfo) {
      let {id, roleId, realName, account, orgcode: orgCode, orgName} = userInfo
      state.id = id
      state.roleId = roleId
      state.realName = realName
      state.account = account
      state.orgCode = orgCode
      state.orgName = orgName
    }
  },
  actions: {
    async loginByCardNo ({commit, dispatch, state, rootState, getters, rootGetters}, cardNo) {
      try {
        let result = await loginByCardNo(cardNo)
        if (result.code) {
          Message.error(result.msg)
          throw new Error(result.msg)
        } else {
          commit('setToken', result.data.token)
          setToken(result.data.token)
        }
      } catch (e) {
        return Promise().reject(e)
      }
    },
    async logout ({commit, dispatch, state, rootState, getters, rootGetters}) {
      commit('setToken', '')
      removeToken()
    },
    async getUserInfoByToken ({commit, dispatch, state, rootState, getters, rootGetters}) {
      return getUserInfoByToken(state.token).then(result => {
        if (result.code) {
          Message.error(result.msg)
        } else {
          commit('setUserInfo', result.data)
        }
      }, error => {
        Message.error(error.msg)
      })
    }
  },
  plugins: []
}

export default user
