import Vue from 'vue'

import layer from './layer'

let vLayer = {
  openPage (componentName, componentOptions = {}, extraParams = {}) {
    const Component = Vue.extend(componentName)
    const component = new Component(componentOptions)
    component.extraParams = extraParams

    // const documentFragment = window.document.createDocumentFragment()
    const tempWrapper = window.document.createElement('div')

    // documentFragment.appendChild(tempWrapper)
    tempWrapper.appendChild(component.$mount().$el)

    return layer.open({
      type: 1,
      title: false,
      content: tempWrapper.innerHTML,
      area: ['80%', '80%'],
      resize: false,
      scrollbar: false
    })
  }
}

Vue.prototype.$vLayer = vLayer

export default vLayer
