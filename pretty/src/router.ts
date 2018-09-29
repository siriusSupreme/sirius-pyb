import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: "/x",
  routes: [
    {
      path: "/a",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/",
      // redirect: "/a"
      alias: "/b",
      component: Home
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  next();
});

export default router;
