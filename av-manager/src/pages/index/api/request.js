/* eslint-disable-next-line */
import { Url, Http, Resource } from 'vue-resource'

import Token from '@/utils/Token'
import { TOKEN_KEY, TOKEN_NAME } from '../config'
import { Loading } from 'element-ui'

const token = new Token(TOKEN_KEY)

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

  next()
}

Http.interceptors.push((request, next) => {
  let _token = token.getToken()
  if (_token) {
    request.headers.set(TOKEN_NAME, _token)
  }

  loadingInstance = Loading.service()

  next(response => {
    loadingInstance.close()
    return response
  })
})

export default Http
