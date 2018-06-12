import camelCase from 'lodash/camelCase'

let modules = {}

const requireContext = require.context(
  // 其组件目录的相对路径
  './modules',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[a-z]\w+\.js$/
)

requireContext.keys().forEach(fileName => {
  if (fileName === './index.js') {
    return
  }

  // 获取模块
  let moduleStore = {}
  if (/\w\//.test(fileName)) {
    if (/index\.js$/.test(fileName)) {
      moduleStore = requireContext(fileName)
    } else {
      return
    }
  } else {
    moduleStore = requireContext(fileName)
  }

  // 获取模块的 camelCase 命名
  const moduleName = camelCase(
    // 剥去文件名开头的 `'./` 和结尾的扩展名
    fileName.replace(/\.\/([^./]*).+$/, '$1')
  )

  modules[moduleName] = moduleStore.default || moduleStore
})

export default modules
