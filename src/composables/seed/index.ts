import { ref } from "vue";
import type { Ref } from "vue";
import type { Seed } from "./types";

const baseSessionSeed: Ref<Seed> = ref(0);
const currentScrambleSeed: Ref<Seed> = ref(0);
const lastGeneratedSeed: Ref<Seed> = ref(0);

function initSeedValues(seed: number) {
  baseSessionSeed.value = seed;
  lastGeneratedSeed.value = seed;
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
