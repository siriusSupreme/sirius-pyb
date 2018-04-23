import * as types from './mutation-types'

export default {
  [types.MENU_LISTS] (state, menuLists) {
    state.menuLists = menuLists
  },
  [types.CLICK_MENU] (state, index) {
    state.menuLists[index]['isExpanded'] = !state.menuLists[index]['isExpanded']
  },
  [types.NAV_TABS] ({navTabs}, {id, tab, isAdd}) {
    if (!navTabs.data.has(id) && isAdd === true) {
      navTabs.data.set(id, tab)
    } else if (isAdd === false) {
      navTabs.data.delete(id)
    }
    navTabs.tabId = id
  },
  [types.CURRENT_MENU_ID] (state, id) {
    state.previousMenuID = state.currentMenuID
    state.currentMenuID = id
  },
  [types.PREVIOUS_MENU_ID] (state, id) {
    state.previousMenuID = id
  }
}
