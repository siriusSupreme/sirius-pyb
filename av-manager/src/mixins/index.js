import Vue from 'vue'

const requireContext = require.context(
  // 其混入对象目录的相对路径
  './',
  // 是否查询其子目录
  false,
  // 匹配混入对象文件名的正则表达式
  /[\w-]+\.js$/
)

requireContext.keys().forEach(fileName => {
  if (fileName === './index.js') return

  // 获取混入对象配置
  let mixinConfig = requireContext(fileName)

  // 如果这个混入对象选项是通过 `export default` 导出的，
  // 那么就会优先使用 `.default`，
  // 否则回退到使用模块的根。
  Vue.mixin(mixinConfig.default || mixinConfig)
})
