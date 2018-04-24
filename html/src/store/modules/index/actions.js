import * as types from './mutation-types'

// 所有菜单初始加载时 都折叠起来
function initMenuLists (menuLists) {
  menuLists.forEach((val, index) => {
    if (val.children && val.children.length > 0 && val.isExpanded === undefined) {
      val.isExpanded = false
      initMenuLists(val.children)
    }
  })
}

export default {
  getMenuLists ({commit}, {vm}) {
    return vm.$https.get('Menu/getMenuTreeForIndex').then((result) => {
      let menuLists = result.data.lists

      menuLists.forEach((menu, index) => {
        menuLists[index] = menu['MenuTreeVo']
      })

      initMenuLists(menuLists)

      commit(types.MENU_LISTS, menuLists)
    })
  }
}
