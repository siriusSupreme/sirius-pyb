
export default {
  // 保存在 localStorage 中的 key
  tokenKey: 'dsw-token-info',
  // 发送给后端的 header key
  tokenName: 'token',
  // 请求基地址
  baseURL: 'http://192.168.0.188:8095/caseManager/',
  // 接口定义
  api: {
    login: 'LoginRpc/login.json'
  }
}
