import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireContext = require.context(
  // 其指令目录的相对路径
  './',
  // 是否查询其子目录
  true,
  // 匹配指令文件名的正则表达式
  /[A-Z]\w+\.js$/
)

requireContext.keys().forEach(fileName => {
  // 获取指令配置
  let directiveConfig = {}

  try {
    if (/\.\/[a-z]/.test(fileName)) {
      directiveConfig = requireContext(
        fileName.replace(/[A-Z]\w+\.js$/, 'index.js')
      )
    } else {
      directiveConfig = requireContext(fileName)
    }
  } catch (e) {
    directiveConfig = requireContext(fileName)
  }

  // 获取指令的 PascalCase 命名
  let directiveName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `'./` 和结尾的扩展名
      fileName.replace(/^\.\/.*([A-Z]\w+)\.js$/, '$1')
    )
  )

  // 全局注册指令
  Vue.directive(
    directiveName,
    // 如果这个指令选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    directiveConfig.default || directiveConfig
  )
})
