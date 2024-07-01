import { useScramble } from "@/composables/scramble";
import { useSeed } from "@/composables/seed";
import type { Seed } from "@/composables/seed/types";
import { useSession } from "@/composables/session";
import ScrambleView from "@/views/ScrambleView.vue";
import SettingsView from "@/views/SettingsView.vue";
import SolveHistoryView from "@/views/SolveHistoryView.vue";
import TrainingView from "@/views/TrainingView.vue";
import Training3bldView from "@/views/training/Training3bld.vue";
import Training3bldResultsView from "@/views/training/Training3bldResults.vue";
import TrainingPllRecognition from "@/views/training/TrainingPllRecognition.vue";
import { createRouter, createWebHistory } from "vue-router";

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
    {
      path: "/solves",
      name: "solves",
      component: SolveHistoryView,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
    {
      path: "/training",
      name: "training",
      component: TrainingView,
    },
    {
      path: "/training/3bld",
      name: "training-3bld",
      component: Training3bldView,
    },
    {
      path: "/training/3bld/results",
      name: "training-3bld-results",
      component: Training3bldResultsView,
    },
    {
      path: "/training/pll-recognition",
      name: "training-pll-recognition",
      component: TrainingPllRecognition,
    },
  ],
});

function redirectToScramblePage() {
  const { sessionSolves } = useSession();
  const { currentScrambleIndex, generateScramble } = useScramble();
  const { initSeedValues } = useSeed();
  let seed: Seed = Math.floor(Math.random() * 2147483647);
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
