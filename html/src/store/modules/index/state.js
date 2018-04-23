export default {
  // 当前菜单 ID
  currentMenuID: 0,
  // 之前操作的 菜单 ID
  previousMenuID: 0,
  // 打开的 tabs 集合
  navTabs: {
    // 1、确定当前打开 或者关闭的 tab；2、用作响应式
    tabId: 0,
    data: new Map()
  },
  // 菜单集合
  menuLists: []
}
