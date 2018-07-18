import Waves from './Waves'

const install = function (Vue) {
  Vue.directive('Waves', Waves)
}

if (window.Vue) {
  window.Waves = Waves
  Vue.use(install) // eslint-disable-line
}

Waves.install = install
export default Waves
