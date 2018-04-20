import * as types from './mutation-types'

export default {
  getMenuLists ({commit}, payload) {
    return payload.vm.$https.get('demo').then((result) => {
      commit(types.MENU_LISTS, {menuLists: result.data.lists})
    })
  }
}
