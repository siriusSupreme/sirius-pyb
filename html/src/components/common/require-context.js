import Vue from 'vue'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// Require in a base component context
const requireContext = require.context('./', true, 'index\.js$')
requireContext.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireContext(fileName)
  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  // Register component globally
  Vue.component(componentName, componentConfig.default || componentConfig)
})
