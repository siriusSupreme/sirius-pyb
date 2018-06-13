import camelCase from 'lodash/camelCase'

let modules = {}
let loadedModules = new Set()

const requireContext = require.context(
  // 其仓库目录的相对路径
  './modules',
  // 是否查询其子目录
  true,
  // 匹配仓库文件名的正则表达式
  /[a-z]\w+\.js$/
)

requireContext.keys().forEach(fileName => {
  let [, filePath, folderName] = fileName.match(/^(\.\/([^/]*)).*$/)

  let pos = folderName.indexOf('.')

  if (pos < 0) folderName = folderName.substring(0)
  else folderName = folderName.substring(0, pos)

  // 获取模块的 camelCase 命名
  let moduleName = camelCase(folderName)

  if (loadedModules.has(moduleName)) return

  loadedModules.add(moduleName)

  // 获取模块
  let moduleStore = {}
  if (filePath.endsWith('.js')) {
    moduleStore = requireContext(fileName)
  } else {
    moduleStore = requireContext(`${filePath}/index.js`)
  }

  modules[moduleName] = moduleStore.default || moduleStore
})

export default modules
