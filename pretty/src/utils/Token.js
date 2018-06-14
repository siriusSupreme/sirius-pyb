import Cookies from 'js-cookie'

class Token {
  constructor (tokenKey) {
    this.tokenKey = tokenKey
  }

  getToken () {
    return Cookies.get(this.tokenKey)
  }

  setToken (token) {
    return Cookies.set(this.tokenKey, token)
  }

  removeToken () {
    return Cookies.remove(this.tokenKey)
  }
}

export default Token
