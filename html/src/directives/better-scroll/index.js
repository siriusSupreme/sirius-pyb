
import BScroll from 'better-scroll'

export default {
  bind (el, binding, vnode) {
    const betterScroll = new BScroll(el, {
      mouseWheel: true,
      scrollbar: true
    })

    el.setAttribute('dsw-better-scroll', betterScroll)
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
