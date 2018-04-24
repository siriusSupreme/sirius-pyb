
export default {
  beforeCreate () {
    const token = localStorage.getItem('dsw-token-info')
    if (!token) {
      top.location.href = '/login.html'
    }
  }
}
