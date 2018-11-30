import axios from './request'

export function login (userName, passWord) {
  return axios({
    method: 'POST',
    url: '/LoginRpc/login',
    data: {
      userName: userName,
      passWord: passWord
    }
  })
}

export function getCurrentUser () {
  return axios({
    method: 'GET',
    url: '/UserRpc/getCurrentUser',
  })
}
