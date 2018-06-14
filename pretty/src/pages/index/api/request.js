/* eslint-disable-next-line */
import { Url, Http, Resource } from 'vue-resource'

import Token from '@/utils/Token'
import { Loading } from 'element-ui'

const token = new Token(process.env.INDEX_TOKEN_KEY)

let loadingInstance = null

Http.options = {
  responseType: 'json',
  timeout: 0,
  credentials: false,
  emulateHTTP: false,
  emulateJSON: false,
  before (request) {}
}

Http.interceptor.before = (request, next) => {
  request.params._cache = Math.random()

  return next
}

Http.interceptors.push((request, next) => {
  let _token = token.getToken()
  if (_token) {
    request.headers.set(process.env.INDEX_TOKEN_NAME, _token)
  }

  loadingInstance = Loading.service()

  return response => {
    loadingInstance.close()
    return response
  }
})

export default Http
