
// eslint-disable-next-line
import config from './config'

class Token {
  constructor () {
    this.getTokenFromLocal()
  }

  getTokenFromServer () {

  }

  getTokenFromLocal () {
    const token = localStorage.getItem('dsw-token')

    return token
  }

  verifyToken () {

  }
}

export default Token
