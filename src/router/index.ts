import { createRouter, createWebHistory } from "vue-router";
import ScrambleView from "@/views/ScrambleView.vue";
import { useSession } from "@/composables/session";
import { useScramble } from "@/composables/scramble";
import { useSeed } from "@/composables/seed";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: () => redirectToScramblePage(),
    },
    {
      path: "/scramble/:seed/:scrambleIndex",
      name: "scramble",
      component: ScrambleView,
    },
    {
      path: "/join/:seed/:scrambleIndex",
      name: "join",
      component: ScrambleView,
    },
  ],
});

function redirectToScramblePage() {
  const { sessionSolves } = useSession();
  const { currentScrambleIndex, generateScramble } = useScramble();
  const { initSeedValues } = useSeed();
  let seed = Math.floor(Math.random() * 2147483647);
  let scrambleIndex = 1;
  const firstSessionSolve = sessionSolves.value[0];
  // if there is already a first solve existing for the session, get the seed value as it is our base seed for the url
  if (firstSessionSolve) {
    seed = firstSessionSolve.seed;
    scrambleIndex = sessionSolves.value.length + 1;
  } else {
    initSeedValues(seed);
    currentScrambleIndex.value = scrambleIndex;
    generateScramble();
  }

  return `/scramble/${seed}/${scrambleIndex}`;
}

export default router;
