import Vue from 'vue'
import Router from 'vue-router'

import { getToken } from '@/utils/auth-token'

Vue.use(Router)

let _import = require('./import-' + process.env.NODE_ENV)

let router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      alias: ['/index'],
      name: 'index',
      caseSensitive: false,
      component: _import('index/Index'),
      props: true,
      meta: {},
      children: (require => {
        return require.keys().map(key => {
          let route = require(key)
          return route.default || route
        })
      })(require.context('./children', false, /[\w-]+.js$/)),
      beforeEnter: (to, from, next) => {
        // TODO 只在 第一次 进入 该路由时 触发
        next()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: _import('login/Login')
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: _import('cabinet/Cabinet')
    },
    {
      path: '/dossier',
      name: 'dossier',
      component: _import('dossier/Dossier')
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
