import config from './config'

class Token {
  constructor () {

  }

  getTokenFromServer(){

  }

  getTokenFromLocal () {

    const token = localStorage.getItem('dsw-token');

    return token;
  }

  verifyToken () {

  }
}


export default Token
