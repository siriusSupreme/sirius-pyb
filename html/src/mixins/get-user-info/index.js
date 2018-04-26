
export default {
  methods: {
    getUserInfo () {
      const userInfo = localStorage.getItem('dsw-user-info')
      if (!userInfo) {
        return this.$https.jsonp(this.$api.getUserInfo).then((result) => {
          const userInfo = result.data
          localStorage.setItem('dsw-user-info', userInfo)
          return Promise.resolve(userInfo)
        }).catch((reason) => {
          return Promise.reject(reason)
        })
      } else {
        return Promise.resolve(userInfo)
      }
    }
  }
}
