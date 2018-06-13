import Vue from 'vue'

const requireContext = require.context(
  // 其插件目录的相对路径
  './',
  // 是否查询其子目录
  true,
  // 匹配插件文件名的正则表达式
  /[A-Z]\w+\.js$/
)

requireContext.keys().forEach(fileName => {
  // 获取插件配置
  let pluginConfig = {}

  try {
    if (/\.\/[a-z]/.test(fileName)) {
      pluginConfig = requireContext(
        fileName.replace(/[A-Z]\w+\.js$/, 'index.js')
      )
    } else {
      pluginConfig = requireContext(fileName)
    }
  } catch (e) {
    pluginConfig = requireContext(fileName)
  }

  // 全局注册插件
  Vue.use(
    // 如果这个插件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    pluginConfig.default || pluginConfig
  )
})
