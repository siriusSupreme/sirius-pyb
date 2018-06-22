import Vue from 'vue'
import Router from 'vue-router'
import { index } from './children.js'

Vue.use(Router)

// const PATH = '@/pages/index/views/'

let router = new Router({
  mode: 'history',
  base: '/index',
  routes: [
    {
      path: '/',
      alias: ['/index'],
      name: 'index',
      caseSensitive: false,
      component: () => import('@/pages/index/views/index/Index.vue'),
      props: true,
      meta: {},
      children: index.default || index,
      beforeEnter: (to, from, next) => {
        // TODO 只在 第一次 进入 该路由时 触发
        next()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve =>
        require(['@/pages/index/views/login/Login.vue'], resolve)
    },
    {
      path: '/*',
      redirect: '/index'
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

router.beforeResolve((to, from, next) => {
  next()
})

router.afterEach((to, from) => {})

export default router
