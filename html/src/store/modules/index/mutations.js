import * as types from './mutation-types'

export default {
  [types.MENU_LISTS] (state, payload) {
    state.menuLists = payload.menuLists
  },
  [types.CLICK_MENU] (state, payload) {
    state.menuLists[payload.index]['dswOpened'] = payload.status
  }
}
