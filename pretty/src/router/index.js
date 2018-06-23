import Vue from 'vue'
import Router from 'vue-router'
import {
  index
} from './children.js'

Vue.use(Router)

let _import = require('./import-' + process.env.NODE_ENV)

let router = new Router({
  mode: 'history',
  base: '/root',
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
    path: '/',
    alias: ['/index'],
    name: 'index',
    caseSensitive: false,
    component: _import('index/Index'),
    props: true,
    meta: {},
    children: index.default || index,
    beforeEnter: (to, from, next) => {
      // TODO 只在 第一次 进入 该路由时 触发
      console.log('index-beforeEnter')
      next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: _import('login/Login'),
    beforeEnter: (to, from, next) => {
      // TODO 只在 第一次 进入 该路由时 触发
      console.log('login-beforeEnter')
      next()
    }
  },
  {
    path: '/cabinet',
    name: 'cabinet',
    component: _import('cabinet/Cabinet'),
    beforeEnter: (to, from, next) => {
      // TODO 只在 第一次 进入 该路由时 触发
      console.log('cabinet-beforeEnter')
      next()
    }
  },
  {
    path: '/dossier',
    name: 'dossier',
    component: _import('dossier/Dossier'),
    beforeEnter: (to, from, next) => {
      // TODO 只在 第一次 进入 该路由时 触发
      console.log('dossier-beforeEnter')
      next()
    }
  },
  {
    path: '/*',
    redirect: '/index'
  }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach')
})

export default router
