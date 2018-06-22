import axios from 'axios'
import qs from 'qs'

import Token from '@/utils/Token'
import { BASE_URL, API_PREFIX, TOKEN_KEY, TOKEN_NAME } from '../config'
import { Message, Loading } from 'element-ui'

const MEGA = 1024 * 1024
const CancelToken = axios.CancelToken
const source = CancelToken.source()
const token = new Token(TOKEN_KEY)

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/${API_PREFIX}`,
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
      options.headers[TOKEN_NAME] = _token
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
