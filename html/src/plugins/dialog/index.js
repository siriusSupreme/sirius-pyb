import Dialog from './Dialog'

export default {
  install (Vue, options) {
    const DswDialog = Vue.extend(Dialog)
    const dswDialog = new DswDialog()
    // const $el = dswDialog.$mount().$el

    Object.defineProperties(Vue.prototype, {
      $openDialog (component, style = {width: '80%', height: '80%'}) {
        dswDialog.component = component
        dswDialog.style = style
        dswDialog.isShow = true
      },
      $closeDialog () {
        dswDialog.isShow = false
      }
    })
  }
}
