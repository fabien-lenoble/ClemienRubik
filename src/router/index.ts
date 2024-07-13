import { useScramble } from "@/composables/scramble";
import { useSeed } from "@/composables/seed";
import type { Seed } from "@/composables/seed/types";
import { useSession } from "@/composables/session";
import ScrambleView from "@/views/ScrambleView.vue";
import SettingsView from "@/views/SettingsView.vue";
import SolveHistoryView from "@/views/SolveHistoryView.vue";
import Training3bldMemoCornersView from "@/views/Training/3bld/Memo/Corners.vue";
import Training3bldMemoCornersResultsView from "@/views/Training/3bld/Memo/CornersResults.vue";
import Training3bldRecognitionCornersResultsView from "@/views/Training/3bld/Recognition/Corners.vue";
import TrainingPllRecognition from "@/views/Training/TrainingPllRecognition.vue";
import TrainingView from "@/views/TrainingView.vue";
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
      path: "/training/3bld/memo/corners",
      name: "training-3bld-memo-corners",
      component: Training3bldMemoCornersView,
    },
    {
      path: "/training/3bld/memo/corners/results",
      name: "training-3bld-memo-corners-results",
      component: Training3bldMemoCornersResultsView,
    },
    {
      path: "/training/3bld/recognition/corners",
      name: "training-3bld-recognition-corners",
      component: Training3bldRecognitionCornersResultsView,
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
