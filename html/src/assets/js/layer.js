import Vue from 'vue'

import layer from 'layui-src/src/lay/modules/layer'

import 'layui-src/src/css/modules/layer/default/layer.css'

// 挂载到 Vue 实例上
Vue.prototype.$layer = layer

// 导出该类
export default layer
