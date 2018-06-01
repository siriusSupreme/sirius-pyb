import layer from 'layui-src/src/lay/modules/layer'
import 'layui-src/src/css/modules/layer/default/layer.css'

export default {
  install (Vue) {
    Vue.$layer = layer
    Vue.prototype.$layer = layer
  }
}
