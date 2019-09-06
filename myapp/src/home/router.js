import Vue from "vue";
import Router from "vue-router";
import index from "./views/index.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/hello",
      name: "hello",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/hello.vue")
    }
  ]
});
