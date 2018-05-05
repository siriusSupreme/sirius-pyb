
import axios from 'axios'
// import axios from 'axios-jsonp-pro'

import config from './config'
import Token from './Token'
import toastr from './toastr'
import VerifyResponse from './VerifyResponse'

const token = new Token(config.tokenKey)
const verifyResponse = new VerifyResponse()
const source = axios.CancelToken.source()

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === config.env ? 'http://rap2api.taobao.org/app/mock/10074/' : config.baseURL,
  timeout: process.env.NODE_ENV === config.env ? 0 : 6000,
  withCredentials: true,
  responseType: 'json',
  cancelToken: source.token,
  transformRequest (data, header) {
    const dataArray = Object.entries(data).map((val) => {
      return val[0] + '=' + val[1]
    })

    return dataArray.join('&')
  }
})

// 请求拦截器
axiosInstance.interceptors.request.use((options) => {
  options.headers[config.tokenName] = token.getToken(source)

  return options
}, (reason) => {
  toastr.error('Request Error')
  return Promise.reject(reason)
})

// 响应拦截器
axiosInstance.interceptors.response.use((response) => {
  const result = response.data || JSON.parse(response.request.responseText)

  if (verifyResponse.verify(result)) {
    return Promise.resolve(result)
  } else {
    return Promise.reject(result)
  }
}, (reason) => {
  toastr.error('JSON Response Error')
  return Promise.reject(reason)
})

export default {...axiosInstance}
