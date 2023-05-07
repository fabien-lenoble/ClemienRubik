<script setup lang="ts">
import { ref, computed } from "vue";
import { useSession } from "@/composables/session";
import Solve from "@/components/SolveHistory/Solve.vue";
import BestAoNPicker from "@/components/SolveHistory/BestAoNPicker.vue";
import SelectedSolve from "@/components/SolveHistory/SelectedSolve.vue";

const { validSessionSolves, bestAoNIndex } = useSession();

const selectedSolveReverseIndex = ref(0);
const selectedBestAoN = ref(0);
const currentBestAoNIndex = ref(0);

const selectedBestAoNSolves = computed(() => {
  const index = currentBestAoNIndex.value;
  return validSessionSolves.value.slice(index, index + selectedBestAoN.value);
});

const currentBestAoNMaxIndex = computed(() => {
  const DNFIndex = selectedBestAoNSolves.value.findIndex(
    (solve) => solve.state === "DNF"
  );
  let index = 0;
  if (DNFIndex >= 0) {
    index = DNFIndex;
  }
  const value = Math.max(
    ...selectedBestAoNSolves.value
      .map((solve) => Number(solve.finalTime))
      .filter((solve) => !!solve)
  );
  index = selectedBestAoNSolves.value.findIndex((solve) => {
    if (DNFIndex >= 0) {
      return solve.state === "DNF";
    } else {
      return Number(solve.finalTime) === value;
    }
  });
  return index + currentBestAoNIndex.value;
});

const currentBestAoNMinIndex = computed(() => {
  const value = Math.min(
    ...selectedBestAoNSolves.value
      .map((solve) => Number(solve.finalTime))
      .filter((solve) => !!solve)
  );
  const index = selectedBestAoNSolves.value.findIndex(
    (solve) => Number(solve.finalTime) === value
  );
  return index + currentBestAoNIndex.value;
});

const reversedSolves = computed(() => {
  return [...validSessionSolves.value].reverse();
});
const currentSelectedSolve = computed(
  () => reversedSolves.value?.[selectedSolveReverseIndex.value]
);

function updateSelectedBestAoN(n: number) {
  selectedBestAoN.value = n;
  currentBestAoNIndex.value = bestAoNIndex(n, n !== 1);
  if (n === 0) {
    selectedSolveReverseIndex.value = 0;
  } else {
    selectedSolveReverseIndex.value =
      reversedSolves.value.length - 1 - currentBestAoNIndex.value;
  }

  // scroll to solve, with an offset of 2 lines
  let indexToScrollTo = selectedSolveReverseIndex.value - n + 1;
  if (reversedSolves.value[indexToScrollTo - 6]) {
    indexToScrollTo -= 6;
  }
  const element = document.getElementById(`solve-${indexToScrollTo}`);
  element?.scrollIntoView();
}

function isIndexInCurrentBestAoN(index: number) {
  return (
    index >= currentBestAoNIndex.value &&
    index < currentBestAoNIndex.value + selectedBestAoN.value
  );
}

function isWorst(index: number) {
  return (
    ![0, 1].includes(selectedBestAoN.value) &&
    index === currentBestAoNMaxIndex.value
  );
}

function isBest(index: number) {
  return selectedBestAoN.value !== 0 && index === currentBestAoNMinIndex.value;
}

function updateSelectedSolve(index: number) {
  selectedSolveReverseIndex.value = index;
}
</script>

<template>
  <img
    v-if="reversedSolves.length === 0"
    class="w-[100%]"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    src="../assets/poop.svg"
  />
  <template v-else>
    <selected-solve :solve="currentSelectedSolve" />
    <div class="grid grid-cols-3 gap-2 overflow-y-scroll scrollbar-hide">
      <solve
        v-for="(solve, index) in reversedSolves"
        :id="`solve-${index}`"
        :key="index"
        :solve="solve"
        :index="index"
        :is-selected="index === selectedSolveReverseIndex"
        :is-best="isBest(reversedSolves.length - 1 - index)"
        :is-worst="isWorst(reversedSolves.length - 1 - index)"
        :is-in-best-ao-n="
          isIndexInCurrentBestAoN(reversedSolves.length - 1 - index)
        "
        @update-selected-solve="updateSelectedSolve"
      />
      <div class="fadedScroller_fade"></div>
    </div>
    <best-ao-n-picker
      class="pt-5"
      @update-selected-best-ao-n="updateSelectedBestAoN"
      :selected-best-ao-n="selectedBestAoN"
    ></best-ao-n-picker>
  </template>
</template>

<style lang="scss">
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
