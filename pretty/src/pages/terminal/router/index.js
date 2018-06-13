import Vue from 'vue'
import Router from 'vue-router'

import { getToken } from '@/utils/auth-token'

Vue.use(Router)

// const PATH = '@/pages/index/views/'

let router = new Router({
  mode: 'history',
  base: '/terminal',
  routes: [
    {
      path: '/',
      alias: ['/index'],
      name: 'index',
      caseSensitive: false,
      component: () => import('@/pages/terminal/views/index/Index'),
      props: true,
      meta: {},
      children:
        require('./children/index').default || require('./children/index'),
      beforeEnter: (to, from, next) => {
        // TODO 只在 第一次 进入 该路由时 触发
        next()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve =>
        require(['@/pages/terminal/views/login/Login'], resolve)
    },
    {
      path: '/*',
      redirect: '/index'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !getToken()) {
    next('/login')
  } else {
    next()
  }
})

router.beforeResolve((to, from, next) => {
  next()
})

router.afterEach((to, from) => {})

export default router
