import axios from 'axios'

// 定义一个类
class Token {
  constructor (tokenName) {
    this.tokenName = tokenName
  }

  getTokenFromServer () {
    axios.get('').then(function (result) {

    }).catch(function (reason) {

    })
  }

  getToken () {
    const token = localStorage.getItem(this.tokenName)

    return token
  }

  verifyToken () {

  }
}

// 导出该类
export default Token
