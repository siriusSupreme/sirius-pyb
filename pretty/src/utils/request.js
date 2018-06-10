import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getToken } from '@/utils/auth-token'

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.18:8095/caseManager/'
})

let loadingInstance = null

axiosInstance.interceptors.request.use(options => {
  let token = getToken()
  if (token) {
    options.headers['token'] = token
  }

  loadingInstance = Loading.service()

  options.params = options.params || {}
  options.params._cache = Math.random()

  return options
}, error => {
  Message.error({
    message: error.message
  })
})

axiosInstance.interceptors.response.use(response => {
  loadingInstance.close()
  return response.data
}, error => {
  loadingInstance.close()
  Message.error({
    message: error.message
  })
})

export default axiosInstance
