
import laydate from 'layui-src/src/lay/modules/laydate'
// import 'layui-src/src/css/modules/laydate/default/font.css'
import 'layui-src/src/css/modules/laydate/default/laydate.css'

export default {
  bind (el, binding, vnode) {
    const value = el.value || Date.now()

    laydate.render({
      elem: el,
      type: 'datetime',
      value: new Date(value)
    })
  },
  inserted () {

  },
  update () {

  },
  componentUpdated () {

  },
  unbind () {

  }
}
