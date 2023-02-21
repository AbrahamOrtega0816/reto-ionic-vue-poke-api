import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/pokeList",
  },
  {
    path: "/pokeDetail/:id",
    component: () => import("@/views/PokeDetail.vue"),
  },
  {
    path: "/pokeList",
    component: () => import("@/views/PokeContainer.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
