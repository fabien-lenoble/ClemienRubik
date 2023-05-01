<script setup lang="ts">
import { ref, computed } from "vue";
import { useSession } from "@/composables/session";
import Solve from "@/components/SolveHistory/Solve.vue";
import BestAoNPicker from "@/components/SolveHistory/BestAoNPicker.vue";
import CubeImage from "@/components/CurrentScramble/CubeImage/index.vue";

const { validSessionSolves, bestAoNIndex } = useSession();

const currentSelectedSolveIndex = ref(0);

const currentSelectedBestAoN = ref(0);
const currentBestAoNIndex = ref(0);

const selectedBestAoNSolves = computed(() => {
  const index = currentBestAoNIndex.value;
  return validSessionSolves.value
    .slice(index, index + currentSelectedBestAoN.value)
    .map((solve) => solve.displayTime);
});

const currentBestAoNMaxIndex = computed(() => {
  const DNFIndex = selectedBestAoNSolves.value.findIndex(
    (solve) => solve === "DNF"
  );
  let index = 0;
  if (DNFIndex >= 0) {
    index = DNFIndex;
  }
  const value = Math.max(
    ...selectedBestAoNSolves.value
      .map((solve) => Number(solve))
      .filter((solve) => !!solve)
  );
  index = selectedBestAoNSolves.value.findIndex(
    (solve) => Number(solve) === value
  );
  return index + currentBestAoNIndex.value;
});

const currentBestAoNMinIndex = computed(() => {
  const value = Math.min(
    ...selectedBestAoNSolves.value
      .map((solve) => Number(solve))
      .filter((solve) => !!solve)
  );
  const index = selectedBestAoNSolves.value.findIndex(
    (solve) => Number(solve) === value
  );
  return index + currentBestAoNIndex.value;
});

const reversedSolves = computed(() => {
  return [...validSessionSolves.value].reverse();
});
const currentSelectedSolve = computed(
  () => reversedSolves.value?.[currentSelectedSolveIndex.value]
);

function updateSelectedBestAoN(n: number) {
  currentSelectedBestAoN.value = n;
  currentBestAoNIndex.value = bestAoNIndex(n, n !== 1);
  if (n === 0) {
    currentSelectedSolveIndex.value = 0;
  } else {
    currentSelectedSolveIndex.value =
      validSessionSolves.value.length - 1 - currentBestAoNIndex.value;
  }

  // scroll to solve
  const element = document.getElementById(
    `solve-${currentSelectedSolveIndex.value - n + 1}`
  );
  element?.scrollIntoView();
}

function isIndexInCurrentBestAoN(index: number) {
  return (
    index >= currentBestAoNIndex.value &&
    index < currentBestAoNIndex.value + currentSelectedBestAoN.value
  );
}

function isWorst(index: number) {
  return (
    ![0, 1].includes(currentSelectedBestAoN.value) &&
    index === currentBestAoNMaxIndex.value
  );
}

function isBest(index: number) {
  return (
    currentSelectedBestAoN.value !== 0 && index === currentBestAoNMinIndex.value
  );
}

function updateSelectedSolve(index: number) {
  currentSelectedSolveIndex.value = index;
}
</script>

<template>
  <template v-if="reversedSolves.length > 0">
    <div>
      {{ currentSelectedSolve.displayScramble }}
    </div>
    <div class="flex justify-between">
      <div class="flex text-4xl">
        {{ currentSelectedSolve.displayTime }}
      </div>
      <div class="flex">
        <cube-image :scramble="currentSelectedSolve.scramble" />
      </div>
    </div>
    <div class="grid grid-cols-3 overflow-y-scroll">
      <solve
        v-for="(solve, index) in reversedSolves"
        :id="`solve-${index}`"
        :key="index"
        :solve="solve"
        :index="index"
        :is-selected="index === currentSelectedSolveIndex"
        :is-best="isBest(validSessionSolves.length - 1 - index)"
        :is-worst="isWorst(validSessionSolves.length - 1 - index)"
        :is-in-best-ao-n="
          isIndexInCurrentBestAoN(validSessionSolves.length - 1 - index)
        "
        @update-selected-solve="updateSelectedSolve"
      />
    </div>
    <div class="items-center">
      <best-ao-n-picker
        @update-selected-best-ao-n="updateSelectedBestAoN"
      ></best-ao-n-picker>
    </div>
  </template>
</template>
