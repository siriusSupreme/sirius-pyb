
import Qrcode from './Qrcode'

export default {
  bind (el, binding, vnode) {
    const qrcode = new Qrcode(vnode)

    el.addEventListener('click', (e) => {
      qrcode.print()
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
