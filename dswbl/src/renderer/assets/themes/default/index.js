const requireContext = require.context(
  // 当前文件目录下
  './',
  // 是否搜索其目录下的子文件夹
  true,
  // 搜索其目录下文件的匹配正则
  /\.\/([\w-]+)\/(index)\.styl$/
)

requireContext.keys().forEach((fileName) => {
  requireContext(fileName)
})
