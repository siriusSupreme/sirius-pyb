import config from 'assets/js/config'

export default {
  beforeCreate () {
    const token = localStorage.getItem(config.tokenKey)
    if (!token) {
      top.location.href = '/login.html'
    }
  }
}
