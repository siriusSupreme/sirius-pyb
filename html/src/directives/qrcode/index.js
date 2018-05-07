
import Qrcode from './Qrcode'

export default {
  bind (el, binding, vnode) {
    const qrcode = new Qrcode(vnode)

    el.addEventListener('click', (e) => {
      if (vnode.context.currentRow) {
        qrcode.print()
      } else {
        vnode.context.$toastr.warning('请选择一个案卷')
      }
    }, false)
  },
  inserted (el, binding, vnode) {

  },
  update (el, binding, vnode, oldVnode) {

  },
  componentUpdated (el, binding, vnode, oldVnode) {

  },
  unbind (el, binding, vnode) {

  }
}
