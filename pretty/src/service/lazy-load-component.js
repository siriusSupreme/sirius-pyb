let camelCase = require('lodash/camelCase')
let upperFirst = require('lodash/upperFirst')

module.exports = (prefix, file = prefix) => () => {
  file = upperFirst(camelCase(file))
  return import('@/views/' + prefix + '/' + file + '.vue')
}
