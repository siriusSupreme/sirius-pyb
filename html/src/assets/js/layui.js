import Vue from 'vue'

// import layui from 'layui-src/src/layui'
import 'layui-src/src/layui'

import 'layui-src/src/css/layui.css'

const layui = window.layui

layui.use(['layer'], function () {
  console.log('aaa')
  console.log(arguments)
})

// 挂载到 Vue 实例上
Vue.prototype.$layui = layui

// 导出该类
export default layui
