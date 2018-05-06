
import Upload from './Upload'

export default {
  bind (el, binding, vnode) {
    const upload = new Upload(el, binding, vnode)

    el.setAttribute('web-uploader', upload)
  },
  inserted (el, binding, vnode) {

  },
  update (el, binding, vnode, oldVnode) {

  },
  componentUpdated (el, binding, vnode, oldVnode) {

  },
  unbind (el, binding, vnode) {
    const upload = el.getAttribute('web-uploader')

    upload.destroy()

    el.removeAttribute('web-uploader')
  }
}
