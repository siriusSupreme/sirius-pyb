import Loading from './Loading'

export default {
  install (Vue, options) {
    const DswLoading = Vue.component('DswLoading', Loading)

    const dswLoading = new DswLoading()

    Vue.prototype.$showLoading = function (type = 1, title = '数据加载中……') {
      dswLoading.isShow = true
    }

    Vue.prototype.$hideLoading = function () {

    }
  }
}
