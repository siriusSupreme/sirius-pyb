const TOKEN_NAME_PREFIX = 'bl-'

class Token {
  constructor (TOKENKEY, NAMESPACE = '') {
    this.namespace = TOKEN_NAME_PREFIX + (NAMESPACE ? `${NAMESPACE}-` : '')
    this.tokenkey = this.namespace + TOKENKEY
  }

  get (all = false) {
    return all === true ? window.localStorage.getItem() : window.localStorage.getItem(this.tokenkey)
  }

  set () {
    return window.localStorage.setItem.apply(window.localStorage, [this.tokenkey].concat(Array.from(arguments)))
  }

  remove () {
    return window.localStorage.removeItem.apply(window.localStorage, [this.tokenkey].concat(Array.from(arguments)))
  }
}

export default Token
