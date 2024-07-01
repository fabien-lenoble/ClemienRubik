<template>
  <div id="line1" class="flex">
    <div class="basis-shrink">
      <div class="lg:border-2 m-px lg:m-1">
        <div class="flex" v-for="(line, index) in yellowFace" :key="index">
          <sticker
            v-for="(sticker, stickerIndex) in line"
            :key="stickerIndex"
            :sticker="sticker"
          ></sticker>
        </div>
      </div>
    </div>
    <div class="basis-shrink">
      <div class="m-px md:m-0.5 lg:m-1">
        <div class="lg:border-2 m-px lg:m-1">
          <div class="flex flex-col">
            <sticker
              v-for="(sticker, stickerIndex) in rightSideStickers"
              :key="stickerIndex"
              :sticker="sticker"
            ></sticker>
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
          <sticker
            v-for="(sticker, stickerIndex) in frontStickers"
            :key="stickerIndex"
            :sticker="sticker"
          ></sticker>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pllCases } from "@/composables/training/constants";
import { computed } from "vue";
import Sticker from "./Sticker.vue";

const props = defineProps<{
  currentPllIndex: number;
  currentFrontSideIndex: number;
  currentNumberOfUTurns: number;
}>();

const sides = ["G", "O", "B", "R"];

const yellowFace = [
  ["Y", "Y", "Y"],
  ["Y", "Y", "Y"],
  ["Y", "Y", "Y"],
];

const currentPll = computed(() => {
  return pllCases[props.currentPllIndex];
});

const consecutiveSides = computed(() => {
  return sides
    .slice(props.currentFrontSideIndex)
    .concat(sides.slice(0, props.currentFrontSideIndex));
});

// map the selected pll case sides so that "A" is replaced with the front side letter, "B" with the next side letter, etc.
const mappedSides = computed(() => {
  return currentPll.value.sides.map((side) => {
    return side.map(
      (sticker) => consecutiveSides.value[["A", "B", "C", "D"].indexOf(sticker)]
    );
  });
});

const frontStickers = computed(() => {
  return mappedSides.value[props.currentNumberOfUTurns % 4];
});
const rightSideStickers = computed(() => {
  return [
    ...mappedSides.value[(props.currentNumberOfUTurns + 1) % 4],
  ].reverse();
});
</script>
