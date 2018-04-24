import Demo from './Demo'

// Vue 本身会确保 插件只注册一次
export default {
  install (Vue, options) {
    // 生成组件构造器
    const Demo = Vue.extend(Demo)

    // 实例化 组件
    const demo = new Demo()

    // 获取组件根元素
    const $el = demo.$mount().$el

    // TODO 这里可以实现该插件（注意：不是该组件）的各种功能，或者由外部 导入

    // 挂载到 Vue，包括静态方法、实例方法、mixins、directive、filter、挂载 component 等等
  }
}
