<script setup lang="ts">
import { ref, computed } from "vue";
import { useSession } from "@/composables/session";
import Solve from "@/components/SolveHistory/Solve.vue";
import BestAoNPicker from "@/components/SolveHistory/BestAoNPicker.vue";
import CubeImage from "@/components/CurrentScramble/CubeImage/index.vue";

const { validSessionSolves, bestAoNIndex } = useSession();

const currentSelectedSolveIndex = ref(0);

const selectedBestAoN = ref(0);
const currentBestAoNIndex = ref(0);

const selectedBestAoNSolves = computed(() => {
  const index = currentBestAoNIndex.value;
  return validSessionSolves.value
    .slice(index, index + selectedBestAoN.value)
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
  selectedBestAoN.value = n;
  currentBestAoNIndex.value = bestAoNIndex(n, n !== 1);
  if (n === 0) {
    currentSelectedSolveIndex.value = 0;
  } else {
    currentSelectedSolveIndex.value =
      validSessionSolves.value.length - 1 - currentBestAoNIndex.value;
  }

  // scroll to solve, with an offset of 2 lines
  let indexToScrollTo = currentSelectedSolveIndex.value - n + 1;
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
  currentSelectedSolveIndex.value = index;
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
    <div>
      {{ currentSelectedSolve.displayScramble }}
    </div>
    <div class="flex justify-between top-element mb-2 pb-5">
      <div class="flex text-4xl">
        {{ currentSelectedSolve.displayTime }}
      </div>
      <div class="flex">
        <cube-image :scramble="currentSelectedSolve.scramble" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2 overflow-y-scroll scrollbar-hide">
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

.top-element {
  box-shadow: 0px 15px 10px -15px rgba(0, 0, 0, 0.75);
  /* The first two values control the horizontal and vertical offset of the shadow */
  /* The third value controls the blur radius of the shadow */
  /* The fourth value controls the spread radius of the shadow, and can be used to adjust the size of the shadow */
}
</style>
