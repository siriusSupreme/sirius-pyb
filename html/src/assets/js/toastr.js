import Vue from 'vue'

import toastr from 'toastr'

import 'toastr/toastr.scss'

toastr.options = {
  debug: process.env !== 'production',
  closeButton: true,
  positionClass: 'toast-top-center',
  progressBar: true
}

// 挂载到 Vue 实例上
Vue.prototype.$toastr = toastr

// 导出该类
export default toastr
