import { createRouter, createWebHistory } from "vue-router";
import ScrambleView from "@/views/ScrambleView.vue";
import { useSession } from "@/composables/session";
import { useScramble } from "@/composables/scramble";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: redirectToScramblePage(),
    },
    {
      path: "/scramble/:seed/:scrambleIndex",
      name: "scramble",
      component: ScrambleView,
    },
  ],
});

function redirectToScramblePage() {
  const { sessionSolves } = useSession();
  const { currentScrambleIndex } = useScramble();
  const firstSessionSolve = sessionSolves.value[0];
  let seed = Math.floor(Math.random() * 10000000000000);
  let scrambleIndex = 1;
  if (firstSessionSolve) {
    seed = firstSessionSolve.seed;
    scrambleIndex = currentScrambleIndex.value;
  }
  return `/scramble/${seed}/${scrambleIndex}`;
}

export default router;
