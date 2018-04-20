import Vue from 'vue'

import toastr from 'toastr'

import 'toastr/toastr.scss'

// 挂载到 Vue 实例上
Vue.prototype.$toastr = toastr

// 导出该类
export default toastr
