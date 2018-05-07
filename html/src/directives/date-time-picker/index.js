
import $ from 'jquery'
import 'eonasdan-bootstrap-datetimepicker'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'

export default {
  bind (el, binding, vnode) {
    $(el).datetimepicker({
      format: 'YYYY-MM-DD HH:mm:ss',
      sideBySide: true,
      icons: {
        time: 'fa fa-clock-o',
        date: 'fa fa-calendar',
        up: 'fa fa-chevron-up',
        down: 'fa fa-chevron-down',
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-check-circle',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    })
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
