import Vue from 'vue'
import Router from 'vue-router'

Vue.use( Router )

export default new Router( {
  mode: 'hash',
  routes: [ {
      path: '/',
      name: 'login',
      component: require( '@/pages/login/Login.vue' ).default
    },
    {
      path: '/main',
      name: 'main',
      component: require( '@/pages/main/Main.vue' ).default
    },
    {
      path: '/templateManage',
      name: 'templateManage',
      component: require( '@/pages/template-manage/TemplateManage.vue' ).default
    },
    {
      path: '/templateEditor',
      name: 'templateEditor',
      component: require( '@/pages/template-editor/TemplateEditor.vue' ).default
    },
    {
      path: '/take-down-make/:typeId/:inquiryId?',
      name: 'take-down-make',
      component: () => import( '@/pages/take-down-make/TakeDownMake.vue' ),
      props: route => ( {
        ...route.query,
        ...route.params
      } )
    },
    {
      path: '/take-down-query',
      name: 'take-down-query',
      component: () => import( '@/pages/take-down-query/TakeDownQuery.vue' )
    },
    // {
    //   path: '/404',
    //   name: '404',
    //   component: require('@/pages/404/404.vue').default
    // },
    // {
    //   path: '*',
    //   redirect: '/404'
    // },
    {
      path: '*',
      redirect: '/'
    }
  ]
} )
