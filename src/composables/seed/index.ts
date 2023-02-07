import { ref } from "vue";
import type { Ref } from "vue";
import type { Seed } from "./types";
import { useRoute } from "vue-router";

const baseSessionSeed: Ref<Seed> = ref(0);
const currentScrambleSeed: Ref<Seed> = ref(0);
const lastGeneratedSeed: Ref<Seed> = ref(0);

function initSeedValues() {
  const route = useRoute();
  baseSessionSeed.value = Number(route.params.seed);
  lastGeneratedSeed.value = baseSessionSeed.value;
}

function generateNewSeed() {
  lastGeneratedSeed.value = (lastGeneratedSeed.value * 16807) % 2147483647;
}

export function useSeed() {
  return {
    baseSessionSeed,
    currentScrambleSeed,
    lastGeneratedSeed,
    initSeedValues,
    generateNewSeed,
  };
}
