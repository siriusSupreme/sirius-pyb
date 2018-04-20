
import axios from 'axios'

import config from './config'
import Token from './Token'

const token = new Token(config.tokenKey)
const source = axios.CancelToken.source()

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  // timeout: 5000,
  withCredentials: true,
  responseType: 'json'
})

axiosInstance.interceptors.request.use((options) => {
  const _token = token.getToken()

  if (!_token) {
    // window.location.href = '/login.html'
    source.cancel('请先登录')
  } else {
    options.headers[config.tokenName] = _token
  }

  return options
}, (reason) => {
  alert('request reject')
  return Promise.reject(reason)
})

axiosInstance.interceptors.response.use((response) => {
  const data = response.data

  return data
}, (reason) => {
  alert('response reject')
  return Promise.reject(reason)
})

export default axiosInstance
