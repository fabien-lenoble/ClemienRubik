import { ref } from "vue";
import type { Ref } from "vue";
import type { Seed } from "./types";

const baseSessionSeed: Ref<Seed> = ref(1);
const currentScrambleSeed: Ref<Seed> = ref(1);
const lastGeneratedSeed: Ref<number> = ref(1);

function initSeedValues(seed: Seed) {
  if (!isNaN(Number(seed))) {
    seed = Number(seed);
  } else if (typeof seed === "string") {
    seed = parseInt(toHex(seed), 16);
  }
  baseSessionSeed.value = seed;
  lastGeneratedSeed.value = seed;
}

function generateNewSeed() {
  lastGeneratedSeed.value = (lastGeneratedSeed.value * 16807) % 2147483647;
}

function toHex(str: string) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
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
