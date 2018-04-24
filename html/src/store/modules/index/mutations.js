import * as types from './mutation-types'

export default {
  [types.MENU_LISTS] (state, menuLists) {
    state.menuLists = menuLists
  },
  [types.CLICK_MENU] (state, index) {
    state.menuLists[index]['isExpanded'] = !state.menuLists[index]['isExpanded']
  },
  [types.NAV_TABS] ({navTabs}, {id, tab, isAdd}) {
    const index = navTabs.findIndex((val) => {
      return val.id === id
    })

    if (index === -1 && isAdd === true) {
      navTabs.push(tab)
    } else if (isAdd === false) {
      navTabs.splice(index, 1)
    }
  },
  [types.CURRENT_MENU_ID] (state, {isUpdatePrevious, id} = {isUpdatePrevious: false}) {
    if (state.currentMenuID !== id) {
      if (isUpdatePrevious === true) {
        state.previousMenuID = state.currentMenuID
      }
      state.currentMenuID = id
    }
  },
  [types.PREVIOUS_MENU_ID] (state, id) {
    state.previousMenuID = id
  },
  [types.TOGGLE_EXPANDED] (state) {
    state.isExpanded = !state.isExpanded
  }
}
