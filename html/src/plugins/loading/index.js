import Loading from './Loading'

// Vue 本身会确保 插件只注册一次
export default {
  install (Vue, options) {
    // 生成组件构造器
    const DswLoading = Vue.extend(Loading)

    // 实例化 组件
    const dswLoading = new DswLoading()

    // 获取组件根元素
    const $el = dswLoading.$mount().$el

    // TODO 这里可以实现该插件（注意：不是该组件）的各种功能，或者由外部 导入

    // 挂载到 Vue，包括静态方法、实例方法、mixins、directive、filter、挂载 component 等等
    Vue.prototype.$showLoading = function (type = 1, title = '数据加载中……') {
      dswLoading.type = type
      dswLoading.title = title
      dswLoading.isShow = true
      // 确保 该元素上 有且只有 一个 插件实例
      if (!this.$el.getAttribute('data-dsw-loading')) {
        this.$el.appendChild($el)
        this.$el.setAttribute('data-dsw-loading', dswLoading)
      }
    }

    Vue.prototype.$hideLoading = function () {
      dswLoading.isShow = false
    }
  }
}
