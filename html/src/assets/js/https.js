import Vue from 'vue'
import jsonp from 'jsonp'

import config from './config'
import axios from './axios'

let https = axios

https.jsonp = (url, options) => {
  let queryString = ''

  const token = localStorage.getItem(config.tokenKey)
  // token 不存在 且 不是登录页发出的请求
  if (!token && !/\/login.html$/.test(window.location.href)) {
    window.location.href = '/login.html'
    return false
  } else if (token) {
    options.params = options.params || {}
    options.params[config.tokenName] = token
  }

  // 处理 url
  if (!url.startsWith('http')) {
    url = axios.defaults.baseURL + url
  }
  // 处理参数
  if (options.params) {
    for (let k in options.params) {
      queryString += ('&' + k + '=' + options.params[k])
    }
  }

  if (url.includes('?')) {
    url += queryString
  } else {
    url += ('?' + queryString.substr(1))
  }

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    const cancel = jsonp(url, {
      prefix: options.prefix, // 前缀
      name: options.name, // callback value
      param: options.param || 'callback', // callback key
      timeout: options.timeout || axios.defaults.timeout || 10000
    }, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

Vue.prototype.$https = https

export default {...https}
