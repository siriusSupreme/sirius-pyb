import Vue from 'vue'
const requireContext = require.context(
  // 搜索目录为其当前目录
  './',
  // 是否查询子目录
  true,
  // 匹配其目录的正则表达式
  /\.\/([A-Za-z][\w-]+)\/([A-Z][\w-]+).vue$/
)

let PREFIX = 'Bl'

requireContext.keys().forEach( fileName => {
  let options = null
  let componentName = fileName.match( /\.\/([A-Za-z][\w-]+)\/([A-Z][\w-]+).vue$/ )[ 2 ]
  let globalReg = /-[\w]/g
  componentName = componentName.replace( globalReg, ( value ) => {
    return value.match( /[\w]+/ )[ 0 ].toUpperCase()
  } )
  options = requireContext( fileName )
  Vue.component( PREFIX + componentName, options.default || options )
} )
