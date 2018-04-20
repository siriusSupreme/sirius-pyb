import Vue from 'vue'

// 定义一个类
class Demo {
  constructor () {

  }
}

// 挂载到 Vue 实例上
Vue.prototype.$demo = new Demo()

// 导出该类
export default Demo
