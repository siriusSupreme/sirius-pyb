
export default {
  methods: {
    getCurrentUserInfo () {
      const userInfo = localStorage.getItem('dsw-user-info')
      if (!userInfo) {
        return this.$https.jsonp(this.$api.getCurrentUserInfo).then((result) => {
          const userInfo = result.data
          localStorage.setItem('dsw-user-info', JSON.stringify(userInfo))
          return Promise.resolve(userInfo)
        }).catch((reason) => {
          return Promise.reject(reason)
        })
      } else {
        return Promise.resolve(JSON.parse(userInfo))
      }
    }
  }
}
