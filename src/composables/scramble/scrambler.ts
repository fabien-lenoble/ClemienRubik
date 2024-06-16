import { ref } from "vue";
import type { Ref } from "vue";
import type { DisplayScramble, Scramble } from "./types";
import { useRoute } from "vue-router";
import { useSeed } from "@/composables/seed";
import { Scrambow } from "scrambow";

const {
  baseSessionSeed,
  currentScrambleSeed,
  lastGeneratedSeed,
  generateNewSeed,
  castSeedToNumber,
} = useSeed();

const currentScrambleIndex: Ref<number> = ref(0);
const numberOfMoves: Ref<number> = ref(20);
const currentScramble: Ref<Scramble> = ref([]);
const scramblesHistory: Ref<Scramble[]> = ref([]);

function initScrambleValues() {
  const route = useRoute();
  const scrambleIndex = Number(route.params.scrambleIndex);
  goToScrambleIndex(scrambleIndex);
  currentScrambleIndex.value = scrambleIndex;
}

// function to go to a specific scramble in the seeded session
function goToScrambleIndex(scrambleIndex: number) {
  lastGeneratedSeed.value = castSeedToNumber(baseSessionSeed.value);
  for (let i = 0; i < scrambleIndex; i++) {
    goToNextScramble();
  }
}

function goToNextScramble() {
  if (currentScramble.value.length > 0) {
    // add current scramble to the history
    scramblesHistory.value.push(currentScramble.value);
  }
  currentScrambleSeed.value = lastGeneratedSeed.value;
  generateScramble();
}

function generateScramble() {
  const scramble = new Scrambow()
    .setSeed(Number(currentScrambleSeed.value))
    .setLength(20)
    .get(1)[0];

  currentScramble.value = scramble.scramble_string
    .trim()
    .split(" ") as Scramble;

  generateNewSeed();
}

function stringifiedScramble(scramble: Scramble): DisplayScramble {
  return scramble.join(" ");
}

function lastNScrambles(n: number) {
  const nScrambles = scramblesHistory.value.slice(-n);
  return nScrambles.reverse();
}

export default {
  numberOfMoves,
  initScrambleValues,
  currentScramble,
  generateScramble,
  stringifiedScramble,
  currentScrambleIndex,
  goToNextScramble,
  scramblesHistory,
  lastNScrambles,
};
