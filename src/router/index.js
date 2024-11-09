import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Prueba from "../views/Prueba.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/prueba",
      name: "prueba",
      component: Prueba,
    },
  ],
});

export default router;
