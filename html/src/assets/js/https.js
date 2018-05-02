
import Vue from 'vue'
import jsonp from 'jsonp'

import config from './config'
import axios from './axios'
import toastr from './toastr'
import Token from './Token'

const token = new Token(config.tokenKey)

let https = axios

https.jsonp = (url, options) => {
  let queryString = ''

  options = options || {}

  const _token = token.getToken()
  if (_token) {
    options.params = options.params || {}
    options.params[config.tokenName] = _token
  } else if (!/\/login.html$/.test(window.location.href)) {
    return Promise.reject(new Error('请先登录'))
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

  let promise = new Promise((resolve, reject) => {
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

  promise = promise.catch(reason => {
    toastr.error('JSONP Request Error')
    return Promise.reject(reason)
  })

  return promise
}

if (process.env.NODE_ENV === config.env) {
  https.jsonp = https.get
}

Vue.prototype.$https = https

export default {...https}
