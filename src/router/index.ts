import { createRouter, createWebHistory } from "vue-router";
import ScrambleView from "@/views/ScrambleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/scramble/:seed/:scrambleIndex",
      name: "scramble",
      component: ScrambleView,
    },
  ],
});

export default router;
