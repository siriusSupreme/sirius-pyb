import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireContext = require.context(
  // 其组件目录的相对路径
  './',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.vue$/
)

requireContext.keys().forEach(fileName => {
  // 获取组件配置
  let componentConfig = {}

  try {
    componentConfig = requireContext(
      fileName.replace(/[A-Z]\w+\.vue$/, 'index.js')
    )
  } catch (e) {
    componentConfig = requireContext(fileName)
  }

  // 获取组件的 PascalCase 命名
  let componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `'./` 和结尾的扩展名
      fileName.replace(/^\.\/.*([A-Z]\w+)\.vue$/, '$1')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
