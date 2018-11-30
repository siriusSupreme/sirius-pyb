let modules = {}
let lastFilePath = ''

const requireContext = require.context(
  // 其仓库目录的相对路径
  './modules',
  // 是否查询其子目录
  true,
  // 匹配仓库文件名的正则表达式
  /^\.\/(?:[a-zA-Z][^/]*\/)?([a-zA-Z][\w-]*)\.js$/
)

requireContext.keys().forEach(fileName => {
  let [filePath, folderName] = fileName.match(/^\.\/([^/.]+)(\.js)?/)

  if (lastFilePath === filePath) return

  let moduleName = folderName

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
