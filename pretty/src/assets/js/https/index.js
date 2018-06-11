import Vue from 'vue'
import axios from 'axios'
import VueResource from 'vue-resource'

let fetch = void 0
let index = Object.create(null)
let methods = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'head',
  'options',
  'jsonp'
]

if ('withCredentials' in new window.XMLHttpRequest()) {
  fetch = axios.request
} else {
  Vue.use(VueResource)
  fetch = Vue.http
}

methods.forEach(method => {
  index[method] = (url, data = {}, config = {}) => {
    let options = getOptions(url, data, config)
    return new Promise((resolve, reject) => {
      fetch(options)
    })
      .catch(reason => {})
      .then(result => {})
  }
})

function getOptions () {}

Vue.prototype.$https = index

export default index
