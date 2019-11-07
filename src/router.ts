import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/form",
      name: "form",
      component(resolve) {
        return require(["./views/form.vue"], resolve);
      }
    },
    {
      path: "/bus",
      name: "bus",
      component(resolve) {
        return require(["./views/bus.vue"], resolve);
      }
    },
    {
      path: "/service",
      name: "service",
      component(resolve) {
        return require(["./views/service.vue"], resolve);
      }
    }
  ]
});
