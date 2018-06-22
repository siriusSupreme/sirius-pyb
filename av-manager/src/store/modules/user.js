import Token from '@/utils/Token'
import { TOKEN_KEY } from '../../config'
import { loginByCardNo, getUserInfoByToken } from '@/api/user'
import { Message } from 'element-ui'

const token = new Token(TOKEN_KEY)

const user = {
  namespaced: true,
  state () {
    return {
      userId: 0,
      roleId: '',
      realName: '',
      account: '',
      orgCode: '',
      orgName: '',
      token: token.getToken()
    }
  },
  getters: {},
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUserInfo (state, userInfo) {
      let {
        id: userId,
        roleId,
        realName,
        account,
        orgcode: orgCode,
        orgName
      } = userInfo
      state.userId = userId
      state.roleId = roleId
      state.realName = realName
      state.account = account
      state.orgCode = orgCode
      state.orgName = orgName
    }
  },
  actions: {
    async loginByCardNo (
      { commit, dispatch, state, rootState, getters, rootGetters },
      cardNo
    ) {
      try {
        let result = await loginByCardNo(cardNo)
        if (result.code) {
          throw new Error(result.msg)
        } else {
          commit('setToken', result.data.token)
          token.setToken(result.data.token)
        }
      } catch (e) {
        Message.error(e.message)
        return Promise.reject(e)
      }
    },
    logout ({ commit, dispatch, state, rootState, getters, rootGetters }) {
      commit('setToken', '')
      token.removeToken()
    },
    getUserInfoByToken ({
      commit,
      dispatch,
      state,
      rootState,
      getters,
      rootGetters
    }) {
      return getUserInfoByToken(state.token).then(
        result => {
          if (result.code) {
            Message.error(result.msg)
          } else {
            commit('setUserInfo', result.data)
          }
        },
        error => {
          Message.error(error.msg)
        }
      )
    }
  },
  plugins: []
}

export default user
