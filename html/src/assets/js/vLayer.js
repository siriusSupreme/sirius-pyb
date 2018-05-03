import Vue from 'vue'

import layer from './layer'

let vLayer = {
  openPage (componentName, componentOptions = {}, extraParams = {}, layerOptions = {}) {
    const Component = Vue.extend(componentName)
    const component = new Component(componentOptions)
    component.extraParams = extraParams

    // const documentFragment = window.document.createDocumentFragment()
    // const tempWrapper = window.document.createElement('div')

    // documentFragment.appendChild(tempWrapper)
    // tempWrapper.appendChild(component.$mount().$el)

    return layer.open(Object.assign({
      type: 1,
      title: false,
      // content: 'tempWrapper.innerHTML',
      area: ['80%', '80%'],
      resize: false,
      scrollbar: false,
      success (layero, index) {
        layero.find('.layui-layer-content').append(component.$mount().$el)
      }
    }, layerOptions))
  }
}

Vue.prototype.$vLayer = vLayer

export default vLayer
