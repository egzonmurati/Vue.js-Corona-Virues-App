import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Kosovo from "../views/Kosovo.vue";
import Maps from "../views/Map.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/ks",
    name: "Kosovo",
    component: Kosovo
  },
   {
    path: "/map",
    name: "Maps",
    component: Maps
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }

];

const router = new VueRouter({
  routes
});


export default router;
