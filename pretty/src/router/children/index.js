export default [
  {
    path: 'link/:id',
    component: () => import('@/views/index/Link.vue'),
    props: true,
    beforeEnter: (to, from, next) => {
      // TODO 只在 第一次 进入 该路由时 触发
      console.log('link-beforeEnter')
      next()
    }
  }
]
