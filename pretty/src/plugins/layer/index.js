import merge from 'lodash/merge'
import layer from 'layui-src/src/lay/modules/layer'
import 'layui-src/src/css/modules/layer/default/layer.css'
import './layer.styl'

export default {
  install (Vue) {
    layer.openComponent = function (componentName, componentOptions = {}, layerOptions = {}) {
      const Component = Vue.extend(componentName)
      const component = new Component(componentOptions)

      // const documentFragment = window.document.createDocumentFragment()
      // const tempWrapper = window.document.createElement('div')

      // documentFragment.appendChild(tempWrapper)
      // tempWrapper.appendChild(component.$mount().$el)

      let end = layerOptions.end
      end && delete layerOptions.end

      process.env.NODE_ENV === 'development' ? console.log(component) : void (0)

      return this.open(merge({}, {
        type: 1,
        title: false,
        // content: 'tempWrapper.innerHTML',
        skin: 'gs-layer',
        area: ['80%', '80%'],
        resize: false,
        scrollbar: false,
        success (layero, index) {
          layero.find('.layui-layer-content').append(component.$mount().$el)
        },
        end () {
          end && typeof end === 'function' && end()
          component.$destroy()
        }
      }, layerOptions))
    }

    Vue.$layer = layer
    Vue.prototype.$layer = layer
  }
}
