import axios from 'axios'
import qs from 'qs'

import Token from '@/utils/Token'
import { Message, Loading } from 'element-ui'

const MEGA = 1024 * 1024
const CancelToken = axios.CancelToken
const source = CancelToken.source()
const token = new Token(process.env.TOKEN_KEY)

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 0,
  transformRequest: [
    (data, headers) => {
      return data
    }
  ],
  transformResponse: [
    response => {
      return response
    }
  ],
  paramsSerializer: params => {
    params = params || {}
    params._cache = Math.random()

    return qs.stringify(params)
  },
  responseType: 'json',
  withCredentials: false,
  maxContentLength: MEGA * 1,
  cancelToken: source.token
})

let loadingInstance = null

axiosInstance.interceptors.request.use(
  options => {
    let _token = token.getToken()
    if (_token) {
      options.headers[process.env.TOKEN_NAME] = _token
    }

    loadingInstance = Loading.service()

    return options
  },
  error => {
    Message.error({
      message: error.message
    })
  }
)

axiosInstance.interceptors.response.use(
  response => {
    loadingInstance.close()
    return response.data
  },
  error => {
    loadingInstance.close()
    Message.error({
      message: error.message
    })
  }
)

export default axiosInstance
