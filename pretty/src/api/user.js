import request from '@/utils/request'

export function loginByCardNo (cardNo) {
  return request({
    url: '/LoginRpc/icCardLogin.json',
    method: 'get',
    params: {cardNo}
  })
}

export function getUserInfoByToken (token) {
  return request({
    url: '/User/getCurrentUser.json',
    method: 'get',
    params: {token}
  })
}
