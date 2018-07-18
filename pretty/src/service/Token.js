import Cookies from 'js-cookie'

const PREFIX = 'gs-'

class Token {
  constructor (tokenKey, namespace = '') {
    this.namespace = PREFIX + (namespace ? `${namespace}-` : '')
    this.tokenKey = this.namespace + tokenKey
  }

  get (all = false) {
    return all === true ? Cookies.get() : Cookies.get(this.tokenKey)
  }

  getJson () {
    return Cookies.getJSON(this.tokenKey)
  }

  set () {
    return Cookies.set.apply(Cookies, [this.tokenKey].concat(Array.from(arguments)))
  }

  remove () {
    return Cookies.remove.apply(Cookies, [this.tokenKey].concat(Array.from(arguments)))
  }
}

export default Token
