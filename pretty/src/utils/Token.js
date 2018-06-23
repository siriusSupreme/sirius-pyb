import Cookies from 'js-cookie'

const PREFIX = 'gs-'

class Token {
  constructor (tokenKey) {
    this.tokenKey = PREFIX + tokenKey
  }

  getToken (all = false) {
    return all === true ? Cookies.get() : Cookies.get(this.tokenKey)
  }

  getTokenJson () {
    return Cookies.getJSON(this.tokenKey)
  }

  setToken () {
    return Cookies.set.apply(Cookies, Array.from(arguments).unshift(this.tokenKey))
  }

  removeToken () {
    return Cookies.remove.apply(Cookies, Array.from(arguments).unshift(this.tokenKey))
  }
}

export default Token
