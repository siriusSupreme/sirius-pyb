import Vue from 'vue'

import laydate from 'layui-src/src/lay/modules/laydate'

import 'layui-src/src/css/modules/laydate/default/laydate.css'

// 挂载到 Vue 实例上
Vue.prototype.$laydate = laydate

// 导出该类
export default {...laydate}
