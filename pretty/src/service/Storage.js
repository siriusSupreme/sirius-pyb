import Cookies from 'js-cookie'

const PREFIX = 'gs-'

class Storage {
  storage = null
  tradition = false

  constructor (namespace = '', permanent = true) {
    if (permanent === true) {
      if ('localStorage' in window && window['localStorage'] !== null) {
        this.storage = window.localStorage
      } else if ('cookie' in document && document['cookie'] !== null) {
        this.tradition = true
        this.storage = Cookies
      }
    } else if ('sessionStorage' in window && window['sessionStorage'] !== null) {
      this.storage = window.sessionStorage
    }

    if (this.storage === null) {
      throw new Error('您的环境暂不支持本地存储！！！')
    }

    this.namespace = PREFIX + (namespace ? `${namespace}-` : '')
  }

  get (key) {
    let val = null
    if (key !== undefined && key !== null) {
      key = this.namespace + key
      val = this.tradition ? this.storage.get(key) : this.storage.getItem(key)

      try {
        val = JSON.parse(val)
      } catch (e) {}
    } else {
      try {
        val = this.storage.get()
      } catch (e) {
        val = this.storage
      }
    }

    return val
  }

  set (key, val) {
    try {
      val = JSON.stringify(val)
    } catch (e) {}
    key = this.namespace + key
    this.tradition ? this.storage.set(key, val) : this.storage.setItem(key, val)
  }

  remove (key, innerUse = false) {
    key = innerUse ? key : this.namespace + key
    this.tradition ? this.storage.remove(key) : this.storage.removeItem(key)
  }

  clear () {
    let items = this.get()

    Object.keys(items).forEach(key => {
      if (key.startsWith(this.namespace)) this.remove(key, true)
    })
  }
}

export default Storage
