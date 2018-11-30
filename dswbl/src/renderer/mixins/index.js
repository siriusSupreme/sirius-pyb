const requireContext = require.context(
  // 其目录下的相对路径
  './',
  // 是否查询其子目录
  false,
  // 验证其目录文件的正则
  /\.\/[\w-]*\.js$/
)

let obj = {}

requireContext.keys().forEach((filename) => {
  if (filename === './index.js') return

  let key = filename.match(/\.\/([\w-]*)/)

  let options = requireContext(filename)

  // 如果用的是export default导出，默认使用.default导入
  // 否则退回到根
  obj[key[1]] = options.default || options
})

window.$blMixins = obj
