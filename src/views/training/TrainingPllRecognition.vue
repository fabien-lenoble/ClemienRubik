<template>
  <div id="line1" class="flex">
    <div class="basis-shrink">
      <div class="lg:border-2 m-px lg:m-1">
        <div class="flex" v-for="(line, index) in yellowFace" :key="index">
          <div
            v-for="(sticker, stickerIndex) in line"
            :key="stickerIndex"
            :sticker="sticker"
            :class="sticker"
            class="sticker w-6 h-6 md:w-4 md:h-4 xl:w-6 xl:h-6 border border-black text-black"
          ></div>
        </div>
      </div>
    </div>
    <div class="basis-shrink">
      <div class="m-px md:m-0.5 lg:m-1">
        <div class="lg:border-2 m-px lg:m-1">
          <div class="flex flex-col">
            <div
              v-for="(sticker, stickerIndex) in rightSideStickers"
              :key="stickerIndex"
              :sticker="sticker"
              :class="sticker"
              class="sticker w-6 h-6 md:w-4 md:h-4 xl:w-6 xl:h-6 border border-black text-black"
            ></div>
          </div>
        </div>
      </div>
      <div class="basis-shrink m-px md:m-0.5 lg:m-1"></div>
    </div>
  </div>
  <div id="line2" class="flex">
    <div class="basis-shrink">
      <div class="lg:border-2 m-px lg:m-1">
        <div class="flex">
          <div
            v-for="(sticker, stickerIndex) in frontStickers"
            :key="stickerIndex"
            :sticker="sticker"
            :class="sticker"
            class="sticker w-6 h-6 md:w-4 md:h-4 xl:w-6 xl:h-6 border border-black text-black"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap justify-center items-center">
    <div
      v-for="pll in pllCases"
      :key="pll.name"
      @click="selectPll()"
      class="h-12 basis-1/4 cursor-pointer p-4 m-2 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-black"
      :class="{
        'border-green-500 bg-green-100':
          pllSelected && pll.name === currentPll.name,
        'border-gray-300': !pllSelected,
      }"
    >
      {{ pll.name }}
    </div>
  </div>
  <div class="flex flex-wrap justify-center items-center pt-4">
    <div>
      <button
        @click="chooseNextPll"
        :disabled="!pllSelected"
        class="w-full px-6 py-2 text-black font-semibold rounded-lg shadow border transition-colors duration-300"
        :class="{
          'border-green-500 bg-green-100': pllSelected,
        }"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pllCases } from "@/composables/training/constants";
import { computed, onMounted, ref } from "vue";

const sides = ["G", "O", "B", "R"];
const currentPllIndex = ref(0);
const lastPllIndex = ref(0);
const currentFrontSideIndex = ref(0);
const currentNumberOfUTurns = ref(0);
const pllSelected = ref(false);

const yellowFace = [
  ["Y", "Y", "Y"],
  ["Y", "Y", "Y"],
  ["Y", "Y", "Y"],
];

const currentPll = computed(() => {
  return pllCases[currentPllIndex.value];
});

const consecutiveSides = computed(() => {
  return sides
    .slice(currentFrontSideIndex.value)
    .concat(sides.slice(0, currentFrontSideIndex.value));
});

// map the selected pll case sides so that "A" is replaced with the front side letter, "B" with the next side letter, etc.
const mappedSides = computed(() => {
  return currentPll.value.sides.map((side) => {
    return side.map((sticker) => {
      return sticker === "A"
        ? consecutiveSides.value[0]
        : sticker === "B"
        ? consecutiveSides.value[1]
        : sticker === "C"
        ? consecutiveSides.value[2]
        : sticker === "D"
        ? consecutiveSides.value[3]
        : sticker;
    });
  });
});

const frontStickers = computed(() => {
  return mappedSides.value[currentNumberOfUTurns.value % 4];
});
const rightSideStickers = computed(() => {
  return [
    ...mappedSides.value[(currentNumberOfUTurns.value + 1) % 4],
  ].reverse();
});

function pickNewRandomPll() {
  do {
    currentPllIndex.value = Math.floor(Math.random() * pllCases.length);
  } while (lastPllIndex.value === currentPllIndex.value);

  lastPllIndex.value = currentPllIndex.value;
  currentFrontSideIndex.value = Math.floor(Math.random() * 4);
  currentNumberOfUTurns.value = Math.floor(Math.random() * 4);
}

function selectPll() {
  pllSelected.value = true;
}

function chooseNextPll() {
  if (pllSelected.value === true) {
    pickNewRandomPll();
    pllSelected.value = false;
  }
}

onMounted(() => {
  pickNewRandomPll();
});
</script>

<style lang="scss">
.sticker {
  &.R {
    background-color: #b71234;
  }
  &.G {
    background-color: #009b48;
  }
  &.O {
    background-color: #ff5800;
  }
  &.B {
    background-color: #0046ad;
  }
  &.Y {
    background-color: #ffd500;
  }
}
</style>
