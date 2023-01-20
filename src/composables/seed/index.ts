import { ref } from "vue";
import type { Ref } from "vue";
import type { Seed } from "./types";
import { useRoute } from "vue-router";

const baseSessionSeed: Ref<Seed> = ref(0);
const lastGeneratedSeed: Ref<Seed> = ref(0);

export function useSeed() {
  function initSeedValues() {
    const route = useRoute();
    baseSessionSeed.value = Number(route.params.seed);
    lastGeneratedSeed.value = baseSessionSeed.value;
  }

  // from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
  // (based on the Mulberry32 algorithm)
  function generateNewSeed() {
    let t = (lastGeneratedSeed.value += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    const random = Math.floor((t ^ (t >>> 14)) >>> 0);
    lastGeneratedSeed.value = random;
  }

  return {
    baseSessionSeed,
    lastGeneratedSeed,
    initSeedValues,
    generateNewSeed,
  };
}
