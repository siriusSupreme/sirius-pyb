import Vue from 'vue'

const requireContext = require.context(
  // 其过滤器目录的相对路径
  './',
  // 是否查询其子目录
  false,
  // 匹配过滤器文件名的正则表达式
  /[\w-]+\.js$/
)

requireContext.keys().forEach(fileName => {
  if (fileName === './index.js') return

  // 获取过滤器配置
  let filterConfig = requireContext(fileName)

  // 如果这个过滤器选项是通过 `export default` 导出的，
  // 那么就会优先使用 `.default`，
  // 否则回退到使用模块的根。
  filterConfig = filterConfig.default || filterConfig

  // register global utility filters.
  Object.keys(filterConfig).forEach(filter => {
    Vue.filter(filter, filterConfig[filter])
  })
})
