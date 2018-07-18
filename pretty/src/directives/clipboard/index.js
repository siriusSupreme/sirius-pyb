import Clipboard from './Clipboard'

const install = function (Vue) {
  Vue.directive('Clipboard', Clipboard)
}

if (window.Vue) {
  window.Clipboard = Clipboard
  Vue.use(install) // eslint-disable-line
}

Clipboard.install = install
export default Clipboard
