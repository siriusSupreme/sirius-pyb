// eslint-disable-next-line
import axios from 'axios'

// 定义一个类
class Token {
  constructor (tokenName) {
    this.tokenName = tokenName
  }

  getTokenFromServer () {

  }

  getToken (source = null) {
    const token = window.localStorage.getItem(this.tokenName) || ''

    // token 不存在 并且 不是登录页发出的请求
    if (!token && !/\/login.html$/.test(window.location.href)) {
      window.location.href = '/login.html'
      source && window.setTimeout(() => {
        source.cancel('尚未登录')
      }, 0)
    }

    return token
  }

  verifyToken () {

  }
}

// 导出该类
export default Token
