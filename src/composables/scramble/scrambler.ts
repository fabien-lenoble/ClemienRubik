import { ref } from "vue";
import type { Ref } from "vue";
import type { DisplayScramble, MoveSet, Scramble, SubMoveSet } from "./types";
import { useRoute } from "vue-router";
import { useSeed } from "@/composables/seed";

const {
  baseSessionSeed,
  currentScrambleSeed,
  lastGeneratedSeed,
  generateNewSeed,
} = useSeed();

const currentScrambleIndex: Ref<number> = ref(0);
const numberOfMoves: Ref<number> = ref(20);
const currentScramble: Ref<Scramble> = ref([]);
const scramblesHistory: Ref<Scramble[]> = ref([]);

const moveSet: MoveSet = [
  ["U", "U'", "U2"],
  ["D", "D'", "D2"],
  ["F", "F'", "F2"],
  ["B", "B'", "B2"],
  ["L", "L'", "L2"],
  ["R", "R'", "R2"],
];

function initScrambleValues() {
  const route = useRoute();
  goToScrambleIndex(Number(route.params.scrambleIndex));
}

// function to go to a specific scramble in the seeded session
function goToScrambleIndex(scrambleIndex: number) {
  lastGeneratedSeed.value = baseSessionSeed.value;
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
  currentScramble.value = generateScramble();
  currentScrambleIndex.value++;
}

function generateScramble() {
  const scramble: Scramble = [];
  let currentSubMoveSetIndex = 0;
  let lastSubMoveSetIndex = 0;
  let secondToLastSubMoveSetIndex = 0;
  let currentSubMoveSet = null;

  // iterate user requested "numberOfMove" times
  for (let i = 0; i < numberOfMoves.value; i++) {
    ({ currentSubMoveSetIndex, currentSubMoveSet } = pickSubMoveSetIndex(
      currentSubMoveSetIndex,
      lastSubMoveSetIndex,
      secondToLastSubMoveSetIndex
    ));

    const move = pickMoveFromSubMoveSet(currentSubMoveSet);
    scramble.push(move);

    // store used sub move set indexes to make sure we don't use them in next iterations
    secondToLastSubMoveSetIndex = lastSubMoveSetIndex;
    lastSubMoveSetIndex = currentSubMoveSetIndex;
  }
  return scramble;
}

function pickSubMoveSetIndex(
  currentSubMoveSetIndex: number,
  lastSubMoveSetIndex: number,
  secondToLastSubMoveSetIndex: number
) {
  // check if current sub move set is the same as the previous one
  // (to avoid having the same letter 2+ consecutive times in the scramble
  // OR 3 letters of the same 'opposite group' in a row, like F2 B F2 could actually
  // be simplified as B for example because F and B, being opposite, do not alter each other's face)
  while (
    shouldRePickMoveSet(
      currentSubMoveSetIndex,
      lastSubMoveSetIndex,
      secondToLastSubMoveSetIndex
    )
  ) {
    // while it is, generate a new random seed and pick a new sub move set
    generateNewSeed();
    currentSubMoveSetIndex = lastGeneratedSeed.value % moveSet.length;
  }
  const currentSubMoveSet = moveSet[currentSubMoveSetIndex];
  return { currentSubMoveSetIndex, currentSubMoveSet };
}

function shouldRePickMoveSet(
  currentSubMoveSetIndex: number,
  lastSubMoveSetIndex: number,
  secondToLastSubMoveSetIndex: number
) {
  let areAllSubMoveSetsFromSameOppositeGroups = false;
  if (
    checkAreAllSubMoveSetsFromSameOppositeGroups(
      [0, 1],
      currentSubMoveSetIndex,
      lastSubMoveSetIndex,
      secondToLastSubMoveSetIndex
    ) ||
    checkAreAllSubMoveSetsFromSameOppositeGroups(
      [2, 3],
      currentSubMoveSetIndex,
      lastSubMoveSetIndex,
      secondToLastSubMoveSetIndex
    ) ||
    checkAreAllSubMoveSetsFromSameOppositeGroups(
      [4, 5],
      currentSubMoveSetIndex,
      lastSubMoveSetIndex,
      secondToLastSubMoveSetIndex
    )
  ) {
    areAllSubMoveSetsFromSameOppositeGroups = true;
  }
  return (
    currentSubMoveSetIndex === lastSubMoveSetIndex ||
    areAllSubMoveSetsFromSameOppositeGroups
  );
}

function checkAreAllSubMoveSetsFromSameOppositeGroups(
  groups: number[],
  currentSubMoveSetIndex: number,
  lastSubMoveSetIndex: number,
  secondToLastSubMoveSetIndex: number
) {
  return groups.every((value) =>
    [
      currentSubMoveSetIndex,
      lastSubMoveSetIndex,
      secondToLastSubMoveSetIndex,
    ].includes(value)
  );
}

function pickMoveFromSubMoveSet(currentSubMoveSet: SubMoveSet) {
  // once we have chosen a different sub move set than the previous one,
  // we want to pick a random move in this set to add it to the scramble
  generateNewSeed();
  return currentSubMoveSet[lastGeneratedSeed.value % currentSubMoveSet.length];
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
