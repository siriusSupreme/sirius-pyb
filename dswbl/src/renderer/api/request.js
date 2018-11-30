import axios from 'axios'
import qs from 'qs'

import {
  BASE_URL,
  REQUEST_TIMEOUT,
  API_PREFIX,
  TOKEN_KEY,
  TOKEN_NAME
} from '@/config/renderer'

import {
  Message
} from 'element-ui'

import Token from '@/utils/token'

const MEGA = 1024 * 1024
// const cancel = axios.CancelToken.source().cancel
const token = new Token(TOKEN_KEY)
const CONTENT_TYPE = 'Content-Type'
const CONTENT_TYPE_JSON = 'application/json;charset=UTF-8'
const CONTENT_TYPE_URLENCODED = 'application/x-www-form-urlencoded'
const CONTENT_TYPE_FORM = 'multipart/form-data'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  transformRequest: [
    (data, headers) => {
      if (headers[ CONTENT_TYPE ] === CONTENT_TYPE_URLENCODED) {     
        return qs.stringify(data)
      } else {
        return JSON.stringify(data)
      }
    }
  ],
  paramsSerializer: params => {
    params = params || {}
    params._cache = Math.random()

    return qs.stringify(params)
  },
  maxContentLength: MEGA * 1
})

axiosInstance.interceptors.request.use(
  options => {
    // 请求头
    let _token = token.get()
    if (_token) {
      options.headers[TOKEN_NAME] = _token
    }

    if (options.contentType === 'json') {
      options.headers[ CONTENT_TYPE ] = CONTENT_TYPE_JSON
    } else if (options.contentType === 'form-data') {
      options.headers[ CONTENT_TYPE ] = CONTENT_TYPE_FORM
    } else {
      options.headers[ CONTENT_TYPE ] = CONTENT_TYPE_URLENCODED
    }

    return options
  },
  error => {
    error = throwError(error)
    Message.error(error.message)
    return Promise.reject(throwError(error))
  }
)

axiosInstance.interceptors.response.use(
  response => {
    let result = response.data || response.request.responseText

    try {
      result = JSON.parse(result)
    } catch (e) {
      // Promise.reject(e)
    }

    if (!result || result.code) {
      if (result && result.code) {
        Message.error(result.msg)
      }
      return Promise.reject(throwError(result))
    } else {
      result.data = result.data || {}
      return Promise.resolve(result)
    }
  },
  error => {
    if (!(error instanceof axios.Cancel)) {
      Message.error({
        message: error.message
      })
    }

    return Promise.reject(throwError(error))
  }
)

function throwError (e) {
  e = e || {}
  return {
    errorCode: e.code || 20181122,
    message: e.message || e.msg || '后台服务异常或不稳定',
    data: e.data || {},
    e
  }
}

export default axiosInstance
