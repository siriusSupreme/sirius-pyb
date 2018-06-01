import toastr from 'toastr'
import 'toastr/toastr.scss'

export default {
  install (Vue, options = {}) {
    toastr.options = Object.assign({}, {
      debug: process.env !== 'production',
      closeButton: true,
      positionClass: 'toast-top-center',
      progressBar: true,
      timeOut: 1000,
      hideDuration: 500
    }, options)

    Vue.$toastr = toastr
    Vue.prototype.$toastr = toastr
  }
}
